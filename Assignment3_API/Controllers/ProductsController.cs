using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Reflection.Metadata.Ecma335;

namespace Assignment3_Backend.Controllers
{
    [ApiController]
    public class ProductsController : Controller
    {
        private readonly IRepository<Product> _productsRepo;
        private readonly IRepository<Brand> _brandsRepo;
        private readonly IRepository<ProductType> _typesRepo;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public ProductsController(IRepository<Product> productsRepo, IRepository<Brand> brandsRepo, IRepository<ProductType> typesRepo, IMapper mapper, AppDbContext context)
        {
            _productsRepo = productsRepo;
            _brandsRepo = brandsRepo;
            _typesRepo = typesRepo;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("products")]
        public async Task<ActionResult<Pagination<ProductViewModel>>> GetProducts([FromQuery] PaginationParams pageParams)
        {
            var result = await _productsRepo.ListProductsAsync();

            result = result.Where(x => (string.IsNullOrEmpty(pageParams.searchTerm) || x.Name.ToLower().Contains(pageParams.searchTerm.ToLower()) || x.Description.ToLower().Contains(pageParams.searchTerm) || x.Price.ToString().Contains(pageParams.searchTerm))  &&
                                       (string.IsNullOrEmpty(pageParams.mybrand) || x.Brand.Name.ToLower().Contains(pageParams.mybrand.ToLower())) &&
                                       (string.IsNullOrEmpty(pageParams.mytype) || x.ProductType.Name.ToLower().Contains(pageParams.mytype.ToLower())));

            switch (pageParams.sortOrder)
            {
                case "nameAsc":
                    result = result.OrderBy(s => s.Name);
                    break;
                case "nameDesc":
                    result = result.OrderByDescending(s => s.Name);
                    break;
                case "descriptionAsc":
                    result = result.OrderBy(s => s.Description);
                    break;
                case "descriptionDesc":
                    result = result.OrderByDescending(s => s.Description);
                    break;
                case "priceAsc":
                    result = result.OrderBy(p => p.Price);
                    break;
                case "priceDesc":
                    result = result.OrderByDescending(p => p.Price);
                    break;
                case "typeAsc":
                    result = result.OrderBy(s => s.ProductType.Name);
                    break;
                case "typeDesc":
                    result = result.OrderByDescending(s => s.ProductType.Name);
                    break;
                case "brandAsc":
                    result = result.OrderBy(s => s.Brand.Name);
                    break;
                case "brandDesc":
                    result = result.OrderByDescending(s => s.Brand.Name);
                    break;
                default:
                    result = result.OrderBy(s => s.Name);
                    break;
            }

            var data = _mapper.Map<IReadOnlyList<ProductViewModel>>(result.Skip((pageParams.pageIndex - 1) * pageParams.pageSize).Take(pageParams.pageSize));

            return Ok(new Pagination<ProductViewModel>(pageParams.pageIndex, pageParams.pageSize, result.Count(), data));
        }




        [HttpPost("AddProduct")]
        public async Task<ActionResult<ProductViewModel>> AddProduct(ProductViewModel product)
        {
            Product newproduct = new Product
            {
                Name = product.name,
                Description = product.description,
                Price = product.price,
                ProductTypeId = _context.ProductTypes.FirstOrDefault(t => t.Name == product.producttype).ProductTypeId,
                BrandId = _context.Brands.FirstOrDefault(t => t.Name == product.brand).BrandId
            };

            _productsRepo.Add(newproduct);
            var result = await _productsRepo.SaveChangesAsync();

            if (result == null) return BadRequest("There was an issue adding the product");
            return Ok(_mapper.Map<Product, ProductViewModel>(newproduct));
        }



        [HttpGet("brands")]
        public async Task<ActionResult<BrandVM>> GetBrands()
        {
            var result = await _brandsRepo.ListAllAsync();
            return Ok(_mapper.Map<IReadOnlyList<BrandVM>>(result));
        }

        [HttpGet("types")]
        public async Task<ActionResult<TypeVM>> GetTypes()
        {
            var result = await _typesRepo.ListAllAsync();
            return Ok(_mapper.Map<IReadOnlyList<TypeVM>>(result));
        }
    }
}
