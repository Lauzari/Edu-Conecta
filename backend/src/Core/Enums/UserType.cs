using System.Text.Json.Serialization;

namespace Core.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum UserType
    {
        Student,
        Professor,
        Admin
    }
}