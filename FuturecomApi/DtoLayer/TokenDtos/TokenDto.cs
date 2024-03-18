using System;
namespace DtoLayer.TokenDtos
{
	public class TokenDto
	{
		public string userId { get; set; }

		public string userRole { get; set; }

		public string accessToken { get; set; }

		public string refreshToken { get; set; }
	}
}

