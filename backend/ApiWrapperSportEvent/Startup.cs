using ApiWrapperSportEvent.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

public class Startup
{
    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        Configuration = configuration;
        Environment = environment;
    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddHttpClient();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddHttpClient("MyApiClient", client =>
        {
            // Configure HttpClient options if needed
            client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com");
        });

        // Additional service configurations can be added here
    }


    public void Configure(IApplicationBuilder app)
    {
        if (Environment.IsDevelopment())
        {
            // Configure development-specific middleware
        }

        // Configure other middleware

        app.UseRouting();
        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
