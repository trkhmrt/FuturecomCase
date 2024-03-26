using System;
using BusinessLayer.Abstract.IGenericLogServices;
using DataAccessLayer.Abstract;
using EntityLayer.Concrete;
using EntityLayer.Concrete;

namespace BusinessLayer.Concrete
{
    public class UserLogManager : IUserLogService
    {
        IUserLogDal _logDal;

        public UserLogManager(IUserLogDal logDal)
        {
            _logDal = logDal;
        }

        public void TDelete(UserLog t)
        {
            throw new NotImplementedException();
        }

        public UserLog TGetByID(Guid id)
        {
            throw new NotImplementedException();
        }

        public List<UserLog> TGetList()
        {
            throw new NotImplementedException();
        }

        public void TInsert(UserLog t)
        {
            throw new NotImplementedException();
        }

        public void TUpdate(UserLog t)
        {
            throw new NotImplementedException();
        }


















        /*
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
        */

    }
}

