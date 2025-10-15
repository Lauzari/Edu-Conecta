using Core.Enums;

namespace Core.Entities
{
    public class ProfessorRequest
    {
        public int RequestId { get; set; }
        public int UserId { get; set; }
        public RequestStatus Status { get; set; }
        public bool IsApproved { get; set; }

        // Relationship whith User
        public User? User { get; set; }
    }
}
