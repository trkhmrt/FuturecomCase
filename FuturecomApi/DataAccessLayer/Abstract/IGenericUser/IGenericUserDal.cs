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

        void UserDelete(string userId);

        User FindUserByUsername(string username);

        User GetUserById(string userId);

        string GetRoleByUsername(string username);
         
    }
}

