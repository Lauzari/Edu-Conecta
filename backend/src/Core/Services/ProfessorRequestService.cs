using Core.Entities;
using Core.Enums;
using Core.Interfaces;
using Core.Dtos;
using Infrastructure.Data;

namespace Core.Services
{
    public class ProfessorRequestService : IProfessorRequestService
    {
        private readonly IProfessorRequestRepository _repository;
        private readonly AppDbContext _context;

        public ProfessorRequestService(IProfessorRequestRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<ProfessorRequest>> GetPendingRequestsAsync()
        {
            return await _repository.GetPendingAsync();
        }

        public async Task SubmitRequestAsync(string userId, ProfessorRequestCreateDto requestDto)
        {
            var newRequest = new ProfessorRequest
            {
                UserId = userId,
                Subject = requestDto.Subject,
                Description = requestDto.Description,
                Status = RequestStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(newRequest);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRequestStatusAsync(int id, RequestStatus status)
        {
            var request = await _repository.GetByIdAsync(id);
            if (request == null)
                throw new KeyNotFoundException($"No se encontró la solicitud con ID {id}");

            request.Status = status;
            request.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(request);
            await _context.SaveChangesAsync();
        }
    }
}
