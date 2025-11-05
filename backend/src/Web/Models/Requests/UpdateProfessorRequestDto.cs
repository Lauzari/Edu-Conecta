using System.ComponentModel.DataAnnotations;
using Core.Enums;

namespace Models.Requests;

public record UpdateProfessorRequestDto(
    [Required]
    int Id,

    [Required]
    int ApplicantId
);