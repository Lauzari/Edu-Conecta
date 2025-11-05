using System.ComponentModel.DataAnnotations;

namespace Web.Models.Requests
{
    public class AuthenticationRequest
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        public string? UserType { get; set; }
    }
}