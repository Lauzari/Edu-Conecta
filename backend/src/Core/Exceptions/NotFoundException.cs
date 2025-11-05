namespace Core.Exceptions
{
    /// <summary>
    /// Represents an error that occurs when a requested resource, entity, or record
    /// cannot be found in the system.
    /// Use this exception when a lookup or query fails to locate the expected data
    /// (e.g., user not found, record does not exist, or invalid identifier).
    /// It should indicate a valid request where the target resource simply does not exist,
    /// rather than a system or validation error.
    /// </summary>
    public class NotFoundException : Exception
    {
        public string ErrorCode { get; private set; }

        public NotFoundException()
            : base()
        {
        }

        public NotFoundException(string message, string errorCode = "")
            : base(message)
        {
            ErrorCode = errorCode;
        }

        public NotFoundException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
