# 🧠 AI Lead Scoring System

This project automates **lead qualification** using both **rule-based scoring** and **AI-driven intent prediction** (via **Gemini AI**).  
Built with **Node.js**, **Express**, and **Multer** for CSV uploads.

---

## 🚀 Features
- 📤 Upload leads via CSV file (`/leads/upload`)
- 🧠 AI-based intent classification (High / Medium / Low)
- 📈 Rule-based scoring system
- 🧩 Combined final score for each lead
- 🔍 Retrieve results easily through API

---

## 🛠️ Tech Stack
| Category | Technology |
|-----------|-------------|
| Backend | Node.js (ESM) |
| AI | Gemini API |
| Data | CSV → JSON |
| File Handling | Multer |

---

## ⚙️ Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/rahulp1262003/BACKEND-ASSIGNMENT.git
cd BACKEND-ASSIGNMENT
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Add Environment Variables
Create a `.env` file in the root directory and add your API key:
```
GEMINI_API_KEY=your_api_key_here
```

### 4️⃣ Run the Server
```bash
npm start
```
Server will start at **http://localhost:5000** 🚀

---

## 🧩 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/offer` | Run scoring on uploaded leads. |
| `POST` | `/leads/upload` | Upload leads CSV |
| `POST` | `/score` | Run AI + rule scoring |
| `GET` | `/score/results` | Fetch all scored leads |

---

## 🌐 Live API Base URL
The backend is deployed on **Render** and available at:  
👉 **https://backend-assignment-266f.onrender.com**

---

## 🧪 Example Endpoints

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/offer` | Run scoring on uploaded leads. |
| `POST` | `/leads/upload` | Upload leads CSV |
| `POST` | `/score` | Run AI + rule scoring |
| `GET` | `/score/results` | Fetch all scored leads |

---

## 📄 Example CSV
```csv
name,role,company,industry,location,linkedin_bio
Ava Patel,Head of Growth,FlowMetrics,B2B SaaS,India,Helps scale SaaS brands
Raj Sharma,Marketing Manager,TechNova,Fintech,India,B2B growth expert
Sara Khan,Product Lead,DataWorks,B2B SaaS,USA,Leading product innovation
John Doe,CEO,InnovateX,B2B SaaS,UK,Leads digital transformation projects
Emily Chen,Sales Executive,Cloudify,Cloud Services,Singapore,Focus on SaaS client acquisition
```

---

## 📊 Example Output
```json
[
  {
    "name": "Ava Patel",
    "role": "Head of Growth",
    "company": "FlowMetrics",
    "intent": "High",
    "score": 90,
    "reasoning": "Strong B2B SaaS fit and decision-making role."
  }
]
```

---

## 🤖 AI Service
- Utilizes **Gemini API** for text-based reasoning
- Falls back gracefully if API request fails (Low intent default)
- Ensures consistent and interpretable outputs

---

## 🧠 Author
**Rahul Prajapati**  
💼 Passionate about Flutter | MERN Stack & AI Automation  
📧 prajapatirahul1262003@gmail.com
🌐 [GitHub Profile](https://github.com/rahulp1262003)
