using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ErrorTrackerApp.Models {
    [Table("Error")]
    public class Error {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string ShortDesc { get; set; }
        public string Description { get; set; }
        public int StatusId { get; set; }
        [ForeignKey("StatusId")]
        public virtual Status Status { get; set; }
        public int PriorityId { get; set; }
        [ForeignKey("PriorityId")]
        public virtual Priority Priority { get; set; }
        public int ImpactId { get; set; }
        [ForeignKey("ImpactId")]
        public virtual Impact Impact { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        public virtual ICollection<ErrorHistory> ErrorHistory { get; set; }
    }
}
