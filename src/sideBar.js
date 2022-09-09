const createSideBar = () => {
    const sideBar = document.createElement('div');
    sideBar.classList.add('sideBar');

    const homeButton = document.createElement('button');
    homeButton.textContent = 'Home';
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

const resetProjectArea = () => {
    const projectArea = document.getElementById('projectArea');
    projectArea.innerHTML = '';
}

// maybe make this an un ordered list 
const updateProjectArea = (projectLibrary) => {
    resetProjectArea();
    const projectArea = document.getElementById('projectArea');

    for (let project of projectLibrary){
        const newProjectButton = document.createElement('button');
        newProjectButton.textContent = project.projectTitle;
        projectArea.appendChild(newProjectButton);
    }
    
    return projectArea
}


export {createSideBar, updateProjectArea}