using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace EntityLayer.Concrete.Logs
{
	public class UserLog
	{

        public int UserLogID { get; set; }

        [ForeignKey(name: "User")]
        public string UserID { get; set; }

        public User? User { get; set; }

        public string Type { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}

