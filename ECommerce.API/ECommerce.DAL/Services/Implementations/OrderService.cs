﻿using AutoMapper;
using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.Order.DataIn;
using ECommerce.DAL.DTO.Order.DataOut;
using ECommerce.DAL.DTO.Product.DataOut;
using ECommerce.DAL.Models;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.DAL.UOWs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Math.EC.Rfc7748;
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
            List<Order> tempOrders = new List<Order>();
            if (role == "Saler")
            {
                foreach (var order in orders.TransferObject)
                {
                    var oiOfSaler = order.OrderItems.Where(x => x.Product.CustomerId == userId).ToList();
                    order.OrderItems = oiOfSaler;
                }
            }
            var ordersDto = orders.TransferObject.Select(x =>
            new OrderDataOut()
            {
                CustomerId = x.CustomerId,
                Name = x.Name,
                Address = x.Address,
                Id = x.Id,
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
                TransferObject = new PaginationDataOut<OrderDataOut> { Data = ordersDto, Count = int.Parse(orders.Message) }
            };
        }

        public async Task<ResponsePackage<string>> Save([FromBody] OrderDataIn dataIn, int? userId)
        {

            var numberSalerInOrder = dataIn.CartItems.Select(x => x.CustomerId)
                                                    .Distinct()
                                                    .Count();
            var tempList = _unitOfWork.GetProductRepository().GetProductByIds(dataIn.CartItems.Select(x => x.Id.GetValueOrDefault()).ToList());
            string orderErrors = "Price product with names: ";
            foreach(var item in tempList)
            {

                if (item.Price != dataIn.CartItems.FirstOrDefault(x => x.Id == item.Id).Price)
                    orderErrors += item.Name + ", ";
            }
            if (orderErrors != "Price product with names: ")
            {
                orderErrors += "is updated in meantime.";
                return new ResponsePackage<string>
                {
                    Status = ResponseStatus.Error,
                    Message = orderErrors,
                    TransferObject = orderErrors
                };
            }
            var newOrder = new Order()
            {
                Name = dataIn.FirstName + " " + dataIn.LastName,
                Comment = dataIn.Comment,
                CustomerId = userId,
                Phone = dataIn.PhoneNumber,
                Status = OrderStatus.Pending,
                Address = dataIn.Address,
                LastUpdateTime = DateTime.Now,
                OrderDate = DateTime.Now,
                OrderItems = dataIn.CartItems.Select(x => new OrderItem() { ProductId = x.Id.Value, Quantity = x.Count.Value }).ToList(),
                Total = numberSalerInOrder * 250
            };

            await _unitOfWork.GetOrderRepository().AddAsync(newOrder);
            await _unitOfWork.Save();
            return new ResponsePackage<string>(ResponseStatus.Ok, "Successfully ordered.");
        }
    }
}