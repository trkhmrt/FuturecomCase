using System;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;
using EntityLayer.Concrete.Logs;

namespace DataAccessLayer.Abstract.IGenericAuth
{
	public interface IAuthDal:IGenericAuthDal<LoginDto>
	{


	}
}

