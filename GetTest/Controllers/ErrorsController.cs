using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ErrorTrackerApp.Models;
using Microsoft.AspNetCore.Authorization;
using ErrorTrackerApp.Dtos;
using AutoMapper;
using ErrorTracker.Constants;

namespace ErrorTrackerApp.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ErrorsController : ControllerBase {
        private readonly ErrorTrackerAppContext _context;
        private IMapper _mapper;

        public ErrorsController(ErrorTrackerAppContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Errors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ErrorDto>>> GetError() {
            var errors = await _context.Error.ToListAsync();
            var errorDtos = _mapper.Map<IList<Error>, IList<ErrorDto>>(errors);
            return errorDtos.ToList();
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
        public async Task<IActionResult> PutError(int id, ErrorDto errorDto) {
            var errorBf = _context.Error.SingleOrDefault(e => e.Id == id);
            var prevStatus = errorBf.Status;
            var error = _mapper.Map<Error>(errorDto);
            var status = _context.Status.SingleOrDefault(s => s.Id == errorDto.StatusId);
            
            if (id != error.Id) {
                return BadRequest();
            }

            var action = new Models.Action();
            // check statuses
            if (prevStatus.Name != status.Name) {
                if (prevStatus.Name == ErrorStatusTypes.New &&
                    status.Name != ErrorStatusTypes.Opened) {
                    return BadRequest();
                }
                if (prevStatus.Name == ErrorStatusTypes.Opened &&
                    status.Name != ErrorStatusTypes.Solved) {
                    return BadRequest();
                }
                if (prevStatus.Name == ErrorStatusTypes.Solved &&
                    (status.Name != ErrorStatusTypes.Opened &&
                        status.Name != ErrorStatusTypes.Closed)) {
                    return BadRequest();
                }
                if (prevStatus.Name == ErrorStatusTypes.Closed) {
                    return BadRequest();
                }

                if (status.Name == ErrorStatusTypes.Opened) {
                    action = _context.Action.SingleOrDefault(a => a.Name == "Открытие");
                }
                if (status.Name == ErrorStatusTypes.Solved) {
                    action = _context.Action.SingleOrDefault(a => a.Name == "Решение");
                }
                if (status.Name == ErrorStatusTypes.Closed) {
                    action = _context.Action.SingleOrDefault(a => a.Name == "Закрытие");
                }

                // all good
                var errorHistory = new ErrorHistory {
                    Error = error,
                    Action = action,
                    Comment = error.ErrorHistory.ToList()[error.ErrorHistory.Count - 1].Comment,
                    User = _context.Users.SingleOrDefault(u => u.Id == errorDto.UserId),
                    Date = DateTime.Now
                };

                _context.ErrorHistory.Add(errorHistory);
            }

            var entry = _context.Entry(error);
            entry.Property(e => e.ShortDesc).IsModified = true;
            entry.Property(e => e.Description).IsModified = true;
            entry.Property(e => e.PriorityId).IsModified = true;
            entry.Property(e => e.ImpactId).IsModified = true;
            entry.Property(e => e.StatusId).IsModified = true;

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
        public async Task<ActionResult<Error>> PostError([FromBody]ErrorDto errorDto) {
            Error error = _mapper.Map<Error>(errorDto);
            error.Status = _context.Status.SingleOrDefault(s => s.Id == error.StatusId);
            error.Priority = _context.Priority.SingleOrDefault(p => p.Id == error.PriorityId);
            error.Impact = _context.Impact.SingleOrDefault(i => i.Id == error.ImpactId);
            error.User = _context.Users.SingleOrDefault(u => u.Id == error.UserId);
            error.DateCreated = DateTime.Now;
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

            var err = _mapper.Map<ErrorDto>(error);
            return CreatedAtAction("GetError", new { id = error.Id }, err);
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
