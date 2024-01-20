

public class User
{
    public required int id { get; set; }
    public required string firstname { get; set; }
    public required string lastname { get; set; }
    public required string email { get; set; }
    // Add more user properties as needed
}



public class CreateUser
{
    public required string firstName { get; set; }
    public required string lastName { get; set; }
    public required string email { get; set; }
    public required string password { get; set; }
    public required string repeatPassword { get; set; }
    // Add more user properties as needed
}

public class Login
{
    public required string email { get; set; }
    public required string password { get; set; }
    // Add more user properties as needed
}
public class ResultLogin
{

    public required string email { get; set; }
    public required string token { get; set; }
    public required int id { get; set; }
    // Add more user properties as needed
}
