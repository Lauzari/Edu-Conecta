using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class ClassRepository : IClassRepository
    {
        private static List<Class> classes = new List<Class>();
        private static int nextId = 1;

        public List<Class> GetAll()
        {
            return classes;
        }

        public Class? GetById(int id)
        {
            return classes.FirstOrDefault(c => c.classId == id);
        }

        public Class Create(Class newClass)
        {
            newClass.classId = nextId++;
            classes.Add(newClass);
            return newClass;
        }

        public Class? Update(Class updatedClass)
        {
            var existing = classes.FirstOrDefault(c => c.classId == updatedClass.classId);
            if (existing == null) 
                return null;

            existing.classDescription = updatedClass.classDescription;
            existing.zoomLink = updatedClass.zoomLink;
            existing.techRequirements = updatedClass.techRequirements;
            existing.classShift = updatedClass.classShift;
            existing.startDate = updatedClass.startDate;
            existing.endDate = updatedClass.endDate;

            return existing;
        }

        public void Delete(int id)
        {
            var classItem = classes.FirstOrDefault(c => c.classId == id);
            if (classItem != null)
                classes.Remove(classItem);
        }
    }
}
