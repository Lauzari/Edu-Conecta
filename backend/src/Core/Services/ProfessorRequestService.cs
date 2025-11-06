using Core.Entities;
using Core.Enums;
using Core.Exceptions;
using Core.Interfaces;

namespace Core.Services
{
    public class ProfessorRequestService : IProfessorRequestService
    {
        private readonly IProfessorRequestRepository _professorRequestRepository;
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IMailService _mailService;

        public ProfessorRequestService(IProfessorRequestRepository repository, IUserService userService, IUserRepository userRepository, IMailService mailService)
        {
            _professorRequestRepository = repository;
            _userService = userService;
            _userRepository = userRepository;
            _mailService = mailService;
        }

        public async Task<IEnumerable<ProfessorRequest>> GetRequestsAsync()
        {
            return await _professorRequestRepository.GetAllAsync();
        }

        public async Task<ProfessorRequest> AddRequestAsync(int id, string description, int applicantId)
        {

            if (id != applicantId)
            {
                throw new AppValidationException("Route ID does not match body ID.");
            }

            var user = await _userRepository.GetByIdAsync(applicantId) ?? throw new NotFoundException("User Not Found.");

            if (user.UserType != UserType.Student)
                //Agregamos un nuevo tipo de error como "BussinessRuleException"???
                throw new InvalidOperationException("Solo los usuarios con rol 'Student' pueden convertirse en 'Professor'.");

            //Checks if there is already a request pending for this user
            var existingPending = await _professorRequestRepository.GetByApplicantIdAndStatusAsync(applicantId, RequestStatus.Pending);

            if (existingPending != null)
            {
                //Agregamos un nuevo tipo de error como "BussinessRuleException"???
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

            var admins = await _userRepository.GetUsersByRoleAsync("Admin");

            foreach (var admin in admins)
            {
                string subject = $"Nueva solicitud de profesor Nro. {newRequest.Id}";
                string body = $"{newRequest.Applicant.Name} realizó una nueva solicitud.\n" +
                            $"ID: {newRequest.Id}\n" +
                            $"Fecha: {DateTime.Now}\n" +
                            $"Email: {admin.Email}\n" +
                            $"Descripción: {newRequest.Description}";

                _mailService.Send(subject, body, admin.Email);
            }
            return newRequest;
        }

        public async Task<ProfessorRequest> GetRequestById(int id)
        {
            var request = await _professorRequestRepository.GetByIdAsync(id) ?? throw new NotFoundException("Professor Request not found");
            return request;
        }

         public async Task<IEnumerable<ProfessorRequest>> GetRequestsByUserId(int id)
        {
            var user = _userRepository.GetByIdAsync(id) ?? throw new NotFoundException("User Not Found.");
            
            var requests = await _professorRequestRepository.GetRequestsByUserIdAsync(id) ?? throw new NotFoundException("Professor Request not found");
            return requests;
        }

        public async Task<ProfessorRequest> AcceptRequestStatusAsync(int requestId, int applicantId)
        {
            var request = await _professorRequestRepository.GetByIdAsync(requestId)
                ?? throw new NotFoundException("Professor Request Not Found.");

            if (request.Status != RequestStatus.Pending)
                //Agregamos un nuevo tipo de error como "BussinessRuleException"???
                throw new InvalidOperationException("Solo se pueden aceptar solicitudes en estado 'Pending'.");

            request.Status = RequestStatus.Approved;

            await _userService.PromoteToProfessor(applicantId);

            await _professorRequestRepository.UpdateAsync(request);

            return request;
        }

        public async Task<ProfessorRequest> DeclineRequestStatusAsync(int requestId, int applicantId)
        {
            var request = await _professorRequestRepository.GetByIdAsync(requestId)
                ?? throw new NotFoundException("Professor Request Not Found.");

            if (request.Status != RequestStatus.Pending)
            //Agregamos un nuevo tipo de error como "BussinessRuleException"???
                throw new InvalidOperationException("Solo se pueden rechazar solicitudes en estado 'Pending'.");

            request.Status = RequestStatus.Rejected;

            await _professorRequestRepository.UpdateAsync(request);

            return request;
        }
    }
}
