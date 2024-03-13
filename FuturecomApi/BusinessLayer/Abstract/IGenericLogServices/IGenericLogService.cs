using System;
namespace BusinessLayer.Abstract.IGenericLogServices
{
    public interface IGenericLogService<T>
    {
        void LoginLogAdd(string token,string id);

        void ChangePasswordLogAdd(string token, string id);

        void LogOutAdd(string token, string id);



        ICollection<T> GetAllLog();


    }
}

