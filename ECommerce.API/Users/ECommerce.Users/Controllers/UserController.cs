using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Services.Implementations;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.DAL.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using ECommerce.DAL.Models;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;

namespace ECommerce.API.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;

        public UserController(IUserService userService, IEmailService emailService)
        {
            this._userService = userService;
            this._emailService = emailService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public ActionResult Register([FromForm] RegisterUserDataIn dataIn)
        {
            return Ok(_userService.Save(dataIn));
        }
        
        [HttpGet("{userId}")]
        public ActionResult GetUser(int userId)
        {
            return Ok(_userService.Get(userId));
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] LoginDataIn loginData)
        {
            DateTime passwordLimit = DateTime.Today.AddDays(-90);
            ResponsePackage<string> retval;
            var user = this._userService.GetUserByEmailAndPass(loginData.Email, loginData.Password);
            if (user != null)
            {
                if (user.Status != UserStatus.Approved)
                {
                    var tempstring = "";
                    if (user.Role == Role.Customer)
                        tempstring = "(please check your email for activation)";
                    else if (user.Role == Role.Saler && user.Status == UserStatus.Pending)
                        tempstring = "(please waiting for approve by support)";
                    else if (user.Role == Role.Saler && user.Status == UserStatus.Rejected)
                        tempstring = "(please conntact support for more details)";

                    return Ok(new ResponsePackage<string>(ResponseStatus.Error, "Account is corrent, but his/her status is " + user.Status.ToString().ToLower() + " " + tempstring));
                }

                string token = JwtManager.GetToken(user, 60);
                retval = new ResponsePackage<string>(token);
                return Ok(new ResponsePackage<string>()
                {
                    Status = ResponseStatus.Ok,
                    Message = "Success loging!",
                    TransferObject = token
                });
            }
            else
                return Ok(new ResponsePackage<string>(ResponseStatus.Error, "Wrong email or password!"));
        }

        [HttpGet("activate/{email}/{key}")]
        [AllowAnonymous]
        public ActionResult Activate(string email, string key)
        {
            ResponsePackage<string> retval;
            var user = this._userService.ActivateUser(email, key);

            retval = new ResponsePackage<string>("Success");

            return Ok(retval);
        }

        [HttpGet("approveOrRejectUser/{userId}/{rejectOrApprove}")]
        [AllowAnonymous]
        public ActionResult ApproveOrRejectUser(int userId, bool rejectOrApprove)
        {
            return Ok(_userService.ApproveOrRejectUser(userId,rejectOrApprove));
        }

        [HttpGet("delete/{userId}")]
        [AllowAnonymous]
        public ActionResult Delete(int userId)
        {
            return Ok(_userService.Delete(userId));
        }
        [HttpPost("getAll")]
        public ActionResult GetAll(PaginationDataIn dataIn)
        {
            return Ok(_userService.GetAll(dataIn));
        }

    }
}
