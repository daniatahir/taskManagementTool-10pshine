# AuraTask - Enterprise Task Management System

AuraTask is a premium, minimalist, and highly scalable full-stack task management application designed with a warm-luxe professional aesthetic. The backend is built using ASP.NET Core Web API for secure and scalable architecture, while the frontend is developed in React.js for responsive dashboards and smooth user interaction.

---

# 🔥 Key Core Features

### Secure Token Pipeline

* Complete JWT Authentication workflow
* Role-based access control
* Admin and User permission separation
* Protected API endpoints

### Interactive Workspace Matrix

* Advanced task listing dashboard
* Real-time search functionality
* Task filtering:

  * All
  * Pending
  * In Progress
  * Completed
* Status-based sorting

### Dynamic Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Instant backend synchronization

### Team Assignment Engine

* Admin-controlled task assignment
* User management
* Dynamic team allocation workflow

### Dynamic Clock Sync

* Real-time dashboard clock
* Workspace timeline tracking

### Workspace Backup (Export / Import)

* Export all tasks into JSON format
* Import backup files on any machine
* Automatic dashboard analytics restoration
* One-click backup management

---

# 💻 Technical Stack Matrix

## Frontend Layer

* React.js
* Custom Premium UI Styling
* Lucide React Icons
* Axios

## Backend Infrastructure

* ASP.NET Core Web API
* Entity Framework Core

## Database Engine

* SQL Server
* SQL Server Management Studio (SSMS)

## Security Protocols

* JWT Bearer Authentication

---

# 📁 Project Structure

```text
AuraTask/
│
├── BackendAPI/
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Services/
│   ├── Migrations/
│   └── appsettings.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🚀 Setup & Installation Guide

Follow the steps below to run the project on a new machine.

---

## 📋 Prerequisites

Install the following software before running the project:

### 1. Git

Download:
https://git-scm.com/

### 2. Node.js (v16 or higher)

Download:
https://nodejs.org/

### 3. .NET 8 SDK

Download:
https://dotnet.microsoft.com/

### 4. SQL Server

### 5. SQL Server Management Studio (SSMS)

### 6. IDE (Choose One)

* Visual Studio 2022
* Visual Studio Code

---

# 📦 Step 1: Clone Repository

Open CMD, PowerShell, or Git Bash and run:

```bash
git clone https://github.com/daniatahir/taskManagementTool-10pshine.git
cd taskManagementTool-10pshine
```

Repository will now be available locally.

---

# 🗄️ Step 2: Backend Setup (.NET Core)

Move into the backend folder:

```bash
cd BackendAPI
```

> If your backend folder has a different name, use that exact folder name.

---

## Configure Database Connection

Open:

```text
appsettings.json
```

Locate the connection string and update it according to your SQL Server instance.

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SQL_SERVER_NAME;Database=AuraTaskDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-123ABC\\SQLEXPRESS;Database=AuraTaskDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

---

## Apply Database Migrations

Run:

```bash
dotnet ef database update
```

OR using Visual Studio Package Manager Console:

```powershell
Update-Database
```

This will create all required database tables.

---

## Run Backend Server

```bash
dotnet run
```

Backend API should start successfully.

Typical URL:

```text
https://localhost:7039
```

Keep this terminal running.

---

# 🌐 Step 3: Frontend Setup (React)

Open a new terminal and navigate to the frontend folder:

```bash
cd ../frontend
```

---

## Install Dependencies

```bash
npm install
```

This will install all required packages from package.json.

---

## Verify API Endpoint

Open:

```text
src/pages/Dashboard.js
```

Verify that the API URL points to your backend:

```javascript
https://localhost:7039
```

If your backend runs on a different port, update it accordingly.

---

## Start React Application

```bash
npm start
```

React will compile and launch automatically.

Default URL:

```text
http://localhost:3000
```

---

# 🔐 Authentication Workflow

### Registration

Users can:

* Create account
* Set credentials
* Receive access permissions

### Login

Users can:

* Authenticate using credentials
* Receive JWT token
* Access protected resources

### Authorization

Role-based restrictions:

#### Admin

* Create Tasks
* Update Tasks
* Delete Tasks
* Assign Tasks
* Manage Users

#### User

* View Assigned Tasks
* Update Task Progress
* Manage Personal Workflow

---

# 📤 Export Functionality

Users can export all tasks into a JSON backup file.

Example:

```json
[
  {
    "title": "Task Example",
    "description": "Sample Task",
    "status": "Pending"
  }
]
```

Benefits:

* Data backup
* Data migration
* Offline storage
* Disaster recovery

---

# 📥 Import Functionality

Users can import previously exported JSON files.

Supported format:

```json
[
  {
    "title": "Task Example",
    "description": "Sample Task",
    "status": "Pending"
  }
]
```

Imported records automatically update:

* Dashboard counters
* Task lists
* Analytics widgets

---

# 📄 Workspace Sample Validation Matrix

Create a file named:

```text
tasks_backup.json
```

Paste the following content:

```json
[
  {
    "title": "Design System Architecture",
    "description": "Create the wireframes, design tokens, and global components in Figma.",
    "status": "In Progress",
    "priority": "High",
    "category": "Design",
    "dueDate": "2026-06-15T00:00:00Z"
  },
  {
    "title": "Setup JWT Authentication Pipeline",
    "description": "Secure the endpoints using Bearer middleware tokens and role validations.",
    "status": "Pending",
    "priority": "High",
    "category": "Backend",
    "dueDate": "2026-06-20T00:00:00Z"
  }
]
```

---

# 🧪 Import Testing Procedure

### Step 1

Register a new account.

### Step 2

Login to the application.

### Step 3

Open the Dashboard.

### Step 4

Click:

```text
Import Data Matrix
```

### Step 5

Select:

```text
tasks_backup.json
```

### Step 6

Verify:

* Tasks appear successfully
* Dashboard counters update
* Analytics widgets refresh
* Status summaries recalculate


AuraTask is now ready for development, testing, deployment, and demonstration.
