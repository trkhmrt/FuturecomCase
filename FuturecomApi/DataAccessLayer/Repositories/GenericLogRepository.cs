using System;
using DataAccessLayer.Abstract;
using DataAccessLayer.Concrete;

namespace DataAccessLayer.Repositories
{
    public class GenericLogRepository<T> : IGenericLogDal<T> where T : class
    {
        protected Context _context = new Context();


        public void Add(T log)
        {
            _context.Add(log);
            _context.SaveChanges();
        }

        public ICollection<T> GetAllLog()
        {
            
            return _context.Set<T>().ToList();
        }
    }
}

