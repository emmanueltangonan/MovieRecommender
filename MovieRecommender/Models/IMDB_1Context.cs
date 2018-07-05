using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MovieRecommender.Models
{
    public partial class IMDB_1Context : DbContext
    {
        public virtual DbSet<Movie> Movie { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Genre> Genre { get; set; }

        public IMDB_1Context(DbContextOptions<IMDB_1Context> options)
            : base(options)
        { }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>(entity =>
            {
                entity.HasIndex(e => e.Tconst)
                    .HasName("Uniq_Movie")
                    .IsUnique();

                entity.Property(e => e.AverageRating).HasColumnType("decimal(5, 1)");

                entity.Property(e => e.Genres).HasMaxLength(255);

                entity.Property(e => e.OriginalTitle).HasMaxLength(255);

                entity.Property(e => e.PrimaryTitle).HasMaxLength(255);

                entity.Property(e => e.Tconst)
                    .IsRequired()
                    .HasColumnName("TConst")
                    .HasMaxLength(50);

                entity.Property(e => e.TitleType).HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Genre>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}
