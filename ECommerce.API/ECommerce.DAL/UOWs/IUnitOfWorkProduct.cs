using ECommerce.DAL.Repositories;

namespace ECommerce.DAL.UOWs
{
    public interface IUnitOfWorkProduct
    {
        ICategoryRepostiry CategoryRepository { get; }
        IProductRepository ProductRepository { get; }

        void Save();
    }
}
