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
    const projectArea = document.createElement('div');
    projectArea.setAttribute('id','projectArea');
    const projectHeading = document.createElement('span');
    projectHeading.textContent = 'Projects';

    projectArea.appendChild(projectHeading);

    return projectArea
}

// const updateProjectArea = (projTitle) => {
//     const projectArea = document.getElementById('projectArea');

//     const newProjectButton = document.createElement('button');
//     newProjectButton.textContent = projTitle;

//     projectArea.appendChild(newProjectButton);
//     return projectArea
// }

// export {createSideBar, updateProjectArea};

export default createSideBar