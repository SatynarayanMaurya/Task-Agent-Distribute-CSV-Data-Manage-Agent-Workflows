# 🧠 TaskAgent

**TaskAgent** is a full-stack web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that allows an admin to manage agents, upload CSV data, and automatically distribute tasks equally among agents.

It is designed to streamline operations where lead, task, or client data needs to be distributed manually — reducing friction and improving productivity.

---

## 🚀 Features

- 🔐 **Admin Authentication** with JWT
- 👨‍💼 **Create & manage agents**
- 📤 **Upload CSV** containing task data
- ⚖️ **Distribute tasks equally** among available agents
- 📋 **View all assigned tasks**
- 🗑️ **Delete agents** along with their assigned tasks
- 📱 **Responsive design** for mobile and desktop views
- 📊 Clean and modern **dashboard UI** using Tailwind CSS

---

## 🛠️ Tech Stack

| Layer       | Tech                                      |
|-------------|-------------------------------------------|
| Frontend    | React.js, Redux Toolkit, Tailwind CSS     |
| Backend     | Node.js, Express.js                       |
| Database    | MongoDB with Mongoose                     |
| Auth        | JWT-based secure authentication           |
| File Upload | Multer (CSV parsing)                      |

---

## 📁 Folder Structure

- `frontend/` – React frontend
  - `components/` – Shared UI components
  - `pages/` – Views for Dashboard, Add Agent, etc.
  - `Services/` – For connection between frontend and backend.
  - `Redux/` – State management (store + slices)
- `backend/` – Node + Express backend
  - `Controllers/` – Logic for agents, tasks, auth
  - `Models/` – MongoDB schemas
  - `Middlewares/` – For authorization
  - `Config/` – For Database connection
  - `Routes/` – API endpoints


---

## 🔧 Installation & Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SatynarayanMaurya/Task-Agent-Distribute-CSV-Data-Manage-Agent-Workflows.git
cd Task-Agent-Distribute-CSV-Data-Manage-Agent-Workflows
```

### Set up the Server (Backend)
```bash 
cd server
npm install
```

### Create a .env file in the backend/ directory:
```bash
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```


### Start the server:
```bash
npm start
```


### Set up the Client (Frontend)
```bash
cd ../frontend
npm install
npm start
```



---

✅ **What's Included:**
- Clean bash and env blocks for copy-pasting
- Sequential steps to avoid confusion
- Clear separation of backend and frontend


## 🧪 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | /login              | Admin Login              |
| POST   | /add-agent          | Create Agent             |
| GET    | /get-all-agent      | Get All Agents           |
| DELETE | /delete-agent       | Delete Agent & Tasks     |
| POST   | /upload-csv         | Upload & Distribute CSV  |
| GET    | /get-all-task       | Get All Tasks            |


## 📄 Sample CSV Format

Upload CSV should contain the following headers:

firstName phone notes 


