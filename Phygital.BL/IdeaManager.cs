﻿using Data_Access_Layer;
using Domain.Accounts;
using Domain.WebApp;

namespace Business_Layer;

public class IdeaManager
{

    private readonly IdeaRepository _repo;

    public IdeaManager(IdeaRepository repo)
    {
        _repo = repo;
    }

    public Idea AddIdea(string text, WebAppUser author, Feed feed)
    {
        Idea idea = new Idea(text, author, feed);
        _repo.CreateIdea(idea);
        return idea;
    }

}