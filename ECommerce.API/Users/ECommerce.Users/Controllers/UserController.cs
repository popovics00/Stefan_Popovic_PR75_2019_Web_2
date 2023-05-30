using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Services.Implementations;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.Models.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public ActionResult Register(RegisterUserDataIn dataIn)
        {
            return Ok(_userService.Save(dataIn));
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public ActionResult Login([FromBody] LoginDataIn loginData)
        {
            DateTime passwordLimit = DateTime.Today.AddDays(-90);
            ResponsePackage<string> retval;
            var user = this._userService.GetUserByEmailAndPass(loginData.Email, loginData.Password);
            
            string token = JwtManager.GetToken(user, 60);
            retval = new ResponsePackage<string>(token);

            return Ok(retval);
        }
    }
}
