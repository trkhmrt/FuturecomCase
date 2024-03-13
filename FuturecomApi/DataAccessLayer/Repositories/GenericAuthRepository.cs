using System;
using DataAccessLayer.Abstract;
using DataAccessLayer.Concrete;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Repositories
{
    public class GenericAuthRepository<T> : IGenericAuthDal<T> where T : class
    {
        

        public async Task<User> FindUser(LoginDto loginDto, UserManager<User> _userManager,SignInManager<User> _signInManager)
        {
            

            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            var isCorrect = await _userManager.CheckPasswordAsync(user, loginDto.Password);
           

            if (isCorrect)
            {
               
                return user;
            }
            else
            {
               
                return null;
            }


        }
    }
}

