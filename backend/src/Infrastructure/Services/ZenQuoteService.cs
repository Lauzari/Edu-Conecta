using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class ZenQuoteService : IQuoteService
    {
        private readonly HttpClient _httpClient;

        public ZenQuoteService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetDailyQuoteAsync()
        {
            var response = await _httpClient.GetAsync("https://zenquotes.io/api/random");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            // The API returns a JSON array with objects { q, a }
            var quotes = JsonSerializer.Deserialize<ZenQuoteApiResponse[]>(content);

            if (quotes != null && quotes.Length > 0)
            {
                return $"La frase del día: {quotes[0].q} - {quotes[0].a}";
            }

            return "No se pudo obtener la frase del día.";
        }

        private class ZenQuoteApiResponse
        {
            public string q { get; set; }
            public string a { get; set; }
        }
    }
}
