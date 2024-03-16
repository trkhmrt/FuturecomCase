using System;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Abstract.IGenericUserServices
{
	public interface IGenericUserService<T>
	{
        User UserAdd(UserRegisterDto user);

        ICollection<T> GetAllUser();

        void UserUpdate(UserUpdateDto user);

        void UserDelete(UserDeleteDto user);

        User FindUserByUsername(string username);

        string GetRoleByUsername(string username);

    }
}

