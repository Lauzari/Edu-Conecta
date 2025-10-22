using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Core.Enums;

namespace Infrastructure.Repositories
{
    public class ProfessorRequestRepository : IProfessorRequestRepository
    {
        private readonly ApplicationDbContext _context;

        public ProfessorRequestRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(ProfessorRequest request)
        {
            await _context.ProfessorRequests.AddAsync(request);
           
        }

        public async Task DeleteAsync(int id)
        {
            var existing = await _context.ProfessorRequests.FindAsync(id);
            if (existing != null)
                _context.ProfessorRequests.Remove(existing);
            
        }

        public async Task<IEnumerable<ProfessorRequest>> GetAllAsync()
        {
            return await _context.ProfessorRequests.AsNoTracking().ToListAsync();
        }

        public async Task<ProfessorRequest?> GetByIdAsync(int id)
        {
            return await _context.ProfessorRequests.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IEnumerable<ProfessorRequest>> GetPendingAsync()
        {
            return await _context.ProfessorRequests
                .AsNoTracking()
                .Where(r => r.Status == RequestStatus.Pending)
                .ToListAsync();
        }

        public async Task UpdateAsync(ProfessorRequest request)
        {
            _context.ProfessorRequests.Update(request);
            
        }
    }
}
