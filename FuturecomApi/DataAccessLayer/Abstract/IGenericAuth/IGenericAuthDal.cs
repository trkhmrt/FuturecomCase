using System;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Abstract
{
	public interface IGenericAuthDal<T> where T:class
	{
        Task<User> FindUser(LoginDto loginDto, UserManager<User> _userManager,SignInManager<User> signInManager);





	}
}

