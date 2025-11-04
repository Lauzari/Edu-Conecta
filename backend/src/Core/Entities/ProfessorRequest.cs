using Core.Enums;

namespace Core.Entities
{
    public class ProfessorRequest
    {
        public int Id { get; set; }
         public string Description { get; set; }
        public string UserId { get; set; }
        public RequestStatus Status { get; set; }
        public bool IsApproved { get; set; }
        public Subject Subject { get; set; }

        // Relationship whith User
       // public User? User { get; set; }
    }
}
