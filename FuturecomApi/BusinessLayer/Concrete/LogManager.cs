using System;
using BusinessLayer.Abstract.IGenericLogServices;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
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


      
     

        public ICollection<UserLog> GetAllLog()
        {
           return _logDal.GetAllLog();
        }


        public bool LogAdd(string id,string request)
        {
            try
            {
                if (id != null && request != null)
                {

                    UserLog userLog = new UserLog();


                  
                    userLog.UserID = id;
                    userLog.CreatedDate = DateTime.Now;
                    userLog.Type = request;
                    _logDal.Add(userLog);

                    return true;
                }

                return false;
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return true;

        }

      
    }
}

