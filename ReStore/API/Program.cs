using System;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var db = scope.ServiceProvider.GetService<StoreContext>();
            var um = scope.ServiceProvider.GetService<UserManager<User>>();
            var logger = scope.ServiceProvider.GetService<ILogger<Program>>();
            try
            {
                await db.Database.MigrateAsync();
                await DbInitializer.InitializeAsync(db, um);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Problem migration data");
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
