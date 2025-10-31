using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Core.Enums;

namespace Infrastructure.Data
{
    public class ProfessorRequestRepository : IProfessorRequestRepository
    {
        private readonly ApplicationDbContext _context;

        public ProfessorRequestRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProfessorRequest> AddAsync(ProfessorRequest request)
        {
            await _context.ProfessorRequests.AddAsync(request);
            await _context.SaveChangesAsync();
            return request;
        }
        public async Task<IEnumerable<ProfessorRequest>> GetAllAsync()
        {
            return await _context.ProfessorRequests.AsNoTracking().ToListAsync();
        }
        public async Task<ProfessorRequest?> GetByIdAsync(int id)
        {
            return await _context.ProfessorRequests.FirstOrDefaultAsync(r => r.Id == id);
        }
        public async Task<ProfessorRequest?> GetByApplicantIdAndStatusAsync(int applicantId, RequestStatus status)
        {
            return await _context.ProfessorRequests
                .AsNoTracking() //data only for reading
                .FirstOrDefaultAsync(r => r.ApplicantId == applicantId && r.Status == status);
        }

        public async Task<ProfessorRequest> UpdateAsync(ProfessorRequest request)
        {
            _context.ProfessorRequests.Update(request);
            await _context.SaveChangesAsync();
            return request;
        }
    }
}
