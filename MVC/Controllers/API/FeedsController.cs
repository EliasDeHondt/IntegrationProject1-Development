﻿using System.Security.Claims;
using Business_Layer;
using Domain.Accounts;
using Domain.WebApp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MVC.Models.feedModels;

namespace MVC.Controllers.API;

[ApiController]
[Route("api/[controller]")]
public class FeedsController : Controller
{

    private readonly FeedManager _manager;
    private readonly CustomUserManager _userManager;
    private static readonly Random Rng = new();
    private readonly UnitOfWork _uow;

    public FeedsController(FeedManager feedManager, CustomUserManager userManager, UnitOfWork uow)
    {
        _manager = feedManager;
        _userManager = userManager;
        _uow = uow;
    }
    
    [HttpGet("{id}")]
    public IActionResult GetFeed(long id)
    {
        try
        {
            var feed = _manager.GetFeedFromIdWithIdeas(id);

            var ideas = CreateIdeaModels(feed.Ideas);

            var shuffledIdeas = ideas.OrderBy(_ => Rng.Next()).ToList();
        
            var feedModel = new FeedModel
            {
                Id = feed.Id,
                Ideas = shuffledIdeas,
                Title = feed.Project.Title
            };

            return Ok(feedModel);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500);
        }
    }

    [HttpGet("random")]
    [Authorize(Roles = UserRoles.Respondent)]
    public IActionResult GetRandomFeedForUser()
    {
        try
        {
            var randomId = _userManager.GetRandomFeedIdForUser(User.FindFirstValue(ClaimTypes.Email)!);
            return RedirectToAction("GetFeed", new { id = randomId});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500);
        }
    }
    
    [HttpGet("ids")]
    [Authorize(Roles = UserRoles.Respondent)]
    public IActionResult GetFeedIdsForUser()
    {
        try
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            IEnumerable<Feed> feeds = new List<Feed>();
            if (email != null)
            {
                feeds = _userManager.GetFeedForUserWithProject(email);
            }
        
            return Ok(feeds.Select(feed => new FeedModel
            {
                Title = feed.Project.Title,
                Id = feed.Id
            }));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500);
        }
    }

    [HttpPost("subscribe/{id}")]
    public IActionResult Subscribe(long id)
    {
        
        _uow.BeginTransaction();

        _userManager.SubscribeToFeed(id, User.FindFirstValue(ClaimTypes.Email)!);
        
        _uow.Commit();
        
        return Ok();
    }
    
    [HttpDelete("unsubscribe/{id}")]
    public IActionResult Unsubscribe(long id)
    {
        _uow.BeginTransaction();

        _userManager.UnsubscribeToFeed(id, User.FindFirstValue(ClaimTypes.Email)!);
        
        _uow.Commit();
        
        return Ok();
    }
    
    private List<IdeaModel> CreateIdeaModels(ICollection<Idea> ideas)
    {
        return ideas.Select(idea => new IdeaModel
        {
            Id = idea.Id,
            author = new AuthorModel
            {
                Email = idea.Author?.Email,
                Name = idea.Author?.UserName!
            },
            likes = idea.Likes.Select(like => new LikeModel
            {
                liker = new AuthorModel
                {
                    Email = like.WebAppUser.Email!,
                    Name = like.WebAppUser.UserName!
                }
            }),
            Text = idea.Text,
            image = idea.Image?.Base64
        }).ToList();
    }
    
}