using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ErrorTrackerApp.Models;
using Microsoft.AspNetCore.Authorization;

namespace ErrorTrackerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ErrorHistoriesController : ControllerBase
    {
        private readonly ErrorTrackerAppContext _context;

        public ErrorHistoriesController(ErrorTrackerAppContext context)
        {
            _context = context;
        }

        // GET: api/ErrorHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ErrorHistory>>> GetErrorHistory()
        {
            return await _context.ErrorHistory.ToListAsync();
        }

        // GET: api/ErrorHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ErrorHistory>> GetErrorHistory(int id)
        {
            var errorHistory = await _context.ErrorHistory.FindAsync(id);

            if (errorHistory == null)
            {
                return NotFound();
            }

            return errorHistory;
        }

        // PUT: api/ErrorHistories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutErrorHistory(int id, ErrorHistory errorHistory)
        {
            if (id != errorHistory.Id)
            {
                return BadRequest();
            }

            _context.Entry(errorHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ErrorHistoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ErrorHistories
        [HttpPost]
        public async Task<ActionResult<ErrorHistory>> PostErrorHistory(ErrorHistory errorHistory)
        {
            _context.ErrorHistory.Add(errorHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetErrorHistory", new { id = errorHistory.Id }, errorHistory);
        }

        // DELETE: api/ErrorHistories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ErrorHistory>> DeleteErrorHistory(int id)
        {
            var errorHistory = await _context.ErrorHistory.FindAsync(id);
            if (errorHistory == null)
            {
                return NotFound();
            }

            _context.ErrorHistory.Remove(errorHistory);
            await _context.SaveChangesAsync();

            return errorHistory;
        }

        private bool ErrorHistoryExists(int id)
        {
            return _context.ErrorHistory.Any(e => e.Id == id);
        }
    }
}
