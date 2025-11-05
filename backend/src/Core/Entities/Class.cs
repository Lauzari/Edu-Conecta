using Core.Enums;

namespace Core.Entities

{
    public class Class
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
        public int TeacherId { get; set; }
        public User Teacher { get; set; }
        public string ClassDescription { get; set; } = string.Empty;

        public string ZoomLink { get; set; } = string.Empty;

        public ClassShift ClassShift { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public virtual ICollection<User> Students { get; set; } = new List<User>();

        private Class()
        {
        }

        public Class(int subjectId, int teacherId, string classDescription, string zoomLink, ClassShift classShift, DateTime startDate, int subjectDurationInMonths)
        {
            SubjectId = subjectId;
            TeacherId = teacherId;
            ClassDescription = classDescription;
            ZoomLink = zoomLink;
            ClassShift = classShift;
            StartDate = startDate;

            EndDate = StartDate.AddMonths(subjectDurationInMonths);
        }

        public void RecalculateEndDate()
        {
            if (Subject == null)
                throw new InvalidOperationException("Subject must be assigned to calculate EndDate.");

            EndDate = StartDate.AddMonths(Subject.Duration);
        }

    }


}