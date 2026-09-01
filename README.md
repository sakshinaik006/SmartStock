# SmartStock

> **Lightweight Inventory Decision-Support System for Small Logistics Providers**

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge)](https://smart-stock-teal.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github)](https://github.com/sakshinaik006/SmartStock)
[![Hackathon](https://img.shields.io/badge/OmniKon-National%20Hackathon%202026-blue?style=for-the-badge)](#)

SmartStock is a lightweight, mobile-friendly inventory management and decision-support system designed for **small logistics providers and 3PL operations**.

It simplifies inventory operations through barcode-based product identification, stock monitoring, manual stock updates, and automatic low-stock alerts.

SmartStock is being developed as part of the **OmniKon National Hackathon 2026**.

---

## 🌐 Live Demo

**Live Application:**
https://smart-stock-teal.vercel.app/

**GitHub Repository:**
https://github.com/sakshinaik006/SmartStock

**Judge Demo Guide:**
[DEMO_GUIDE.md](DEMO_GUIDE.md)

---

## 📌 Problem Statement

Small and medium-sized logistics providers often rely on spreadsheets, manual stock counts, and basic inventory records.

This can lead to:

* Stockouts and missed replenishment
* Overstocking
* Inventory inaccuracies
* Manual data-entry errors
* Poor visibility into inventory levels
* Difficulty identifying products that require replenishment

Many existing enterprise inventory systems can also be expensive or unnecessarily complex for smaller logistics operations.

### The Need

Small logistics providers need an inventory solution that is:

**Simple • Affordable • Mobile-Friendly • Action-Oriented**

---

## 💡 Proposed Solution

SmartStock provides a centralized inventory interface that combines **inventory tracking with basic decision support**.

The current prototype focuses on the core workflow:

```text
Identify Product
      ↓
Add / View Inventory
      ↓
Monitor Stock
      ↓
Add or Remove Quantity
      ↓
Compare with Minimum Stock
      ↓
Show Low-Stock Alert
```

The system is designed to provide a foundation for future multi-client and inventory-intelligence capabilities.

---

## ✨ Current Features

### 🌓 Light & Dark Mode

Users can switch between light and dark themes for a more comfortable interface.

### 📷 Barcode Scanning & Manual Barcode Entry

Products can be identified using:

* Device-camera barcode scanning
* Manual barcode entry

This provides a faster alternative to manually searching for products.

### 📊 Stock Monitoring

Users can view and monitor inventory information, including:

* Product name
* Barcode
* Current stock quantity
* Minimum stock level
* Stock status

### ➕ Add New Product

Users can create a new inventory item by providing:

* Product name
* Barcode
* Initial stock quantity
* Minimum stock level

### 🔄 Manual Stock Addition & Removal

Users can manually increase or decrease the quantity of an existing product.

```text
Current Stock
      ↓
Add / Remove Quantity
      ↓
Updated Stock
```

### ⚠️ Low-Stock Alerts

SmartStock identifies products whose stock falls below their configured minimum stock level.

```text
IF Current Stock < Minimum Stock
        ↓
   LOW STOCK ALERT
```

This helps users identify products that may require replenishment.

---

## 🔄 Development Status

To keep the project transparent, features are categorized according to their current implementation status.

| Feature                      | Status        |
| ---------------------------- | ------------- |
| Light / Dark Mode            | ✅ Implemented |
| Barcode Scanning             | ✅ Implemented |
| Manual Barcode Entry         | ✅ Implemented |
| Inventory Monitoring         | ✅ Implemented |
| Add New Product              | ✅ Implemented |
| Initial Stock Configuration  | ✅ Implemented |
| Minimum Stock Configuration  | ✅ Implemented |
| Manual Stock Addition        | ✅ Implemented |
| Manual Stock Removal         | ✅ Implemented |
| Low-Stock Alerts             | ✅ Implemented |
| Multi-Client Inventory       | 🔜 Future     |
| ABC Inventory Classification | 🔜 Future     |
| Dead-Stock Detection         | 🔜 Future     |
| Demand Forecasting           | 🔜 Future     |

> **Note:** Features marked as **Future** are planned extensions and are not presented as completed functionality in the current hackathon prototype.

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    │ Warehouse Operator  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React / Next.js     │
                    │ Tailwind CSS        │
                    │ Frontend            │
                    └──────────┬──────────┘
                               │
                            REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │ FastAPI             │
                    │ Backend             │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ SQLAlchemy          │
                    │ Pydantic            │
                    │ Data Layer          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ PostgreSQL / SQLite │
                    │ Database            │
                    └─────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* React
* Next.js
* Tailwind CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic

### Database

* PostgreSQL
* SQLite for lightweight/local development

### Deployment & Development

* Vercel
* Render
* Docker

---

## 📁 Project Structure

```text
SmartStock/
│
├── backend/
│   └── FastAPI backend
│
├── frontend/
│   └── Next.js frontend
│
├── docker-compose.yml
│
├── README.md
├── DEMO_GUIDE.md
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

---

## ⚙️ Local Setup

### Prerequisites

* Node.js
* npm
* Python 3.10+
* Git
* PostgreSQL or SQLite
* Docker (optional)

### 1. Clone the repository

```bash
git clone https://github.com/sakshinaik006/SmartStock.git
cd SmartStock
```

### 2. Backend Setup

```bash
cd backend
```

Create a virtual environment:

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn main:app --reload
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
```

> If the project's actual entry points or commands change, update these instructions accordingly.

---

## 🐳 Docker

SmartStock can also be run using Docker.

```bash
docker compose up --build
```

To stop the services:

```bash
docker compose down
```

---

## 📊 Current Decision Logic

The current prototype uses a simple minimum-stock rule.

```text
Current Stock
      │
      ▼
Compare with Minimum Stock
      │
      ├── Current Stock ≥ Minimum Stock
      │          ↓
      │       Normal
      │
      └── Current Stock < Minimum Stock
                 ↓
          Low-Stock Alert
```

This rule is intentionally simple and explainable for the MVP.

Future versions may incorporate historical demand, lead time, safety stock, demand variability, and forecasting.

---

## 🗺️ Roadmap

### Phase 1 — Core Inventory

**Current MVP**

* Product/SKU management
* Barcode workflow
* Inventory monitoring
* Light/dark mode
* Initial stock configuration
* Minimum stock configuration
* Manual stock addition
* Manual stock removal
* Low-stock alerts

### Phase 2 — Multi-Client Inventory

**Future**

* Client management
* Client-specific inventory
* Multi-client dashboard
* Role-based access
* Client-level data isolation
* Transaction history

### Phase 3 — Inventory Intelligence

**Future**

* ABC inventory classification
* Dead-stock detection
* Demand forecasting
* Intelligent reorder recommendations
* Safety-stock recommendations
* Inventory risk scoring

---

## 🎯 Expected Impact

SmartStock aims to help small logistics providers:

* Improve inventory visibility
* Identify low-stock products earlier
* Reduce repetitive manual inventory work
* Improve inventory accuracy
* Simplify basic inventory operations
* Build a foundation for data-driven inventory decisions

Quantitative business impact has not yet been measured through user testing or operational datasets. Therefore, no unsupported performance or accuracy claims are made.

---

## 🔐 Security & Data Handling

SmartStock follows basic security and data-handling practices appropriate for an MVP.

These include:

* Backend API validation
* Database access through SQLAlchemy
* Environment variables for configuration and secrets
* Avoiding committed credentials
* Separation of frontend and backend responsibilities
* Planned client-level data isolation for future multi-client functionality

See [SECURITY.md](SECURITY.md) for more information.

---

## 🤝 Contributing

Suggestions, bug reports, and improvements are welcome.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

---

## 📜 License

SmartStock is released under the **MIT License**.

See [LICENSE](LICENSE) for the complete license text.

---

## 👩‍💻 Team

### Sakshi S Naik

**GitHub:** [@sakshinaik006](https://github.com/sakshinaik006)

**Contribution:**

* Full-stack architecture
* FastAPI backend development
* Database modeling
* Frontend integration
* Barcode inventory workflow
* Inventory monitoring
* Low-stock alert logic
* Deployment
* Project documentation

---

## 🏆 Hackathon

**OmniKon National Hackathon 2026**

SmartStock is being developed as a lightweight inventory solution focused on improving stock visibility and basic inventory decision-making for small logistics providers.

---

## 📎 Project Links

| Resource            | Link                                        |
| ------------------- | ------------------------------------------- |
| 🌐 Live Demo        | https://smart-stock-teal.vercel.app/        |
| 💻 GitHub           | https://github.com/sakshinaik006/SmartStock |
| 📖 Judge Demo Guide | [DEMO_GUIDE.md](DEMO_GUIDE.md)              |
| 📚 API Docs         | `http://localhost:8000/docs`                |
| 📜 License          | [MIT](LICENSE)                              |

---

## ⭐ Support the Project

If you find SmartStock useful, consider giving the repository a ⭐ on GitHub.
