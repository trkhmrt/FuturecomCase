using System;
using DtoLayer.LoginDto;
using DtoLayer.UserDtos;

namespace BusinessLayer.Abstract.IGenericAuthServices
{
	public interface IAuthService:IGenericAuthService<LoginDto>
	{


	}
}

