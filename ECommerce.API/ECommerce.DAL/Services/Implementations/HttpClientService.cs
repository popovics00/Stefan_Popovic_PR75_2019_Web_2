//using ECommerce.DAL.Services.Interfaces;
//using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.Options;
//using Newtonsoft.Json.Linq;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Text;
//using System.Threading.Tasks;

//namespace ECommerce.DAL.Services.Implementations
//{
//    public class HttpClientService : IHttpClientService
//    {


//        public HttpClientService()
//        {

//        }
//        public JObject ClientLogin(string endpoint, dynamic loginCredentials, string serverUrl)
//        {
//            if (String.IsNullOrWhiteSpace(serverUrl))
//            {
//                //serverUrl = _caimsApiDetails.Value.Url;
//            }

//            int countAttempts = 0;
//            string url = $"{serverUrl}/{endpoint}";

//            JObject retVal = null;
//            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
//            request.Method = "POST";

//            using (var stream = request.GetRequestStream())
//            {
//                var serialized = JsonConvert.SerializeObject(loginCredentials);
//                byte[] byteArray = Encoding.UTF8.GetBytes(serialized);
//                request.ContentLength = byteArray.Length;
//                request.ContentType = "application/json";
//                stream.Write(byteArray, 0, byteArray.Length);
//            }

//            do
//            {
//                try
//                {
//                    using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
//                    using (Stream stream = response.GetResponseStream())
//                    using (StreamReader reader = new StreamReader(stream))
//                    {
//                        retVal = JObject.Parse(reader.ReadToEnd());
//                        break;
//                    }
//                }
//                catch (Exception e)
//                {
//                    countAttempts++;
//                    //_logger.LogError($"Error with server during send request to server(url: {serverUrl}): " + e.Message + " (Attempt: " + countAttempts + ")");
//                }
//            } while (countAttempts < 5);

//            return retVal;
//        }
//        public JObject GetDataFromCaimsApi(string endpoint, string parameters)
//        {
//            string url = $"{_caimsApiDetails.Value.Url}/{endpoint}?{parameters}";

//            JObject retVal = null;
//            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
//            request.Method = "GET";
//            try
//            {
//                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
//                using (Stream stream = response.GetResponseStream())
//                using (StreamReader reader = new StreamReader(stream))
//                {
//                    retVal = JObject.Parse(reader.ReadToEnd());
//                }
//            }
//            catch (Exception e)
//            {
//                throw;
//            }
//            return retVal;
//        }

//        public JObject PostDataToApi(string endpoint, string urlParameters, dynamic bodyParameters, int? timeout = null, bool isGateway = false, string token = "")
//        {
//            //string url = isGateway ? $"{_adminApiDetails.Value.Url}/{endpoint}" : $"{_caimsApiDetails.Value.Url}/{endpoint}";

//            JObject retVal = null;
//            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
//            if (!String.IsNullOrEmpty(token))
//                request.Headers.Add("Authorization", "Bearer " + token);
//            request.Method = "POST";

//            using (var stream = request.GetRequestStream())
//            {
//                var serialized = JsonConvert.SerializeObject(bodyParameters);
//                byte[] byteArray = Encoding.UTF8.GetBytes(serialized);
//                request.ContentLength = byteArray.Length;
//                request.Timeout = 5000;
//                request.ContentType = "application/json";
//                stream.Write(byteArray, 0, byteArray.Length);
//            }

//            try
//            {
//                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
//                using (Stream stream = response.GetResponseStream())
//                using (StreamReader reader = new StreamReader(stream))
//                {
//                    retVal = JObject.Parse(reader.ReadToEnd());
//                }
//            }
//            catch (Exception e)
//            {
//                _logger.LogError($"Error with server during send request to server(url: {url}): " + e.Message);

//            }
//            return retVal;
//        }

//        public JObject PostDataToInterswitchApi(string endpoint, dynamic bodyParameters)
//        {
//            JObject retVal = null;
//            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(endpoint);
//            request.Method = "POST";
//            request.Headers.Add("Authorization", _interswitchConfiguration.Value.Authorization);

//            using (var stream = request.GetRequestStream())
//            {
//                var serialized = JsonConvert.SerializeObject(bodyParameters);
//                byte[] byteArray = Encoding.UTF8.GetBytes(serialized);
//                request.ContentLength = byteArray.Length;
//                request.Timeout = 5000;
//                request.ContentType = "application/json";
//                request.Accept = "application/json";
//                stream.Write(byteArray, 0, byteArray.Length);
//            }

//            try
//            {
//                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
//                using (Stream stream = response.GetResponseStream())
//                using (StreamReader reader = new StreamReader(stream))
//                {
//                    retVal = JObject.Parse(reader.ReadToEnd());
//                }
//            }
//            catch (Exception e)
//            {
//                throw;
//            }
//            return retVal;
//        }
//    }
//}
