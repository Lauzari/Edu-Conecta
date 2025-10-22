using Core.Entities;
using Core.Enums;
using Core.Interfaces;



namespace Core.Services
{
    public class ProfessorRequestService : IProfessorRequestService
    {
        private readonly IProfessorRequestRepository _repository;
       
        public ProfessorRequestService(IProfessorRequestRepository repository)
        {
            _repository = repository;
            
        }

        public async Task<IEnumerable<ProfessorRequest>> GetPendingRequestsAsync()
        {
            return await _repository.GetPendingAsync();
        }

        public async Task SubmitRequestAsync(string userId, Subject subject, string description)
        {
            var newRequest = new ProfessorRequest
            {
                UserId = userId,
                Subject = subject,
                Description = description,
                Status = RequestStatus.Pending,
            
            };

            await _repository.AddAsync(newRequest);
          
        }

        public async Task UpdateRequestStatusAsync(int id, RequestStatus status)
        {
            var request = await _repository.GetByIdAsync(id);
            if (request == null)
                throw new KeyNotFoundException($"No se encontró la solicitud con ID {id}");

            request.Status = status;
          

            await _repository.UpdateAsync(request);
           
        }
    }
}
