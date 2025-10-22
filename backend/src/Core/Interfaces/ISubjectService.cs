
using Core.Entities;

namespace Core.Interfaces
{
    public interface ISubjectService
    {
        Task<IEnumerable<Subject>> GetAllAsync();
        Task<Subject?> GetByIdAsync(int id);
        Task<Subject> CreateAsync( string Name,int Year, string Description , int Duration);   
        Task<bool> UpdateAsync(int id,  string Name,int Year, string Description , int Duration);
        Task<bool> DeleteAsync(int id);
        
    }
}
