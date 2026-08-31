"use client";
import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [barcodeSearch, setBarcodeSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  
  // Transaction Modal State
  const [modalProduct, setModalProduct] = useState(null);
  const [txType, setTxType] = useState("STOCK_IN");
  const [txQty, setTxQty] = useState(1);
  const [txNote, setTxNote] = useState("");

  const fetchData = async () => {
    try {
      const clientRes = await fetch("http://localhost:8000/api/clients");
      const clientData = await clientRes.json();
      setClients(clientData);

      let url = "http://localhost:8000/api/products";
      if (selectedClient) {
        url += `?client_id=${selectedClient}`;
      }
      const prodRes = await fetch(url);
      const prodData = await prodRes.json();
      setProducts(prodData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedClient]);

  const handleBarcodeSubmit = async (e) => {
    e.preventDefault();
    if (!barcodeSearch) return;
    try {
      const res = await fetch(`http://localhost:8000/api/products/barcode/${barcodeSearch}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      const fullProd = products.find(p => p.id === data.id);
      if (fullProd) {
        setModalProduct(fullProd);
        setMessage("");
      }
    } catch (err) {
      setMessage("Product not found for barcode: " + barcodeSearch);
    }
  };

  const handleTransaction = async (e) => {
    e.preventDefault();
    if (!modalProduct) return;
    try {
      const res = await fetch("http://localhost:8000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: modalProduct.id,
          type: txType,
          quantity: parseInt(txQty),
          reference_note: txNote
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Transaction failed");
      
      setMessage(`Success! New stock level: ${data.current_stock}`);
      setModalProduct(null);
      setTxQty(1);
      setTxNote("");
      fetchData();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">SmartStock Dashboard</h1>
          <p className="text-slate-500">OmniKon National Hackathon 2026</p>
        </div>
        <div className="flex gap-4">
          <select 
            value={selectedClient} 
            onChange={(e) => setSelectedClient(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 bg-white"
          >
            <option value="">All Clients (Multi-Client View)</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
          {message}
        </div>
      )}

      {/* Barcode Search / Scanner Simulation */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 flex gap-4 items-center">
        <form onSubmit={handleBarcodeSubmit} className="flex gap-4 flex-1">
          <input 
            type="text" 
            placeholder="Scan or enter barcode (e.g., 890100100101)..." 
            value={barcodeSearch}
            onChange={(e) => setBarcodeSearch(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 flex-1"
          />
          <button type="submit" className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800">
            Lookup Barcode
          </button>
        </form>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
              <th className="p-4">Client</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Barcode</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Reorder Pt</th>
              <th className="p-4">ABC Class</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-700">{p.client_name}</td>
                <td className="p-4 text-slate-900 font-semibold">{p.name}</td>
                <td className="p-4 text-slate-500 font-mono text-sm">{p.sku}</td>
                <td className="p-4 text-slate-500 font-mono text-sm">{p.barcode}</td>
                <td className="p-4 font-bold">{p.current_stock}</td>
                <td className="p-4 text-slate-500">{p.reorder_point}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${p.abc_classification === 'A' ? 'bg-purple-100 text-purple-700' : p.abc_classification === 'B' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                    Class {p.abc_classification}
                  </span>
                </td>
                <td className="p-4">
                  {p.is_low_stock ? (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-semibold">Low Stock</span>
                  ) : (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">Healthy</span>
                  )}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => setModalProduct(p)}
                    className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded hover:bg-indigo-700"
                  >
                    Adjust Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Stock Adjustment</h2>
            <p className="text-slate-600 mb-4">Product: <span className="font-semibold text-slate-900">{modalProduct.name}</span></p>
            
            <form onSubmit={handleTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Transaction Type</label>
                <select 
                  value={txType} 
                  onChange={(e) => setTxType(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                >
                  <option value="STOCK_IN">Stock In (Receive Inventory)</option>
                  <option value="STOCK_OUT">Stock Out (Dispatch Inventory)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                <input 
                  type="number" 
                  min="1" 
                  value={txQty} 
                  onChange={(e) => setTxQty(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reference Note</label>
                <input 
                  type="text" 
                  placeholder="e.g. Purchase Order #1042" 
                  value={txNote} 
                  onChange={(e) => setTxNote(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setModalProduct(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
