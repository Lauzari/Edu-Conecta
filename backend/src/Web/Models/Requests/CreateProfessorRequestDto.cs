using System.ComponentModel.DataAnnotations;

namespace Models.Requests;

public record CreateProfessorRequestDto(
    [Required, MaxLength(100)]
    string Description,

    [Required]
    int ApplicantId
);