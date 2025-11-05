using Core.Entities;
using Core.Enums;

namespace Models.Requests;

public record UpdateClassRequest(

    int Id,

    int SubjectId,

    string ClassDescription,

    int TeacherId,

    string ZoomLink,

    ClassShift ClassShift,

    DateTime StartDate
);