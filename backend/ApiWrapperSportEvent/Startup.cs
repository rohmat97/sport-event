using ApiWrapperSportEvent.Controllers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

public class Startup
{
    readonly string allowSpecificOrigins = "AllowAllHeaders";
    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        Configuration = configuration;
        Environment = environment;
    }

    public IConfiguration Configuration { get; }
    public IWebHostEnvironment Environment { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        var origins = new string[] {
            "http://localhost:3000", // development
            "http://localhost:5166", // development
            "http://localhost/TM", // IIS
            // others
        };
        services.AddCors(options =>
        {
            options.AddPolicy(allowSpecificOrigins,
            builder =>
            {
                builder.WithOrigins(origins)
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });
        services.AddControllers();
        services.AddHttpClient();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddHttpClient("MyApiClient", client =>
        {
            // Configure HttpClient options if needed
            client.BaseAddress = new Uri("https://api-sport-events.test.voxteneo.com");
        });
        // Add logging services
        services.AddLogging(builder =>
        {
            builder.AddConsole(); // Log to the console
            builder.AddDebug();   // Log to the debug output
                                  // Add other logging providers if needed
        });


    }


    public void Configure(IApplicationBuilder app)
    {

        if (Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ApiWrapperSportEvent v1"));
        }

        // Configure other middleware

        app.UseRouting();
        app.UseCors(allowSpecificOrigins);
        app.UseAuthorization();
        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

    }
}
