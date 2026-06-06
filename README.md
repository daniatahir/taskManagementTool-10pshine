# AuraTask - Enterprise Task Management System

AuraTask ek premium, minimalist aur highly scalable full-stack task management application hai jise ek "warm-luxe" professional aesthetic par design kiya gaya hai. Iska backend **ASP.NET Core Web API** par built hai secure architecture ke liye, aur frontend **React.js** par smooth, high-response dashboards handle karne ke liye responsive tools ke sath design kiya gaya hai.

---

## 🔥 Key Core Features
- **Secure Token Pipeline:** Complete JWT Authentication process with role-based access control (Admin vs User permissions).
- **Interactive Workspace Matrix:** Tasks data tables built with active search, filter parameters (All, Pending, In Progress, Completed), and status sorting configurations.
- **Dynamic Task Management:** Complete dynamic CRUD workflow setup with instantaneous backend communication.
- **Team Assignment Engine:** Admin users can dynamically assign workspace entities to team members using fluid data controls.
- **Dynamic Clock Sync:** A real-time ticking custom time dashboard component for tracking workspace timelines.
- **Workspace Backup (Export/Import):** Direct client-side JSON data streaming functionality. Ek single click se tasks matrix ko backup file (`.json`) mein export karein ya kisi bhi local machine par fresh backup file import karke analytics counters load karein.

---

## 💻 Technical Stack Matrix
- **Frontend Layer:** React.js, Custom Minimalist Premium UI Styling, Lucide React Icon Sets, Axios HTTP Framework.
- **Backend Infrastructure:** ASP.NET Core Web API, Entity Framework Core ORM.
- **Database Engine:** SQL Server / SQL Server Management Studio (SSMS).
- **Security Protocols:** JSON Web Tokens (JWT) Bearer Authentication.

---

## 🚀 How to Setup and Run This Project on Another PC (From GitHub)

Agar aap is project ko GitHub se kisi doosre PC par clean deploy ya execute karna chahte hain, toh steps ko sequentially run karein:

### 📋 System Prerequisites
Ensure karein ke target machine par niche diye gaye frameworks configured hain:
1. **Git Tooling** ([Download Git](https://git-scm.com/))
2. **Node.js Environment** v16 or higher ([Download Node](https://nodejs.org/))
3. **.NET 8.0 SDK** ([Download .NET Core](https://dotnet.microsoft.com/))
4. **SQL Server & SSMS** (SQL Server Management Studio)
5. **IDE Options:** Visual Studio 2022 (with *ASP.NET and web development* bundle) OR VS Code.

---

### 📦 Step 1: Clone the Combined Workspace Repository
Open your terminal (CMD, PowerShell, or Git Bash) and run:
```bash
git clone [https://github.com/daniatahir/taskManagementTool-10pshine.git](https://github.com/daniatahir/taskManagementTool-10pshine.git)
cd taskManagementTool-10pshine