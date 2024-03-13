using System;
using DataAccessLayer.Abstract.IGenericAuth;
using DataAccessLayer.Repositories;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Identity
{
    public class IdLoginRepository : GenericAuthRepository<LoginDto>, IAuthDal
    {

     


    }
}

