import {Flow} from "../Flow/FlowObjects";

export type Project = {
    mainTheme: MainTheme,
    mainThemeId: number,
    id: number,
    title: string,
    description: string,
    sharedplatformId: number,
    name: string
}

export type MainTheme = {
    id: number;
    subject: string;
    flows: Flow[];
    themes: SubTheme[];
}

export type SubTheme = {
    id: number;
    subject: string;
    flows: Flow[];
    mainTheme: number;
}

export type Question = {
    id: number;
    question: string;
}

export type Answer = {
    answers: string[];
    answerText: string;
}