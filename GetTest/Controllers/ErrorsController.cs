using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ErrorTrackerApp.Models;
using Microsoft.AspNetCore.Authorization;

namespace ErrorTrackerApp.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ErrorsController : ControllerBase {
        private readonly ErrorTrackerAppContext _context;

        public ErrorsController(ErrorTrackerAppContext context) {
            _context = context;
        }

        // GET: api/Errors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Error>>> GetError() {
            return await _context.Error.ToListAsync();
        }

        // GET: api/Errors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Error>> GetError(int id) {
            var error = await _context.Error.FindAsync(id);

            if (error == null) {
                return NotFound();
            }

            return error;
        }

        // PUT: api/Errors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutError(int id, Error error) {
            if (id != error.Id) {
                return BadRequest();
            }

            _context.Entry(error).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                if (!ErrorExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Errors
        [HttpPost]
        public async Task<ActionResult<Error>> PostError(Error error) {
            _context.Error.Add(error);
            var errorHistory = new ErrorHistory
            {
                Error = error,
                Action = _context.Action.SingleOrDefault(a => a.Name == "Ввод"),
                Comment = "",
                User = error.User,
                Date = DateTime.Now
            };
            _context.ErrorHistory.Add(errorHistory);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction("GetError", new { id = error.Id }, error);
        }

        // DELETE: api/Errors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Error>> DeleteError(int id) {
            var error = await _context.Error.FindAsync(id);
            if (error == null) {
                return NotFound();
            }

            _context.Error.Remove(error);
            await _context.SaveChangesAsync();

            return error;
        }

        private bool ErrorExists(int id) {
            return _context.Error.Any(e => e.Id == id);
        }
    }
}
