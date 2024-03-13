using System;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Abstract.IGenericUser
{
	public interface IGenericUserDal<T> where T: class
	{
        

        ICollection<T> GetAllUser(UserManager<User> userManager);

        void UserUpdate(UserUpdateDto user);

        void UserDelete(UserDeleteDto user);
         
    }
}

