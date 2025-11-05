using System.Text.Json.Serialization;

namespace Core.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ClassShift
    {
        Morning,
        Afternoon,
        Evening
    }
}