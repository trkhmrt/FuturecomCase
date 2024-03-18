using System;
using DataAccessLayer.Concrete;
using System.Net;
using EntityLayer.Concrete;
using DataAccessLayer.TokenManager;
using Microsoft.AspNetCore.Identity;
using DtoLayer.TokenDtos;
using System.Text.Json;
using DtoLayer.LoginDto;
using System.Reflection.PortableExecutable;

namespace FuturecomApi.Middlewares
{
	public class GlobalTokenHandler : IMiddleware
    {
        
            private readonly Context _context;
          private readonly  UserManager<User> _userManager;

            public GlobalTokenHandler(Context context, UserManager<User> userManager)
            {
                
                _context = context;
            _userManager = userManager;

            }





            public async Task InvokeAsync(HttpContext context, RequestDelegate next)
            {
                        var requestPath = context.Request.Path;

            if (requestPath.StartsWithSegments("/Auth/Login", StringComparison.OrdinalIgnoreCase)||
requestPath.StartsWithSegments("/Auth/Logout", StringComparison.OrdinalIgnoreCase) )
            {
                await next(context);
                return;
            }
            try
                    {
                
               var  myid = context.Request.Headers["id"].FirstOrDefault()?.Split(" ").Last();

               var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();







                var myUser = await _userManager.FindByIdAsync(myid);

                var role = await _userManager.GetRolesAsync(myUser);

                var tokenValidator = new TokenValidator();

                        var isValid= tokenValidator.ValidateToken(token);

                        if (isValid)
                        {
                      

                            await next(context);
                        }
                        else
                        {
                            var accessTokenGenerator = new AccessTokenGenerator();

                            var newAccesstoken = accessTokenGenerator.CreateToken(myUser, role[0]);

                            var responseContent = new { AccessToken = newAccesstoken };

                            var jsonResponse = JsonSerializer.Serialize(responseContent);

                            context.Response.ContentType = "application/json";
                            await context.Response.WriteAsync(jsonResponse);


                            context.Response.Redirect(context.Request.Path);
                        }


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
    



