using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO.Product.DataOut;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Models;

namespace ECommerce.DAL.Services.Interfaces
{
    public interface IProductService
    {
        Task<ResponsePackage<string>> Save(CreateProduct dataIn);
        ResponsePackage<PaginationDataOut<ProductDataOut>> GetAll(PaginationDataIn dataIn);
        Task<ResponsePackage<string>> Delete(int userId);

    }
}
