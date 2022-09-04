const createDisplayArea = () => {
    const displayArea = document.createElement('div');
    displayArea.setAttribute('id', 'displayArea');

    return displayArea
}

const resetDisplayArea = () => {
    const displayArea = document.getElementById('displayArea');
    displayArea.innerHTML = '';
}

const updateDisplayArea = (projectLibrary) => {
    resetDisplayArea();
    const displayArea = document.getElementById('displayArea');

    for (let project of projectLibrary) {
        displayArea.appendChild(createProjectTile(project));
    }
}

// const resetProjectTile = (project) => {
//     const proj = document.getElementById(project.projectTitle);
//     proj.innerHTML = '';
// }

// const updateProjectTile = () => {
//     resetProjectTile(project);


// }

const createProjectTile = (project) => {

    const projectTile = document.createElement('div');
    projectTile.classList.add('projectTile');
    projectTile.setAttribute('id', project.projectTitle);

    const projectHeader = document.createElement('h3');
    projectHeader.textContent = project.projectTitle;
    projectHeader.classList.add("projectHeader")

    projectTile.appendChild(projectHeader);

    const itemList = document.createElement('ul');

    for (let item of project.items){
        const listItem = document.createElement('li');
        listItem.classList.add('unfinished');
        listItem.textContent = item.itemTitle;
        itemList.appendChild(listItem);
    }

    projectTile.appendChild(itemList);

    return projectTile
}

export {createDisplayArea, updateDisplayArea}