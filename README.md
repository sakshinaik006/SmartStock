# SmartStock

> **Lightweight Inventory Decision-Support System for Small Logistics Providers**

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge)](https://smart-stock-teal.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github)](https://github.com/sakshinaik006/SmartStock)
[![Hackathon](https://img.shields.io/badge/OmniKon-National%20Hackathon%202026-blue?style=for-the-badge)](#)

SmartStock is a lightweight, mobile-friendly inventory management and decision-support system designed for **small logistics providers and 3PL operations**.

The project focuses on simplifying inventory tracking through barcode-based product identification, stock monitoring, and low-stock alerts. It is being developed as part of the **OmniKon National Hackathon 2026**.

---

## 🌐 Demo & Repository

**Live Demo:**
https://smart-stock-teal.vercel.app/

**GitHub Repository:**
https://github.com/sakshinaik006/SmartStock

---

## 📌 Problem Statement

Small and medium-sized logistics providers often rely on spreadsheets, manual stock counts, and basic inventory records.

This can lead to:

* Stockouts and missed replenishment
* Overstocking and unnecessary storage costs
* Inventory inaccuracies
* Manual data-entry errors
* Poor visibility into inventory levels
* Difficulty identifying products that require attention

Enterprise inventory systems can also be expensive or unnecessarily complex for smaller logistics operations.

### The Need

Small logistics providers need an inventory solution that is:

**Simple • Affordable • Mobile-Friendly • Action-Oriented**

---

## 💡 Proposed Solution

SmartStock provides a centralized inventory interface that combines **basic inventory tracking with decision support**.

The current prototype focuses on the most important operational workflow:

```text
Identify Product
      ↓
Track Stock
      ↓
Monitor Inventory Level
      ↓
Compare with Reorder Point
      ↓
Show Low-Stock Alert
```

The system is designed as a foundation that can later be extended with multi-client management and advanced inventory analytics.

---

## ✨ Current Features

### 📷 Barcode-Based Inventory Workflow

SmartStock supports:

* Barcode scanning using a device camera
* Manual barcode entry
* Product identification through barcode/SKU information
* Faster inventory lookup compared with manual searching

### 📦 Inventory Management

The current prototype provides:

* Product/SKU information
* Inventory visibility
* Stock-level monitoring
* Product search
* Inventory status information

### ⚠️ Low-Stock Alerts

SmartStock compares the available inventory against a configured reorder point.

```text
IF Current Stock ≤ Reorder Point
        ↓
   LOW STOCK
        ↓
 Reorder Recommended
```

This helps warehouse operators identify products that may require replenishment.

---

## 🔄 Development Status

To keep the project transparent, the current implementation is divided into three categories.

| Feature                          | Status               |
| -------------------------------- | -------------------- |
| Barcode-based inventory workflow | ✅ Implemented        |
| Manual barcode entry             | ✅ Implemented        |
| Inventory search                 | ✅ Implemented        |
| Stock monitoring                 | ✅ Implemented        |
| Low-stock alerts                 | ✅ Implemented        |
| Stock-in workflow                | 🔄 MVP / In Progress |
| Stock-out workflow               | 🔄 MVP / In Progress |
| Multi-client inventory           | 🔜 Future            |
| ABC inventory classification     | 🔜 Future            |
| Dead-stock detection             | 🔜 Future            |
| Demand forecasting               | 🔜 Future            |

> **Important:** Features marked as **Future** are part of the planned product roadmap and are not presented as completed functionality in the current hackathon prototype.

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
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
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites

Install the following before running SmartStock locally:

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

Start the FastAPI server:

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

> If the backend entry point or commands change during development, update these instructions to match the repository.

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

The current prototype uses a simple rule-based reorder-point approach.

```text
Current Stock
      │
      ▼
Compare with Reorder Point
      │
      ├── Stock > Reorder Point
      │       ↓
      │    Normal
      │
      └── Stock ≤ Reorder Point
              ↓
        Low-Stock Alert
```

This approach is intentionally simple and explainable for the MVP.

Future versions can incorporate:

* Historical demand
* Lead time
* Safety stock
* Demand variability
* Seasonal patterns
* Forecasted consumption

---

## 🗺️ Roadmap

### Phase 1 — Core Inventory

**Current MVP**

* Product/SKU management
* Inventory dashboard
* Barcode workflow
* Inventory search
* Stock monitoring
* Low-stock alerts
* Stock-in/out workflow

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
* Safety-stock recommendations
* Intelligent reorder quantities
* Inventory risk scoring

### Long-Term Vision

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

SmartStock aims to help small logistics providers:

* Improve inventory visibility
* Reduce avoidable stockouts
* Identify low-stock products earlier
* Reduce repetitive manual inventory work
* Improve inventory accuracy
* Create a foundation for data-driven inventory decisions

Quantitative business impact will be evaluated through future user testing and operational data. No unverified performance claims are made for the current prototype.

---

## 🔐 Security & Data Handling

SmartStock follows basic security and data-handling practices appropriate for an MVP.

These include:

* Backend API validation
* Database access through SQLAlchemy
* Environment variables for configuration and secrets
* Avoiding committed credentials and sensitive configuration
* Separation of frontend and backend responsibilities
* Planned client-level data isolation for the multi-client phase

For more information, see [`SECURITY.md`](SECURITY.md).

---

## 🤝 Contributing

Suggestions, bug reports, and improvements are welcome.

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before contributing.

---

## 📜 License

SmartStock is released under the **MIT License**.

See [`LICENSE`](LICENSE) for the complete license text.

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

SmartStock is being developed as a lightweight inventory solution focused on improving stock visibility and decision-making for small logistics providers.

---

## 📎 Project Links

| Resource     | Link                                        |
| ------------ | ------------------------------------------- |
| 🌐 Live Demo | https://smart-stock-teal.vercel.app/        |
| 💻 GitHub    | https://github.com/sakshinaik006/SmartStock |
| 📚 API Docs  | `http://localhost:8000/docs`                |
| 📜 License   | MIT                                         |

---

## ⭐ Support the Project

If you find SmartStock useful, consider giving the repository a ⭐ on GitHub.
