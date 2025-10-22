using Core.Dtos;
using Core.Entities;
using Core.Enums;

namespace Core.Interfaces
{
    public interface IProfessorRequestService
    {
        Task<IEnumerable<ProfessorRequest>> GetPendingRequestsAsync();
        Task SubmitRequestAsync(string userId, ProfessorRequestCreateDto requestDto);
        Task UpdateRequestStatusAsync(int id, RequestStatus status);
    }
}
