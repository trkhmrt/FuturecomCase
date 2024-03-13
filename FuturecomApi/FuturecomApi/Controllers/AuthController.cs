using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Concrete;
using DataAccessLayer.Abstract;
using DataAccessLayer.Concrete;
using DataAccessLayer.EntityFramework;
using DataAccessLayer.Identity;
using DataAccessLayer.TokenManager;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using EntityLayer.Concrete.Logs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FuturecomApi.Controllers
{

    [Route("/[controller]")]
    [AllowAnonymous]
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;


        AuthManager authManager = new AuthManager(new IdLoginRepository());
        TokenGenerator tokenGenerator = new TokenGenerator();
        LogManager logManager = new LogManager(new EfLogRepository());
        
        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;

           
        }


       

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            

            var user = await authManager.FindUser(loginDto, _userManager,_signInManager);
           
            if (user!= null)
            {
                var result = await _signInManager.PasswordSignInAsync(user,loginDto.Password,false,lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    // Oturum açma başarılı, isteği yönlendir

                    var token = tokenGenerator.CreateToken(user, _userManager);

                    logManager.LoginLogAdd(token, user.Id);
                    return Ok(new { Token = token });
                }






                return BadRequest();

            }
            else
            {
                return BadRequest(); 
            }


          
        }

        [HttpPost("logout")]
        
        public async Task<IActionResult> Logout([FromBody] UserLogoutDto logoutDto)
        {


            try
            {
                
                logManager.LogOutAdd( logoutDto.token, logoutDto.id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        



        }






    }
}

