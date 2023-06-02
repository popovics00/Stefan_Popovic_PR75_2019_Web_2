using ECommerce.DAL.Data;
using ECommerce.DAL.Repositories;

namespace ECommerce.DAL.UOWs
{
    public class UnitOfWorkUser : IUnitOfWorkUser
    {
        private UserDbContext _userDb;

        public UnitOfWorkUser(UserDbContext userDb)
        {
            _userDb = userDb;
        }
        public IUserRepository UserRepository { get; private set; }

        public void Save()
        {
            _userDb.SaveChanges();
        }
    }
}
