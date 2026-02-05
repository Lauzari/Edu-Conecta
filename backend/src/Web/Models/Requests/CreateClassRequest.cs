using Core.Entities;
using Core.Enums;

namespace Models.Requests;

public record CreateClassRequest(

    int SubjectId,

    string ClassDescription,

    int TeacherId,

    string ZoomLink,

    string CoverImage,

    ClassShift ClassShift,

    DateTime StartDate

);