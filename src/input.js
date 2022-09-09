import {updateProjectArea} from "./sideBar";
import {addToDisplayArea, addToProjectTile} from "./display"

class Item {
    constructor(
        itemTitle = "unknown",
        projectTitle = "unknown",
        itemDueDate = "unknown",
        itemDescription = "unknown",
        itemCompletion = 'unknown',
        itemID = 'unknown'
    ){
        this.itemTitle = itemTitle
        this.projectTitle = projectTitle
        this.itemDueDate = itemDueDate
        this.itemDescription = itemDescription
        this.itemCompletion = itemCompletion
        this.itemID = itemID
    }
}

class Project {
    constructor(        
        projectTitle = 'unknown'
    ){
        this.items = [];
        this.projectTitle = projectTitle;
    }
    addItem(newItem) {
        if (!this.isInProject(newItem)) {
            // might not even want to check if another item by the same name exist because you could want
            // to do the same task multiple times 
        this.items.push(newItem)
        }
        // this.items.push(newItem)
    }
  
    removeItem(itemTitle) {
        this.items = this.items.filter((item) => item.itemTitle !== itemTitle)
    }
  
    getItem(itemTitle) {
        return this.items.find((item) => item.itemTitle === itemTitle)
    }
  
    isInProject(newItem) {
        return this.items.some((item) => item.itemTitle === newItem.itemTitle)
    }
}

class ProjectLibrary {
    constructor() {
        this.projects = []
    }
  
    addProject(newProject) {
        if (!this.isInProjectLibrary(newProject)) {
        this.projects.push(newProject)
        }
    }
  
    removeProject(projectTitle) {
        this.projects = this.projects.filter((project) => project.projectTitle !== projectTitle)
    }
  
    getProject(projectTitle) {
        return this.projects.find((project) => project.projectTitle === projectTitle)
    }
  
    isInProjectLibrary(projectTitle) {
        return this.projects.some((project) => project.projectTitle === projectTitle)
    }
}

const projectLibrary = new ProjectLibrary()

const createInputBar = () => {
    const newItemBar = document.createElement('div');
    newItemBar.classList.add('newItemBar');

    newItemBar.appendChild(createInputForm());
    return newItemBar
}

const titleInput = () => {
    const newItemInput = document.createElement('input')
    newItemInput.type = "text";
    newItemInput.name = 'itemTitle';
    newItemInput.id = 'itemTitle';
    newItemInput.placeholder = 'Title';

    return newItemInput
}

const projectInput = () => {
    const newProjectInput = document.createElement('input');
    newProjectInput.type = 'text';
    newProjectInput.name = 'projectTitle';
    newProjectInput.id = 'projectTitle';
    newProjectInput.placeholder = 'Project';
    
    return newProjectInput
}

const dueDateInput = () => {
    const dueDate = document.createElement('input');
    dueDate.type = 'date';
    dueDate.name = 'dueDate';
    dueDate.id = 'dueDate';

    return dueDate
}

const descriptionInput = () => {
    const description = document.createElement('textarea');
    description.name = 'itemDescription';
    description.id = 'itemDescription';
    description.cols = '30';
    description.rows = '10';
    description.placeholder = 'Description';

    return description
}

const createAddButton = () => {
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Item';
    addButton.type = 'submit';
    return addButton
}

const createItemFromInput = () => {

    const itemTitle = document.getElementById('itemTitle').value;
    const projectTitle = document.getElementById('projectTitle').value.toUpperCase();
    const dueDate = document.getElementById('dueDate').value;
    const itemDescription = document.getElementById('itemDescription').value;

    inputForm.reset();

    return new Item(itemTitle, projectTitle, dueDate, itemDescription, false, 'unknown')
}

// const getItemID = (projectTitle) => {
//     itemID = `${projectTitle}`+`-${projectLibrary.getProject(projectTitle).items.length}`;
//     console.log(newItem.itemID);
//     console.log(`${projectTitle}`+`-${projectLibrary.getProject(projectTitle).items.length}`);
//     return itemID
// }

const addItem = (e) => {
    e.preventDefault();

    const newItem = createItemFromInput();

    if (newItem.itemTitle == '' || newItem.projectTitle == '') {
        return
    } else if (projectLibrary.isInProjectLibrary(newItem.projectTitle)){
        newItem.itemID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).items.length}`;
        projectLibrary.getProject(newItem.projectTitle).addItem(newItem);
        addToProjectTile(newItem);

    } else if (!projectLibrary.isInProjectLibrary(newItem.projectTitle)){
        const project = new Project(newItem.projectTitle);
        projectLibrary.addProject(project);
        newItem.itemID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).items.length}`;
        project.addItem(newItem)
        
        addToDisplayArea(project);
        addToProjectTile(newItem);
        //change this too
        updateProjectArea(projectLibrary.projects);
    }
}

const createClearButton = () => {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        inputForm.reset();
    })
    return clearButton
}

const createInputForm = () => {
    const inputForm = document.createElement('form');
    inputForm.classList.add('newItemForm');
    inputForm.setAttribute('id','inputForm');
    inputForm.onsubmit = addItem;

    const newItemHeader = document.createElement('p');
    newItemHeader.textContent = 'Add New Item'

    inputForm.appendChild(newItemHeader);

    inputForm.appendChild(titleInput());
    inputForm.appendChild(projectInput());
    inputForm.appendChild(dueDateInput());
    inputForm.appendChild(descriptionInput());
    inputForm.appendChild(createAddButton());
    inputForm.appendChild(createClearButton());

    return inputForm
}


export default createInputBar