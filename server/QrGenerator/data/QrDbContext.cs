using Microsoft.EntityFrameworkCore;
using QrGenerator.Models;

public class QrContext : DbContext
    {
        public QrContext (DbContextOptions<QrContext> options)
            : base(options)
        {
        }

        public DbSet<QrCode> QrCode { get; set; } = default!;
        
        public DbSet<User> User { get; set; } = default!;
    }