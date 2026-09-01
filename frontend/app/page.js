"use client";
import { useState, useEffect } from "react";
import { LayoutDashboard, Package, Settings, Search, Moon, Sun, Scan, AlertTriangle, Plus, Minus, Trash2, Camera, CheckCircle, X } from "lucide-react";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inventory, setInventory] = useState([
    { id: 1, sku: "SKU 1001", name: "Wireless Mouse", barcode: "SKU1001", stock: 15, min: 10 },
    { id: 2, sku: "SKU 1002", name: "Mechanical Keyboard", barcode: "SKU1002", stock: 3, min: 10 },
    { id: 3, sku: "SKU 1003", name: "USB C Cable", barcode: "SKU1003", stock: 50, min: 20 },
    { id: 4, sku: "SKU 1004", name: "Headphones", barcode: "SKU1004", stock: 20, min: 10 }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const [newItem, setNewItem] = useState({ sku: "", name: "", barcode: "", stock: 0, min: 0 });
  const [bulkAmounts, setBulkAmounts] = useState({});
  const [scanMessage, setScanMessage] = useState("");
  
  // Scanned product modal state
  const [scannedProduct, setScannedProduct] = useState(null);
  const [scanModalQty, setScanModalQty] = useState(1);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    let scanner = null;
    let isComponentMounted = true;
    
    if (showScanner) {
      import("html5-qrcode").then(({ Html5Qrcode, Html5QrcodeSupportedFormats }) => {
        if (!isComponentMounted) return;
        
        const config = {
          fps: 15,
          qrbox: { width: 280, height: 120 },
          formatsToSupport: [
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.QR_CODE
          ]
        };

        scanner = new Html5Qrcode("reader");
        scanner.start(
          { facingMode: "environment" },
          config,
          (decodedText) => {
            const matched = inventory.find(item => item.barcode.toLowerCase() === decodedText.toLowerCase());
            if (matched) {
              setScannedProduct(matched);
              setScanModalQty(1);
              setShowScanner(false);
            } else {
              setScanMessage(`Product not found for barcode: ${decodedText}`);
              setShowScanner(false);
              setTimeout(() => setScanMessage(""), 4000);
            }
          },
          () => {}
        ).catch(err => {
          console.log("Camera access error:", err);
          setScanMessage("Camera permission denied or unavailable.");
          setShowScanner(false);
          setTimeout(() => setScanMessage(""), 4000);
        });
      });
    }
    
    return () => {
      isComponentMounted = false;
      if (scanner) {
        scanner.stop().then(() => scanner.clear()).catch(() => {});
      }
    };
  }, [showScanner, inventory]);

  const updateStock = (id, change, isRemoval = false) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const updatedStock = isRemoval ? Math.max(0, item.stock - change) : item.stock + change;
        return { ...item, stock: updatedStock };
      }
      return item;
    }));
    setBulkAmounts({ ...bulkAmounts, [id]: "" });
  };

  const handleModalStockUpdate = (isRemoval) => {
    if (!scannedProduct) return;
    const qty = Number(scanModalQty) || 1;
    if (isRemoval && qty > scannedProduct.stock) {
      alert("Cannot remove more items than current stock.");
      return;
    }

    setInventory(inventory.map(item => {
      if (item.id === scannedProduct.id) {
        const updatedStock = isRemoval ? Math.max(0, item.stock - qty) : item.stock + qty;
        return { ...item, stock: updatedStock };
      }
      return item;
    }));

    setScanMessage(`Successfully updated stock for ${scannedProduct.name}`);
    setScannedProduct(null);
    setSearchQuery(""); // Reset search filter back to full table view
    setTimeout(() => setScanMessage(""), 4000);
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.sku && newItem.name) {
      setInventory([...inventory, { ...newItem, id: Date.now(), stock: Number(newItem.stock), min: Number(newItem.min) }]);
      setShowAddModal(false);
      setNewItem({ sku: "", name: "", barcode: "", stock: 0, min: 0 });
    }
  };

  const filteredInventory = inventory.filter(item => 
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.barcode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => item.stock < item.min);

  return (
    <div className="flex h-screen overflow-hidden relative">
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 flex flex-col z-10">
        <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xl font-black text-gray-800 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg"><LayoutDashboard className="w-5 h-5" /></div>
            SmartStock
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/30 font-medium">
            <Package className="w-5 h-5" /> Inventory
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden z-10">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Warehouse Inventory System</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative w-72">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-[50%] text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by SKU or Name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none dark:text-white transition-all" 
              />
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              {darkMode ? <Sun className="w-5 h-5 text-gray-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 space-y-6 dark:bg-slate-950">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Live stock tracking and alert system</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowScanner(true)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-800 dark:text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
                <Scan className="w-4 h-4" /> Scan Barcode
              </button>
              <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
          </div>

          {scanMessage && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-xl flex items-center gap-3 text-blue-700 dark:text-blue-300 font-medium">
              <CheckCircle className="w-5 h-5" /> {scanMessage}
            </div>
          )}

          {lowStockItems.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-sm">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-500 font-bold mb-3">
                <AlertTriangle className="w-5 h-5" /> Low Stock Warnings ({lowStockItems.length})
              </div>
              <div className="space-y-2">
                {lowStockItems.map(item => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl flex justify-between items-center">
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{item.name} <span className="text-gray-500 dark:text-gray-400 font-normal">({item.sku})</span></span>
                    <span className="text-red-600 dark:text-red-400 font-bold">Stock: {item.stock} / Min: {item.min}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Package className="w-5 h-5" /> Product Inventory
              </h2>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 text-sm">
                  <th className="p-5 font-semibold">SKU</th>
                  <th className="p-5 font-semibold">Product Name</th>
                  <th className="p-5 font-semibold">Barcode</th>
                  <th className="p-5 font-semibold">Stock Level</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map(item => (
                  <tr key={item.id} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-5 text-gray-500 dark:text-gray-400 text-sm">{item.sku}</td>
                    <td className="p-5 font-medium text-gray-800 dark:text-gray-200">{item.name}</td>
                    <td className="p-5 text-gray-400 text-sm font-mono">{item.barcode}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${item.stock < item.min ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                        {item.stock} units
                      </span>
                    </td>
                    <td className="p-5 text-right flex justify-end gap-2 items-center">
                      <input 
                        type="number" 
                        min="1" 
                        placeholder="Qty" 
                        className="w-16 p-1.5 border rounded-lg dark:bg-slate-800 dark:border-gray-700 outline-none text-center dark:text-white"
                        value={bulkAmounts[item.id] || ""}
                        onChange={(e) => setBulkAmounts({ ...bulkAmounts, [item.id]: e.target.value })}
                      />
                      <button onClick={() => updateStock(item.id, Number(bulkAmounts[item.id]) || 1, false)} className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors" title="Add Stock"><Plus className="w-4 h-4" /></button>
                      <button onClick={() => updateStock(item.id, Number(bulkAmounts[item.id]) || 1, true)} className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors" title="Remove Stock"><Minus className="w-4 h-4" /></button>
                      <button onClick={() => deleteItem(item.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {filteredInventory.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 dark:text-gray-400">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Barcode Scanner Modal */}
        {showScanner && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-[420px] border border-gray-200 dark:border-gray-800 shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2"><Camera className="w-5 h-5"/> Scan Barcode or Enter Manually</h3>
              <div className="bg-black w-full h-64 rounded-xl overflow-hidden relative mb-4" id="reader"></div>
              <div className="flex gap-2">
                <input 
                  placeholder="Enter Barcode e.g. SKU1001" 
                  className="w-full p-2.5 border rounded-xl dark:bg-slate-800 dark:border-gray-700 dark:text-white outline-none" 
                  value={manualBarcode} 
                  onChange={e => setManualBarcode(e.target.value)} 
                />
                <button onClick={() => {
                  if (manualBarcode.trim()) {
                    const matched = inventory.find(i => i.barcode.toLowerCase() === manualBarcode.trim().toLowerCase());
                    if (matched) {
                      setScannedProduct(matched);
                      setScanModalQty(1);
                    } else {
                      setScanMessage(`Product not found for barcode: ${manualBarcode}`);
                      setTimeout(() => setScanMessage(""), 4000);
                    }
                    setShowScanner(false);
                    setManualBarcode("");
                  }
                }} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl">Search</button>
              </div>
              <button onClick={() => setShowScanner(false)} className="w-full mt-4 px-4 py-2.5 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-xl text-gray-800 dark:text-white font-semibold">Close</button>
            </div>
          </div>
        )}

        {/* Scanned Product Details & Adjustment Modal Overlay */}
        {scannedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-[440px] border border-gray-200 dark:border-gray-800 shadow-2xl relative">
              <button onClick={() => setScannedProduct(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="w-5 h-5"/></button>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2"><Package className="w-5 h-5 text-blue-600"/> Scanned Product Details</h3>
              
              <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-3 mb-6 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">SKU:</span> <span className="font-semibold text-gray-800 dark:text-gray-200">{scannedProduct.sku}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Product Name:</span> <span className="font-semibold text-gray-800 dark:text-gray-200">{scannedProduct.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Barcode:</span> <span className="font-mono text-gray-800 dark:text-gray-200">{scannedProduct.barcode}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-500 dark:text-gray-400">Current Stock Level:</span> <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold rounded-lg text-sm">{scannedProduct.stock} units</span></div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adjustment Quantity</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={scanModalQty} 
                    onChange={(e) => setScanModalQty(e.target.value)} 
                    className="w-full p-2.5 border rounded-xl dark:bg-slate-800 dark:border-gray-700 dark:text-white outline-none text-center font-bold"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => handleModalStockUpdate(false)} className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Plus className="w-4 h-4"/> Add Stock
                  </button>
                  <button onClick={() => handleModalStockUpdate(true)} className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Minus className="w-4 h-4"/> Remove Stock
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add New Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-96 border border-gray-200 dark:border-gray-800 shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Add New Item</h3>
              <form onSubmit={handleAddItem} className="space-y-4">
                <input required placeholder="SKU" className="w-full p-2.5 border rounded-xl dark:bg-slate-800 dark:border-gray-700 dark:text-white outline-none" value={newItem.sku} onChange={e => setNewItem({...newItem, sku: e.target.value})} />
                <input required placeholder="Product Name" className="w-full p-2.5 border rounded-xl dark:bg-slate-800 dark:border-gray-700 dark:text-white outline-none" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                <input required placeholder="Barcode" className="w-full p-2.5 border rounded-xl dark:bg-slate-800 dark:border-gray-700 dark:text-white outline-none" value={newItem.barcode} onChange={e => setNewItem({...newItem, barcode: e.target.value})} />
                <div className="flex gap-4">
                  <input required type="number" placeholder="Initial Stock" className="w-full p-2.5 border rounded-xl dark:bg-slate-800 dark:border-gray-700 dark:text-white outline-none" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} />
                  <input required type="number" placeholder="Min Alert" className="w-full p-2.5 border rounded-xl dark:bg-slate-800 dark:border-gray-700 dark:text-white outline-none" value={newItem.min} onChange={e => setNewItem({...newItem, min: e.target.value})} />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2.5 bg-gray-200 dark:bg-slate-700 rounded-xl text-gray-800 dark:text-white font-semibold">Cancel</button>
                  <button type="submit" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl">Save Item</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}