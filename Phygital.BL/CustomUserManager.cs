﻿using Data_Access_Layer;
using Domain.Accounts;
using Domain.WebApp;

namespace Business_Layer;

public class CustomUserManager
{
    private readonly UserRepository _repo;

    public CustomUserManager(UserRepository repo)
    {
        _repo = repo;
    }

    public SpAdmin GetPlatformAdminWithSharedPlatform(string email)
    {
        return _repo.ReadPlatformAdminIncludingSharedPlatform(email);
    } 
    
    public long GetSharedPlatformId(string email)
    {
        return _repo.ReadSharedPlatformId(email);
    }
    
    public long GetRandomFeedIdForUser(string email)
    {
        return _repo.ReadRandomFeedIdFromUser(email);
    }
    
    public IEnumerable<Feed> GetFeedForUserWithProject(string email)
    {
        return _repo.ReadFeedsFromUserIncludingProject(email);
    }
}