using AngularSolution.Data;
using AngularSolution.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<TodoService>();
builder.Services.AddScoped<EmployeeService>();

builder.Services.AddControllersWithViews();

var postgresSQLConnection = builder.Configuration.GetConnectionString("PostgresSQLConnection");
builder.Services.AddNpgsql<DatabaseContext>(postgresSQLConnection);

builder.Services.AddCors(options => options.AddPolicy(name: "AngularSolutionOrigins", policy =>
{
    policy.WithOrigins("https://localhost:44468").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AngularSolutionOrigins");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();

