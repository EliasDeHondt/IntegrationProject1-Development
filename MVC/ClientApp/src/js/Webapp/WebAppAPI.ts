﻿import {Feed, Idea} from "../Types/WebApp/Types";

export async function GetFeed(Id: number): Promise<Feed> {
    return await fetch(`/api/Feeds/${Id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(data => {
        return data;
    })
}

export async function GetRandomFeed(): Promise<Feed> {
    return await fetch('/api/Feeds/random', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export async function GetFeedIds(): Promise<Feed[]> {
    return await fetch('/api/Feeds/ids', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}

export async function CreateIdea(idea: Idea, feedId: number): Promise<Idea> {
    return await fetch(`/api/Ideas/createIdea/${feedId}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(idea)
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
}