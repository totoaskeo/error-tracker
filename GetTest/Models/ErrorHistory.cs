using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ErrorTrackerApp.Models {
    [Table("ErrorHistory")]
    public class ErrorHistory {
        public int Id { get; set; }
        [ForeignKey("ErrorId")]
        public virtual Error Error { get; set; }
        public int ActionId { get; set; }
        [ForeignKey("ActionId")]
        public virtual Action Action { get; set; }
        public string Comment { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public DateTime Date { get; set; }
    }
}
