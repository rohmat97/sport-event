// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
public class Datum
{
    public int id { get; set; }
    public string organizerName { get; set; }
    public string imageLocation { get; set; }
}

public class Links
{
    public string next { get; set; }
}

public class Meta
{
    public Pagination pagination { get; set; }
}

public class Pagination
{
    public int total { get; set; }
    public int count { get; set; }
    public int per_page { get; set; }
    public int current_page { get; set; }
    public int total_pages { get; set; }
    public Links links { get; set; }
}

public class RootOrganizer
{
    public List<Datum> data { get; set; }
    public Meta meta { get; set; }
}

