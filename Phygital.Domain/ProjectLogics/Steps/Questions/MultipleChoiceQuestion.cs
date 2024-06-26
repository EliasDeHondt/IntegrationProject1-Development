﻿/***************************************
 *                                     *
 * Created by CodeForge                *
 * Visit https://codeforge.eliasdh.com *
 *                                     *
 ***************************************/

using System.ComponentModel.DataAnnotations;
using Domain.ProjectLogics.Steps.Questions.Answers;

namespace Domain.ProjectLogics.Steps.Questions;

public class MultipleChoiceQuestion : ChoiceQuestionBase
{

    public MultipleChoiceQuestion(string question, ICollection<Choice> choices, ICollection<ChoiceAnswer> answers, long id = 0) : base(answers, question, choices, id)
    {
    }

    public MultipleChoiceQuestion(string question, long id = 0) : base(question, new List<Choice>(), id)
    {
        
    }
    
    public MultipleChoiceQuestion()
    {
    }
}