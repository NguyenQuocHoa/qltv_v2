using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using QLTV_V2.Models;

namespace QLTV_V2.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<BookCategory> BookCategory { get; set; }
        public DbSet<BorrowBook> BorrowBook { get; set; }
        public DbSet<ReturnBook> ReturnBook { get; set; }
        public DbSet<ReturnBookDetail> ReturnBookDetail { get; set; }
        public DbSet<BorrowBookDetail> BorrowBookDetail { get; set; }
        public DbSet<Post> Post { get; set; }
    }
}
