namespace OtherWay.Radio.Scheduler.Services;

public static class HttpClients {
  public static IServiceCollection AddHttpClients(this IServiceCollection services, string? apiUrl) {
    services.AddHttpClient("otherway", c => {
      c.BaseAddress = new Uri(apiUrl);
      // Github API versioning
      c.DefaultRequestHeaders.Add("Accept", "application/json");
      // Github requires a user-agent
      c.DefaultRequestHeaders.Add("User-Agent", "otherway.fergl.ie/scheduler");
    });

    return services;
  }
}