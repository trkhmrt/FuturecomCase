using System;
using BusinessLayer.Abstract.IGenericUserServices;
using DataAccessLayer.Abstract.IGenericUser;
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

        public ICollection<User> GetAllUser(UserManager<User> userManager)
        {
            return _userDal.GetAllUser(userManager);
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

        public void UserDelete(UserDeleteDto user)
        {
            _userDal.UserDelete(user);
        }

        public void UserUpdate(UserUpdateDto user)
        {
            
                _userDal.UserUpdate(user);
            
            
        }

       
    }
}

