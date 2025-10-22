
using Core.Entities;


namespace Core.Interfaces
{
    public interface IProfessorRequestService
    {
        Task<IEnumerable<ProfessorRequest>> GetPendingRequestsAsync();
        Task SubmitRequestAsync(string userId, Subject subject, string description);
       // Task UpdateRequestStatusAsync(int id, RequestStatus status);
    }
}
