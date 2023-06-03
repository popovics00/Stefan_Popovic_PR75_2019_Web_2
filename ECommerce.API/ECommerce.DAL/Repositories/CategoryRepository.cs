using Microsoft.EntityFrameworkCore;
using ECommerce.DAL.Models;
using ECommerce.DAL.Data;

namespace ECommerce.DAL.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public ProductDbContext ProductDbContext
        {
            get { return _dbContext as ProductDbContext; }
        }

        public CategoryRepository(ProductDbContext context) : base(context)
        {
        }
    }
}
