using System.Net.Http.Headers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;


[ApiController]
[Route("api/[controller]")]
public class OrganizerController : ControllerBase
{

    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<UserController> _logger;

    public OrganizerController(IHttpClientFactory httpClientFactory, ILogger<UserController> logger)
    {
        _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
        _logger = logger;
    }


    [HttpGet]
    public async Task<ActionResult<RootOrganizer>> GetAllOrganizers([FromHeader(Name = "Authorization")] string bearerToken)
    {


        try
        {
            var httpClient = _httpClientFactory.CreateClient("MyApiClient");

            // Check if the bearerToken is not null or empty before setting it in the headers
            if (!string.IsNullOrEmpty(bearerToken))
            {
                _logger.LogInformation(bearerToken);
                // Remove "Bearer " prefix if present
                var accessToken = bearerToken.StartsWith("Bearer ") ? bearerToken.Substring(7) : bearerToken;

                // Add Bearer token to the request headers
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var response = await httpClient.GetAsync("/api/v1/organizers");
                _logger.LogInformation(response.ToString());
                // Check if the request was successful
                if (response.IsSuccessStatusCode)
                {
                    // Deserialize the JSON response to User
                    var userDetail = await response.Content.ReadFromJsonAsync<RootOrganizer>();
                    _logger.LogInformation("get detail success", userDetail);
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
