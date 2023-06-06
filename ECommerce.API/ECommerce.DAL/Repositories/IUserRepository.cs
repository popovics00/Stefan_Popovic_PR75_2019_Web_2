﻿using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ECommerce.DAL.Models;

namespace ECommerce.DAL.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User GetUserByEmailAndPassword(string email, string password);
        User GetUserByEmail(string email);
        User GetUserByUserName(string username);
        User GetUserById(int userId);
    }
}
