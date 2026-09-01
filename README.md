# SmartStock

A lightweight inventory decision-support system designed to help small logistics providers track stock, receive reorder alerts, and reduce stockouts, overstocking, and manual errors.  
SmartStock is being developed as part of the OmniKon National Hackathon 2026.

## Problem
Small logistics providers often rely on spreadsheets, manual stock counts, and basic inventory records. This leads to:
* Stockouts
* Overstocking
* Inventory inaccuracies
* Manual errors
* Poor visibility into inventory movement

## Proposed Solution
SmartStock provides a simple, affordable alternative for small logistics providers by combining mobile-friendly inventory tracking with automated decision support and multi-client visibility.

## Key Features
* **Barcode-Based Inventory Tracking:** Browser camera scanning and manual barcode entry.
* **Stock-In & Stock-Out Logging:** Real-time stock movement updates.
* **Automated Reorder Alerts:** System-calculated low-stock flags based on reorder points.
* **ABC Inventory Classification:** Automated segmentation by valuation and velocity.
* **Dead-Stock Detection:** Rule-based flagging of inactive SKUs.
* **Multi-Client Visibility:** Isolate and manage stock per client (3PL use case).

## Tech Stack
* **Frontend:** React, Next.js, Tailwind CSS
* **Backend:** Python FastAPI, SQLAlchemy, Pydantic
* **Database:** PostgreSQL / SQLite
* **Hosting:** Vercel / Render / Docker

## Project Progress & Roadmap
* **Phase 1 — Core Inventory:** Project structure, database setup, SKU management, stock-in/out, barcode scanning, reorder points.

This submission describes a proposed, lightweight MVP. Barcode hardware, historical datasets, forecast accuracy, deployment metrics, and user-validation results are not yet available; therefore, 
the results section defines target outcomes and validation measures rather than claiming measured performance. Items marked Phase 2 or Phase 3 are future extensions beyond the core demo
* **Phase 2 — Multi-Client Inventory:** Client management, per-client views, multi-client data model.
* **Phase 3 — Inventory Intelligence:** Automatic ABC classification, dead-stock detection, and demand forecasting.

## Team & Contributions
* **Sakshi S Naik (`sakshinaik006`):** Full-stack architecture, backend FastAPI development, database modeling, and frontend integration.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone [https://github.com/sakshinaik006/SmartStock.git](https://github.com/sakshinaik006/SmartStock.git)
