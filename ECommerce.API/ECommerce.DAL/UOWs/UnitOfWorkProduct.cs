using ECommerce.DAL.Data;
using ECommerce.DAL.Repositories;

namespace ECommerce.DAL.UOWs
{
    public class UnitOfWorkProduct : IUnitOfWorkProduct
    {
        private ProductDbContext _productDb;

        public UnitOfWorkProduct(ProductDbContext productDb)
        {
            _productDb = productDb;
        }
        public ICategoryRepostiry CategoryRepository { get; private set; }
        public IProductRepository ProductRepository { get; private set; }

        public void Save()
        {
            _productDb.SaveChanges();
        }
    }
}
