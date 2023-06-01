using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.Models.Models;

namespace ECommerce.DAL.Services.Interfaces
{
    public interface IProductService
    {
        ResponsePackage<string> Save(CreateProduct dataIn);
        ResponsePackage<List<Product>> GetAll();

    }
}
