// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
public class DatumSportEvent
{
    public string eventDate { get; set; }
    public string eventName { get; set; }
    public string eventType { get; set; }
    public int id { get; set; }
    public OrganizerSportEvent organizer { get; set; }
}

public class LinksRootSportEvent
{
    public string next { get; set; }
}

public class MetaSportEvent
{
    public PaginationSportEvent pagination { get; set; }
}

public class OrganizerSportEvent
{
    public int id { get; set; }
    public string imageLocation { get; set; }
    public string organizerName { get; set; }
}

public class PaginationSportEvent
{
    public int total { get; set; }
    public int count { get; set; }
    public int per_page { get; set; }
    public int current_page { get; set; }
    public int total_pages { get; set; }
    public Links links { get; set; }
}

public class RootSportEvent
{
    public List<DatumSportEvent> data { get; set; }
    public MetaSportEvent meta { get; set; }
}

