# app.py
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from bson import ObjectId
from pymongo import ReturnDocument
from models import ItemCreate, ItemOut, to_cents

from db import client, items_col  # usa o client para o /health, e a collection para CRUD

# -----------------------
# Utilidades
# -----------------------
def to_cents(value: float) -> int:
    # Armazena dinheiro em centavos para evitar erros de ponto flutuante
    return round(float(value) * 100)

def doc_to_out(doc: dict) -> dict:
    unit = round(doc["unit_price_cents"] / 100, 2)
    total = round((doc["unit_price_cents"] * doc["quantity"]) / 100, 2)
    return {
        "id": str(doc["_id"]),
        "name": doc["name"],
        "unit_price": unit,
        "quantity": doc["quantity"],
        "total": total,
        "done": bool(doc.get("done", False)),
    }

def parse_oid(item_id: str) -> ObjectId:
    try:
        return ObjectId(item_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid item id")

# -----------------------
# Modelos Pydantic
# -----------------------
# -----------------------
# Modelos Pydantic
# -----------------------
class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    # Agora opcionais para permitir "só nome" na criação
    unit_price: Optional[float] = Field(None, ge=0)   # em reais
    quantity: Optional[int] = Field(1, ge=1)
    done: bool = False

    @validator("unit_price")
    def two_decimals(cls, v):
        if v is None:
            return v
        return round(float(v), 2)

class ItemUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    unit_price: Optional[float] = Field(None, ge=0)   # permitir 0,00
    quantity: Optional[int] = Field(None, ge=1)
    done: Optional[bool] = None

    @validator("unit_price")
    def two_decimals(cls, v):
        if v is None:
            return v
        return round(float(v), 2)

# -----------------------
# App & CORS
# -----------------------
app = FastAPI(title="Shopping List API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # pra dev usar ["*"]
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=False,         # manter False se usar "*"
)

# -----------------------
# Healthcheck (inclui ping no Mongo)
# -----------------------
mongo_ok = False

@app.on_event("startup")
async def check_mongo():
    global mongo_ok
    try:
        await client.admin.command("ping")
        mongo_ok = True
    except Exception as e:
        print("Mongo ping falhou:", e)
        mongo_ok = False

@app.get("/health")
async def health():
    return {"ok": True, "mongo": mongo_ok}

# -----------------------
# Rotas /items
# -----------------------
@app.get("/items", response_model=List[ItemOut])
async def list_items():
    cursor = items_col.find({}).sort("_id", -1)
    docs = [doc async for doc in cursor]
    return [ItemOut(**doc_to_out(d)) for d in docs]

@app.post("/items", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
async def create_item(payload: ItemCreate):
    name = payload.name.strip()
    if not name:
        raise HTTPException(400, "Name cannot be empty")

    unit_cents = to_cents(payload.unit_price) if payload.unit_price is not None else 0
    qty = payload.quantity if payload.quantity is not None else 1

    doc = {
        "name": name,
        "unit_price_cents": unit_cents,
        "quantity": qty,
        "done": bool(payload.done),
    }
    res = await items_col.insert_one(doc)
    inserted = await items_col.find_one({"_id": res.inserted_id})
    return ItemOut(**doc_to_out(inserted))

@app.patch("/items/{item_id}", response_model=ItemOut)
async def update_item(item_id: str, payload: ItemUpdate):
    oid = parse_oid(item_id)

    updates = {}
    if payload.name is not None:
        nm = payload.name.strip()
        if not nm:
            raise HTTPException(400, "Name cannot be empty")
        updates["name"] = nm
    if payload.unit_price is not None:
        updates["unit_price_cents"] = to_cents(payload.unit_price)
    if payload.quantity is not None:
        updates["quantity"] = payload.quantity
    if payload.done is not None:
        updates["done"] = bool(payload.done)

    if not updates:
        raise HTTPException(400, "No valid fields to update")

    updated = await items_col.find_one_and_update(
        {"_id": oid},
        {"$set": updates},
        return_document=ReturnDocument.AFTER,
    )
    if not updated:
        raise HTTPException(404, "Item not found")
    return ItemOut(**doc_to_out(updated))

@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: str):
    oid = parse_oid(item_id)
    res = await items_col.delete_one({"_id": oid})
    if res.deleted_count == 0:
        raise HTTPException(404, "Item not found")
    return

@app.get("/total")
async def get_total():
    cursor = items_col.find({})
    total_cents = 0
    async for doc in cursor:
        total_cents += doc["unit_price_cents"] * doc["quantity"]
    return {"total": round(total_cents / 100, 2)}