using Microsoft.AspNetCore.Mvc;
using OtherWay.Radio.Scheduler.Services;
using OtherWay.Radio.Scheduler.Services.Extensions;
using Quartz;

namespace OtherWay.Radio.Scheduler.Controllers;

[ApiController]
[Route("[controller]")]
public class JobController : ControllerBase {
  private readonly ISchedulerFactory _schedulerFactory;
  private readonly ScheduleLoader _scheduleLoader;

  public JobController(ISchedulerFactory schedulerFactory, ScheduleLoader scheduleLoader) {
    _schedulerFactory = schedulerFactory;
    _scheduleLoader = scheduleLoader;
  }

  [HttpGet]
  public async Task<IActionResult> GetAllSchedules() {
    var scheduler = await _schedulerFactory.GetScheduler();
    var executingJobs = await scheduler.GetAllJobs();
    return Ok(executingJobs);
  }

  [HttpPost("reload")]
  public async Task<IActionResult> ReloadSchedules() {
    await _scheduleLoader.LoadSchedules();
    return Ok();
  }
}