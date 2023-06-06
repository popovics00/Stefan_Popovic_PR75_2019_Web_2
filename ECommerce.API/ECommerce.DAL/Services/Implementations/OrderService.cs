using AutoMapper;
using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Order.DataIn;
using ECommerce.DAL.Models;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.DAL.UOWs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.DAL.Services.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IEmailService _emailService;
        private readonly IUnitOfWorkProduct _unitOfWork;
        private readonly IMapper _mapper;


        public OrderService(IEmailService userService, IUnitOfWorkProduct unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _emailService = userService;
            _mapper = mapper;
        }

        public async Task<ResponsePackage<string>> Save(OrderDataIn dataIn)
        {
            var newOrder = new Order()
            {
                Name = dataIn.FirstName + " " + dataIn.LastName,
                Comment = dataIn.Comment,
                Phone = dataIn.PhoneNumber,
                Address = dataIn.Address,
                LastUpdateTime = DateTime.Now,
                OrderItems = dataIn.CartItems.Select(x => new OrderItem() {ProductId = x.Id.Value,Quantity = x.Count.Value}).ToList()
            };

            _unitOfWork.GetOrderRepository().AddAsync(newOrder);
            _unitOfWork.Save();
            return new ResponsePackage<string>(ResponseStatus.Ok, "Successfully ordered.");
        }
    }
}