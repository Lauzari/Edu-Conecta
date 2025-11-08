using System.ComponentModel.DataAnnotations;

namespace Web.Models.Requests
{
    public class MailRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Message { get; set; }

    }
}