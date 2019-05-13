using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ErrorTrackerApp.Models;

namespace ErrorTrackerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImpactsController : ControllerBase
    {
        private readonly ErrorTrackerAppContext _context;

        public ImpactsController(ErrorTrackerAppContext context)
        {
            _context = context;
        }

        // GET: api/Impacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Impact>>> GetImpacts()
        {
            return await _context.Impact.ToListAsync();
        }
    }
}
