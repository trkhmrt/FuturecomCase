using System;
using DataAccessLayer.Abstract.IGenericUser;
using DataAccessLayer.Concrete;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace DataAccessLayer.Repositories
{
    public class GenericUserRepository<T> : IGenericUserDal<User> where T:class
    {
        protected Context _context = new Context();

        public User FindUserByUsername(string username)
        {

            var foundUser = _context.Users.FirstOrDefault(u => u.UserName == username);

            if (foundUser != null)
            {
               
                 
                return foundUser;
            }

            return null;
        }




        public ICollection<User> GetAllUser()
        {
            return _context.Users.ToList(); 
        }

        public string GetRoleByUsername(string username)
        {

            var foundUserId = _context.Users.FirstOrDefault(u => u.UserName == username)?.Id;

            if (foundUserId != null)
            {
                var roleId = _context.UserRoles
                                    .Where(r => r.UserId == foundUserId)
                                    .Select(r => r.RoleId)
                                    .FirstOrDefault();

                if (roleId != null)
                {
                    var rolename = _context.Roles
                                           .FirstOrDefault(r => r.Id == roleId)
                                           ?.Name;

                    if (rolename != null)
                    {
                        return rolename;
                    }
                }
            }

            return "I couldn't bring role";



        }

        public User GetUserById(string userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            return user;
        }

        public void UserDelete(string userId)
        {
            var result = _context.Users.FirstOrDefault(u => u.Id == userId);

            _context.Remove(result);

            _context.SaveChanges();
        }




        public void UserUpdate(UserUpdateDto user)
        {

         var  result = _context.Users.FirstOrDefault(u => u.Id == user.id);
            if (result != null)
            {
                if(user.Status!=result.Status)
                {
                    result.Status = user.Status;
                }

                result.Email = user.mail;
                result.PhoneNumber = user.phone;
                _context.Update(result);
                _context.SaveChanges();

            }

            }

       
    }
}

