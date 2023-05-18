
using ECommerce.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.DAL.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        { 

        }
        public virtual DbSet<User> Users { get; set; }
    }
}
