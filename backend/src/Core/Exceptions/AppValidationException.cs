namespace Core.Exceptions
{
    /// <summary>
    /// Represents an application-level validation error.
    /// Use this exception when a business rule, input validation,
    /// or domain constraint fails during application execution.
    /// It is intended for predictable, user-related validation issues
    /// (e.g., invalid input, missing required data, or rule violations),
    /// not for unexpected system errors.
    /// </summary>
    public class AppValidationException : Exception
    {
        public string ErrorCode { get; private set; }

        public AppValidationException()
            : base()
        {
        }

        public AppValidationException(string message, string errorCode = "")
            : base(message)
        {
            ErrorCode = errorCode;
        }

        public AppValidationException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}