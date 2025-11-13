
using Core.Entities;
using Core.Exceptions;
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

        public async Task<Subject> GetByIdAsync(int id)
        {
            var subject = await _repository.GetByIdAsync(id) ?? throw new NotFoundException("Subject Not Found.");
            return subject;
        }

        public async Task<Subject> CreateAsync(string Name, int Year, string Description , int Duration)
        
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

        public async Task<Subject> UpdateAsync(int id, int subjectId, string Name,int Year, string Description , int Duration)
        {
            if (id != subjectId)
            {
                throw new AppValidationException("Incorrect ID validation.");
            }
            var subject = await _repository.GetByIdAsync(subjectId) ?? throw new NotFoundException("Subject Not Found.");
            
            subject.Name = Name;
            subject.Description = Description;
            subject.Year = Year;
            subject.Duration = Duration;

            await _repository.UpdateAsync(subject);
          
            return subject;
        }

        public async Task DeleteAsync(int id)
        {
            var subject = await _repository.GetByIdAsync(id) ?? throw new NotFoundException("Subject Not Found.");
            await _repository.DeleteAsync(subject);
        }
    }
}
