using System;
using DataAccessLayer.Abstract;
using DataAccessLayer.Repositories;
using EntityLayer.Concrete.Logs;

namespace DataAccessLayer.EntityFramework
{
	public class EfLogRepository:GenericLogRepository<UserLog>,ILogDal
	{
		
	}
}

