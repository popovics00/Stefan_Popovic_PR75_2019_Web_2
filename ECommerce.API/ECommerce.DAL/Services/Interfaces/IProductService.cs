using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Models;

namespace ECommerce.DAL.Services.Interfaces
{
    public interface IProductService
    {
        Task<ResponsePackage<string>> Save(CreateProduct dataIn);
        ResponsePackage<PaginationDataOut<Product>> GetAll(PaginationDataIn dataIn);

    }
}
