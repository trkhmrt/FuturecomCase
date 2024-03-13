using System;
namespace DtoLayer.UserDtos
{
	public class UserUpdateDto
	{
		public string id { get; set; }

		public string phone { get; set; }

		public string mail { get; set; }

        public string Role { get; set; }

        public bool Status { get; set; }
    }
}

