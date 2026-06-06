import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
// Importing Sleek Modern Icons to remove "GPT Vibes"
import '../styles/main.css';
import { 
  LayoutDashboard, 
  LogOut, 
  Mail, 
  Bell, 
  Search, 
  Pin, 
  Calendar, 
  User, 
  Edit2, 
  Trash2, 
  Plus 
} from "lucide-react";

function Dashboard() {
  const [data, setData] = useState({ pending: 0, completed: 0, inProgress: 0 });
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Real-time ticking clock state
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    getDashboard();
    getTasks();

    // Live Ticking Clock Sync
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    
    updateTime(); // Initial execution
    const timerId = setInterval(updateTime, 1000); // Updates every second

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      setUserName(name);
      setRole(userRole);

      if (userRole === "Admin") {
        getUsers();
      }
    }

    return () => clearInterval(timerId); // Cleanup timer on unmount
  }, []);

  const getDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:7039/api/Dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:7039/api/Tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:7039/api/Users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://localhost:7039/api/Tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getTasks();
      getDashboard(); // Sync counters after deletion
      toast.success("Task Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const assignTask = async (taskId, userId) => {
    if (!userId) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://localhost:7039/api/Tasks/${taskId}/assign/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task Assigned Successfully");
      getTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to assign task");
    }
  };

  // Feature: Client Side Export Function (JSON Stream Download)
  const exportTasksToJSON = () => {
    if (tasks.length === 0) {
      toast.error("No active matrix data available to export.");
      return;
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "AuraTask_Export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Workspace matrix exported successfully! 📄");
  };

  // Feature: Bulk Import Processing & API Storage sync
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = async (event) => {
      try {
        const importedTasks = JSON.parse(event.target.result);
        const token = localStorage.getItem("token");
        if (!Array.isArray(importedTasks)) {
          toast.error("Invalid structural format template.");
          return;
        }

        // Loop through the tasks and send them to the backend API
        for (const task of importedTasks) {
          await axios.post(
            "https://localhost:7039/api/Tasks",
            {
              title: task.title || task.Title,
              description: task.description || task.Description,
              status: task.status || task.Status || "Pending",
              priority: task.priority || task.Priority || "Medium",
              category: task.category || task.Category || "General",
              dueDate: task.dueDate || task.DueDate
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
        toast.success("All records imported and synced successfully! 🎉");
        getTasks();
        getDashboard();
      } catch (error) {
        console.error(error);
        toast.error("Invalid file compilation configuration structure.");
      }
    };
    // Reset file input so the same file can be chosen again if needed
    e.target.value = "";
  };

  const getStatusBadgeClass = (status) => {
    if (status === "Completed") return "badge-pastel-success";
    if (status === "In Progress") return "badge-pastel-warning";
    return "badge-pastel-danger";
  };

  return (
    <div className="app-layout">
      {/* Left Sidebar Layout */}
      <aside className="pitch-sidebar">
        <a className="brand-section" href="#">
          <div className="brand-logo">AT</div>
          <span>AuraTask</span>
        </a>

        <button
          type="button"
          className="btn-create-task"
          data-bs-toggle="modal"
          data-bs-target="#taskModal"
        >
          <span>Create New Task</span>
          <span className="plus-icon-box"><Plus size={16} /></span>
        </button>

        <ul className="nav-menu">
          <li className="nav-menu-item active">
            <a href="#">
              <LayoutDashboard size={18} className="me-2-custom" /> Dashboard
            </a>
          </li>
          <li
            className="nav-menu-item logout-item"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            <a href="#">
              <LogOut size={18} className="me-2-custom" /> Logout
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Container Work Panel */}
      <main className="main-wrapper">
        {/* Top Header Row Panel */}
        <header className="header-bar">
          <div className="header-title">
            <h2>Dashboard</h2>
            <p className="live-clock">{currentTime || "Loading live time..."}</p>
          </div>
          <div className="header-actions">
            <span className="action-icon">
              <Mail size={20} color="#64748B" />
            </span>
            <span className="action-icon relative-badge">
              <Bell size={20} color="#64748B" />
              <span className="notification-dot"></span>
            </span>
            <div className="profile-pill">
              <div className="profile-avatar">
                {userName ? userName.split(" ").map((w) => w[0]).join("").toUpperCase() : "A"}
              </div>
              <span className="profile-name">{userName || "Admin"}</span>
            </div>
            <button 
              type="button" 
              className="premium-top-logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FEF2F2',
                color: '#EF4444',
                border: '1px solid #FEE2E2',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginLeft: '10px'
              }}
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Premium Greeting Banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h1>Hi, {userName || "Admin"}</h1>
            <p>Ready to start your day with some task boards?</p>
          </div>
          <div className="banner-illustration-modern">
            <div className="abstract-glow"></div>
            <div className="floating-icon-card">
              <User size={36} color="#FFFFFF" />
            </div>
          </div>
        </div>

        <div className="section-label d-flex justify-content-between align-items-center">
          <span>Overview</span>
          
          {/* Premium Workspace File Action Controllers */}
          <div className="d-flex gap-2">
            <button className="filter-pill-btn" onClick={exportTasksToJSON} style={{fontSize: '12px', padding: '6px 12px'}}>
              Export Workspace (.json)
            </button>
            <label className="filter-pill-btn" style={{ cursor: 'pointer', fontSize: '12px', padding: '6px 12px', marginBottom: 0 }}>
              Import Data Matrix
              <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        {/* Dynamic Metric Grid */}
        <div className="metrics-grid">
          <div className="metric-premium-card card-amber">
            <h5>Pending Tasks</h5>
            <h1>{data.pending}</h1>
          </div>
          <div className="metric-premium-card card-indigo">
            <h5>In Progress</h5>
            <h1>{data.inProgress}</h1>
          </div>
          <div className="metric-premium-card card-rose">
            <h5>Completed Tasks</h5>
            <h1>{data.completed}</h1>
          </div>
        </div>

        {/* Controls Layout Management (Search & Filters) */}
        <div className="dashboard-controls-row">
          <div className="search-wrapper">
            <span className="search-inside-icon">
              <Search size={18} color="#64748B" />
            </span>
            <input
              type="text"
              className="premium-search-input"
              placeholder="Search tasks by title..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-pills-group">
            {["All", "Pending", "In Progress", "Completed"].map((status) => (
              <button
                key={status}
                className={`filter-pill-btn ${filter === status ? "active" : ""}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Data Matrix Workspace Section */}
        <div className="table-responsive-wrapper">
          <table className="premium-data-table">
            <thead>
              <tr>
                <th>Task Details</th>
                <th>Category</th>
                <th>Due Date</th>
                {role === "Admin" && <th>Ownership</th>}
                {role === "Admin" && <th>Assignee</th>}
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks
                .filter((task) => {
                  const taskTitle = task.title || task.Title || "";
                  const taskStatus = task.status || task.Status || "Pending";
                  const matchesSearch = taskTitle.toLowerCase().includes(search.toLowerCase());
                  const matchesFilter = filter === "All" ? true : taskStatus === filter;
                  return matchesSearch && matchesFilter;
                })
                .map((task) => {
                  const currentId = task.id || task.Id;
                  const currentStatus = task.status || task.Status;
                  return (
                    <tr key={currentId}>
                      <td>
                        <div className="table-task-meta">
                          <span className="table-task-icon">
                            <Pin size={18} color="#3B82F6" />
                          </span>
                          <div>
                            <div className="table-task-title">{task.title || task.Title}</div>
                            <div className="table-task-desc">{task.description || task.Description}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="premium-category-tag">{task.category || task.Category || "General"}</span>
                      </td>
                      <td className="table-date-txt">
                        <div className="d-flex-align">
                          <Calendar size={15} className="me-1.5" color="#64748B" />
                          {task.dueDate ? task.dueDate.split("T")[0] : (task.DueDate ? task.DueDate.split("T")[0] : "No Date")}
                        </div>
                      </td>
                      {role === "Admin" && (
                        <td className="table-user-txt">
                          <div className="d-flex-align">
                            <User size={15} className="me-1.5" color="#64748B" />
                            {task.user?.name || task.User?.Name || "Unknown"}
                          </div>
                        </td>
                      )}
                      {role === "Admin" && (
                        <td>
                          <select
                            className="premium-table-select"
                            value={task.assignedToUser?.id || task.AssignedToUser?.Id || ""}
                            onChange={(e) => assignTask(currentId, e.target.value)}
                          >
                            <option value="">Unassigned</option>
                            {users.map((user) => (
                              <option key={user.id || user.Id} value={user.id || user.Id}>
                                {user.name || user.Name}
                              </option>
                            ))}
                          </select>
                        </td>
                      )}
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(currentStatus)}`}>
                          {currentStatus}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions-cell">
                          <button
                            className="premium-action-icon-btn edit-btn"
                            data-bs-toggle="modal"
                            data-bs-target="#editModal"
                            onClick={() => setSelectedTask(task)}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="premium-action-icon-btn delete-btn"
                            onClick={() => {
                              if (currentId) {
                                deleteTask(currentId);
                              } else {
                                toast.error("Task structural ID missing");
                              }
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <TaskModal refreshTasks={getTasks} />
        <EditTaskModal task={selectedTask} refreshTasks={getTasks} />
      </main>
    </div>
  );
}

// Global Reusable Premium Form Group Component for Modals
const FormField = ({ label, children }) => (
  <div className="premium-modal-field-group">
    <label className="premium-modal-label">{label}</label>
    {children}
  </div>
);

function TaskModal({ refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");

  const createTask = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://localhost:7039/api/Tasks",
        { title, description, status, priority, category, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      refreshTasks();
      toast.success("Task Created Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal fade premium-modal" id="taskModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content premium-modal-content">
          <div className="modal-header premium-modal-header">
            <h5>Create New Task</h5>
            <button type="button" className="btn-close shadow-none" data-bs-close="modal"></button>
          </div>
          <div className="modal-body premium-modal-body">
            <FormField label="Task Title">
              <input className="premium-form-input" placeholder="What needs to be done?" onChange={(e) => setTitle(e.target.value)} />
            </FormField>
            <FormField label="Description">
              <textarea className="premium-form-input rows-3" placeholder="Add detailed descriptions..." onChange={(e) => setDescription(e.target.value)} />
            </FormField>
            <div className="row">
              <div className="col-6">
                <FormField label="Status">
                  <select className="premium-form-input" onChange={(e) => setStatus(e.target.value)}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </FormField>
              </div>
              <div className="col-6">
                <FormField label="Priority">
                  <select className="premium-form-input" onChange={(e) => setPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </FormField>
              </div>
            </div>
            <FormField label="Category Name">
              <input className="premium-form-input" placeholder="e.g. Design, Frontend, Docs" onChange={(e) => setCategory(e.target.value)} />
            </FormField>
            <FormField label="Due Date Completion">
              <input type="date" className="premium-form-input" onChange={(e) => setDueDate(e.target.value)} />
            </FormField>
            <button className="btn-premium-action-submit w-100 mt-2" onClick={createTask} data-bs-dismiss="modal">
              Create Task Matrix
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditTaskModal({ task, refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || task.Title || "");
      setDescription(task.description || task.Description || "");
      setStatus(task.status || task.Status || "Pending");
      setPriority(task.priority || task.Priority || "Medium");
      setCategory(task.category || task.Category || "General");
      const baseDate = task.dueDate || task.DueDate;
      setDueDate(baseDate ? baseDate.split("T")[0] : "");
    }
  }, [task]);

  const updateTask = async () => {
    try {
      const currentId = task.id || task.Id;
      const token = localStorage.getItem("token");
      await axios.put(
        `https://localhost:7039/api/Tasks/${currentId}`,
        { ...task, title, description, status, priority, category, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      refreshTasks();
      toast.success("Task Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal fade premium-modal" id="editModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content premium-modal-content">
          <div className="modal-header premium-modal-header">
            <h5>Modify Task Settings</h5>
            <button type="button" className="btn-close shadow-none" data-bs-close="modal"></button>
          </div>
          <div className="modal-body premium-modal-body">
            <FormField label="Update Task Title">
              <input className="premium-form-input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormField>
            <FormField label="Edit Descriptions">
              <textarea className="premium-form-input rows-3" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormField>
            <div className="row">
              <div className="col-6">
                <FormField label="Current Status">
                  <select className="premium-form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </FormField>
              </div>
              <div className="col-6">
                <FormField label="Set Priority Level">
                  <select className="premium-form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </FormField>
              </div>
            </div>
            <FormField label="Change Category">
              <input className="premium-form-input" value={category} onChange={(e) => setCategory(e.target.value)} />
            </FormField>
            <FormField label="Target Target Date">
              <input type="date" className="premium-form-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </FormField>
            <button className="btn-premium-action-submit w-100 mt-2 btn-success" onClick={updateTask} data-bs-dismiss="modal">
              Commit Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;