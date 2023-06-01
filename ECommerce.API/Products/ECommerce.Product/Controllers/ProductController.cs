using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Product.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        [HttpPost("save")]
        public ActionResult Save(CreateProduct dataIn)
        {
            return Ok(_productService.Save(dataIn));
        }
    }
}
