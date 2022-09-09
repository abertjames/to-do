const createDisplayArea = () => {
    const displayArea = document.createElement('div');
    displayArea.setAttribute('id', 'displayArea');

    return displayArea
}

// const resetDisplayArea = () => {
//     const displayArea = document.getElementById('displayArea');
//     displayArea.innerHTML = '';
// }

// const updateDisplayArea = (projectLibrary) => {
//     resetDisplayArea();
//     const displayArea = document.getElementById('displayArea');

//     for (let project of projectLibrary) {
//         displayArea.appendChild(createProjectTile(project));
//     }
// }

////////
const addToDisplayArea = (project) => {
    const displayArea = document.getElementById('displayArea');
    displayArea.appendChild(createProjectTile(project));
}

const removeFromDisplayArea = (project) => {
    const displayArea = document.getElementById('displayArea');
    displayArea.removeChild(document.getElementById(project.projectTitle));
}

const addToProjectTile = (item) => {
    const projectTile = document.getElementById(item.projectTitle);
    projectTile.appendChild(createItem(item));
}

const removeFromProjectTile = (item) => {
    const projectTile = document.getElementById(item.projectTitle);
    //get index of the item here. or give it an id of index - project name something 
    projectTile.removeChild(document.getElementById())
}


// const resetProjectTile = (project) => {
//     const itemList = document.getElementById(project.projectTitle);
//     itemList.innerHTML = '';
// }

// const updateProjectTile = (project) => {
//     resetProjectTile(project);
//     const itemList = document.getElementById(project.projectTitle);

//     for (let item of project.items){
//         const listItem = document.createElement('li');
//         listItem.textContent = item.itemTitle;
//         itemList.appendChild(listItem);
//     }

// }

// const createLineItem = (project) => {
//     const itemList = document.createElement('div');
//     itemList.classList.add('list');
//     itemList.setAttribute('id', project.projectTitle);

//     for (let item of project.items){
//         const listItem = document.createElement('li');

//         const checkboxIcon = document.createElement('img');
//         const editIcon = document.createElement('img');
//         const trashIcon = document.createElement('img');
//         checkboxIcon.classList.add('icon');
//         editIcon.classList.add('icon');
//         trashIcon.classList.add('icon');
//         editIcon.src = '../dist/icons/text-box-edit-outline.svg';
//         trashIcon.src = '../dist/icons/trash-can-outline.svg';

//         if (!item.itemCompletion){
//             checkboxIcon.src = '../dist/icons/checkbox-blank-outline.svg';
//         } else {
//             checkboxIcon.src = '../dist/icons/checkbox-outline.svg';
//         }

//         listItem.appendChild(checkboxIcon);
//         const itemName = document.createElement('span');
//         itemName.textContent = item.itemTitle;
//         listItem.appendChild(itemName);
//         listItem.appendChild(editIcon);
//         listItem.appendChild(trashIcon);
//         itemList.appendChild(listItem);
//     }
// }

const createItem = (item) => {
    const listItem = document.createElement('div');
    listItem.classList.add('itemDiv');
    listItem.setAttribute('id', item.itemID)

    const checkboxIcon = document.createElement('img');
    const editIcon = document.createElement('img');
    const trashIcon = document.createElement('img');
    checkboxIcon.classList.add('icon');
    editIcon.classList.add('icon');
    trashIcon.classList.add('icon');
    editIcon.src = '../dist/icons/text-box-edit-outline.svg';
    trashIcon.src = '../dist/icons/trash-can-outline.svg';

    checkboxIcon.src = '../dist/icons/checkbox-blank-outline.svg';

    listItem.appendChild(checkboxIcon);
    const itemName = document.createElement('span');
    itemName.textContent = item.itemTitle;
    listItem.appendChild(itemName);
    listItem.appendChild(editIcon);
    listItem.appendChild(trashIcon);

    return listItem
}

const createProjectTile = (project) => {

    const projectTile = document.createElement('div');
    projectTile.classList.add('projectTile');
    projectTile.setAttribute('id', project.projectTitle);

    const projectHeader = document.createElement('h3');
    projectHeader.textContent = project.projectTitle;
    projectHeader.classList.add("projectHeader")

    projectTile.appendChild(projectHeader);

    return projectTile
}

export {createDisplayArea, addToDisplayArea, addToProjectTile}