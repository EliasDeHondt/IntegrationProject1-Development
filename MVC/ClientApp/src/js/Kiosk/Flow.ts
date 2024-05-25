﻿import * as kiosk from "./Kiosk";
import * as signalR from "@microsoft/signalr";
import {Modal} from "bootstrap";
import {clockTimer, stepTimer} from "../Flow/StepAPI";
import {generateQrCode} from "../Util";
import {GetFlowsForProject} from "./FlowAPI";
import {setProjectId} from "../Flow/FlowTypeModal";
import * as stepAPI from "../Flow/StepAPI";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

const currFlow = document.getElementById("flowId") as HTMLSpanElement;
const modal = new Modal(document.getElementById("pausedFlowModal") as HTMLDivElement, {
    backdrop: 'static',
    keyboard: false
});

let currStateOfFlow = "";
let projectId: number = 0;

const qrcode = document.getElementById("qrcode") as HTMLImageElement;

document.addEventListener("DOMContentLoaded", async () => {
    await connection.start().then(() => {
        connection.invoke("JoinConnection", kiosk.code).then(() => {
            connection.invoke("ActivateFlow", kiosk.code, currFlow.innerText)
        })
    });
})



connection.on("ReceiveFlowUpdate", async (id, state) => {
    currStateOfFlow = state;
    if (currStateOfFlow.toLowerCase() == "paused") {
        modal.show()
        stepAPI.stepTimer.pause();
        stepAPI.clockTimer.pause();
    } else {
        modal.hide()
        stepAPI.stepTimer.resume();
        stepAPI.clockTimer.resume();
    }
})

connection.on("FlowActivated", (id) => {
    window.location.href = `/Flow/Step/${id}`
})

connection.on("CurrentFlowRestarted", async () => {
    await stepAPI.restartFlow()
})

connection.on("ReceiveProjectId", (id) => {
    projectId = id;
    let url: string = window.location.hostname;
    generateQrCode(url + `/WebApp/Feed/${projectId}`).then(qr => {
        qrcode.src += qr.replace(new RegExp("\"", 'g'), "");
    })
})