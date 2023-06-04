using ECommerce.DAL.Data;
using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Product.DataIn;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.DAL.UOWs;
using ECommerce.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;
using System.Net;
using static System.Net.Mime.MediaTypeNames;
using AutoMapper;
using ECommerce.DAL.DTO.Product.DataOut;

namespace ECommerce.DAL.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly ProductDbContext _dbContext;
        private readonly IEmailService _emailService;
        private readonly IUnitOfWorkProduct _unitOfWork;
        private readonly IMapper _mapper;


        public ProductService(ProductDbContext dbContext, IEmailService userService, IUnitOfWorkProduct unitOfWork, IMapper mapper)
        {
            _dbContext = dbContext;
            _unitOfWork = unitOfWork;
            _emailService = userService;
            _mapper = mapper;
        }

        public ResponsePackage<PaginationDataOut<ProductDataOut>> GetAll(PaginationDataIn dataIn)
        {
            var products = _unitOfWork.GetProductRepository().GetAllProductsWithPaggination(dataIn);
            var data = _mapper.Map<List<ProductDataOut>>(products.TransferObject);

            return new ResponsePackage<PaginationDataOut<ProductDataOut>>()
            {
                Status = ResponseStatus.Ok,
                TransferObject = new PaginationDataOut<ProductDataOut> { Data = data, Count = int.Parse(products.Message) }
            };
        }

        public async Task<ResponsePackage<string>> Save(CreateProduct dataIn)
        {
            var productForDb = new Product()
            {
                Name = dataIn.Name,
                Price = dataIn.Price,
                Stock = dataIn.Stock,
                Description = dataIn.Description,
                Images = dataIn.Images,
                CategoryId = dataIn.CategoryId,
                LastUpdateTime = DateTime.Now
            };

            if(dataIn.Id == null || dataIn.Id == 0) //create new
            {
                if (_unitOfWork.GetProductRepository().GetProductByName(dataIn.Name).TransferObject != null)
                    return new ResponsePackage<string>(ResponseStatus.Error, "Product with this name already exists.");

                await _unitOfWork.GetProductRepository().AddAsync(productForDb);
                _unitOfWork.Save();
                return new ResponsePackage<string>(ResponseStatus.Ok, "Successfully added new product.");
            }
            else // edit exist
            {
                var dbUser = await _unitOfWork.GetProductRepository().GetByIdAsync(dataIn.Id.GetValueOrDefault());
                if(dbUser == null)
                    return new ResponsePackage<string>(ResponseStatus.Error, "Product not fount in database.");

                dbUser.Name = productForDb.Name;
                dbUser.Price = productForDb.Price;
                dbUser.Stock = productForDb.Stock;
                dbUser.Description = productForDb.Description;
                dbUser.CategoryId = productForDb.CategoryId;
                dbUser.Images = productForDb.Images;
                dbUser.LastUpdateTime = DateTime.Now;

                _unitOfWork.Save();
                return new ResponsePackage<string>(ResponseStatus.Ok, "Successfully edited product.");
            }
        }

        
    }
}
