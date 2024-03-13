using System;
using BusinessLayer.Abstract.IGenericAuthServices;
using DataAccessLayer.Abstract.IGenericAuth;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Concrete
{
	public class AuthManager:IAuthService
	{

        IAuthDal _authDal;

        public AuthManager(IAuthDal authDal)
        {
            _authDal = authDal;
        }

        public  Task<User> FindUser(LoginDto loginDto, UserManager<User> _userManager,SignInManager<User> _signInManager)
        {

           return  _authDal.FindUser(loginDto, _userManager,_signInManager);
            
        }
    }
}

