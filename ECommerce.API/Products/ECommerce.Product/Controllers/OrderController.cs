using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO;
using ECommerce.DAL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ECommerce.DAL.Services.Implementations;
using ECommerce.DAL.DTO.Order.DataIn;

namespace ECommerce.Product.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public int? GetUserId()
        {
            var idClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "id")?.Value;
            return Int32.TryParse(idClaim, out int ret) ? ret : (int?)null;
        }


        [HttpPost("save")]
        public ActionResult Save(OrderDataIn dataIn)
        {
            return Ok(_orderService.Save(dataIn));
        }


        [HttpPost("getAll")]
        public ActionResult GetAll([FromBody] PaginationDataIn dataIn)
        {
            return Ok(_orderService.GetAll(dataIn));
        }
    }
}
