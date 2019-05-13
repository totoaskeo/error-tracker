using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GetTest.Models;

namespace GetTest.Models
{
    public class GetTestContext : DbContext
    {
        public GetTestContext (DbContextOptions<GetTestContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseLazyLoadingProxies();

        #region ActualData
        public DbSet<User> User { get; set; }
        public DbSet<Error> Error { get; set; }
        public DbSet<ErrorHistory> ErrorHistory { get; set; }
        #endregion
        #region Classifiers
        public DbSet<Action> Action { get; set; }
        public DbSet<Impact> Impact { get; set; }
        public DbSet<Priority> Priority { get; set; }
        public DbSet<Status> Status { get; set; }
        #endregion
        public DbSet<User> Users { get; set; }
    }
}
