from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Base, User, InventoryItem, Client
from pydantic import BaseModel
from typing import List, Optional
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/smartstock")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI(title="SmartStock 3PL API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Mock Auth Dependency for demonstration (Replace with actual JWT verify)
def get_current_user(x_user_id: int = 1, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == x_user_id).first()
    if not user:
        raise HTTPException(status_code=401)
    return user

class StockUpdate(BaseModel):
    stock: int
    is_removal: bool

@app.get("/api/inventory")
def get_inventory(client_id: Optional[int] = None, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    query = db.query(InventoryItem)
    if current_user.role == "client_user":
        query = query.filter(InventoryItem.client_id == current_user.client_id)
    elif client_id:
        query = query.filter(InventoryItem.client_id == client_id)
    return query.all()

@app.put("/api/inventory/{item_id}")
def update_stock(item_id: int, update: StockUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role == "client_user":
        raise HTTPException(status_code=403, detail="Forbidden")
        
    item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404)
        
    if current_user.role == "warehouse_staff" and current_user.client_id and current_user.client_id != item.client_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    if update.is_removal:
        if item.stock < update.stock:
            raise HTTPException(status_code=400)
        item.stock -= update.stock
    else:
        item.stock += update.stock
        
    db.commit()
    db.refresh(item)
    return item