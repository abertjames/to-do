import {projectLibrary} from "./input";
import {removeProjectButton} from "./sideBar";

const createDisplayArea = () => {
    const displayArea = document.createElement('div');
    displayArea.setAttribute('id', 'displayArea');

    return displayArea
}

const manageDisplayArea = (() => {
    const addToDisplayArea = (project) => {
        const displayArea = document.getElementById('displayArea');
        displayArea.appendChild(_createProjectTile(project));
    }
    
    const removeFromDisplayArea = (project) => {
        const displayArea = document.getElementById('displayArea');
        displayArea.removeChild(document.getElementById(project.projectTitle));
    
        removeProjectButton(project);
    }
    
    const addToProjectTile = (item) => {
        const projectTile = document.getElementById(item.projectTitle);
        projectTile.appendChild(_createItem(item));
    }
    
    const removeFromProjectTile = (item) => {
        const projectTile = document.getElementById(item.projectTitle);
        projectTile.removeChild(document.getElementById(item.itemID));
    
        if (projectTile.childNodes.length == 1){
            const project = projectLibrary.getProject(item.projectTitle);
            removeFromDisplayArea(project);
        }
    }
    
    const _createItem = (item) => {
        const listItem = document.createElement('div');
        listItem.classList.add('itemDiv');
        listItem.setAttribute('id', item.itemID);
        listItem.appendChild(_createCheckIcon());
        const itemName = document.createElement('span');
        itemName.textContent = item.itemTitle;
        listItem.appendChild(itemName);
        listItem.appendChild(_createEditIcon());
        listItem.appendChild(_createTrashIcon('item'));
    
        return listItem
    }

    
    const _createProjectTile = (project) => {
    
        const projectTile = document.createElement('div');
        projectTile.classList.add('projectTile');
        projectTile.setAttribute('id', project.projectTitle);
    
        const projectHeader = document.createElement('h3');
        projectHeader.textContent = project.projectTitle;
    
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('headerDiv');
        // headerDiv.classList.add("projectHeader");
    
        headerDiv.appendChild(projectHeader);
        headerDiv.appendChild(_createEditIcon());
        headerDiv.appendChild(_createTrashIcon('project'));
    
        projectTile.appendChild(headerDiv);
    
        return projectTile
    }

    const regenerateDisplayArea = (projectLibrary) => {
        clearDisplayArea();
        for (let project of projectLibrary.projects){
            manageDisplayArea.addToDisplayArea(project);
            for (let item of project.items){
                manageDisplayArea.addToProjectTile(item);
            }
        }
    };

    return {addToDisplayArea, addToProjectTile, removeFromDisplayArea, removeFromProjectTile, regenerateDisplayArea}
})();



/////// overlay functions /////// 

const manageVerboseProject = (() => {
    const openVerboseProject = (project) => {

        clearDisplayArea();

        const displayArea = document.getElementById('displayArea');
    
        const verboseProject = document.createElement('div');
        verboseProject.classList.add('overlay');
        verboseProject.setAttribute('id', `${project.projectTitle}`);

        verboseProject.appendChild(_createVerboseHeader(project));

        for (let item of project.items){
            verboseProject.appendChild(_createVerboseItem(item));
        }
        displayArea.appendChild(verboseProject);
    }


    const _createVerboseHeader = (project) => {
        // const projectHeader = document.createElement('h1');
        const verboseHeader = document.createElement('div');
        verboseHeader.classList.add('verboseHeader');
        const projectTitle = document.createElement('input');
        projectTitle.classList.add('verboseProjectTitle');
        projectTitle.type = 'text';
        // projectTitle.id = `${project.projectTitle}`;
        projectTitle.value = `${project.projectTitle}`;
        // projectTitle.style.width = (projectTitle.value.length)+1 + 'rem';
        projectTitle.size = (projectTitle.value.length)+3;
        projectTitle.readOnly = true;

        projectTitle.oninput = () => {
            if (projectTitle.value.length==0){
                return
            } else {
                // projectTitle.style.width = (projectTitle.value.length)+1 + 'rem';
                projectTitle.size = (projectTitle.value.length)+3;
            }
        }
        ///////// make these two their own functions that the main display can also use 
        projectTitle.ondblclick = (e) => {
            e.target.readOnly = false;
            e.target.classList.add('focused');
        };
    
        projectTitle.addEventListener('focusout', (e) => {
            e.target.readOnly = true;
            e.target.classList.remove("focused");
            // e.target.style.width = e.target.value.length + 1 + 'rem';
            projectTitle.size = (projectTitle.value.length)+3;
        });
    ///////// 
    
        projectTitle.onchange = (e) => {
            //update project
            //update items in project.items
            //update verboseProject ? this may depend on what is calling it
            if (e.target.value == '') {
                e.target.value = e.target.id;
            } else {
                const newTitle = e.target.value;
                const project = projectLibrary.getProject(e.target.id);
                updateProject(newTitle, project);
                e.target.id = newTitle;
            } 
        };
    
        const closeIcon = document.createElement('img');
        closeIcon.src = "../dist/icons/close.svg";
        closeIcon.classList.add('icon');
        closeIcon.addEventListener('click', () =>{
            manageDisplayArea.regenerateDisplayArea(projectLibrary);
        })
    
        verboseHeader.appendChild(projectTitle);
        verboseHeader.appendChild(_createTrashIcon('project'));
        verboseHeader.appendChild(closeIcon);

        return verboseHeader
    }
    
    
    const _createVerboseItem = (item) => {    
        const verboseItem = document.createElement('div');
        verboseItem.classList.add('verboseItem');
        verboseItem.setAttribute('id', `${item.itemID}`);

        const itemTitle = document.createElement('input');
        itemTitle.classList.add('verboseItemTitle');
        itemTitle.type = 'text';
        // itemTitle.id = `${item.itemTitle}`;
        itemTitle.value = `${item.itemTitle}`;
        // projectTitle.style.width = (projectTitle.value.length)+1 + 'rem';
        itemTitle.size = (itemTitle.value.length)+3;
        itemTitle.readOnly = true;

        itemTitle.oninput = () => {
            if (itemTitle.value.length==0){
                return
            } else {
                // projectTitle.style.width = (projectTitle.value.length)+1 + 'rem';
                itemTitle.size = (itemTitle.value.length)+3;
            }
        }
    
        itemTitle.ondblclick = (e) => {
            e.target.readOnly = false;
            e.target.classList.add('focused');
        };
    
        itemTitle.addEventListener('focusout', (e) => {
            e.target.readOnly = true;
            e.target.classList.remove("focused");
            // e.target.style.width = e.target.value.length + 1 + 'rem';
            itemTitle.size = (itemTitle.value.length)+3;
        });
    
        itemTitle.onchange = (e) => {
            //update project
            //update items in project.items
            //update verboseProject ? this may depend on what is calling it
            if (e.target.value == '') {
                e.target.value = e.target.id;
            } else {

                ///////change this for the item inputs 
                // change the id of the containing div 
                const newTitle = e.target.value;
                const project = projectLibrary.getProject(e.target.id);
                updateProject(newTitle, project);
                e.target.id = newTitle;
            } 
        };

        const dueDate = document.createElement('input');
        //what about id here
        dueDate.type = 'date';
        dueDate.id = "dueDate";
        dueDate.value = item.dueDate;
        dueDate.readOnly = true;

        //////// text area description add here 

        const itemDescription = document.createElement('textarea');
        //what about id here
        itemDescription.id = 'itemDescription';
        itemDescription.cols = '30';
        itemDescription.rows = '10';
        itemDescription.value = item.itemDescription;
        itemDescription.readOnly = true;

        // verboseItem.appendChild(itemDescription);
        verboseItem.appendChild(_createCheckIcon());
        verboseItem.appendChild(itemTitle);
        verboseItem.appendChild(dueDate);
        verboseItem.appendChild(_createTrashIcon('verboseItem'));

        return verboseItem
    }

    return {openVerboseProject}
})();

const _createCheckIcon = () => {
    const checkboxIcon = document.createElement('img');
    checkboxIcon.src = '../dist/icons/checkbox-blank-outline.svg';
    checkboxIcon.classList.add('icon');
    checkboxIcon.addEventListener('click', (e) => {
        const item = projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
        const img = e.composedPath()[0];
        _toggleComplete(item, img)
    });
    return checkboxIcon
}

const _createTrashIcon = (type) => {
    const trashIcon = document.createElement('img');
    trashIcon.src = '../dist/icons/trash-can-outline.svg';
    trashIcon.classList.add('icon');

    if (type == 'item'){
        trashIcon.addEventListener('click', (e) => {
            const item = projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
            const project = projectLibrary.getProject(e.composedPath()[2].id);
            project.removeItem(item.itemID);
            manageDisplayArea.regenerateDisplayArea(projectLibrary);
        });
    } else if (type == 'verboseItem'){
        trashIcon.addEventListener('click', (e) => {
            const item = projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
            const project = projectLibrary.getProject(e.composedPath()[2].id);
            project.removeItem(item.itemID);
            if (project.items.length == 0){
                projectLibrary.removeProject(project.projectTitle);
                manageDisplayArea.regenerateDisplayArea(projectLibrary);
                removeProjectButton(project);
            } else {
                manageVerboseProject.openVerboseProject(project);
            }
        })
    } else if (type == 'project'){
        trashIcon.addEventListener('click', (e) => {
            const project = projectLibrary.getProject(e.composedPath()[2].id);
            removeProjectButton(project);
            projectLibrary.removeProject(project.projectTitle);
            manageDisplayArea.regenerateDisplayArea(projectLibrary);
        })
    }
    return trashIcon
}

const _createEditIcon = () => {
    const editIcon = document.createElement('img');
    editIcon.classList.add('icon');
    editIcon.src = '../dist/icons/text-box-edit-outline.svg';
    editIcon.addEventListener('click', (e) => {
        // open a verbose item modal 
        // get item id
        // open modal
        // only call from main display 
    })
    return editIcon
};

//these should update the div's as well ?
const updateProject = (newTitle, project) => {
    for (let item of project.items){
        item.projectTitle = newTitle;
    }
    project.projectTitle = newTitle;
};

const updateItem = (item) => {

};

//separate functions. one to do the img source and the other to change the object information 
//make this accessable gloablly here 
const _toggleComplete = (item, img) => {
    const itemDiv = document.getElementById(item.itemID);
    if (!item.itemCompletion){
        itemDiv.classList.add('completed');
        img.src = "../dist/icons/checkbox-outline.svg";
    } else if (item.itemCompletion) {
        itemDiv.classList.remove('completed');
        img.src =  '../dist/icons/checkbox-blank-outline.svg';
    }
    item.itemCompletion = !item.itemCompletion;
}

const clearDisplayArea = () => {
    const displayArea = document.getElementById('displayArea');
    displayArea.innerHTML = '';
}

export {createDisplayArea, manageVerboseProject, manageDisplayArea}