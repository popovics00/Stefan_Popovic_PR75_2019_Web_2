using Microsoft.EntityFrameworkCore;
using ECommerce.Models.Models;
using ECommerce.DAL.Data;

namespace ECommerce.DAL.Repositories
{
    public class CategoryRepostiry : Repository<Category>, ICategoryRepostiry
    {
        public ProductDbContext ProductDbContext
        {
            get { return _dbContext as ProductDbContext; }
        }

        public CategoryRepostiry(ProductDbContext context) : base(context)
        {
        }
    }
}
