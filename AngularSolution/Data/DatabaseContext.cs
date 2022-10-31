using Microsoft.EntityFrameworkCore;
using AngularSolution.Models;

namespace AngularSolution.Data;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {

    }

    public DbSet<Todo> todos => Set<Todo>();
}