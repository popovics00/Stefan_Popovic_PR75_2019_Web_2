using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService userService;

        [AllowAnonymous]
        [HttpGet("save")]
        public ActionResult Save()
        {
            return Ok();
        }
    }
}
