﻿using AutoMapper;
using ECommerce.DAL.DTO.Product.DataOut;
using ECommerce.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.DAL.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            //CreateMap<Product, ProductDataOut>()
            //        .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            //        .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //        .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            //        .ForMember(dest => dest.Stock, opt => opt.MapFrom(src => src.Stock))
            //        .ForMember(dest => dest.Images, opt => opt.MapFrom(src => src.Images))
            //        .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category == null ? "/" : src.Category.Name));
        }
    }
}
