using System.Net;
using System.Security.Cryptography.X509Certificates;
using OtherWay.Radio.Scheduler.Services;
using Quartz;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();



// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClients(builder.Configuration["ServiceSettings:ApiUrl"]);

builder.Services.AddSingleton<ScheduleLoader>();
builder.Services.AddQuartz(q => {
  q.SchedulerName = "OtherWay Job Scheduler";
  q.UseMicrosoftDependencyInjectionJobFactory();
  q.UseSimpleTypeLoader();
  q.UseInMemoryStore();
  q.UseDefaultThreadPool(tp => { tp.MaxConcurrency = 10; });
});
builder.Services.AddQuartzServer(options => { options.WaitForJobsToComplete = true; });

builder
  .Services.BuildServiceProvider()
  .GetService<ScheduleLoader>()?
  .LoadSchedules()
  .ContinueWith(r => { });

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();