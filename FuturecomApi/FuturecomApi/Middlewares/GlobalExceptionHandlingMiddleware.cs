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

                   
                    _context.Errors.Add(new Error
                    {
                        Type = "Exception",
                        StatusCode = context.Response.StatusCode.ToString(),
                        Message = e.Message, 
                        CreatedDate = DateTime.UtcNow
                    });
                    await _context.SaveChangesAsync();

                    
                }




            

           
           


            
        }
    }
}


