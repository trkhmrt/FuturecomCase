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
        private readonly UserManager<User> _userManager;


        AccessTokenGenerator tokenGenerator = new AccessTokenGenerator();
        RefreshTokenManager refreshTokenManager = new RefreshTokenManager();
        LogManager logManager = new LogManager(new EfLogRepository());


        public AuthController(SignInManager<User> signInManager,UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
          

            var user = await _userManager.FindByNameAsync(loginDto.UserName);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized("Oturum açma başarısız");
            }

            var userid = await _userManager.GetUserIdAsync(user);

          


            var role = await _userManager.GetRolesAsync(user);


            var result = await _signInManager.PasswordSignInAsync(loginDto.UserName, loginDto.Password, isPersistent: false, lockoutOnFailure: false);




            if (!result.Succeeded)
            {

                return Unauthorized("Oturum açma başarısız");

            }



            var token = tokenGenerator.CreateToken(user, role[0]);
            var refreshtoken = refreshTokenManager.CreateRefreshToken();




            logManager.LogAdd(userid,"L");
             return Ok(new { AccessToken = token , RefreshToken=refreshtoken});
                
            }



        [HttpPost("logout")]
        [AllowAnonymous]
        public async Task<IActionResult> Logout([FromBody] UserLogoutDto logoutDto)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(logoutDto.id);

                var userid = await _userManager.GetUserIdAsync(user);

                logManager.LogAdd(userid, "LO");
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }

 }



