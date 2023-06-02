using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ECommerce.Models.Models;

namespace ECommerce.DAL.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
    }
}
