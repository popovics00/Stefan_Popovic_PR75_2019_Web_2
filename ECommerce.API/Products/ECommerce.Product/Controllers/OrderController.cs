using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO;
using ECommerce.DAL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ECommerce.DAL.Services.Implementations;
using ECommerce.DAL.DTO.Order.DataIn;

namespace ECommerce.Product.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("save")]
        public ActionResult Save(OrderDataIn dataIn)
        {
            return Ok(_orderService.Save(dataIn));
        }
    }
}
