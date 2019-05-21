using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ErrorTrackerApp.Models;

namespace ErrorTrackerApp.Models
{
    public class ErrorTrackerAppContext : DbContext
    {
        public ErrorTrackerAppContext (DbContextOptions<ErrorTrackerAppContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
            .UseLazyLoadingProxies().EnableDetailedErrors();

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Error>().HasMany(e => e.ErrorHistory);
            #region ClassifiersSeed
            modelBuilder.Entity<Action>().HasData(
                new Action { Id = 1, Name = "Ввод" },
                new Action { Id = 2, Name = "Открытие"},
                new Action { Id = 3, Name = "Решение"},
                new Action { Id = 4, Name = "Закрытие"}
            );
            modelBuilder.Entity<Impact>().HasData(
                new Impact { Id = 1, Name = "Авария"},
                new Impact { Id = 2, Name = "Критичная"},
                new Impact { Id = 3, Name = "Некритичная"},
                new Impact { Id = 4, Name = "Запрос на изменение"}
            );
            modelBuilder.Entity<Priority>().HasData(
                new Priority { Id = 1, Name = "Очень срочно" },
                new Priority { Id = 2, Name = "Срочно"},
                new Priority { Id = 3, Name = "Несрочно" },
                new Priority { Id = 4, Name = "Совсем несрочно" }
            );
            modelBuilder.Entity<Status>().HasData(
                new Status { Id = 1, Name = "Новая"},
                new Status { Id = 2, Name = "Открытая" },
                new Status { Id = 3, Name = "Решённая" },
                new Status { Id = 4, Name = "Закрытая" }
            );
            #endregion
        }

        #region ActualData
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
