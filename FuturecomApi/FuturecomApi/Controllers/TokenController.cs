using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using BusinessLayer.Concrete;
using DataAccessLayer.Concrete;
using DataAccessLayer.EntityFramework;
using DataAccessLayer.TokenManager;
using DtoLayer.TokenDtos;
using EntityLayer.Concrete;
using FuturecomApi.Modeller;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FuturecomApi.Controllers
{
    [Route("/[controller]")]
    [AllowAnonymous]
    public class TokenController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        LogManager logManager = new LogManager(new EfLogRepository());

        public TokenController(UserManager<User> userManager,IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("checktoken")]
        public async Task<IActionResult> CheckToken([FromBody] TokenDto tokenDto)
         {
            var httpContext = _httpContextAccessor.HttpContext;

            var id = httpContext.Request.Headers["id"].FirstOrDefault()?.Split(" ").Last();
   
            var token = httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();


            AccessTokenGenerator accessTokenGenerator = new AccessTokenGenerator();

            var tokenValidator = new TokenValidator();

        
          
                var isValidAccess = tokenValidator.ValidateToken(token);

                if(!isValidAccess)
                {
                    var myUser = await _userManager.FindByIdAsync(id);

                    var role = await _userManager.GetRolesAsync(myUser);

                    var newAccesstoken = accessTokenGenerator.CreateToken(myUser, role[0]);

                logManager.LogAdd(id, "RT");
              
                return Ok(newAccesstoken);

                }
              
            

              return Ok();
        } 


        
    }
}

