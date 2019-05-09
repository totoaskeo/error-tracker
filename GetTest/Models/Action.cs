﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GetTest.Models {
    [Table("Action")]
    public class Action {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
