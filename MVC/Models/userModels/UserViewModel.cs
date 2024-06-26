﻿namespace MVC.Models.userModels;

public class UserViewModel
{
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public IEnumerable<string> Permissions { get; set; }
}