using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO;
using ECommerce.DAL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ECommerce.DAL.Services.Implementations;

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
        [DisableRequestSizeLimit]
        public ActionResult Save([FromForm] CreateProduct dataIn)
        {
            return Ok(_productService.Save(dataIn));
        }
        
        [HttpPost("GetAll")]
        public ActionResult GetAll(PaginationDataIn dataIn)
        {
            return Ok(_productService.GetAll(dataIn));
        }
        [HttpGet("delete/{productId}")]
        [AllowAnonymous]
        public ActionResult Delete(int productId)
        {
            return Ok(_productService.Delete(productId));
        }
        [HttpGet("get/{productId}")]
        [AllowAnonymous]
        public async Task<ActionResult> Get(int productId)
        {
            return Ok(await _productService.GetById(productId));
        }
    }
}
