using System;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Abstract.IGenericUserServices
{
	public interface IGenericUserService<T>
	{
        User UserAdd(UserRegisterDto user);

        ICollection<T> GetAllUser(UserManager<User> userManager);

        void UserUpdate(UserUpdateDto user);

        void UserDelete(UserDeleteDto user);

    }
}

