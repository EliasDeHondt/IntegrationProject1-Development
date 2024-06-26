﻿/***************************************
 *                                     *
 * Created by CodeForge                *
 * Visit https://codeforge.eliasdh.com *
 *                                     *
 ***************************************/

using Data_Access_Layer;
using Domain.Accounts;
using Domain.FacilitatorFunctionality;
using Domain.Platform;
using Domain.ProjectLogics;

namespace Business_Layer;

public class ProjectManager
{

    private readonly ProjectRepository _repo;
    

    public ProjectManager(ProjectRepository repo)
    {
        _repo = repo;
    }

    public IEnumerable<Project> GetAllProjectsFromIds(IEnumerable<long> ids)
    {
        return _repo.ReadProjectsFromIds(ids);
    }

    public Project GetProject(long id)
    {
        return _repo.ReadProject(id);
    }

    public IEnumerable<Project> GetAllProjectsForSharedPlatformWithMainTheme(long platformId)
    {
        return _repo.ReadAllProjectsForSharedPlatformIncludingMainTheme(platformId);
    }
    
    public void AddProjectOrganizer(Facilitator facilitator, Project project)
    {
        var projectOrganizer = new ProjectOrganizer(project, facilitator);
        _repo.CreateProjectOrganizer(projectOrganizer);
    }

    public void UpdateProject(MainTheme mainTheme,SharedPlatform sharedPlatform,long id)
    {
        _repo.CreateProject(mainTheme,sharedPlatform,id);
    }
    public void CreateProject(Project project)
    {
        _repo.CreateProject(project);
    }

    public IEnumerable<Project> ProjectCount()
    {
        return _repo.ReadProjectCount();
    }
    public IEnumerable<Project> GetPossibleProjectsForFacilitator(string email)
    {
        return _repo.ReadPossibleProjectsForFacilitator(email);
    }

    public IEnumerable<Project> GetAssignedProjectsForFacilitator(string email)
    {
        return _repo.ReadAssignedProjectsForFacilitator(email);
    }

    public void DeleteProjectOrganizer(Facilitator user, Project project)
    {
        _repo.DeleteProjectOrganizer(user, project);
    }

    public Project GetProjectWithId(long id)
    {
        return _repo.ReadProjectWithId(id);
    }

    public Project GetProjectWithSharedPlatformAndMainTheme(long id)
    {
        return _repo.ReadProjectIncludingSharedPlatformAndMainTheme(id);
    }

    public void ChangeProject(long id, string title, string description)
    {
        _repo.UpdateProject(id, title, description);
    }

    public Project GetProjectThroughMainTheme(long id)
    {
        return _repo.ReadProjectThroughMainTheme(id);
        
    }
    
    public IEnumerable<Flow> GetFlowsForProjectById(long projectId)
    {
        return _repo.ReadFlowsForProjectById(projectId);
    }
    
    public Flow CreateFlowForProject(FlowType type, long themeId)
    {
        return _repo.CreateFlowForProject(type,themeId);
    }

    public IEnumerable<Flow> GetNotesForProjectById(long id)
    {
        return _repo.ReadNotesForProjectById(id);
    }

    public int GetRespondentCountFromProject(long id)
    {
        return _repo.ReadRespondentCountFromProject(id);
    }

    public int GetFlowCountFromProject(long id)
    {
        return _repo.ReadFlowCountFromProject(id);
    }

    public int GetSubThemeCountFromProject(long id)
    {
        return _repo.ReadSubThemeCountFromProject(id);
    }
    public void UpdateProjectClosed(long id, bool closeProject)
    { 
        _repo.UpdateProjectClosed(id, closeProject);
    }
    public bool GetProjectClosed(long id)
    { 
        return _repo.ReadProjectClosed(id);
    }
}