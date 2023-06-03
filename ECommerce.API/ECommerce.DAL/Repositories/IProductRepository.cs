using Microsoft.EntityFrameworkCore.ChangeTracking;
using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Product.DataOut;
using ECommerce.DAL.Models;
using ECommerce.DAL.Services.Implementations;

namespace ECommerce.DAL.Repositories
{
    public interface IProductRepository : IRepository<Product>
    {
        ResponsePackage<ProductDataOut> GetProductByName(string Name);
        ResponsePackage<List<Product>> GetAllProductsWithPaggination(PaginationDataIn dataIn);
    }
}
