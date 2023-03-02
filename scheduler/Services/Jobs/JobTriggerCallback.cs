using System.Text;
using System.Text.Json;
using Quartz;

namespace OtherWay.Radio.Scheduler.Services.Jobs;

/// <summary>
/// This job will call back to the main API
/// and notify it that a show alert has triggered
/// </summary>
public class JobTriggerCallback : IJob {
  private readonly IHttpClientFactory _httpClientFactory;
  private readonly ILogger<JobTriggerCallback> _logger;

  public JobTriggerCallback(IHttpClientFactory httpClientFactory, ILogger<JobTriggerCallback> logger) {
    _httpClientFactory = httpClientFactory;
    _logger = logger;
  }

  public async Task Execute(IJobExecutionContext context) {
    using var client = _httpClientFactory.CreateClient("otherway");
    var key = context.JobDetail.Key;
    var dataMap = context.JobDetail.JobDataMap;
    var showId = dataMap.GetString("ShowId");
    if (!string.IsNullOrEmpty(showId)) {
      var response = await client.PostAsync("/api/cron/notify",
        new StringContent(JsonSerializer.Serialize(new {
          showId
        }), Encoding.UTF8, "application/json"));
      if (!response.IsSuccessStatusCode) {
        _logger.LogError("Error sending show notification: {Reason}", response.ReasonPhrase);
      }
    }
  }
}