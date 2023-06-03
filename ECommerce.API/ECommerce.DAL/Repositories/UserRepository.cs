using Microsoft.EntityFrameworkCore;
using ECommerce.DAL.Models;
using ECommerce.DAL.Data;

namespace ECommerce.DAL.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserDbContext UserDbContext
        {
            get { return _dbContext as UserDbContext; }
        }

        public UserRepository(UserDbContext context) : base(context)
        {
        }

        public User GetUserByEmailAndPassword(string email, string password)
        {
             return _dbContext.Set<User>().FirstOrDefault(x => !x.IsDeleted && x.Email == email && x.Password == password);
        }
    }
}
