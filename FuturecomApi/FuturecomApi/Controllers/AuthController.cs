using System;
using System.Threading.Tasks;
using BusinessLayer.Concrete;
using DataAccessLayer.Concrete;
using DataAccessLayer.EntityFramework;
using DataAccessLayer.TokenManager;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using EntityLayer.Concrete.Logs;
using FuturecomApi.Modeller;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FuturecomApi.Controllers
{
    [Route("/[controller]")]
    [AllowAnonymous]
    public class AuthController : Controller
    {
        private readonly SignInManager<User> _signInManager;
        

        LogManager logManager = new LogManager(new EfLogRepository());
        UserManagement userManagement = new UserManagement(new EfUserRepository());

       
        public AuthController(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
      
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var user = userManagement.FindUserByUsername(loginDto.UserName);

            if (user != null)
            {
                var signin = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
                if (signin.Succeeded)
                {

                    AccessTokenGenerator tokenGenerator = new AccessTokenGenerator();
                      var token =tokenGenerator.CreateToken(user, "admin");


                    return Ok(new { Token = token });
                }
            }

            return NotFound();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] UserLogoutDto logoutDto)
        {
            try
            {
                logManager.LogOutAdd(logoutDto.token, logoutDto.id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
