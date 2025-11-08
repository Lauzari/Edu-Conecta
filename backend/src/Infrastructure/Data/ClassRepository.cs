using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ClassRepository : IClassRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        public ClassRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<IEnumerable<Class>> GetAll()
        {
            return await _applicationDbContext.Classes
            .Include(x => x.Subject)
            .Include(x => x.Teacher).ToListAsync();
        }

        public async Task<IEnumerable<Class>> GetAllWithStudents()
        {
            return await _applicationDbContext.Classes
            .Include(x => x.Subject)
            .Include(x => x.Students)
            .Include(x => x.Teacher).ToListAsync();
        }

        public async Task<Class?> GetById(int id)
        {
            return await _applicationDbContext.Classes
             .Include(x => x.Subject)
             .Include(x => x.Teacher)
             .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Class?> GetByIdWithStudents(int id)
        {
            return await _applicationDbContext.Classes
            .Include(x => x.Subject)
            .Include(x => x.Teacher)
            .Include(x => x.Students)
            .FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Class> Create(Class newClass)
        {
            await _applicationDbContext.Classes.AddAsync(newClass);
            await _applicationDbContext.SaveChangesAsync();
            return newClass;
        }

        public async Task<Class> Update(Class updatedClass)
        {
            _applicationDbContext.Classes.Update(updatedClass);
            await _applicationDbContext.SaveChangesAsync();
            return updatedClass;
        }

        public async Task Delete(Class classItem)
        {
            _applicationDbContext.Classes.Remove(classItem);
            await _applicationDbContext.SaveChangesAsync();
        }

        public async Task<int> GetStudentCount(int classId)
        {
            return await _applicationDbContext.Classes
                .Where(c => c.Id == classId)
                .Select(c => c.Students.Count)
                .FirstOrDefaultAsync();
        }
    }
}
