﻿using AutoMapper;
using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Order.DataIn;
using ECommerce.DAL.DTO.Order.DataOut;
using ECommerce.DAL.DTO.Product.DataOut;
using ECommerce.DAL.Models;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.DAL.UOWs;
using Microsoft.AspNetCore.Mvc;
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

        public ResponsePackage<PaginationDataOut<OrderDataOut>> GetAll(PaginationDataIn dataIn, string role, int? userId)
        {
            var orders = _unitOfWork.GetOrderRepository().GetAllProductsWithPaggination(dataIn, role, userId);

            var orderItems = orders.TransferObject.Select(x =>
            new OrderDataOut()
            {
                CustomerId = x.CustomerId,
                Name = x.Name,
                Address = x.Address,
                Phone = x.Phone,
                Comment = x.Comment,
                Total = x.Total,
                OrderDate = x.OrderDate,
                Status = x.Status.ToString(),
                OrderItems = x.OrderItems.Select(y => new OrderItemDataOut(y)).ToList()
            }).ToList();

            return new ResponsePackage<PaginationDataOut<OrderDataOut>>()
            {
                Status = ResponseStatus.Ok,
                TransferObject = new PaginationDataOut<OrderDataOut> { Data = orderItems, Count = int.Parse(orders.Message) }
            };
        }

        public async Task<ResponsePackage<string>> Save([FromBody] OrderDataIn dataIn, int? userId)
        {
            var newOrder = new Order()
            {
                Name = dataIn.FirstName + " " + dataIn.LastName,
                Comment = dataIn.Comment,
                CustomerId = userId,
                Phone = dataIn.PhoneNumber,
                Status = OrderStatus.Pending,
                Address = dataIn.Address,
                LastUpdateTime = DateTime.Now,
                OrderItems = dataIn.CartItems.Select(x => new OrderItem() {ProductId = x.Id.Value,Quantity = x.Count.Value}).ToList()
            };

            await _unitOfWork.GetOrderRepository().AddAsync(newOrder);
            await _unitOfWork.Save();
            return new ResponsePackage<string>(ResponseStatus.Ok, "Successfully ordered.");
        }
    }
}