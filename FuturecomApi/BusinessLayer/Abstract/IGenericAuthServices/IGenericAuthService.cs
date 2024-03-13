using System;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Abstract.IGenericAuthServices
{
	public interface IGenericAuthService<T>
	{
        Task<User> FindUser(LoginDto loginDto, UserManager<User> _userManager, SignInManager<User>  _signInManager);

    }
}

