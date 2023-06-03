using ECommerce.DAL.Models;
using ECommerce.DAL.Data;
using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Product.DataOut;

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

        public ResponsePackage<ProductDataOut> GetProductByName(string Name)
        {
            var tempUser = _dbContext.Set<Product>().FirstOrDefault(x => !x.IsDeleted && x.Name == Name);
            return new ResponsePackage<ProductDataOut>()
            {

                TransferObject = (tempUser != null ? new ProductDataOut(tempUser) : null)
            };
        }

        public ResponsePackage<List<Product>> GetAllProductsWithPaggination(PaginationDataIn dataIn)
        {
            var q = _dbContext.Set<Product>().Where(x => x.IsDeleted==false);
            var count = q.Count();
            if (dataIn.SearchName != null && dataIn.SearchName != "")
                q = q.Where(x => x.Name.Contains(dataIn.SearchName));

            return new ResponsePackage<List<Product>>
            {
                TransferObject = q.OrderByDescending(x => x.Id)
                    .Skip((dataIn.Page - 1) * dataIn.PageSize)
                    .Take(dataIn.PageSize).ToList(),
                Message = count.ToString()
            };
        }
    }
}
