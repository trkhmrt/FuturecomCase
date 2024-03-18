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

        LogManager logManager = new LogManager(new EfLogRepository());
        UserManagement userManagement = new UserManagement(new EfUserRepository());

       
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
                return NotFound("Kullanıcı bulunamadı veya parola yanlış.");
            }


            var role = await _userManager.GetRolesAsync(user);


            var result = await _signInManager.PasswordSignInAsync(loginDto.UserName, loginDto.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                // Oturum açma başarılı ise başarılı yanıt dön
                return BadRequest("Oturum açma başarısız");
            }


            AccessTokenGenerator tokenGenerator = new AccessTokenGenerator();
            RefreshTokenManager refreshTokenManager = new RefreshTokenManager();


            var token = tokenGenerator.CreateToken(user, role[0]);
            var refreshtoken = refreshTokenManager.CreateRefreshToken();


           
                    

             return Ok(new { AccessToken = token , RefreshToken=refreshtoken});
                
            }



        [HttpPost("logout")]
        [AllowAnonymous]
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



