using Core.Entities;
using Core.Enums;

namespace Core.Interfaces
{
    public interface IProfessorRequestRepository
    {
        Task<ProfessorRequest> AddAsync(ProfessorRequest request);
        Task<IEnumerable<ProfessorRequest>> GetAllAsync();
        Task<ProfessorRequest?> GetByIdAsync(int id);
        Task<ProfessorRequest?> GetByApplicantIdAndStatusAsync(int applicantId, RequestStatus status);
        Task<ProfessorRequest> UpdateAsync(ProfessorRequest request);
        Task DeleteAsync(int id);
    }
}
