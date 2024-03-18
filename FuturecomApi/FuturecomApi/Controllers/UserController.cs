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
  
        public async Task<IActionResult> ListUser()
        {
            
           

        

         


            var users = userManagement.GetAllUser();
                
                return Ok(users);
          

        }

        [HttpGet]
        [Route("{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new {User=user});
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
        [Route("changepw")]
        public async Task<IActionResult> ChangePassword([FromBody] UserPasswordDto request)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(request.Id);
                if (user == null)
                {
                    return BadRequest("Invalid user");
                }


                if (!await _userManager.CheckPasswordAsync(user, request.CurrentPassword))
                {
                    return BadRequest("Incorrect current password");
                }


                var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
                if (result.Succeeded)
                {



                   
                    return Ok("Password changed successfully");


                }

                return BadRequest("Failed to change password");
            }
            catch (Exception)
            {

                return StatusCode(500, "An error occurred while changing password");
            }
        }




        [HttpPut]
        [Route("{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] UserUpdateDto userupdate)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

          
               
                user.Email = userupdate.mail;
                user.PhoneNumber = userupdate.phone;

              
                var result = await _userManager.UpdateAsync(user);

          
                if (result.Succeeded)
                {
                    await _userManager.UpdateSecurityStampAsync(user);
                    return Ok();
                }
                else
                {
                   
                    return StatusCode(500, "Error updating user");
                }
            }


        [HttpDelete("delete/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                userManagement.UserDelete(userId);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }














    }


}







