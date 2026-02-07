namespace Core.Exceptions
{
     /// <summary>
    /// Represents an error that occurs when the user making a request does not have the
    /// correct authorization to be making said request.
    /// </summary>
    public class ForbiddenException : Exception
    {
        public ForbiddenException(string message) : base(message) { }
    }
}