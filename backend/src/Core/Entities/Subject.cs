namespace Core.Entities
{
    public class Subject
    {
        public int SubjectId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Year { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }

        // Relationships
        public ICollection<Course>? Courses { get; set; }
    }
}
