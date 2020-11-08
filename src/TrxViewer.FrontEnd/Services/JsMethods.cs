using System.Threading.Tasks;
using Microsoft.JSInterop;
using TrxViewer.FrontEnd.Models;

namespace TrxViewer.FrontEnd.Services
{
	public class JsMethods : IJsMethods
	{
		public IJSRuntime JSRuntime { get; }

		public JsMethods(IJSRuntime jsRuntime)
		{
			JSRuntime = jsRuntime;
		}

		public async Task<bool> CanShowTest()
		{
			return await JSRuntime.InvokeAsync<bool>("blazorCallbacks.canShowTest");
		}

		public async Task<bool> ShowFilePicker()
		{
			return await JSRuntime.InvokeAsync<bool>("blazorCallbacks.showFilePicker");
		}

		public async Task ShowTest(string testId)
		{
			await JSRuntime.InvokeVoidAsync("blazorCallbacks.showFilePicker", testId);
		}

		public async Task NavToTestMethod(string testId)
		{
			await JSRuntime.InvokeVoidAsync("blazorCallbacks.navToTestMethod", testId);
		}

		public async Task<UnitTestModel> GetTestModel(string testId)
		{
			return await JSRuntime.InvokeAsync<UnitTestModel>("blazorCallbacks.getTestModel", testId);
		}
		public async Task<OutputModel> GetTestResultOutputModel(string testId)
		{
			return await JSRuntime.InvokeAsync<OutputModel>("blazorCallbacks.getTestResultOutputModel", testId);
		}
	}
}