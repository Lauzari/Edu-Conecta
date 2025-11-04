namespace Core.Entities

{
    public enum ClassShift
    {
        Morning,
        Afternoon,
        Evening
    }
    public class Class
    {
        public int classId { get; set; }
        public int subjectId { get; set; }
        public int teacherId { get; set; }
        public string classDescription { get; set; } = string.Empty;

        public string zoomLink { get; set; } = string.Empty;

        public string techRequirements { get; set; } = string.Empty;

        public ClassShift classShift { get; set; }

        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }

        public ICollection<User> Students { get; set; } = new List<User>();

        public Class()
        {

        }

    }


}