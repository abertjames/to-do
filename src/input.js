import {manageDisplayArea} from "./display";
import {manageSideBar} from "./sideBar";
import {saveLocal, retrieveLocal} from "./storage"

class Item {
    constructor(
        title = "unknown",
        projectTitle = "unknown",
        itemDueDate = "unknown",
        itemDescription = "unknown",
        itemCompletion = 'unknown',
        ID = 'unknown',
    ){
        this.title = title
        this.projectTitle = projectTitle
        this.itemDueDate = itemDueDate
        this.itemDescription = itemDescription
        this.itemCompletion = itemCompletion
        this.ID = ID
        this.type = 'item'
    }
}

class Project {
    constructor(        
        title = 'unknown',
    ){
        this.items = [];
        this.IDAssigner = -1;
        this.ID = title;
        this.title = title;
        this.type = 'project';
    }

    giveID() {
        this.IDAssigner +=1;
        return this.IDAssigner
    }
    addItem(newItem) {
        this.items.push(newItem)
    }
    removeItem(itemID) {
        this.items = this.items.filter((item) => item.ID !== itemID)
    }
    getItem(itemID) {
        return this.items.find((item) => item.ID === itemID);
    }
    isInProject(itemID){
        return this.items.some((item) => item.ID === itemID)
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
        this.projects = this.projects.filter((project) => project.title !== projectTitle)
    }
    getProject(projectTitle) {
        return this.projects.find((project) => project.title === projectTitle)
    }
    getItem(itemID){
        for (let project of this.projects){
            if (project.isInProject(itemID)){
                return project.getItem(itemID)
            }
        }
    }
    isInProjectLibrary(projectTitle) {
        return this.projects.some((project) => project.title === projectTitle)
    }
}

const projectLibrary = new ProjectLibrary()


const createInput = (() => {

    const _titleInput = () => {
        const newItemInput = document.createElement('input')
        newItemInput.type = "text";
        newItemInput.id = 'itemInput';
        newItemInput.placeholder = 'Title';
        newItemInput.required = true;
    
        return newItemInput
    }
    
    const _projectInput = () => {
        const newProjectInput = document.createElement('input');
        newProjectInput.type = 'text';
        newProjectInput.id = 'projectInput';
        newProjectInput.placeholder = 'Project';
        newProjectInput.required = true;
        newProjectInput.style = "text-transform: uppercase;"
        
        return newProjectInput
    }
    
    const _dueDateInput = () => {
        const dueDate = document.createElement('input');
        dueDate.type = 'date';
        dueDate.id = 'dueDate';
    
        return dueDate
    }
    
    const _descriptionInput = () => {
        const description = document.createElement('textarea');
        description.id = 'itemDescription';
        description.cols = '30';
        description.rows = '10';
        description.placeholder = 'Description';
    
        return description
    }
    
    const _createAddButton = () => {
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Item';
        addButton.type = 'submit';
    
        return addButton
    }
    
    const _createItemFromInput = () => {
    
        const title = document.getElementById('itemInput').value;
        const projectTitle = document.getElementById('projectInput').value.toUpperCase();
        const dueDate = document.getElementById('dueDate').value;
        const itemDescription = document.getElementById('itemDescription').value;
    
        inputForm.reset();
    
        return new Item(title, projectTitle, dueDate, itemDescription, false, 'unknown')
    }
    
    const _addItem = (e) => {
        e.preventDefault();
    
        const newItem = _createItemFromInput();
    
        if (projectLibrary.isInProjectLibrary(newItem.projectTitle)){
            newItem.ID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).giveID()}`;
            projectLibrary.getProject(newItem.projectTitle).addItem(newItem);
            // manageDisplayArea.addToProjectTile(newItem);
        } else if (!projectLibrary.isInProjectLibrary(newItem.projectTitle)){
            const project = new Project(newItem.projectTitle);
            projectLibrary.addProject(project);
            newItem.ID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).giveID()}`;
            project.addItem(newItem);
            // manageDisplayArea.addToDisplayArea(project);
            // manageDisplayArea.addToProjectTile(newItem);
            // manageSideBar.regenerateProjectArea(projectLibrary);
            // console.log(projectLibrary.projects)
            // saveLocal()
            // retrieveLocal()
        }
        manageDisplayArea.regenerateDisplayArea(projectLibrary);
        manageSideBar.regenerateProjectArea(projectLibrary);
        saveLocal()
    }
    
    const _createClearButton = () => {
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear';
        clearButton.addEventListener('click', (e) => {
            e.preventDefault();
            inputForm.reset();
        })
        return clearButton
    }
    
    const _createInputForm = () => {
        const inputForm = document.createElement('form');
        inputForm.classList.add('newItemForm');
        inputForm.setAttribute('id','inputForm');
        inputForm.onsubmit = _addItem;
    
        const newItemHeader = document.createElement('p');
        newItemHeader.textContent = 'Add New Item'
    
        inputForm.appendChild(newItemHeader);
    
        inputForm.appendChild(_titleInput());
        inputForm.appendChild(_projectInput());
        inputForm.appendChild(_dueDateInput());
        inputForm.appendChild(_descriptionInput());
        inputForm.appendChild(_createAddButton());
        inputForm.appendChild(_createClearButton());
    
        return inputForm
    }

    const createInputBar = () => {
        const newItemBar = document.createElement('div');
        newItemBar.classList.add('newItemBar');
        newItemBar.appendChild(_createInputForm());
    
        return newItemBar
    }

    return {createInputBar}
})();

export {createInput, projectLibrary, ProjectLibrary, Project, Item}