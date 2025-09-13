using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ServerAhorcado.Models;

namespace ServerAhorcado.Context;

public partial class AhorcadoDBContext : DbContext
{
    public AhorcadoDBContext()
    {
    }

    public AhorcadoDBContext(DbContextOptions<AhorcadoDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Palabra> Palabras { get; set; }

    public virtual DbSet<Puntuacione> Puntuaciones { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //vacio
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Palabra>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("palabras_pkey");

            entity.ToTable("palabras");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Palabras)
                .HasMaxLength(50)
                .HasColumnName("palabras");
        });

        modelBuilder.Entity<Puntuacione>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("puntuaciones_pkey");

            entity.ToTable("puntuaciones");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Puntuacion)
                .HasPrecision(10, 2)
                .HasColumnName("puntuacion");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("usuarios_pkey");

            entity.ToTable("usuarios");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(250)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
