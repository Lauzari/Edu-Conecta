using System.ComponentModel.DataAnnotations;

namespace Models.Requests;

public class UpdateUserNameRequest
{
    // [Required]
    // public int Id { get; set; }

    [Required]
    public string Name { get; set; }
}