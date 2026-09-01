"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [role, setRole] = useState("super_admin");
  const [clientId, setClientId] = useState(1);

  useEffect(() => {
    fetch(http://localhost:8000/api/inventory?client_id= + clientId)
      .then(res => res.json())
      .then(data => setInventory(data));
  }, [clientId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Warehouse Dashboard</h1>
      {role !== "client_user" && (
        <select onChange={(e) => setClientId(e.target.value)} className="mb-4 p-2 border">
          <option value="1">Client Alpha</option>
          <option value="2">Client Beta</option>
        </select>
      )}
      <table className="w-full text-left">
        <thead><tr><th>SKU</th><th>Name</th><th>Stock</th></tr></thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}><td>{item.sku}</td><td>{item.name}</td><td>{item.stock}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}