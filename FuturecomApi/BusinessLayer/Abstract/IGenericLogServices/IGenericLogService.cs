using System;
namespace BusinessLayer.Abstract.IGenericLogServices
{
    public interface IGenericLogService<T>
    {
        bool LogAdd(string id,string request);

        ICollection<T> GetAllLog();


    }
}

