using System;
using DataAccessLayer.Abstract.IGenericUser;
using DataAccessLayer.Repositories;
using EntityLayer.Concrete;

namespace DataAccessLayer.EntityFramework
{
	public class EfUserRepository:GenericUserRepository<User>,IUserDal
	{
		
	}
}

