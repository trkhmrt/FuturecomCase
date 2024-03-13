using System;
namespace DataAccessLayer.Abstract
{
	public interface IGenericLogDal<T> where T:class
	{
		void Add(T log);

		ICollection<T> GetAllLog();








	}
}

