//window.onload = function() {JSONToProject();}

/*
NOTE: Projects don't load until AFTER the onload. This means that grabbing any content from them during an onload event will not work unfortunately.
*/
const finished = new Event("FinishedProjectLoading");

startLoading();

async function startLoading() {
    await JSONToProject();
    dispatchEvent(finished);
}

async function JSONToProject() {
    const fetching = await fetch("/personalProjects.json");
    const projects = await fetching.json();

    const grid = document.getElementById("personalProjects").getElementsByClassName("grid")[0];
    const projectDetails = document.getElementById("projectDetails");

    for (let project = 0; project < projects.length; project++ ) {
        
        let title = projects[project].projectTitle;
        let description = projects[project].description;
        let date = projects[project].date;
        let image = projects[project].image;
        let projectID = "project" + project;
        
        let content = "";
        if (!(projects[project].html === "")) {
            content = await (await fetch(projects[project].html)).text();
        }
        
        let onClickScript = `onclick="clickedOnProject('${projectID}')"`;

        grid.innerHTML +=
        `<div class="gridContent">
        <img src="${image}" ${onClickScript} />
        <h1>${title}</h1>
        <article ${onClickScript} >${description} <a>read more...</a></article>
        <div class="date">Date: ${date}</div>
        </div>`;

        projectDetails.innerHTML += `<div class="projectContent" id=${projectID}>${content}</div>`;
        

    }
    
}

function clickedOnProject(test) {
    document.getElementById("projectDetails").style.display = "block";
    document.getElementById(test).style.display = "block";
    //Not a huge fan of needing an external script here since JS doesn't really have good importing functions, but it keeps files nice and separated.
    fadeIn(document.getElementById("projectDetails"));
    fadeIn(document.getElementById(test));

    
}

document.getElementById("projectDetails").addEventListener("click", (event) => {
    hideContent(event);
});

function hideContent(event) {
    if (event.target.id == "projectDetails") {
        
        fadeOut(document.getElementById("projectDetails"));
        const projects = document.getElementsByClassName("projectContent");

        for (project = 0; project < projects.length; project++) {
            fadeOut(projects[project]);
        }
    }
}
