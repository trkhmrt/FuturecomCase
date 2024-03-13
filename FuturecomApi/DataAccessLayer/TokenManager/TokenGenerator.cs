using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using EntityLayer.Concrete;
using System.Security.Claims;
using DtoLayer.UserDtos;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.TokenManager
{
	public class TokenGenerator
	{
        public string CreateToken(User user,UserManager<User> userManager)
        {

            var role = userManager.GetRolesAsync(user).Result.FirstOrDefault();
         


            var claims = new[]
            {
        new Claim("id", user.Id.ToString()),
        new Claim("name", user.FirstName),
        new Claim("username",user.UserName),
        new Claim("email", user.Email),
        new Claim("role",role),
        new Claim("name",user.FirstName),
        new Claim("lastname",user.LastName)
        
       
            };

            var bytes = Encoding.UTF8.GetBytes("aspnetfuturecom_project_strong_jwt_key");
            SymmetricSecurityKey key = new SymmetricSecurityKey(bytes);

            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: "http://localhost:7069/",
                audience: "http://localhost",
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: credentials,
                claims: claims
               
                );


            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            return handler.WriteToken(token);


        }
    }
}

