
using Core.Entities;
using Core.Enums;


namespace Core.Interfaces
{
    public interface IProfessorRequestService
    {
        Task<IEnumerable<ProfessorRequest>> GetRequestsAsync();
        Task<ProfessorRequest> AddRequestAsync(int id, string description, int applicantId);
        Task<ProfessorRequest> GetRequestById(int id);
        Task<IEnumerable<ProfessorRequest>> GetRequestsByUserId(int id);
        Task<ProfessorRequest> AcceptRequestStatusAsync(int requestId, int applicantId);
        Task<ProfessorRequest> DeclineRequestStatusAsync(int requestId, int applicantId);
        
    }
}
