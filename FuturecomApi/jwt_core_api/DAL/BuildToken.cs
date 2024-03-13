using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace jwt_core_api.DAL
{
	public class BuildToken
	{
		public string CreateToken()
		{

			var bytes = Encoding.UTF8.GetBytes("aspnetfuturecom_project_strong_jwt_key");
			SymmetricSecurityKey key = new SymmetricSecurityKey(bytes);

			SigningCredentials credentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

			JwtSecurityToken token = new JwtSecurityToken(issuer:"http://localhost",audience:"http://localhost",notBefore:DateTime.Now,expires:DateTime.Now.AddMinutes(1),signingCredentials:credentials);


			JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

			return handler.WriteToken(token);
				
			
		}
	}

}