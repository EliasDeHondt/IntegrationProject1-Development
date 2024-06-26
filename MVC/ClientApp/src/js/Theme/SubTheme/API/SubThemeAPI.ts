﻿import {Flow} from "../../../Flow/FlowObjects";
import {showFlows} from "../../../Project/API/CreateProjectFlowAPI";

export async function loadFlowsSub(id: number): Promise<Flow[]> {
    return await fetch(`/api/SubThemes/${id}/Flows`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => console.error("Error:", error))
}

export async function updateSubTheme(id: number, subject: string) {
    await fetch(`/api/SubThemes/UpdateSubTheme/${id}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            subject: subject
        })
    })
}

export async function createSubthemeFlow(flowtype:string,projectId: number) {
    try {
        const response = await fetch("/api/SubThemes/CreateSubthemeFlow/" + flowtype + "/" + projectId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            console.log("Flow made successfully.");
        } else {
            console.error("Failed to make new flow.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export function resetFlowsSub(flows: Flow[], flowcontainer: HTMLDivElement){
    let length = flowcontainer.children.length
    for (let i = length - 1; i > 0; i--){
        flowcontainer.children[i].remove();
    }
    showFlows(flows, "forSubtheme",flowcontainer);
}