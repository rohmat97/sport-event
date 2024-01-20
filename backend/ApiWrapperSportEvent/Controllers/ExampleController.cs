using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ExampleController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public ExampleController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
    }

    [HttpGet]
    public async Task<IActionResult> GetWeatherData()
    {
        try
        {
            // Create an HttpClient using the named client configured in Startup.cs
            var httpClient = _httpClientFactory.CreateClient("MyApiClient");

            // Replace with your actual API endpoint
            string apiUrl = "https://jsonplaceholder.typicode.com/todos/1";

            // Make the HTTP request
            var response = await httpClient.GetAsync(apiUrl);

            // Check if the request was successful
            if (response.IsSuccessStatusCode)
            {
                // Deserialize the JSON response
                var result = await response.Content.ReadFromJsonAsync<Todo>();

                // Return the result
                return Ok(result);
            }
            else
            {
                // Handle unsuccessful response
                return BadRequest($"Failed to fetch data. Status code: {response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            // Handle exceptions
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }
}

