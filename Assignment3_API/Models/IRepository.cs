namespace Assignment3_Backend.Models
{
    public interface IRepository<T> where T : class
    {
        Task<bool> SaveChangesAsync();

        Task<T> GetEntityByIdAsync(int id);

        void Add(T entity);

        Task<IReadOnlyList<T>> ListAllAsync();

        Task<IEnumerable<Product>> ListProductsAsync();
    }
}
