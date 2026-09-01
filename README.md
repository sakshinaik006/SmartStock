# SmartStock

> **Lightweight Inventory Decision-Support System for Small Logistics Providers**

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge)](https://smart-stock-teal.vercel.app/#)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github)](https://github.com/sakshinaik006/SmartStock)

SmartStock is a lightweight, mobile-friendly inventory management and decision-support system designed for **small logistics providers and 3PL operations**.

It helps users track inventory, record stock movements, identify low-stock products, and reduce manual inventory errors through barcode-based product identification and automated reorder alerts.

Built as part of the **OmniKon National Hackathon 2026**.

---

## 🚀 Live Demo

**Try SmartStock:**
https://smart-stock-teal.vercel.app/

**GitHub Repository:**
https://github.com/sakshinaik006/SmartStock

---

## 📌 Problem Statement

Small and medium-sized logistics providers often depend on spreadsheets, manual stock counts, and fragmented inventory records.

This can result in:

* ❌ Stockouts and missed replenishment
* ❌ Overstocking and unnecessary storage costs
* ❌ Inaccurate inventory records
* ❌ Manual data-entry errors
* ❌ Limited visibility into stock movement
* ❌ Difficulty managing inventory for multiple clients

Many enterprise inventory management systems are expensive or unnecessarily complex for smaller logistics operations.

### The Opportunity

Small logistics providers need an inventory solution that is:

**Simple → Affordable → Mobile-friendly → Action-oriented**

---

## 💡 Our Solution

SmartStock provides a centralized inventory platform that combines **stock tracking with decision support**.

Instead of simply showing how much stock exists, SmartStock helps users identify **which products require attention**.

### Core workflow

```text
Add / Scan Product
        ↓
Track Inventory
        ↓
Record Stock In / Stock Out
        ↓
Monitor Stock Levels
        ↓
Detect Low Stock
        ↓
Generate Reorder Alert
```

The system is designed to evolve from basic inventory tracking into an intelligent inventory decision-support platform.

---

## ✨ Key Features

### 📦 1. Inventory Management

* Add and manage products using SKU information
* Store product names, barcodes, and stock levels
* Search inventory by SKU or product name
* View current inventory in a centralized dashboard

### 📷 2. Barcode-Based Tracking

* Browser-based barcode scanning using a device camera
* Manual barcode entry as an alternative
* Faster product identification
* Reduces repetitive manual data entry

### 📥 3. Stock-In & Stock-Out

Users can record inventory movement directly from the system.

**Stock-In**

```text
Product → Quantity → Add to Inventory
```

**Stock-Out**

```text
Product → Quantity → Remove from Inventory
```

Inventory levels are updated based on these transactions.

### ⚠️ 4. Automated Low-Stock Alerts

SmartStock compares the current stock level against a defined minimum/reorder threshold.

Example:

```text
Product: Mechanical Keyboard
Current Stock: 3
Minimum Stock: 10

⚠️ LOW STOCK
Reorder Recommended
```

This allows warehouse operators to identify products requiring replenishment before they reach zero inventory.

### 🏢 5. Multi-Client Inventory

Designed with the **3PL use case** in mind.

Future multi-client functionality will allow logistics providers to:

* Manage multiple clients
* Maintain separate inventory records
* View inventory by client
* Prevent cross-client inventory confusion

### 📊 6. Inventory Intelligence — Roadmap

Future versions will introduce:

* ABC inventory classification
* Dead-stock detection
* Demand forecasting
* Inventory prioritization
* Data-driven reorder recommendations

---

## 🖥️ Current MVP

The current prototype focuses on the most important operational workflow:

| Capability                    | Status        |
| ----------------------------- | ------------- |
| Product/SKU management        | ✅ Implemented |
| Inventory dashboard           | ✅ Implemented |
| Inventory search              | ✅ Implemented |
| Barcode entry                 | ✅ Implemented |
| Barcode scanning              | ✅ Implemented |
| Stock level monitoring        | ✅ Implemented |
| Low-stock warnings            | ✅ Implemented |
| Stock-in / stock-out workflow | 🔄 MVP        |
| Multi-client management       | 🔜 Planned    |
| ABC classification            | 🔜 Planned    |
| Dead-stock detection          | 🔜 Planned    |
| Demand forecasting            | 🔜 Planned    |

> **Note:** Advanced analytics and forecasting are planned extensions and are not presented as completed functionality in the current hackathon prototype.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      User / Admin    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React / Next.js    │
                    │   Tailwind CSS UI    │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FastAPI         │
                    │ Backend Application   │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │ SQLAlchemy / Pydantic│
                    │   Data Layer         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ PostgreSQL / SQLite  │
                    │     Database         │
                    └──────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* **React**
* **Next.js**
* **Tailwind CSS**

### Backend

* **Python**
* **FastAPI**
* **SQLAlchemy**
* **Pydantic**

### Database

* **PostgreSQL**
* **SQLite** for lightweight/local development

### Deployment & Development

* **Vercel**
* **Render**
* **Docker**

---

## 📁 Project Structure

```text
SmartStock/
│
├── backend/
│   ├── ...
│   └── FastAPI backend
│
├── frontend/
│   ├── ...
│   └── Next.js frontend
│
├── docker-compose.yml
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Python 3.10+
* Git
* PostgreSQL or SQLite
* Docker *(optional)*

### 1. Clone the repository

```bash
git clone https://github.com/sakshinaik006/SmartStock.git
cd SmartStock
```

### 2. Start the backend

```bash
cd backend
```

Create and activate a virtual environment:

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

The backend will run locally at:

```text
http://localhost:8000
```

FastAPI documentation is available at:

```text
http://localhost:8000/docs
```

### 3. Start the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

> If your actual backend entry file or commands differ, update the commands above to match your repository before submitting.

---

## 🐳 Running with Docker

SmartStock also includes Docker configuration for easier local development.

```bash
docker compose up --build
```

To stop the services:

```bash
docker compose down
```

---

## 📈 Inventory Decision Logic

SmartStock currently uses a simple rule-based approach for low-stock detection:

```text
IF Current Stock ≤ Reorder Point
        ↓
   Low Stock Alert
        ↓
Reorder Recommended
```

This intentionally keeps the MVP simple and explainable.

Future versions can incorporate:

* Historical demand
* Lead time
* Safety stock
* Demand variability
* Seasonal demand
* Forecasted consumption

to produce more advanced reorder recommendations.

---

## 🗺️ Roadmap

### Phase 1 — Core Inventory ✅

* Project architecture
* Database setup
* SKU/product management
* Inventory dashboard
* Stock monitoring
* Barcode integration
* Stock-in / stock-out
* Reorder point alerts

### Phase 2 — Multi-Client Operations 🔜

* Client management
* Client-specific inventory
* Role-based access
* Multi-client dashboard
* Improved transaction history

### Phase 3 — Inventory Intelligence 🔜

* ABC classification
* Dead-stock detection
* Demand forecasting
* Safety-stock recommendations
* Intelligent reorder quantities
* Inventory risk scoring

### Future Vision 🚀

```text
Inventory Tracking
        ↓
Decision Support
        ↓
Predictive Analytics
        ↓
Inventory Optimization
```

---

## 🎯 Expected Impact

SmartStock is designed to help small logistics providers:

* Reduce avoidable stockouts
* Improve inventory visibility
* Reduce manual inventory errors
* Identify products requiring replenishment
* Simplify warehouse operations
* Scale inventory management across multiple clients

The current hackathon prototype demonstrates the core workflow. Quantitative business impact will be evaluated through future user testing and operational data rather than being claimed without evidence.

---

## 🔐 Security & Data Handling

SmartStock is designed with data protection in mind.

Key principles include:

* Backend API validation using Pydantic
* Database access through SQLAlchemy
* Separation of frontend and backend responsibilities
* No sensitive credentials committed to the repository
* Environment variables for deployment configuration
* Client-level data isolation in the planned multi-client architecture

See [`SECURITY.md`](SECURITY.md) for security and data-handling guidelines.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.

See [`LICENSE`](LICENSE) for the complete license text.

---

## 👩‍💻 Team

### Sakshi S Naik

**GitHub:** [@sakshinaik006](https://github.com/sakshinaik006)

**Contribution:**

* Full-stack architecture
* FastAPI backend development
* Database design and integration
* Frontend development and integration
* Barcode inventory workflow
* Reorder alert logic
* Deployment and project documentation

---

## 🏆 Hackathon

**OmniKon National Hackathon 2026**

SmartStock was developed as a lightweight, scalable inventory solution focused on the operational challenges faced by small logistics providers.

---

## 📬 Project Links

| Resource             | Link                                        |
| -------------------- | ------------------------------------------- |
| 🌐 Live Demo         | https://smart-stock-teal.vercel.app/#       |
| 💻 GitHub            | https://github.com/sakshinaik006/SmartStock |
| 📚 API Documentation | `http://localhost:8000/docs`                |
| 📜 License           | MIT                                         |

---

## ⭐ If you find SmartStock useful

Consider giving the repository a ⭐ on GitHub and sharing feedback or suggestions for future development.
