using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Concrete;
using DataAccessLayer.EntityFramework;
using DataAccessLayer.TokenManager;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;



namespace FuturecomApi.Controllers
{


    
    [Route("/[controller]")]
    [AllowAnonymous]
    public class UserController : Controller
    {
        public readonly UserManager<User> _userManager;

        UserManagement userManagement = new UserManagement(new EfUserRepository());
        LogManager logManager = new LogManager(new EfLogRepository());

        


        public UserController(UserManager<User> userManager)
        {
            _userManager = userManager;

           
        }


    


        [HttpGet("listuser")]
        public async Task<IActionResult> ListUser()        {
           
            try
            {
                var users = userManagement.GetAllUser();
                return Ok(users);
            }
            catch
            {
                return BadRequest();
            }


        }



        [HttpPost("adduser")]
        public async Task<IActionResult> AddUser([FromBody] UserRegisterDto user)
        {

            try
            {
                var Iduser = userManagement.UserAdd(user);
                var result = await _userManager.CreateAsync(Iduser, user.Password);

                if (result.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(Iduser, user.Role);
                    return Ok("Kullanıcı eklendi");
                }
                else
                {
                    return BadRequest(new {message="Bilgileri gözden geçirin"});
                }

            }

            catch (Exception)
            {
                return BadRequest();
            }

        }




        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] UserPasswordDto request)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(request.id);
                if (user == null)
                {
                    return BadRequest("Invalid user");
                }


                if (!await _userManager.CheckPasswordAsync(user, request.currentPassword))
                {
                    return BadRequest("Incorrect current password");
                }


                var result = await _userManager.ChangePasswordAsync(user, request.currentPassword, request.newPassword);
                if (result.Succeeded)
                {



                    logManager.ChangePasswordLogAdd(request.Token, request.id);
                    return Ok("Password changed successfully");


                }

                return BadRequest("Failed to change password");
            }
            catch (Exception)
            {

                return StatusCode(500, "An error occurred while changing password");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        
        [HttpPost("update")]
        public async Task<IActionResult> UpdateUser([FromBody]UserUpdateDto user)
        {
            try
            {
                userManagement.UserUpdate(user);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteUser([FromBody] UserDeleteDto user)
        {
            try
            {
                userManagement.UserDelete(user);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }














    }


}







