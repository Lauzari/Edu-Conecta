using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IQuoteService
    {
        Task<string> GetDailyQuoteAsync();
    }
}