using ErrorTrackerApp.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErrorTracker.Dtos {
    public class ErrorHistoryDto {
        public int Id { get; set; }
        public ErrorTrackerApp.Models.Action Action { get; set; }
        public int ActionId { get; set; }
        public string Comment { get; set; }
        public int UserId { get; set; }
        public UserDto User { get; set; }
        public DateTime Date { get; set; }
    }
}
