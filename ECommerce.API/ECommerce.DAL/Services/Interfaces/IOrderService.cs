using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Category.DataOut;
using ECommerce.DAL.DTO.Order.DataIn;
using ECommerce.DAL.DTO.Order.DataOut;
using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO.Product.DataOut;

namespace ECommerce.DAL.Services.Interfaces
{
    public interface IOrderService
    {
        Task<ResponsePackage<string>> Save(OrderDataIn dataIn);
        ResponsePackage<PaginationDataOut<OrderDataOut>> GetAll(PaginationDataIn dataIn);

    }
}
