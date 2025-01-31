using Microsoft.EntityFrameworkCore;
using QrGenerator.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<QrContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("QrContext") ?? throw new InvalidOperationException("Connection string 'QrContext' not found.")));

// Add services to the container.
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IQrCodeRepository, QrCodeRepository>();
builder.Services.AddControllers();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000",
        policy => policy.WithOrigins("http://localhost:3000") 
                        .AllowAnyHeader()                  
                        .AllowAnyMethod());                  
});

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowLocalhost3000");

app.UseAuthorization();

app.MapControllers();

app.Run();
