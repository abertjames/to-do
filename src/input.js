class Item {
    constructor(
        itemTitle = "unknown",
        itemProject = "unknown",
        itemDueDate = "unknown",
        itemDescription = "unknown"
    ){
        this.itemTitle = itemTitle
        this.itemProject = itemProject
        this.itemDueDate = itemDueDate
        this.itemDescription = itemDescription
    }
}

// class Project {
//     constructor(){
//         this.itmes = [];
//     }
//     addItem(newItem) {
//         if (!this.isInProject(newItem)) {
//         this.items.push(newItem)
//         }
//     }
  
//     removeItem(itemTitle) {
//         this.items = this.items.filter((item) => item.itemTitle !== itemTitle)
//     }
  
//     getItem(itemTitle) {
//         return this.items.find((item) => item.itemTitle === itemTitle)
//     }
  
//     isInProject(newItem) {
//         return this.items.some((item) => item.itemTitle === newItem.itemTitle)
//     }
// }

// class projectLibrary {
//     constructor() {
//         this.projects = []
//     }
  
//     addProject(newProject) {
//         if (!this.isInProjectLibrary(newProject)) {
//         this.projects.push(newProjet)
//         }
//     }
  
//     removeProject(projectTitle) {
//         this.projects = this.projects.filter((project) => project.projectTitle !== projectTitle)
//     }
  
//     getProject(projectTitle) {
//         return this.projects.find((project) => project.projectTitle === projectTitle)
//     }
  
//     isInProjectLibrary(newProject) {
//         return this.projects.some((project) => project.projectTitle === newProject.projectTitle)
//     }
// }

// const projectLibrary = new projectLibrary()

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
    // addButton.type = 'submit';
    addButton.addEventListener('click', () => {
        createItemFromInput();
    })
    return addButton
}

const createItemFromInput = (e) => {
    // e.preventDefault();

    // const itemTitle = document.getElementById('itemTitle').value;
    // const projectTitle = document.getElementById('projectTitle').value.toLowerCase();
    // const dueDate = document.getElementById('dueDate').value;
    // const itemDescription = document.getElementById('itemDescription').value;

    console.log('hello')

    // return new Item(itemTitle, projectTitle, dueDate, itemDescription)
}

const createClearButton = () => {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', () => {
        console.log('hello')
    })

    return clearButton
}

const createInputForm = () => {
    const inputForm = document.createElement('div');
    inputForm.classList.add('newItemForm');
    // inputForm.onSubmit = createItemFromInput(event);
    // inputForm.onSubmit = console.log('hello');


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