using System;
using EntityLayer.Concrete;
using EntityLayer.Concrete.Logs;
using Microsoft.AspNetCore.Identity;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Rol tablosuna seed data ekle
            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "1", Name = "admin", NormalizedName = "ADMIN" },
                new IdentityRole { Id = "2", Name = "normaluser", NormalizedName = "NORMALUSER" }
            );

            // Kullanıcı tablosuna seed data ekle
            var hasher = new PasswordHasher<User>();
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = "1",
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                Email = "admin@example.com",
                NormalizedEmail = "ADMIN@EXAMPLE.COM",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "1234567"),
                FirstName = "Admin",
                LastName = "User",
                Status = true
            });

            // Kullanıcının rolünü ata
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string> { RoleId = "1", UserId = "1" } // admin rolü
                // Diğer roller için buraya ekleyebilirsiniz
            );
        }


        public DbSet<Error> Errors { get; set; }

        public DbSet<UserLog> UserLogs { get; set; }
    }





    }

   
    


        
    


