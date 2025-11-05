using System.Net;
using System.Text.Json;
using Core.Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Web.Middlewares;

public class GlobalExceptionHandlingMiddleware : IMiddleware
{
    private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;
    public GlobalExceptionHandlingMiddleware(
        ILogger<GlobalExceptionHandlingMiddleware> logger)
    {
        _logger = logger;
    }


    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (AppValidationException ex)
        {
            _logger.LogError(ex, ex.Message);

            int statusCode = (int)HttpStatusCode.BadRequest;

            ProblemDetails problem = new()
            {
                Status = statusCode,
                Type = "https://EduConectaAPI/errors/appvalidation",
                Title = "Validation error",
                Detail = ex.Message
            };

            string json = JsonSerializer.Serialize(problem);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            
            await context.Response.WriteAsync(json);
        }
        catch (NotFoundException ex)
        {
            _logger.LogError(ex, ex.Message);

            int statusCode = (int)HttpStatusCode.NotFound;

            ProblemDetails problem = new()
            {
                Status = statusCode,
                Type = "https://EduConectaAPI/errors/notfoundexception",
                Title = "NotFoundException",
                Detail = ex.Message
            };

            string json = JsonSerializer.Serialize(problem);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;
            
            await context.Response.WriteAsync(json);
        }
        
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);

            int statusCode = (int)HttpStatusCode.InternalServerError;

            context.Response.StatusCode = statusCode;

            ProblemDetails problem = new()
            {
                Status = statusCode,
                Type = "Server error",
                Title = "Server error",
                Detail = "An internal server"
            };

            string json = JsonSerializer.Serialize(problem);

            context.Response.ContentType = "application/json";

            await context.Response.WriteAsync(json);
        }
    }
}
