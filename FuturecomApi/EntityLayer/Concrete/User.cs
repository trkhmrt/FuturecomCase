using System;
using Microsoft.AspNetCore.Identity;

namespace EntityLayer.Concrete
{
	public class User:IdentityUser
	{
		public string FirstName { get; set; }

		public string LastName { get; set; }

		public bool Status { get; set; }

		

	}
}

