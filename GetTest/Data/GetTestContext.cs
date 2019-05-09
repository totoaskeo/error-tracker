using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GetTest.Models
{
    public class GetTestContext : DbContext
    {
        public GetTestContext (DbContextOptions<GetTestContext> options)
            : base(options)
        {
        }

        public DbSet<GetTest.Models.Error> Error { get; set; }
    }
}
