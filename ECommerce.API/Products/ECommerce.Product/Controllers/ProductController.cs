using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Product.Controllers
{
    public class ProductController : BaseController
    {
        [AllowAnonymous]
        [HttpGet("save")]
        public ActionResult Save()
        {
            return Ok();
        }
    }
}
