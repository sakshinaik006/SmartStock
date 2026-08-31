from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from datetime import datetime

DATABASE_URL = "sqlite:///./smartstock.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    products = relationship("Product", back_populates="client")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    name = Column(String, index=True)
    sku = Column(String, unique=True, index=True)
    barcode = Column(String, unique=True, index=True, nullable=True)
    current_stock = Column(Integer, default=0)
    reorder_point = Column(Integer, default=10)
    unit_value = Column(Float, default=0.0)
    last_movement_date = Column(DateTime, default=datetime.utcnow)
    
    client = relationship("Client", back_populates="products")
    transactions = relationship("Transaction", back_populates="product")

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    type = Column(String)  # STOCK_IN or STOCK_OUT
    quantity = Column(Integer)
    timestamp = Column(DateTime, default=datetime.utcnow)
    reference_note = Column(String, nullable=True)

    product = relationship("Product", back_populates="transactions")

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SmartStock API - OmniKon 2026", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Auto Seed Initial Data for Demo ---
@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    try:
        if db.query(Client.id).count() == 0:
            c1 = Client(name="Apex Logistics")
            c2 = Client(name="Nexus Supply Co.")
            db.add_all([c1, c2])
            db.commit()

            p1 = Product(client_id=1, name="Industrial Widget X", sku="SKU-WID-01", barcode="890100100101", current_stock=5, reorder_point=10, unit_value=120.0)
            p2 = Product(client_id=1, name="Heavy Duty Bolt Box", sku="SKU-BOLT-02", barcode="890100100102", current_stock=45, reorder_point=15, unit_value=25.0)
            p3 = Product(client_id=2, name="Smart Sensor Node", sku="SKU-SNS-03", barcode="890100100103", current_stock=2, reorder_point=8, unit_value=450.0)
            db.add_all([p1, p2, p3])
            db.commit()
    finally:
        db.close()

class TransactionCreate(BaseModel):
    product_id: int
    type: str
    quantity: int
    reference_note: str = None

@app.get("/api/clients")
def get_clients(db: Session = Depends(get_db)):
    return db.query(Client).all()

@app.get("/api/products")
def get_products(client_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Product)
    if client_id:
        query = query.filter(Product.client_id == client_id)
    products = query.all()
    
    result = []
    now = datetime.utcnow()
    for p in products:
        total_val = p.current_stock * p.unit_value
        abc_class = "A" if total_val > 5000 else ("B" if total_val > 1000 else "C")
        days_inactive = (now - (p.last_movement_date or now)).days
        is_dead_stock = days_inactive > 30
        is_low_stock = p.current_stock <= p.reorder_point

        result.append({
            "id": p.id,
            "client_id": p.client_id,
            "client_name": p.client.name if p.client else "Unknown",
            "name": p.name,
            "sku": p.sku,
            "barcode": p.barcode,
            "current_stock": p.current_stock,
            "reorder_point": p.reorder_point,
            "unit_value": p.unit_value,
            "abc_classification": abc_class,
            "days_inactive": days_inactive,
            "is_dead_stock": is_dead_stock,
            "is_low_stock": is_low_stock
        })
    return result

@app.get("/api/products/barcode/{barcode}")
def get_product_by_barcode(barcode: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.barcode == barcode).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found by barcode")
    return {
        "id": product.id,
        "name": product.name,
        "sku": product.sku,
        "barcode": product.barcode,
        "current_stock": product.current_stock,
        "client_name": product.client.name if product.client else "Unknown"
    }

@app.post("/api/transactions")
def create_transaction(tx: TransactionCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == tx.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if tx.type == "STOCK_IN":
        product.current_stock += tx.quantity
    elif tx.type == "STOCK_OUT":
        if product.current_stock < tx.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock available")
        product.current_stock -= tx.quantity
    else:
        raise HTTPException(status_code=400, detail="Invalid transaction type")
    
    product.last_movement_date = datetime.utcnow()
    
    new_tx = Transaction(
        product_id=tx.product_id,
        type=tx.type,
        quantity=tx.quantity,
        reference_note=tx.reference_note
    )
    db.add(new_tx)
    db.commit()
    return {"message": "Transaction successful", "current_stock": product.current_stock}
