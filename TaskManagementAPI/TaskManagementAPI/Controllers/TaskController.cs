using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog;
using System.Security.Claims;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetTasks(
         string? status,
         string? priority,
         string? search)
            {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            IQueryable<TaskItem> tasks;

            if (role == "Admin")
            {
                tasks = _context.Tasks
                    .Include(t => t.User)
                    .Include(t => t.AssignedToUser)
                    .AsQueryable();
            }
            else
            {
                var userId = GetUserId();

                tasks = _context.Tasks
                    .Include(t => t.User)
                    .Include(t => t.AssignedToUser)
                    .Where(t => t.UserId == userId)
                    .AsQueryable();
            }

            if (!string.IsNullOrEmpty(status))
                {
                    tasks = tasks.Where(t => t.Status == status);
                }

                if (!string.IsNullOrEmpty(priority))
                {
                    tasks = tasks.Where(t => t.Priority == priority);
                }

                if (!string.IsNullOrEmpty(search))
                {
                    tasks = tasks.Where(t => t.Title!.Contains(search));
                }

                return Ok(tasks.ToList());
            }

        [HttpPost]
        public IActionResult CreateTask(TaskItem task)
        {
            var userId = GetUserId();

            task.UserId = userId;   // 🔥 assign automatically

            _context.Tasks.Add(task);
            _context.SaveChanges();
            Log.Information("Task created: {Title}", task.Title);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, TaskItem updatedTask)
        {
            var userId = GetUserId();

            var task = _context.Tasks
                .FirstOrDefault(t => t.Id == id && t.UserId == userId);

            if (task == null) return NotFound();

            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.Status = updatedTask.Status;
            task.Priority = updatedTask.Priority;
            task.Category = updatedTask.Category;
            task.DueDate = updatedTask.DueDate;

            _context.SaveChanges();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var userId = GetUserId();

            var task = _context.Tasks
                .FirstOrDefault(t => t.Id == id && t.UserId == userId);

            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            _context.SaveChanges();
            Log.Information("Task deleted: {Id}", id);
            return Ok("Deleted");
        }
        private int GetUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userId);
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{taskId}/assign/{userId}")]
        public IActionResult AssignTask(
    int taskId,
    int userId)
        {
            Console.WriteLine($"TASK={taskId} USER={userId}");

            var task = _context.Tasks
                .FirstOrDefault(t => t.Id == taskId);

            if (task == null)
                return NotFound();

            task.AssignedToUserId = userId;

            _context.SaveChanges();

            return Ok();
        }
    }
}