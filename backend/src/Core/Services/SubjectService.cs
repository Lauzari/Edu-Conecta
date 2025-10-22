using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository _repository;
        private readonly AppDbContext _context;

        public SubjectService(ISubjectRepository repository, AppDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<IEnumerable<Subject>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Subject?> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Subject> CreateAsync(SubjectCreateDto dto)
        {
            var newSubject = new Subject
            {
                Name = dto.Name,
                Description = dto.Description
            };

            await _repository.AddAsync(newSubject);
            await _context.SaveChangesAsync(); // Persistencia controlada por el Service
            return newSubject;
        }

        public async Task<bool> UpdateAsync(int id, SubjectUpdateDto dto)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return false;

            existing.Name = dto.Name;
            existing.Description = dto.Description;

            await _repository.UpdateAsync(existing);
            await _context.SaveChangesAsync(); // Persistencia
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var exists = await _repository.ExistsAsync(id);
            if (!exists) return false;

            await _repository.DeleteAsync(id);
            await _context.SaveChangesAsync(); // Persistencia
            return true;
        }
    }
}
