
using Core.Entities;

namespace Core.Interfaces
{
    public interface ISubjectService
    {
        Task<IEnumerable<Subject>> GetAllAsync();
        Task<Subject> GetByIdAsync(int id);
        Task<Subject> CreateAsync(string Name,int Year, string Description , int Duration);   
        Task<Subject> UpdateAsync(int id, int subjectId, string Name,int Year, string Description , int Duration);
        Task DeleteAsync(int id);
        
    }
}
