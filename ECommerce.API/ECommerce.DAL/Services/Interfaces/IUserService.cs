﻿using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Models;

namespace ECommerce.DAL.Services.Interfaces
{
    public interface IUserService
    {
        ResponsePackage<string> Save(RegisterUserDataIn dataIn);
        User GetUserByEmailAndPass(string email, string pass);
        ResponsePackage<string> ActivateUser(string email, string key);

    }
}
