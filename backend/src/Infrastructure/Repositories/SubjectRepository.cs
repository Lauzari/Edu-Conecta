using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly ApplicationDbContext _context;

        public SubjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Subject subject)
        {
            await _context.Subjects.AddAsync(subject);
            
        }

        public async Task DeleteAsync(int id)
        {
            var existing = await _context.Subjects.FindAsync(id);
            if (existing != null)
                _context.Subjects.Remove(existing);
           
        }

        public async Task<IEnumerable<Subject>> GetAllAsync()
        {
            return await _context.Subjects.AsNoTracking().ToListAsync();
        }

        public async Task<Subject?> GetByIdAsync(int id)
        {
            return await _context.Subjects.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task UpdateAsync(Subject subject)
        {
            _context.Subjects.Update(subject);
           
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Subjects.AnyAsync(s => s.Id == id);
        }
    }
}
