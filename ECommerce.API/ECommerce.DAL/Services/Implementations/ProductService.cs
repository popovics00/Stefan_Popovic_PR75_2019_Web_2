using ECommerce.DAL.Data;
using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.Models.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;
using System.Net;
using static System.Net.Mime.MediaTypeNames;

namespace ECommerce.DAL.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly ProductDbContext _dbContext;
        private readonly IEmailService _emailService;

        public ProductService(ProductDbContext dbContext, IEmailService userService)
        {
            _dbContext = dbContext;
            _emailService = userService;
        }

        public ResponsePackage<List<Product>> GetAll()
        {
            return new ResponsePackage<List<Product>>()
            {
                Status = ResponseStatus.Ok,
                TransferObject = _dbContext.Products.Where(x => x.IsDeleted == false).ToList()
            };
        }

        public ResponsePackage<string> Save(CreateProduct dataIn)
        {
            var productForDb = new Product()
            {
                Name = dataIn.Name,
            Price = dataIn.Price,
            Stock = dataIn.Stock,
            Description = dataIn.Description,
            Images = dataIn.Images,
            CategoryId = dataIn.CategoryId
        };

            if(dataIn.Id == null) //create new
            {
                if (_dbContext.Products.FirstOrDefault(x => x.IsDeleted == false && x.Name.ToLower() == productForDb.Name) != null)
                    return new ResponsePackage<string>(ResponseStatus.Error, "Product with this name already exists.");

                _dbContext.Products.Add(productForDb);
                _dbContext.SaveChanges();
                return new ResponsePackage<string>(ResponseStatus.Ok, "Successfully added new product.");
            }
            else // edit exist
            {
                var dbUser = _dbContext.Products.FirstOrDefault(x => x.Id == dataIn.Id);
                if(dbUser == null)
                    return new ResponsePackage<string>(ResponseStatus.Error, "Product not fount in database.");

                dbUser.Name = productForDb.Name;
                dbUser.Price = productForDb.Price;
                dbUser.Stock = productForDb.Stock;
                dbUser.Description = productForDb.Description;
                dbUser.CategoryId = productForDb.CategoryId;
                dbUser.Images = productForDb.Images;

                _dbContext.SaveChanges();
                return new ResponsePackage<string>(ResponseStatus.Ok, "Successfully edited product.");
            }
        }

        
    }
}
