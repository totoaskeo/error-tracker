using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GetTest.Models {
    [Table("Error")]
    public class Error {
        protected Error() { }
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public string ShortDesc { get; set; }
        public string Description { get; set; }
        [ForeignKey("Id")]
        public virtual Status Status { get; set; }
        [ForeignKey("PriorityId")]
        public virtual Priority Priority { get; set; }
        [ForeignKey("ImpactId")]
        public virtual Impact Impact { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
