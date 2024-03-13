using System;
using DataAccessLayer.Abstract.IGenericUser;
using DataAccessLayer.Concrete;
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
        

        public ICollection<User> GetAllUser(UserManager<User> userManager)
        {
            return userManager.Users.ToList(); 
        }

        public void UserDelete(UserDeleteDto user)
        {
            var result = _context.Users.FirstOrDefault(u => u.Id == user.id);
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

