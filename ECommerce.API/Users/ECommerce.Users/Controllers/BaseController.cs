using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        [ApiExplorerSettings(IgnoreApi = true)]
        public int? GetUserId()
        {
            var idClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "id")?.Value;
            return Int32.TryParse(idClaim, out int ret) ? ret : (int?)null;
        }

        //protected ObjectResult HandleErrorObjectResult(ResponseStatus status, string message)
        //{
        //    switch (status)
        //    {
        //        case ResponseStatus.BadRequest: return BadRequest(message);
        //        case ResponseStatus.NotFound: return NotFound(message);
        //        case ResponseStatus.InternalServerError: return Problem(message);
        //        default: return BadRequest(message);
        //    }
        //}
    }
}
