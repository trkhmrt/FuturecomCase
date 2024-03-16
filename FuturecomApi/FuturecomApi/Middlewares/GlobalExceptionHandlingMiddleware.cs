using System;
using System.Net;
using System.Text.Json;
using DataAccessLayer.Concrete;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FuturecomApi.Middlewares
{
	public class GlobalExceptionHandlingMiddleware:IMiddleware
	{



        private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;
        private readonly Context _context;

		public GlobalExceptionHandlingMiddleware(ILogger<GlobalExceptionHandlingMiddleware> logger,Context context)
        {
            _logger = logger;
            _context=context;

        }
        
     
        
		

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
               

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                ProblemDetails problem = new()
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Type = "Server",
                    Title = "Server error",
                    Detail = "An internal server occured"
                };
                string json = JsonSerializer.Serialize(problem);
                await context.Response.WriteAsync(json);

                context.Response.ContentType = "application/json";

            }

            if(context.Response.StatusCode!=200)
            {
                _context.Errors.Add(new Error
                {
                    Type = context.Request.Method.ToString(),
                    StatusCode = context.Response.StatusCode.ToString(),
                    Message = context.Request.Path,
                    CreatedDate = DateTime.UtcNow
                });
                await _context.SaveChangesAsync();
            }
           


            
        }
    }
}

