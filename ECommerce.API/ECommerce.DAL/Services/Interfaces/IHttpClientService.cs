using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.DAL.Services.Interfaces
{
    public interface IHttpClientService
    {
        JObject GetDataFromCaimsApi(string endpoint, string parameters);

        JObject PostDataToApi(string endpoint, string urlParameters, dynamic bodyParameters, int? timeout = null, bool isGateway = false, string token = "");
        JObject PostDataToInterswitchApi(string endpoint, dynamic bodyParameters);
        JObject ClientLogin(string endpoint, dynamic loginCredentials, string serverUrl);
    }
}
