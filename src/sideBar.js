import { manageVerboseProject, manageDisplayArea, manageDateWindow } from "./display";
import { projectLibrary } from "./input";

const manageSideBar = (() => {
    const createSideBar = () => {
        const sideBar = document.createElement('div');
        sideBar.classList.add('sideBar');
    
        const homeButton = document.createElement('button');
        homeButton.textContent = 'Home';
        homeButton.classList.add('button');
        homeButton.addEventListener('click', () => {
            manageDisplayArea.regenerateDisplayArea(projectLibrary);
        });
    
        const todayButton = document.createElement('button');
        todayButton.textContent = 'Today';
        todayButton.classList.add('button');
        todayButton.addEventListener('click', () => {
            manageDateWindow.openDateWindow(0);
        })

        const weekButton = document.createElement('button');
        weekButton.textContent = 'This Week';
        weekButton.classList.add('button');
        weekButton.addEventListener('click', () => {
            manageDateWindow.openDateWindow(7);
        });
    
        sideBar.appendChild(homeButton);
        sideBar.appendChild(todayButton);
        sideBar.appendChild(weekButton);
        sideBar.appendChild(_createProjectArea());
    
        return sideBar
    }
    
    const _createProjectArea = () => {
        const projectAreaContainer = document.createElement('div');
    
        const projectArea = document.createElement('div');
        projectArea.setAttribute('id','projectArea');
    
        const projectHeading = document.createElement('h3');
        projectHeading.classList.add('projectHeading')
        projectHeading.textContent = 'Projects';
    
        projectAreaContainer.appendChild(projectHeading);
        projectAreaContainer.appendChild(projectArea);
    
        return projectAreaContainer
    }
    
    const _resetProjectArea = () => {
        const projectArea = document.getElementById('projectArea');
        projectArea.innerHTML = '';
    }
    
    const regenerateProjectArea = (projectLibrary) => {
        _resetProjectArea();
        // const projectArea = document.getElementById('pojectArea'); 
        for (let project of projectLibrary.projects){
            _addProjectButton(project)
        }
    }
    
    const _addProjectButton = (project) => {
        const projectArea = document.getElementById('projectArea');
    
        const newProjectButton = document.createElement('button');
        newProjectButton.setAttribute('id',`${project.title}`+'-button');
        newProjectButton.textContent = project.title;
        newProjectButton.classList.add('button');

        newProjectButton.addEventListener('click', (e) => {
            const project = projectLibrary.getProject(e.target.id.slice(0,-7));
            manageVerboseProject.openVerboseProject(project);
        });
        projectArea.appendChild(newProjectButton);
    }
    
    // const removeProjectButton = (project) => {
    //     const projectArea = document.getElementById('projectArea');
    //     projectArea.removeChild(document.getElementById(`${project.projectTitle}`+ '-button'));
    // }

    return {createSideBar, regenerateProjectArea}
})();

export {manageSideBar}