using System.ComponentModel.DataAnnotations;

namespace Models.Requests;

public class UpdateUserNameRequest
{
    [Required]
    public string Name { get; set; }
}