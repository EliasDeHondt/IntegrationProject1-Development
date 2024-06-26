﻿using Domain.ProjectLogics;
using Microsoft.AspNetCore.SignalR;

namespace Domain.FacilitatorFunctionality;

public class FacilitatorHub : Hub
{
    public async Task JoinConnection(string code)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, code);
        await Clients.OthersInGroup(code).SendAsync("UserJoinedConnection");
    }


    public async Task LeaveConnection(string user, string code)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, code);
        await Clients.Group(code).SendAsync("UserLeftConnection", $"{user} disconnected from connection #{code}!");
    }

    public async Task SendFlowUpdate(string code, string id, string state) =>
        await Clients.OthersInGroup(code).SendAsync("ReceiveFlowUpdate", id, state);

    public async Task ActivateFlow(string code, string id) =>
        await Clients.OthersInGroup(code).SendAsync("FlowActivated", id);

    public async Task DeactivateFlow(string code) =>
        await Clients.OthersInGroup(code).SendAsync("FlowDeactivated");

    public async Task SendSelectedFlowIds(string code, long[] ids, string flowType) =>
        await Clients.Group(code).SendAsync("ReceiveSelectedFlowIds", ids, flowType);

    public async Task SendProjectId(string code, long projectId) =>
        await Clients.OthersInGroup(code).SendAsync("ReceiveProjectId", projectId);

    public async Task OngoingFlow(string code, bool isOngoing) =>
        await Clients.OthersInGroup(code).SendAsync("ReceiveOngoingFlow", isOngoing);

    public async Task SendCurrentStep(string code, int stepNr) =>
        await Clients.OthersInGroup(code).SendAsync("ReceiveCurrentStep", stepNr);

    public async Task RestartCurrentFlow(string code) =>
        await Clients.OthersInGroup(code).SendAsync("CurrentFlowRestarted");
}