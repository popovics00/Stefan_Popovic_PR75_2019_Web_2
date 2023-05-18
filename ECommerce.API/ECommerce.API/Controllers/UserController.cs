using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserService userService;

        [AllowAnonymous]
        [HttpPost("save")]
        public ActionResult Save(UserRegisterDataIn dataIn)
        {
            return Ok(this.userService.Save(dataIn););
        }
    }
}
