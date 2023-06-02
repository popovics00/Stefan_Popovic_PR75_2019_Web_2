using Microsoft.EntityFrameworkCore;
using ECommerce.Models.Models;
using ECommerce.DAL.Data;

namespace ECommerce.DAL.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserDbContext _userDbContext
        {
            get { return _dbContext as UserDbContext; }
        }

        public UserRepository(UserDbContext context) : base(context)
        {
        }

        public User GetUserByEmailAndPassword(string email, string password)
        {
             return _userDbContext.Users.FirstOrDefault(x => !x.IsDeleted && x.Email == email && x.Password == password);
        }
    }
}
