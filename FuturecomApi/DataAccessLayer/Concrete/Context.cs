using System;
using EntityLayer.Concrete;
using EntityLayer.Concrete.Logs;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Concrete
{
	public class Context:IdentityDbContext<User>
	{

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = localhost; Database = Futurecom; Uid = SA; Password =reallyStrongPwd123;TrustServerCertificate=true;");
        }
        

        

        public DbSet<Error> Errors { get; set; }

        public DbSet<UserLog> UserLogs { get; set; }
    }
}

