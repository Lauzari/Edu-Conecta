
using Core.Entities;
using Core.Interfaces;


namespace Core.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository _repository;
     

        public SubjectService(ISubjectRepository repository)
        {
            _repository = repository;
           
        }

        public async Task<IEnumerable<Subject>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Subject?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Subject> CreateAsync( string Name,int Year, string Description , int Duration)
        
        {
            var newSubject = new Subject
            {
                Name = Name,
                Description = Description,
                Year = Year,
                Duration = Duration
            };

            await _repository.AddAsync(newSubject);
            
            return newSubject;
        }

        public async Task<bool> UpdateAsync(int id,string Name,int Year, string Description , int Duration) 
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return false;

            existing.Name = Name;
            existing.Description = Description;
            existing.Year = Year;
            existing.Duration = Duration;

            await _repository.UpdateAsync(existing);
          
            return true;
        }

        public async Task<bool> DeleteAsync(int id )
        {
            var exists = await _repository.ExistsAsync(id);
            if (!exists) return false;

            await _repository.DeleteAsync(id);
         
            return true;
        }
    }
}
