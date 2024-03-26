using System;
using EntityLayer.Concrete;
using EntityLayer.Concrete;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Concrete
{
	public class Context:IdentityDbContext<User,Role,Guid>
	{

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server = localhost; Database = FuturecomApi; Uid = SA; Password =reallyStrongPwd123;TrustServerCertificate=true;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = Guid.NewGuid(), Name = "Admin", NormalizedName = "ADMIN" },
                new Role { Id = Guid.NewGuid(), Name = "NormalUser", NormalizedName = "NORMALUSER" }
            );

            // Hash the password securely before storing it
            var hasher = new PasswordHasher<User>();

            // Seed Admin User
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = Guid.NewGuid(),
                    UserName = "admin",
                    NormalizedUserName = "ADMIN",
                    Email = "admin@example.com",
                    NormalizedEmail = "ADMIN@EXAMPLE.COM",
                    EmailConfirmed = true,
                    PasswordHash = hasher.HashPassword(null, "12345678"),
                    PhoneNumber = "553 769 63 62",
                    FirstName = "Tarik",
                    LastName = "Hamarat",
                    Status = true,

                }

            ); ;

        }

        public DbSet<Error> Errors { get; set; }
        public DbSet<UserLog> UserLogs { get; set; }
    }





    }

   
    


        
    


