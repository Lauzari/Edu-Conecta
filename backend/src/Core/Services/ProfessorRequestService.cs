using Core.Entities;
using Core.Enums;
using Core.Interfaces;

namespace Core.Services
{
    public class ProfessorRequestService : IProfessorRequestService
    {
        private readonly IProfessorRequestRepository _professorRequestRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;

        public ProfessorRequestService(IProfessorRequestRepository repository, IUserService userService, IUserRepository userRepository)
        {
            _professorRequestRepository = repository;
            _userService = userService;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<ProfessorRequest>> GetRequestsAsync()
        {
            return await _professorRequestRepository.GetAllAsync();
        }

        public async Task<ProfessorRequest> AddRequestAsync(int id, string description, int applicantId)
        {

            if (id != applicantId)
            {
                throw new ArgumentException("El ID de la ruta no coincide con el del cuerpo.");
            }
            var user = await _userRepository.GetByIdAsync(applicantId);

            if (user == null)
                throw new Exception("El usuario no existe.");

            if (user.UserType != UserType.Student)
                throw new Exception("Solo los usuarios de tipo estudiante pueden solicitar ser docentes.");
            //Checks if there is already a request pending for this user
            var existingPending = await _professorRequestRepository.GetByApplicantIdAndStatusAsync(applicantId, RequestStatus.Pending);

            if (existingPending != null)
            {
                throw new InvalidOperationException("Ya existe una solicitud pendiente para este usuario.");
            }
            var newRequest = new ProfessorRequest
            {
                Description = description,
                Applicant = user,
                ApplicantId = applicantId,
                Status = RequestStatus.Pending,
            };
            await _professorRequestRepository.AddAsync(newRequest);
            return newRequest;
        }

        public async Task<ProfessorRequest> GetRequestById(int id)
        {
            var request = await _professorRequestRepository.GetByIdAsync(id) ?? throw new Exception("Request not found");
            return request;
        }

        public async Task<ProfessorRequest> AcceptRequestStatusAsync(int requestId, int applicantId)
        {
            var request = await _professorRequestRepository.GetByIdAsync(requestId)
                ?? throw new KeyNotFoundException("No se encontró la solicitud.");

            if (request.Status != RequestStatus.Pending)
                throw new InvalidOperationException("Solo se pueden aceptar solicitudes en estado 'Pending'.");

            request.Status = RequestStatus.Approved;

            await _userService.PromoteToProfessor(applicantId);

            await _professorRequestRepository.UpdateAsync(request);

            return request;
        }

        public async Task<ProfessorRequest> DeclineRequestStatusAsync(int requestId, int applicantId)
        {
            var request = await _professorRequestRepository.GetByIdAsync(requestId)
                ?? throw new KeyNotFoundException("No se encontró la solicitud.");

            if (request.Status != RequestStatus.Pending)
                throw new InvalidOperationException("Solo se pueden rechazar solicitudes en estado 'Pending'.");

            request.Status = RequestStatus.Rejected;

            await _professorRequestRepository.UpdateAsync(request);

            return request;
        }
    }
}
