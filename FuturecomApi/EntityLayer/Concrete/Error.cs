using System;
namespace EntityLayer.Concrete
{
	public class Error
	{
		public int ErrorID { get; set; }

		public string Type { get; set; }

		public string StatusCode { get; set; }

		public string Message { get; set; }

		public DateTime CreatedDate { get; set; }

	}
}

