using ECommerce.DAL.Data;
using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.DAL.Models;
using Microsoft.EntityFrameworkCore;
using SendGrid.Helpers.Mail;
using SendGrid;
using System.Net;

namespace ECommerce.DAL.Services.Implementations
{
    public class EmailService : IEmailService
    {
        public EmailService()
        {
        }

        public async Task<ResponsePackage<string>> SendEmail(string destination, string content)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("stefan@kupisajt.rs", "Example User");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress(destination, "Example User");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = content;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return new ResponsePackage<string>
            {
                Status = 200,
                Message = "",
                TransferObject = "",
            };
        }
    }
}
