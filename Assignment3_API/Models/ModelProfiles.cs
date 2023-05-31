using Assignment3_Backend.ViewModels;
using AutoMapper;

namespace Assignment3_Backend.Models
{
    public class ModelProfiles:Profile
    {
        public ModelProfiles()
        {
            CreateMap<Product, ProductViewModel>()
                .ForMember(d => d.brand, o => o.MapFrom(s => s.Brand.Name))
                .ForMember(d => d.producttype, o => o.MapFrom(s => s.ProductType.Name));

            CreateMap<ProductType, TypeVM>()
    .ForMember(d => d.Id, o => o.MapFrom(s => s.ProductTypeId))
    .ForMember(d => d.Name, o => o.MapFrom(s => s.Name));

            CreateMap<Brand, BrandVM>()
.ForMember(d => d.Id, o => o.MapFrom(s => s.BrandId))
.ForMember(d => d.Name, o => o.MapFrom(s => s.Name));

            CreateMap<ProductViewModel, Product>()
                .ForMember(d => d.Brand, o => o.Ignore())
                .ForMember(d => d.ProductType, o => o.Ignore())
                .ForMember(d => d.ProductTypeId, o => o.MapFrom(s => 1))
                .ForMember(d => d.BrandId, o => o.MapFrom(s => 1));
        }
    }
}
