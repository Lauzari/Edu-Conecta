using Core.Entities;

namespace Core.Interfaces
{
    public interface IProfessorRequestRepository
    {
        Task<IEnumerable<ProfessorRequest>> GetAllAsync();
        Task<ProfessorRequest?> GetByIdAsync(int id);
        Task<IEnumerable<ProfessorRequest>> GetPendingAsync();
        Task AddAsync(ProfessorRequest request);
        Task UpdateAsync(ProfessorRequest request);
        Task DeleteAsync(int id);
    }
}
