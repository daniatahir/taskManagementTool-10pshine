using System.Text.Json.Serialization;
using TaskManagementAPI.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
    public string Priority { get; set; }
    public DateTime DueDate { get; set; }
    public string Category { get; set; }

    public int UserId { get; set; }

   // [JsonIgnore]
    public User? User { get; set; }

    public int? AssignedToUserId { get; set; }

    public User? AssignedToUser { get; set; }
}