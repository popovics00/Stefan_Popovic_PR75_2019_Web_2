﻿using ECommerce.DAL.Data;
using ECommerce.DAL.DTO;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.Models.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;
using System.Net;

namespace ECommerce.DAL.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserDbContext _dbContext;
        private readonly IEmailService _emailService;

        public UserService(UserDbContext dbContext, IEmailService userService)
        {
            _dbContext = dbContext;
            _emailService = userService;
        }

        public ResponsePackage<string> ActivateUser(string email, string key)
        {
            var userFromDb = _dbContext.Users.FirstOrDefault(x => !x.IsDeleted && !x.Active && x.Email == email && x.ActivateKey == key);
            userFromDb.Active = true;
            _dbContext.SaveChanges();
            return new ResponsePackage<string>()
            {
                Status = 200,
                Message = "Success"
            };
        }

        public User GetUserByEmailAndPass(string email, string pass)
        {
            return _dbContext.Users
                            .FirstOrDefault(x => !x.IsDeleted && !x.Active && x.Email == email && x.Password == pass);
        }

        public ResponsePackage<string> Save(RegisterUserDataIn dataIn)
        {

            dataIn.Email = dataIn.Email.ToLower().Trim();
            var userForDb = new User()
            {
                Address = dataIn.Address,
                Email = dataIn.Email,
                FirstName = dataIn.FirstName,
                LastName = dataIn.LastName,
                Password = dataIn.Password,
                Role = (Role)dataIn.RoleId,
                Active = false,
                ActivateKey = System.Guid.NewGuid().ToString()
            };
            if(dataIn.Id == null) //create new
            {
                if (_dbContext.Users.FirstOrDefault(x => x.IsDeleted == false && x.Email.ToLower() == userForDb.Email) != null)
                    return new ResponsePackage<string>(ResponseStatus.Error, "User with this email already exists.");
                _dbContext.Users.Add(userForDb);
                _dbContext.SaveChanges();
                _emailService.SendEmail(dataIn.Email, $"Klikni da aktiviras na link https://localhost:63290/api/User/login/{dataIn.Email}/{userForDb.ActivateKey}");
                return new ResponsePackage<string>(ResponseStatus.Ok, "Successfully added new user.");
            }
            else // edit exist
            {
                var dbUser = _dbContext.Users.FirstOrDefault(x => x.Id == userForDb.Id);
                if(dbUser == null)
                    return new ResponsePackage<string>(ResponseStatus.Error, "User not fount in database.");

                dbUser.Address = dataIn.Address;
                dbUser.Email = dataIn.Email;
                dbUser.FirstName = dataIn.FirstName;
                dbUser.LastName = dataIn.LastName;
                dbUser.Password = dataIn.Password;
                dbUser.Role = (Role)dataIn.RoleId;

                _dbContext.SaveChanges();
                return new ResponsePackage<string>(ResponseStatus.Ok, "Successfully edited user.");
            }
        }
    }
}
