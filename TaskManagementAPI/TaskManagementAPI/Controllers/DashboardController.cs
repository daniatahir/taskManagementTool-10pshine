using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagementAPI.Data;

namespace TaskManagementAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userId!);
        }

        private bool IsAdmin()
        {
            return User.IsInRole("Admin");
        }

        [HttpGet]
        public IActionResult GetDashboard()
        {
            var userId = GetUserId();

            var tasks = IsAdmin()
                ? _context.Tasks.ToList()
                : _context.Tasks.Where(t => t.UserId == userId).ToList();

            var result = new
            {
                Pending = tasks.Count(t => t.Status == "Pending"),
                Completed = tasks.Count(t => t.Status == "Completed"),
                InProgress = tasks.Count(t => t.Status == "InProgress")
            };

            return Ok(result);
        }
    }
}