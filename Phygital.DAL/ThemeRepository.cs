﻿/***************************************
 *                                     *
 * Created by CodeForge                *
 * Visit https://codeforge.eliasdh.com *
 *                                     *
 ***************************************/

using Data_Access_Layer.DbContext;
using Domain.ProjectLogics;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer;

public class ThemeRepository
{
    private readonly CodeForgeDbContext _context;

    public ThemeRepository(CodeForgeDbContext context)
    {
        _context = context;
    }

    public IEnumerable<MainTheme> ReadAllMainThemes()
    {
        return _context.MainThemes
            .AsNoTracking()
            .ToList();
    }

    public MainTheme ReadMainThemeById(long id)
    {
        return _context.MainThemes
            .AsNoTracking()
            .First(theme => theme.Id == id);
    }


    public SubTheme ReadSubThemeByIdWithMainTheme(long id)
    {
        return _context.SubThemes
            .AsNoTracking()
            .Include(theme => theme.MainTheme)
            .First(theme => theme.Id == id);
    }

    public IEnumerable<SubTheme> ReadSubThemesOfMainTheme(long id)
    {
        return _context.SubThemes
            .AsNoTracking()
            .Include(theme => theme.MainTheme)
            .Where(theme => theme.MainTheme.Id.Equals(id))
            .ToList();
    }

    public IEnumerable<Flow> ReadFlowsOfSubThemeById(long id)
    {
        return _context.Flows
            .AsNoTracking()
            .Include(flow => flow.Theme)
            .Where(flow => flow.Theme.Id.Equals(id))
            .ToList();
    }
}