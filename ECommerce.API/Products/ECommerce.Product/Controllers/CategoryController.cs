using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO;
using ECommerce.DAL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Product.Controllers
{
    public class CategoryController : BaseController
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        //[HttpPost("save")]
        //public ActionResult Save(CreateProduct dataIn)
        //{
        //    return Ok(_productService.Save(dataIn));
        //}
        
        [HttpGet("GetAllForOption")]
        public ActionResult GetAllForOption()
        {
            return Ok(_categoryService.GetAllForOption());
        }
    }
}
