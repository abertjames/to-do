import { projectLibrary, ProjectLibrary, Project, Item } from "./input"
import { manageDisplayArea } from "./display";
import { manageSideBar } from "./sideBar";

// local storage 

const saveLocal = () => {
    localStorage.setItem('projectLibrary', JSON.stringify(projectLibrary.projects));
    console.log(localStorage)
}

const retrieveLocal = () => {

    const projects = JSON.parse(localStorage.getItem('projectLibrary'))
    if (projects) {
        //library.books = books.map((book) => JSONToBook(book))
        projectLibrary.projects = projects.map((project) => reconstructProject(project));
        // reconstructProjectLibrary(projectLibrary);
    } else {
      projectLibrary.projects = []
    }

    console.log(projectLibrary)
}

// const reconstructProjectLibrary = (projects) => {
//     for (let project of projects){
//         const newProject = new Project (project.title);
//         for (let item of project.items){
//             const newItem = new Item (item.title, item.projectTitle, item.itemDueDate, item.itemDescription,item.itemCompletion)
//             newProject.addItem(newItem)
//         }
//     }
// }

const reconstructProject = (project) => {
    const newProject = new Project(project.title);
    newProject.items = project.items.map((item) => reconstructItem(item))
    return newProject
}

const reconstructItem = (item) => {
    return new Item (item.title, item.projectTitle, item.itemDueDate, item.itemDescription, item.itemCompletion, item.ID)
}

const checkStorage = () => {
    if (_storageAvailable('localStorage')) {
        // Yippee! We can use localStorage awesomeness
        retrieveLocal();
        manageDisplayArea.regenerateDisplayArea(projectLibrary);
        manageSideBar.regenerateProjectArea(projectLibrary);
      }
      else {
        // Too bad, no localStorage for us
    }
}

const _storageAvailable = (type)=>  {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

// cloud storage 

export {saveLocal, retrieveLocal, checkStorage}