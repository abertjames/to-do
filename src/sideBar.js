import { manageVerboseProject, manageDisplayArea } from "./display";
import { projectLibrary } from "./input";

const createSideBar = () => {
    const sideBar = document.createElement('div');
    sideBar.classList.add('sideBar');

    const homeButton = document.createElement('button');
    homeButton.textContent = 'Home';
    homeButton.addEventListener('click', () => {
        // console.log(projectLibrary)
        manageDisplayArea.regenerateDisplayArea(projectLibrary);
    });

    const todayButton = document.createElement('button');
    todayButton.textContent = 'Today';
    const weekButton = document.createElement('button');
    weekButton.textContent = 'This Week'

    sideBar.appendChild(homeButton);
    sideBar.appendChild(todayButton);
    sideBar.appendChild(weekButton);
    sideBar.appendChild(createProjectArea());

    return sideBar
}

const createProjectArea = () => {
    const projectAreaContainer = document.createElement('div');

    const projectArea = document.createElement('div');
    projectArea.setAttribute('id','projectArea');

    const projectHeading = document.createElement('span');
    projectHeading.textContent = 'Projects';

    projectAreaContainer.appendChild(projectHeading);
    projectAreaContainer.appendChild(projectArea);

    return projectAreaContainer
}

// const resetProjectArea = () => {
//     const projectArea = document.getElementById('projectArea');
//     projectArea.innerHTML = '';
// }

const addProjectButton = (project) => {
    const projectArea = document.getElementById('projectArea');

    const newProjectButton = document.createElement('button');
    newProjectButton.setAttribute('id',`${project.projectTitle}`+'-button');
    newProjectButton.textContent = project.projectTitle;

    newProjectButton.addEventListener('click', (e) => {
        const project = projectLibrary.getProject(e.target.id.slice(0,-7));
        manageVerboseProject.openVerboseProject(project);
    });
    projectArea.appendChild(newProjectButton);
}

const removeProjectButton = (project) => {
    const projectArea = document.getElementById('projectArea');
    projectArea.removeChild(document.getElementById(`${project.projectTitle}`+ '-button'));
}

//need a function to rename and re ID these 

export {createSideBar, addProjectButton, removeProjectButton}