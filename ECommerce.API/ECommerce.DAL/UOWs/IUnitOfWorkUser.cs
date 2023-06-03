﻿using ECommerce.DAL.Repositories;

namespace ECommerce.DAL.UOWs
{
    public interface IUnitOfWorkUser
    {
        IUserRepository GetUserRepository();
        void Save();
    }
}
