using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Tewr.Blazor.FileReader;
using TrxViewer.FrontEnd.Services;

namespace TrxViewer.FrontEnd
{
	public class Program
	{
		public static async Task Main(string[] args)
		{
			var builder = WebAssemblyHostBuilder.CreateDefault(args);

			builder.RootComponents.Add<App>("app");

			builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
			builder.Services.AddFileReaderService(options => options.UseWasmSharedBuffer = true);

			builder.Services.AddTransient<IJsMethods, JsMethods>();

			await builder.Build().RunAsync();
		}
	}



	[EventHandler("onexpand", typeof(EventArgs), true, true)]
	public static class EventHandlers
	{
	}
}
