using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Concrete;
using DataAccessLayer.EntityFramework;
using EntityLayer.Concrete.Logs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FuturecomApi.Controllers
{
    [Route("/[controller]")]
    [AllowAnonymous]
    public class LogController : Controller
    {

        LogManager logManager = new LogManager(new EfLogRepository());

      
        [HttpGet]

        public async Task<IActionResult> Get()
        {
            var logs = logManager.GetAllLog();

            return Ok(logs);
        }

      
    }
}

