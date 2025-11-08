using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly IQuoteService _quoteService;

        public QuotesController(IQuoteService quoteService)
        {
            _quoteService = quoteService;
        }

        [HttpGet("daily")]
        public async Task<IActionResult> GetDailyQuote()
        {
            var quote = await _quoteService.GetDailyQuoteAsync();
            return Ok(quote);
        }
    }
}
