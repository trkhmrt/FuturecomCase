using System;
using BusinessLayer.Abstract.IGenericUserServices;
using DataAccessLayer.Abstract.IGenericUser;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace BusinessLayer.Concrete
{
	public class UserManagement:IUserService
	{
        IUserDal _userDal;

        public UserManagement(IUserDal userDal)
        {
            _userDal = userDal;
        }


        public User FindUserByUsername(string username)
        {
            return _userDal.FindUserByUsername(username);
        }

        public ICollection<User> GetAllUser()
        {
            return _userDal.GetAllUser();
        }

        public string GetRoleByUsername(string username)
        {
            
           return _userDal.GetRoleByUsername(username);
        }

        public User GetUserById(string userId)
        {
            return _userDal.GetUserById(userId);
        }

        public User UserAdd(UserRegisterDto user)
        {
            var IdentityUser = new User
            {
                UserName=user.UserName,
                FirstName=user.FirstName,
                LastName=user.LastName,
                PhoneNumber=user.PhoneNumber,
                Email=user.Email,
                Status=true
            };

            return IdentityUser;
             
        }

        public void UserDelete(string userId)
        {
            _userDal.UserDelete(userId);
        }

        public void UserUpdate(UserUpdateDto user)
        {
            
                _userDal.UserUpdate(user);
            
            
        }

       
    }
}

