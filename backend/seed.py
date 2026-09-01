from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, User, Client, InventoryItem
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/smartstock")
engine = create_engine(DATABASE_URL)
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

if not db.query(Client).first():
    c1 = Client(name="Client Alpha")
    c2 = Client(name="Client Beta")
    db.add_all([c1, c2])
    db.commit()

    db.add(User(username="superadmin", role="super_admin", hashed_password="pwd"))
    db.add(User(username="staff", role="warehouse_staff", hashed_password="pwd", client_id=1))
    db.add(User(username="client1", role="client_user", hashed_password="pwd", client_id=c1.id))
    db.add(User(username="client2", role="client_user", hashed_password="pwd", client_id=c2.id))
    
    db.add(InventoryItem(client_id=c1.id, sku="SKU100", name="Mouse", barcode="100", stock=50, min_alert=10))
    db.add(InventoryItem(client_id=c2.id, sku="SKU200", name="Keyboard", barcode="200", stock=5, min_alert=10))
    db.commit()
print("Database seeded")