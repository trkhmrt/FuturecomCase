using System;
using EntityLayer.Concrete.Logs;

namespace BusinessLayer.Abstract.IGenericLogServices
{
    public interface ILogService : IGenericLogService<UserLog>
    {

    }
}

