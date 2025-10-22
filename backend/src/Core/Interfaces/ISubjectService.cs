using Core.Dtos;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ISubjectService
    {
        Task<IEnumerable<Subject>> GetAllAsync();
        Task<Subject?> GetByIdAsync(int id);
        Task<Subject> CreateAsync(SubjectCreateDto dto);
        Task<bool> UpdateAsync(int id, SubjectUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
