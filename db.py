# db.py
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "shopping")  # fallback seguro

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI não definido no .env")

# serverSelectionTimeoutMS evita travar quando Atlas está inacessível
client = AsyncIOMotorClient(MONGODB_URI, serverSelectionTimeoutMS=5000)

# NÃO use get_default_database() – use sempre um nome explícito
db = client[DB_NAME]
items_col = db["items"]