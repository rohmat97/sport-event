using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Any;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<UserController> _logger;

    public UserController(IHttpClientFactory httpClientFactory, ILogger<UserController> logger)
    {
        _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
        _logger = logger;
    }

    [HttpPost("login", Name = "Login")]
    public async Task<ActionResult<ResultLogin>> Login([FromBody] Login payload)
    {
        try
        {
            // return Ok(payload);
            // Create an HttpClient using the named client configured in Startup.cs
            using (var httpClient = _httpClientFactory.CreateClient("MyApiClient"))
            {
                // Convert User object to JSON and create a StringContent
                var jsonContent = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");

                // jsonContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                // Make the HTTP request using PostAsync
                var response = await httpClient.PostAsync("/api/v1/users/login", jsonContent);

                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    // Deserialize the JSON response to User
                    var createdUser = await response.Content.ReadFromJsonAsync<ResultLogin>();

                    // Return the result
                    return Ok(createdUser);
                }
                else
                {
                    // Log unsuccessful response details
                    _logger.LogError($"Failed to create user. Status code: {response.Content}");
                    return BadRequest($"Failed to create user. Status code: {response.StatusCode}");
                }
            }
        }
        catch (Exception ex)
        {
            // Log exception details
            _logger.LogError(ex, "An error occurred while processing the request.");
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateAccount([FromBody] CreateUser payload)
    {
        try
        {
            // return Ok(payload);
            // Create an HttpClient using the named client configured in Startup.cs
            using (var httpClient = _httpClientFactory.CreateClient("MyApiClient"))
            {
                // Convert User object to JSON and create a StringContent
                var jsonContent = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");

                // jsonContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                // Make the HTTP request using PostAsync
                var response = await httpClient.PostAsync("/api/v1/users", jsonContent);

                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    // Deserialize the JSON response to User
                    var createdUser = await response.Content.ReadFromJsonAsync<User>();

                    // Return the result
                    return Ok(createdUser);
                }
                else
                {
                    // Log unsuccessful response details
                    _logger.LogError($"Failed to create user. Status code: {response.Content}");
                    return BadRequest($"Failed to create user. Status code: {response.StatusCode}");
                }
            }
        }
        catch (Exception ex)
        {
            // Log exception details
            _logger.LogError(ex, "An error occurred while processing the request.");
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }


    [HttpGet]
    public async Task<ActionResult> GetUserDetail(
    [FromQuery] int id, [FromHeader(Name = "Authorization")] string bearerToken)
    {
        try
        {
            var httpClient = _httpClientFactory.CreateClient("MyApiClient");

            // Check if the bearerToken is not null or empty before setting it in the headers
            if (!string.IsNullOrEmpty(bearerToken))
            {
                // Remove "Bearer " prefix if present
                var accessToken = bearerToken.StartsWith("Bearer ") ? bearerToken.Substring(7) : bearerToken;

                // Add Bearer token to the request headers
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var response = await httpClient.GetAsync($"/api/v1/users/{id}");

                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    // Deserialize the JSON response to User
                    var userDetail = await response.Content.ReadFromJsonAsync<User>();
                    _logger.LogInformation("get detail success");
                    // Return the result
                    return Ok(userDetail);
                }
                else
                {
                    _logger.LogInformation("get detail failed");
                    // Handle unsuccessful response
                    return BadRequest($"Failed to create user. Status code: {response.StatusCode}");
                }
            }
            else
            {
                // Handle unsuccessful response
                return BadRequest("something problem here");
            }


        }
        catch (Exception ex)
        {
            // Handle exceptions
            return BadRequest($"An error occurred: {ex.Message}");
        }
    }



}

