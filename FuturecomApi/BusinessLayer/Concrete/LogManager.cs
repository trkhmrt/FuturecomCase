using System;
using BusinessLayer.Abstract.IGenericLogServices;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete.Logs;

namespace BusinessLayer.Concrete
{
    public class LogManager : ILogService
    {
        ILogDal _logDal;

        public LogManager(ILogDal logDal)
        {
            _logDal = logDal;
        }


      
        public void LoginLogAdd(string token, string id)
        {
            UserLog userLog = new UserLog
            {
                UserID = id,
                Token=token,
                CreatedDate=DateTime.Now,
                Type="SI"
            };

            _logDal.Add(userLog);
        }

        public ICollection<UserLog> GetAllLog()
        {
           return _logDal.GetAllLog();
        }

        public void ChangePasswordLogAdd(string token, string id)
        {
            UserLog userLog = new UserLog
            {
                UserID = id,
                Token = token,
                CreatedDate = DateTime.Now,
                Type = "CP"
            };

            _logDal.Add(userLog);
        }

        public void LogOutAdd(string token, string id)
        {
            UserLog userLog = new UserLog
            {
                UserID = id,
                Token = token,
                CreatedDate = DateTime.Now,
                Type = "LO"
            };

            _logDal.Add(userLog);
        }

    }
}

