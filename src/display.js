const createDisplayArea = () => {
    const displayArea = document.createElement('div');
    displayArea.setAttribute('id', 'displayArea');

    return displayArea
}

// const updateDisplayArea = (newProject) => {
//     const displayArea = document.getElementById('displayArea');

//     const projectTile = document.createElement('div');
//     projectTile.classList.add('projectTile');

//     const projectHeader = document.createElement('h3');
//     // projectHeader.textContent = newProject.

//     projectTile.appendChild(projectHeader);
//     displayArea.appendChild(projectTile);

//     return displayArea
// }

// const createProjectTile = () => {
//     const projectTile = document.createElement('div');
//     projectTile.setAttribute('id', 'projectTile');
    
//     return projectTile
// }

export default createDisplayArea