using System.ComponentModel.DataAnnotations;
using Core.Enums;

namespace Core.Entities
{
    public class ProfessorRequest
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public User Applicant { get; set; }

        [Required]
        public int ApplicantId { get; set; }

        [Required]
        public RequestStatus Status { get; set; }
    }
}
