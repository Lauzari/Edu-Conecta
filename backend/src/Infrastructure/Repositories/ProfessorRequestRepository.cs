using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProfessorRequestRepository : IProfessorRequestRepository
    {
        private readonly ApplicationDbContext _context;

        public ProfessorRequestRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProfessorRequest>> GetAllAsync()
        {
            return await _context.ProfessorRequests
                .Include(r => r.User)
                .ToListAsync();
        }

        public async Task<ProfessorRequest?> GetByIdAsync(int id)
        {
            return await _context.ProfessorRequests
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.RequestId == id);
        }

        public async Task<IEnumerable<ProfessorRequest>> GetPendingAsync()
        {
            return await _context.ProfessorRequests
                .Where(r => r.Status == Core.Enums.RequestStatus.Pending)
                .Include(r => r.User)
                .ToListAsync();
        }

        public async Task AddAsync(ProfessorRequest request)
        {
            _context.ProfessorRequests.Add(request);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ProfessorRequest request)
        {
            _context.ProfessorRequests.Update(request);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var request = await _context.ProfessorRequests.FindAsync(id);
            if (request != null)
            {
                _context.ProfessorRequests.Remove(request);
                await _context.SaveChangesAsync();
            }
        }
    }
}
