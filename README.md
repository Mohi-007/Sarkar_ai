# 🏛️ Sarkar AI - Supreme AI-Powered Judicial & Legal Intelligence Platform

![Sarkar AI Banner](frontend/public/courtroom_bg.png)

**Sarkar AI** is an advanced, production-ready, full-stack AI legal platform tailored for Indian law, advocates, law students, and citizens. Designed with a dark obsidian & royal gold courtroom aesthetic, it combines 3D Virtual Courtroom simulations, Bharatiya Nyaya Sanhita (BNS 2023) cross-reference matrices, automated legal contract risk auditing, predictive bail analytics, and multilingual voice assistance.

---

## 🌟 Key Features & Modules

### 1️⃣ 3D Virtual Moot Courtroom Simulator
- **Interactive Courtroom Stage**: Experience realistic court interior views (Hon'ble Judge's Bench, Defense Counsel Podium, Prosecution Desk, Witness Box) with dynamic camera perspective switching.
- **AI Presiding Bench ("Hon'ble Justice Sarkar AI")**: Real-time legal argument processing, counter-interrogation, and statutory citations.
- **Objection System & Web Audio Synthesizer**: Raise Objections (*Hearsay, Irrelevant, Leading Question*) with immediate *Sustained* or *Overruled* judicial findings and realistic wooden gavel strike audio effects.
- **Judicial Evaluation & Scorecard**: 5-point performance matrix (Legal Accuracy, Citation Strength, Persuasiveness, Decorum, Time Management) with verdict declaration.

### 2️⃣ IPC 1860 ↔ BNS 2023 Cross-Reference Law Matrix
- **Dual-Search Converter**: Instantly cross-reference old penal and procedural codes (*IPC, CrPC, IEA*) against newly enacted acts (*BNS, BNSS, BSA 2023*).
- **Penalty Comparison**: Detailed breakdown of altered imprisonment terms, monetary fines, and newly criminalized offenses (e.g. mob lynching under BNS 103, subversion under BNS 152).
- **Precedent Citations**: Supreme Court and High Court landmark rulings associated with statutory transitions.

### 3️⃣ AI Legal Document Risk Scanner & Draft Generator
- **Contract Clause Risk Auditor**: Clause-by-clause classification (*SAFE, CAUTION, HAZARDOUS*) with risk score meters, legal explanation under Indian Contract Act 1872, and recommended amendments.
- **AI Legal Draft Generator**: Court-ready automatic drafting for **Legal Notices**, **Bail Applications under BNSS § 480**, **Affidavits**, and **RTI Petitions** with copy/download options.

### 4️⃣ Bail Predictor & Sentence Analytics Engine
- **BNSS § 480 Probability Calculator**: Statistical model assessing offense severity, custody duration, chargesheet filing, and antecedent records to calculate bail approval probability.
- **Precedent Integration**: Applies binding guidelines from landmark rulings like *Arnesh Kumar v. State of Bihar*.

### 5️⃣ Multilingual Voice Legal Q&A Assistant
- **6 Indian Languages Supported**: English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Bengali (বাংলা).
- **Domain Classifier**: Categorizes queries into Criminal, Civil, Cyber Crime, Property, Constitutional, and Family Law.
- **Actionable Advice Output**: Provides applicable BNS section numbers, citizen fundamental rights, and immediate legal remedies.

### 6️⃣ Judicial & Advocate Analytics Dashboard
- **Interactive Recharts Visualizations**: Track moot court score trends over time, win rates, citation accuracy, and domain practice distribution.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend UI** | React 18, Vite 5, Tailwind CSS 3, Framer Motion, Lucide Icons, Recharts, Canvas Confetti |
| **Audio Synthesizer** | Native Web Audio API (Realistic Gavel Impacts & Chimes) |
| **Backend API** | Python 3.10+, FastAPI, Uvicorn ASGI Server, Pydantic |
| **AI / RAG Engine** | LangChain, ChromaDB Vector Store, LegalBERT, OpenAI GPT-4 |
| **Database & Cache** | MongoDB, Redis |
| **DevOps** | Docker, Docker Compose, Git |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **Git**: Installed

### Step 1: Clone Repository
```bash
git clone https://github.com/Mohi-007/Sarkar_ai.git
cd Sarkar_ai
```

### Step 2: Run Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 3: Run Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python app/main.py
```
Open API Swagger Docs at [http://localhost:8000/api/docs](http://localhost:8000/api/docs).

---

## 🏛️ Sarkar AI Courtroom Aesthetic Design Tokens
- **Royal Navy / Obsidian**: `#070b14`, `#0b132b`, `#1c2541`
- **Imperial Court Gold**: `#d4af37`, `#f5d77f`, `#b8860b`
- **Mahogany Wood Accent**: `#1c120c`, `#2c1b14`
- **Typography**: Google Fonts *Cinzel* (Judicial Serif) & *Plus Jakarta Sans*.

---

## 📜 License & Citation
Developed for legal education, advocacy training, and legal accessibility in India.
Presented for **Sarkar AI** project repository.
