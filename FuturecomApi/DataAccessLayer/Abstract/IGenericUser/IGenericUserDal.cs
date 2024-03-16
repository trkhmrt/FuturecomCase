using System;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Abstract.IGenericUser
{
	public interface IGenericUserDal<T> where T: class
	{
        

        ICollection<T> GetAllUser();

        void UserUpdate(UserUpdateDto user);

        void UserDelete(UserDeleteDto user);

        User FindUserByUsername(string username);

        string GetRoleByUsername(string username);
         
    }
}

