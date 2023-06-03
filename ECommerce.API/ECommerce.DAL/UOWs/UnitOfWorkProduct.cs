using ECommerce.DAL.Data;
using ECommerce.DAL.Repositories;

namespace ECommerce.DAL.UOWs
{
    public class UnitOfWorkProduct : IUnitOfWorkProduct
    {
        private ProductDbContext _productDb;
        private ICategoryRepository CategoryRepository { get; set; }
        private IProductRepository ProductRepository { get; set; }

        public UnitOfWorkProduct(ProductDbContext productDb)
        {
            _productDb = productDb;
        }

        public void Save()
        {
            _productDb.SaveChanges();
        }
        public ICategoryRepository GetCategoryRepository()
        {
            return CategoryRepository ?? (CategoryRepository = new CategoryRepository(_productDb));
        }
        public IProductRepository GetProductRepository()
        {
            return ProductRepository ?? (ProductRepository = new ProductRepository(_productDb));
        }
    }
}
