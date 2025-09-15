from pydantic import BaseModel, Field, validator
from typing import Optional
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    @classmethod
    def validate(cls, v):
        return v if isinstance(v, ObjectId) else ObjectId(v)

def to_cents(value: float) -> int:
    return round(float(value) * 100)

class ItemCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    unit_price: float = Field(..., gt=0)  # em reais
    quantity: int = Field(..., ge=1)
    done: bool = False

    @validator("unit_price")
    def two_decimals(cls, v):
        # garante duas casas ao converter; armazenamento será em centavos
        return round(v, 2)

class ItemOut(BaseModel):
    id: str
    name: str
    unit_price: float  # em reais
    quantity: int
    total: float       # em reais (unit_price * quantity)
    done: bool
