using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.DAL.Mappings
{
    public class CategoryProfile : Profile
    {
        //CreateMap<Building, BuildingDto>()
        //        //.ForMember(dest => dest.Area, opt => opt.MapFrom(src => src.Area.Name ?? "/"))
        //        .ForMember(dest => dest.LastUpdateTime, opt => opt.MapFrom(src => src.LastUpdateTime != null ? src.LastUpdateTime.Value.ToString("dd/MM/yyyy") : ""))
        //        //.ForMember(dest => dest.LastUpdateUser, opt => opt.MapFrom(src => src.LastUpdateUser != null ? src.LastUpdateUser.FirstName + " " + src.LastUpdateUser.LastName : ""))
        //        .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString() ?? "/"))
        //        .ForMember(dest => dest.Source, opt => opt.MapFrom(src => src.Source.HasValue? src.Source : Source.Mobile))
        //        .ForMember(dest => dest.CustomerCount, opt => opt.MapFrom(src => src.Customers.Count));
    }
}
