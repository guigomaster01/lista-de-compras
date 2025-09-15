# mini.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Mini API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # em produção, restrinja
    allow_methods=["*"],
    allow_headers=["*"],
)

class ItemIn(BaseModel):
    name: str
    unit_price: float
    quantity: int

class ItemOut(BaseModel):
    id: int
    name: str
    unit_price: float
    quantity: int
    total: float

_ITEMS: list[ItemOut] = []
_NEXT_ID = 1

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/items", response_model=List[ItemOut])
def list_items():
    return _ITEMS

@app.post("/items", response_model=ItemOut, status_code=201)
def create_item(payload: ItemIn):
    global _NEXT_ID
    total = round(payload.unit_price * payload.quantity, 2)
    item = ItemOut(
        id=_NEXT_ID,
        name=payload.name,
        unit_price=round(payload.unit_price, 2),
        quantity=payload.quantity,
        total=total,
    )
    _ITEMS.append(item)
    _NEXT_ID += 1
    return item