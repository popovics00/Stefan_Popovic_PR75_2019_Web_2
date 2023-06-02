using Microsoft.EntityFrameworkCore;
using ECommerce.Models.Models;
using ECommerce.DAL.Data;

namespace ECommerce.DAL.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductDbContext ProductDbContext
        {
            get { return _dbContext as ProductDbContext; }
        }

        public ProductRepository(ProductDbContext context) : base(context)
        {
        }
    }
}
