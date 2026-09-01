# SmartStock — Judge Demo Guide

## 🎯 Purpose

SmartStock is a lightweight inventory management system designed for small logistics providers.

This guide provides judges with a quick walkthrough of the **currently implemented features** and the recommended flow for evaluating the prototype.

---

# 🌐 Access the Demo

### Live Application

**SmartStock:**
https://smart-stock-teal.vercel.app/

No installation is required to test the deployed prototype.

---

# ⚡ Quick Demo Flow

The recommended evaluation flow takes approximately **2–3 minutes**.

```text
Open SmartStock
      ↓
Choose Light / Dark Mode
      ↓
View Inventory & Stock Levels
      ↓
Add a New Product
      ↓
Enter / Scan Barcode
      ↓
Set Initial Stock + Minimum Stock
      ↓
Monitor Stock
      ↓
Add / Remove Quantity
      ↓
Trigger Low-Stock Alert
```

---

# 1. 🌓 Light & Dark Mode

SmartStock supports both **Light Mode and Dark Mode**.

### How to test

1. Open the SmartStock application.
2. Locate the theme toggle.
3. Switch between Light and Dark Mode.
4. Verify that the interface changes accordingly.

**Status:** ✅ Implemented

---

# 2. 📷 Barcode Scanning & Manual Barcode Entry

SmartStock provides two ways to identify a product:

* 📷 **Scan a barcode using the device camera**
* ⌨️ **Manually enter a barcode**

### How to test — Barcode Scanner

1. Open the barcode scanning functionality.
2. Allow camera access when prompted.
3. Point the camera toward a supported barcode.
4. Once detected, the barcode value can be used to identify the product.

### How to test — Manual Entry

1. Open the barcode/product lookup functionality.
2. Enter the barcode manually.
3. Submit the barcode.
4. The system uses the entered value to identify or retrieve the corresponding product.

**Status:** ✅ Implemented

---

# 3. ⚠️ Low-Stock Alerts

SmartStock identifies products whose stock falls below their configured minimum stock level.

### Example

```text
Minimum Stock: 10
Current Stock: 7

⚠️ LOW STOCK
```

### How to test

1. Select an existing product or create a new product.
2. Set a **Minimum Stock** value.
3. Set the current/initial stock.
4. Reduce the quantity using the stock removal functionality.
5. Once the stock falls below the configured threshold, the low-stock indication appears.

**Status:** ✅ Implemented

---

# 4. 📊 Stock Monitoring

SmartStock provides visibility into the current stock level of products.

Users can monitor:

* Product name
* Barcode/SKU information
* Current quantity
* Minimum stock level
* Stock status

### How to test

1. Open the inventory section.
2. Select or search for a product.
3. View its current stock level.
4. Modify the quantity.
5. Verify that the inventory information reflects the updated quantity.

**Status:** ✅ Implemented

---

# 5. ➕ Add a New Product

Users can create a new inventory item by entering the required product information.

### Information provided

A new product can be created with:

* Product name
* Barcode
* Initial stock quantity
* Minimum stock level

### How to test

1. Select **Add New Item**.
2. Enter the product name.
3. Enter or scan the barcode.
4. Enter the initial stock quantity.
5. Enter the minimum stock level.
6. Save the product.
7. Verify that the new product appears in the inventory.

### Example

```text
Product: Wireless Mouse
Barcode: 123456789012
Initial Stock: 25
Minimum Stock: 10
```

**Status:** ✅ Implemented

---

# 6. 🔄 Manual Stock Addition & Removal

Users can manually increase or decrease the quantity of an existing product.

### Add Stock

```text
Current Stock: 20
       +
Added Quantity: 10
       ↓
New Stock: 30
```

### Remove Stock

```text
Current Stock: 20
       -
Removed Quantity: 5
       ↓
New Stock: 15
```

### How to test

1. Select a product.
2. Choose the option to add or remove quantity.
3. Enter the quantity.
4. Confirm the operation.
5. Check the updated stock level.

**Status:** ✅ Implemented

---

# 🧪 Recommended Judge Test

For the quickest demonstration, judges can perform the following sequence.

### Step 1 — Create a product

```text
Product: Demo Product
Barcode: 123456789012
Initial Stock: 20
Minimum Stock: 10
```

### Step 2 — Check inventory

Verify:

```text
Current Stock = 20
Minimum Stock = 10
```

### Step 3 — Remove stock

Remove:

```text
Quantity = 15
```

The stock becomes:

```text
20 - 15 = 5
```

### Step 4 — Observe the alert

Because:

```text
Current Stock (5) < Minimum Stock (10)
```

the product should be identified as **Low Stock**.

### Step 5 — Add stock

Add:

```text
Quantity = 10
```

The stock becomes:

```text
5 + 10 = 15
```

The product should no longer be below the minimum-stock threshold.

### Step 6 — Test barcode functionality

Use either:

* the camera scanner, or
* manual barcode entry

to identify the product.

### Step 7 — Test the interface

Switch between:

```text
☀️ Light Mode
       ↕
🌙 Dark Mode
```

---

# ✅ Currently Implemented Features

| Feature                     | Status        |
| --------------------------- | ------------- |
| Light / Dark Mode           | ✅ Implemented |
| Barcode Scanning            | ✅ Implemented |
| Manual Barcode Entry        | ✅ Implemented |
| Inventory Monitoring        | ✅ Implemented |
| Add New Product             | ✅ Implemented |
| Initial Stock Configuration | ✅ Implemented |
| Minimum Stock Configuration | ✅ Implemented |
| Manual Stock Addition       | ✅ Implemented |
| Manual Stock Removal        | ✅ Implemented |
| Low-Stock Alerts            | ✅ Implemented |

---

# 🔜 Future Development

The following capabilities are **planned extensions and are not part of the currently implemented prototype**.

### Multi-Client Inventory

* Multiple logistics clients
* Client-specific inventory
* Client-level inventory views
* Data isolation between clients

### Inventory Intelligence

* ABC inventory classification
* Dead-stock detection
* Demand forecasting
* Intelligent reorder recommendations

These features represent the planned evolution of SmartStock from basic inventory tracking toward a broader inventory decision-support platform.

---

# ⚠️ Current Prototype Scope

The current SmartStock prototype focuses on **core inventory operations**.

It currently demonstrates:

> **Identify → Add → Monitor → Modify → Alert**

Advanced analytics, forecasting, multi-client management, and ABC/dead-stock analysis are future development areas.

No performance, accuracy, or business-impact metrics are claimed without corresponding testing data.

---

# 🏆 What Judges Can Evaluate

The current prototype can be evaluated on:

* Ease of inventory management
* Barcode-based product identification
* Stock visibility
* Low-stock detection
* Product creation workflow
* Quantity modification
* User interface and responsiveness
* Light/dark theme support
* Overall usability of the inventory workflow

---

## 💡 Suggested Evaluation Scenario

> **“Imagine you are a warehouse operator managing inventory for a small logistics provider.”**

Start by adding a product, set its initial and minimum stock levels, identify it using its barcode, and then simulate inventory movement by adding and removing quantities.

As the stock decreases below the minimum threshold, SmartStock highlights the product as **low stock**, demonstrating the core decision-support functionality.

---

**SmartStock — OmniKon National Hackathon 2026**

Developed by **Sakshi S Naik**
