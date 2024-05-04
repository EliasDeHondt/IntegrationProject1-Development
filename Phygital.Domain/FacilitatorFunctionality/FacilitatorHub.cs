﻿using Domain.ProjectLogics;
using Microsoft.AspNetCore.SignalR;

namespace Domain.FacilitatorFunctionality;

public class FacilitatorHub : Hub
{
    public async Task JoinConnection(string code) =>
        await Groups.AddToGroupAsync(Context.ConnectionId, code);
    
    public async Task SendFlowUpdate(string code, string id, string state) =>
        await Clients.OthersInGroup(code).SendAsync("ReceiveFlowUpdate", id, state);
    
    public async Task ActivateFlow(string code, string id) =>
        await Clients.OthersInGroup(code).SendAsync("FlowActivated", id);
    
    public async Task DeactivateFlow(string code) =>
        await Clients.OthersInGroup(code).SendAsync("FlowDeactivated");
}