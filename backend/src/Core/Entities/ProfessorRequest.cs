using Core.Enums;

namespace Core.Entities
{
    public class ProfessorRequest
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public User Applicant { get; set; }
        public int ApplicantId { get; set; }
        public RequestStatus Status { get; set; }
    }
}
