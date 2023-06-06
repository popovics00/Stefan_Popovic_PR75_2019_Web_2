using Microsoft.EntityFrameworkCore;
using ECommerce.DAL.Models;
using ECommerce.DAL.Data;
using ECommerce.DAL.DTO;

namespace ECommerce.DAL.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public ProductDbContext ProductDbContext
        {
            get { return _dbContext as ProductDbContext; }
        }

        public OrderRepository(ProductDbContext context) : base(context)
        {
        }
    }
}
