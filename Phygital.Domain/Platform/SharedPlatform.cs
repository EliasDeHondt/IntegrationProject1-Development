using System.ComponentModel.DataAnnotations;
using Domain.Accounts;
using Domain.ProjectLogics;
using Microsoft.AspNetCore.Identity;

namespace Domain.Platform;

public class SharedPlatform
{
    public long Id { get; set; }
    [MaxLength(10485759)] public string Logo { get; set; }
    [MaxLength(150)] public string PrivacyLink { get; set; }
    [MaxLength(150)] public string OrganisationLink { get; set; }
    [MaxLength(150)] public string OrganisationName { get; set; }
    public ICollection<Project> Projects { get; set; }
    public ICollection<Facilitator> Faciliators { get; set; }
    public ICollection<SpAdmin> Admins { get; set; }

    public SharedPlatform(string logo, string privacyLink, string organisationLink, string organisationName,
        ICollection<Project> projects, ICollection<Facilitator> faciliators, ICollection<SpAdmin> admins, long id = 0) : this(organisationName, logo, id)
    {
        var buffer = new Span<byte>(new byte[logo.Length]);
        Logo = Convert.TryFromBase64String(logo, buffer, out _) ? logo : GenerateBase64(logo);
        PrivacyLink = privacyLink;
        OrganisationLink = organisationLink;
        Projects = projects;
        Faciliators = faciliators;
        Admins = admins;
    }

    public SharedPlatform(string logo, string privacyLink, string organisationLink, string organisationName,
        ICollection<Facilitator> faciliators, ICollection<SpAdmin> admins, long id = 0) : this(organisationName, logo, id)
    {
        PrivacyLink = privacyLink;
        OrganisationLink = organisationLink;
        Faciliators = faciliators;
        Admins = admins;
    }

    public SharedPlatform(string organisationName, string logo, long id = 0)
    {
        OrganisationName = organisationName;
        Id = id;
        var buffer = new Span<byte>(new byte[logo.Length]);
        Logo = Convert.TryFromBase64String(logo, buffer, out _) ? logo : GenerateBase64(logo);
        PrivacyLink = string.Empty;
        OrganisationLink = string.Empty;
        Projects = new List<Project>();
        Faciliators = new List<Facilitator>();
        Admins = new List<SpAdmin>();
    }

    public SharedPlatform()
    {
        Id = default;
        OrganisationName = string.Empty;
        Logo = string.Empty;
        PrivacyLink = string.Empty;
        OrganisationLink = string.Empty;
        Projects = new List<Project>();
        Faciliators = new List<Facilitator>();
        Admins = new List<SpAdmin>();
    }
    
    private string GenerateBase64(string path)
    {
        using MemoryStream ms = new();
        byte[] imageBytes = File.ReadAllBytes(path);
        return Convert.ToBase64String(imageBytes);
    }
}