using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.NetworkInformation;
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
        public readonly RoleManager<Role> _roleManager;
        UserManagement userManagement = new UserManagement(new EfUserRepository());
        LogManager logManager = new LogManager(new EfLogRepository());

        


        public UserController(UserManager<User> userManager,RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
           
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

           
                var Iduser = userManagement.UserAdd(user);
                var result = await _userManager.CreateAsync(Iduser, user.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(Iduser, user.Role);

                   var userid = await _userManager.GetUserIdAsync(Iduser);

                    logManager.LogAdd(userid,"AU");

                    return Ok("User Add");
                }
                else
                {
                    return BadRequest(new {message="Bilgileri gözden geçirin"});
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


                    logManager.LogAdd(request.Id, "CP");

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
        [Route("adminupdate/{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] UserUpdateDto userUpdateDto)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }



            user.FirstName = userUpdateDto.firstname;
            user.LastName = userUpdateDto.surname; 
            user.Email = userUpdateDto.mail;
            user.PhoneNumber = userUpdateDto.phone;

            var role = await _roleManager.FindByNameAsync(userUpdateDto.role);


            if (role != null && user != null)
            {
                var roles = await _userManager.GetRolesAsync(user);
                await _userManager.RemoveFromRolesAsync(user, roles.ToArray());
                await _userManager.AddToRoleAsync(user, role.Name);
            }


            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                logManager.LogAdd(userId, "IU");
                
                return Ok();
            }
            else
            {
                return StatusCode(500, "Error updating user");
            }

       
            }

        [HttpPut]
        [Route("normaluser/{userId}")]
        public async Task<IActionResult> NormalUserUpdate(string userId, [FromBody] UserUpdateNormalDto userN)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }



         
            user.Email = userN.mail;
            user.PhoneNumber = userN.phone;



            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                logManager.LogAdd(userId, "IU");
                return Ok();
            }
            else
            {
                return StatusCode(500, "Error updating user");
            }


        }



        [HttpPut("status/{id}")]
        public async Task<IActionResult> StatusUpdate(string id)
        {

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

           
            user.Status = !user.Status;

            var result = await _userManager.UpdateAsync(user);

            return Ok(); 

           
           
        }

      


        [HttpDelete("delete/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                userManagement.UserDelete(userId);

                logManager.LogAdd(userId, "UD");
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }














    }


}







