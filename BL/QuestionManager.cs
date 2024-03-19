﻿using Data_Access_Layer;
using Domain.ProjectLogics.Steps.Questions;

namespace Business_Layer;

public class QuestionManager
{
    private readonly QuestionRepository _repo;

    public QuestionManager(QuestionRepository repo)
    {
        _repo = repo;
    }
    
    public QuestionBase GetQuestionByStep(long flowId, int stepNumber)
    {
        return _repo.ReadQuestionFromStep(flowId, stepNumber);
    }

    public IEnumerable<Choice> GetChoicesForQuestion(long questionId)
    {
        return _repo.ReadChoicesForQuestion(questionId);
    }
    
    
}