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

        public ResponsePackage<List<Order>> GetAllProductsWithPaggination(PaginationDataIn dataIn)
        {
            var q = _dbContext.Set<Order>().Include(x => x.OrderItems).Where(x => x.IsDeleted == false);
            if (dataIn.SearchName != null && dataIn.SearchName != "")
                q = q.Where(x => x.Name.Contains(dataIn.SearchName) || x.Address.Contains(dataIn.SearchName) || x.Comment.Contains(dataIn.SearchName));
            var count = q.Count();

            return new ResponsePackage<List<Order>>
            {
                TransferObject = q.OrderByDescending(x => x.Id)
                    .Skip((dataIn.Page - 1) * dataIn.PageSize)
                    .Take(dataIn.PageSize).ToList(),
                Message = count.ToString()
            };
        }
    }
}
