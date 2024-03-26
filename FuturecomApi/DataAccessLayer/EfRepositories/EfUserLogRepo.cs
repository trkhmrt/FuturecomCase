using System;
using DataAccessLayer.Abstract;
using DataAccessLayer.Repositories;
using EntityLayer.Concrete;

namespace DataAccessLayer.EfRepositories
{
	public class EfUserLogRepo:GenericRepository<UserLog>,IUserLogDal
	{



	}
}

