using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GetTest.Models {
    [Table("Error")]
    public class Error {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string ShortDesc { get; set; }
        public string Description { get; set; }
        [ForeignKey("StatusId")]
        public Status Status { get; set; }
        [ForeignKey("PriorityId")]
        public Priority Priority { get; set; }
        [ForeignKey("ImpactId")]
        public Impact Impact { get; set; }
    }
}
