using ErrorTracker.Dtos;
using ErrorTrackerApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ErrorTrackerApp.Dtos {
    public class ErrorDto {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string ShortDesc { get; set; }
        public string Description { get; set; }
        public Status Status { get; set;}
        public int StatusId { get; set; }
        public Priority Priority { get; set; }
        public int PriorityId { get; set; }
        public Impact Impact { get; set; }
        public int ImpactId { get; set; }
        public UserDto User { get; set; }
        public int UserId { get; set; }
        public virtual ICollection<ErrorHistoryDto> ErrorHistory { get; set; }
    }
}
