using DebtMonitoring.DAL.DTO;
using ECommerce.DAL.Data;
using ECommerce.DAL.DTO.User.DataIn;
using ECommerce.DAL.Services.Interfaces;
using ECommerce.Models.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace ECommerce.DAL.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;
        public UserService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ResponsePackage<string> Save(UserRegisterDataIn dataIn)
        {
            dataIn.Email = dataIn.Email.ToLower().Trim();
            var userForDb = new User()
            {
                Address = dataIn.Address,
                Email = dataIn.Email,
                FirstName = dataIn.FirstName,
                LastName = dataIn.LastName,
                Password = dataIn.Password,
                Role = (Role)dataIn.RoleId
            };
            if(dataIn.Id == null) //create new
            {
                if (_dbContext.Users.FirstOrDefault(x => x.IsDeleted == false && x.Email.ToLower() == userForDb.Email) != null)
                    return new ResponsePackage<string>(ResponseStatus.Error, "User with this email already exists.");
                _dbContext.Users.Add(userForDb);
                _dbContext.SaveChanges();
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
