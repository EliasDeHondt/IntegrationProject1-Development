﻿import "./CreateSubThemeModal";
import {
    CheckNotEmpty, createProjectFlow,
    fillExisting,
    getIdProject,
    getProjectWithId, loadFlowsProject, resetFlowsProject,
    SetProject,
} from "./API/ProjectAPI";
import {generateCards, getSubThemesForProject, resetCards} from "./API/SubThemeAPI";
import {loadFlows, showFlows} from "../Theme/SubTheme/API/SubThemeAPI";
import {GetFlows} from "../CreateFlow/FlowCreator";
import {Modal, Toast} from "bootstrap";

let inputTitle = (document.getElementById("inputTitle") as HTMLInputElement);
let inputText = (document.getElementById("inputText") as HTMLInputElement);
const btnPublishProject = document.getElementById("btnPublishProject") as HTMLButtonElement;
const subThemeRoulette = document.getElementById("carouselContainer") as HTMLDivElement;
// load flows for project
const parts = window.location.pathname.split('/');
const projectIdString = parts[parts.length - 1]; //laatste
const projectId = parseInt(projectIdString, 10);

const projectFlowToast = new Toast(document.getElementById("projectFlowToast")!);

const flowContainer = document.getElementById("flow-cards") as HTMLDivElement;
const btnCreateFlowProject = document.getElementById("btnCreateFlowProject") as HTMLButtonElement;
const butCancelCreateprojFlow = document.getElementById('butCancelCreateprojFlow') as HTMLButtonElement;
const butCloseCreateprojFlow = document.getElementById('butCloseCreateprojFlow') as HTMLButtonElement;
const butConfirmCreateprojFlow = document.getElementById('butConfirmCreateprojFlow') as HTMLButtonElement;

const linear = document.getElementById("linear") as HTMLInputElement;
const circular = document.getElementById("circular") as HTMLInputElement;

const projFlowModal = new Modal(document.getElementById('createprojFlowModal')!, {
    keyboard: false,
    focus: true,
    backdrop: "static"
});

btnCreateFlowProject.onclick = async() => {
    projFlowModal.show();
    function reset() {
        loadFlowsProject(getIdProject())
            .then(flows => resetFlowsProject(flows, flowContainer));
    }
    butConfirmCreateprojFlow.onclick = async() => {
        let flowtype = ""
        if(linear.checked){
            flowtype = "Linear"
        }else if(circular.checked){
            flowtype = "Circular"
        }else{
            
        }
        createProjectFlow(flowtype,getIdProject()).then(() => {
            projectFlowToast.show()
            let closeProjectFlowToast = document.getElementById("closeProjectFlowToast") as HTMLButtonElement
            closeProjectFlowToast.onclick = () => projectFlowToast.hide()
        }).then(() =>{
            projFlowModal.hide();
            reset();
        });
    }
    butCancelCreateprojFlow.onclick = function () {
        projFlowModal.hide();
    };
    butCloseCreateprojFlow.onclick = function () {
        projFlowModal.hide();
    };
}



document.addEventListener("DOMContentLoaded", async function () {
    // loadFlowsProject(getIdProject()).then(flows => {
    //     showFlows(flows,"forProject");
    // })
    
    const projectIdNumber = getIdProject();
    const project = await getProjectWithId(projectIdNumber);
    fillExisting(project, inputTitle, inputText);
    getSubThemesForProject(project.id).then(subThemes => generateCards(subThemes, subThemeRoulette));
    btnPublishProject.onclick = function () {
        if (CheckNotEmpty(inputTitle, "Title", "errorMsgTitle")) {
            SetProject(project.id, inputTitle.value, inputText.value);
        }
    }

    
});

