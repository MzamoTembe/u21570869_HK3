using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace Assignment3_Backend.Models
{
    public class Repository<T>: IRepository<T> where T : class
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Add(T entity)
        {
            _appDbContext.Add(entity);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _appDbContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetEntityByIdAsync(int id)
        {
            return await _appDbContext.Set<T>().FindAsync(id);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Product>> ListProductsAsync()
        {
            return await _appDbContext.Products.Include(b => b.Brand).Include(t => t.ProductType).ToListAsync();
        }
    }
}
