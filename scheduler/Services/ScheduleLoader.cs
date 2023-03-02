using System.Text.Json;
using OtherWay.Radio.Scheduler.Models;
using OtherWay.Radio.Scheduler.Services.Extensions;
using OtherWay.Radio.Scheduler.Services.Jobs;
using Quartz;

namespace OtherWay.Radio.Scheduler.Services;

public class ScheduleLoader {
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ISchedulerFactory _schedulerFactory;
  private readonly ILogger<ScheduleLoader> _logger;

  public ScheduleLoader(IHttpClientFactory httpClientFactory, ISchedulerFactory schedulerFactory,
    ILogger<ScheduleLoader> logger) {
    _httpClientFactory = httpClientFactory;
    _schedulerFactory = schedulerFactory;
    _logger = logger;
  }

  private async Task ScheduleJob(IScheduler scheduler, string jobKey, string showId, DateTime date) {
    var jobData = new JobDataMap {
      ["ShowId"] = showId,
      ["date"] = date
    };
    var group = "show-alert-triggers";
    var job = JobBuilder.Create<JobTriggerCallback>()
      .WithIdentity(jobKey, group)
      .UsingJobData(jobData)
      .Build();

    var trigger = TriggerBuilder.Create()
      .WithIdentity($"{jobKey}-trigger", group)
      .StartAt(date)
      .Build();

    _logger.LogDebug("Schedule loaded for {Show} as {JobKey} @ {ScheduleDate}",
      showId,
      jobKey,
      date.ToLongDateTimeString());
    await scheduler.ScheduleJob(job, trigger);
  }

  public async Task LoadSchedules() {
    using var client = _httpClientFactory.CreateClient("otherway");
    var response = await client.GetStreamAsync("/api/shows/notifications");
    var schedules = await JsonSerializer.DeserializeAsync<List<NotificationSchedule>>(response,
      new JsonSerializerOptions {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        WriteIndented = true
      });

    if (schedules is null) {
      return;
    }

    var scheduler = await _schedulerFactory.GetScheduler();
    await scheduler.Clear();
    foreach (var schedule in schedules) {
      short i = 1;
      foreach (var slot in schedule.ScheduleTimes.Where(r => r >= DateTime.Now).OrderBy(r => r.Date)) {
        Console.WriteLine($"New schedule for {schedule.ShowId} scheduled at {slot.ToLongDateTimeString()}");
        await ScheduleJob(scheduler, $"{schedule.ShowId}-callback-{i++}", schedule.ShowId, slot);
      }
    }
  }
}