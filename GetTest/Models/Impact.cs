using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ErrorTrackerApp.Models {
    [Table("Impact")]
    public class Impact {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
