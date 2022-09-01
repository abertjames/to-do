// class Item {
//     constructor(
//         itemTitle = "unknown",
//         itemProject = "unknown",
//         itemDueDate = "unknown",
//         itemDescription = "unknown"
//     ){
//         this.itemTitle = itemTitle
//         this.itemProject = itemProject
//         this.itemDueDate = itemDueDate
//         this.itemDescription = itemDescription
//     }
// }

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