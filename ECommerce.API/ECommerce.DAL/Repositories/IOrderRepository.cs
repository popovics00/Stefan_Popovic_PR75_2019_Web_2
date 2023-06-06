using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ECommerce.DAL.Models;

namespace ECommerce.DAL.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
    }
}
