using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ECommerce.Models.Models;

namespace ECommerce.DAL.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User GetUserByEmailAndPassword(string email, string password);
    }
}
