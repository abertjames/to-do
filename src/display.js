import {projectLibrary} from "./input";
import {manageSideBar} from "./sideBar";
import { saveLocal } from "./storage";

const createDisplayArea = () => {
    const displayArea = document.createElement('div');
    displayArea.setAttribute('id', 'displayArea');

    return displayArea
}

const clearDisplayArea = () => {
    const displayArea = document.getElementById('displayArea');
    displayArea.innerHTML = '';
}

const manageDisplayArea = (() => {
    const addToDisplayArea = (project) => {
        const displayArea = document.getElementById('displayArea');
        displayArea.appendChild(_createProjectTile(project));
    }
    
    // const removeFromDisplayArea = (project) => {
    //     const displayArea = document.getElementById('displayArea');
    //     displayArea.removeChild(document.getElementById(project.projectTitle));
    //     manageSideBar.regenerateProjectArea(projectLibrary)
    // }
    
    const addToProjectTile = (item) => {
        const projectTile = document.getElementById(item.projectTitle);
        projectTile.appendChild(_createItem(item));
    }
    
    // const removeFromProjectTile = (item) => {
    //     const projectTile = document.getElementById(item.projectTitle);
    //     projectTile.removeChild(document.getElementById(item.itemID));
    
    //     if (projectTile.childNodes.length == 1){
    //         const project = projectLibrary.getProject(item.projectTitle);
    //         removeFromDisplayArea(project);
    //     }
    // }
    
    const _createItem = (item) => {
        const listItem = document.createElement('div');
        listItem.classList.add('verboseItemDiv');
        listItem.setAttribute('id', item.ID);

        const topRow = document.createElement('div');
        topRow.classList.add('itemDiv');

        if (!item.itemCompletion){
            listItem.classList.remove('completed');
        } else if (item.itemCompletion) {
            listItem.classList.add('completed');
        }

        topRow.appendChild(_createCheckIcon(item));
        topRow.appendChild(_createTitle(item));
        topRow.appendChild(_createEditIcon(item));
        topRow.appendChild(_createTrashIcon(item, false));

        listItem.appendChild(topRow);
    
        return listItem
    }

    
    const _createProjectTile = (project) => {
    
        const projectTile = document.createElement('div');
        projectTile.classList.add('projectTile');
        projectTile.setAttribute('id', project.title);

        const headerDiv = document.createElement('div');
        headerDiv.classList.add('headerDiv');

        headerDiv.appendChild(_createTitle(project));

        /// might want to remove this but it is nice to have it 
        headerDiv.appendChild(_createEditIcon(project));
        ///

        headerDiv.appendChild(_createTrashIcon(project, false));
    
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

    return {addToDisplayArea, addToProjectTile, regenerateDisplayArea}

})();

const manageVerboseProject = (() => {
    const openVerboseProject = (project) => {
        clearDisplayArea();

        const displayArea = document.getElementById('displayArea');
    
        const verboseProject = document.createElement('div');
        verboseProject.classList.add('overlay');
        verboseProject.setAttribute('id', `${project.title}`);

        verboseProject.appendChild(_createVerboseHeader(project));

        for (let item of project.items){
            verboseProject.appendChild(createVerboseItem(item));
        }
        displayArea.appendChild(verboseProject);
    }


    const _createVerboseHeader = (project) => {
        const verboseHeader = document.createElement('div');
        verboseHeader.classList.add('headerDiv');
        verboseHeader.appendChild(_createTitle(project));
        verboseHeader.appendChild(_createTrashIcon(project, false));
        verboseHeader.appendChild(_createCloseIcon());

        return verboseHeader
    }
    
    
    const createVerboseItem = (item) => {    
        // could take in two variables, one for verbose and 
        // one for date window and then with the right conditions i would 
        // not need two item functions 
        const verboseItem = document.createElement('div');
        verboseItem.classList.add('verboseItemDiv');
        verboseItem.setAttribute('id', `${item.ID}`);

        const topRow = document.createElement('div');
        topRow.classList.add('itemDiv');
        
        if (!item.itemCompletion){
            verboseItem.classList.remove('completed');
        } else if (item.itemCompletion) {
            verboseItem.classList.add('completed');
        }

        topRow.appendChild(_createCheckIcon(item));
        topRow.appendChild(_createTitle(item));
        topRow.appendChild(_createDueDate(item));
        topRow.appendChild(_createTrashIcon(item));

        verboseItem.appendChild(topRow);
        verboseItem.appendChild(_createDescription(item));
        return verboseItem
    }

    return {openVerboseProject, createVerboseItem}
})();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// date window //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const manageDateWindow = (() => {

    const openDateWindow = (target) => {

        clearDisplayArea();

        const displayArea = document.getElementById('displayArea');
        const dateWindow = document.createElement('div');
        dateWindow.classList.add('overlay');
        const header = document.createElement('h2');
        header.classList.add('dateHeader');
        if (target == 0){
            header.textContent = 'Today';
        } else if (target == 7){
            header.textContent = 'This Week';
        }
        dateWindow.appendChild(header);

        for (let project of projectLibrary.projects){
            for (let item of project.items){
                if (_getDateDifference(new Date(item.itemDueDate))<=target){
                    dateWindow.appendChild(manageVerboseProject.createVerboseItem(item));
                }
            }
        }
        displayArea.appendChild(dateWindow);
    }

    const _getDateDifference = (date) => {
        const dueDateMiliSec = Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );

        const today = new Date();
        const todayMiliSec = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
      
        const differenceInMilliseconds = dueDateMiliSec - todayMiliSec;
      
        const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;
      
        return differenceInDays+1;
    }

    return {openDateWindow}
})();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// item window //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const _openItemWindow = (item) => {
    const displayArea = document.getElementById('displayArea');
    const itemModal = document.createElement('div');
    itemModal.classList.add('modal');
    window.onclick = (e) => {
        if (e.target == itemModal) {
            manageDisplayArea.regenerateDisplayArea(projectLibrary);
        }
    }
    itemModal.appendChild(manageVerboseProject.createVerboseItem(item));
    displayArea.appendChild(itemModal);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// icons /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _createCheckIcon = (item) => {
    const checkboxIcon = document.createElement('img');
    checkboxIcon.classList.add('icon');
    checkboxIcon.id = "checkBox/"+`${item.ID}`;

    if (!item.itemCompletion){
        checkboxIcon.src =  './dist/icons/checkbox-blank-outline.svg';
    } else if (item.itemCompletion) {
        checkboxIcon.src = "./dist/icons/checkbox-outline.svg";
    }

    checkboxIcon.addEventListener('click', (e) => {
        const itemID = e.target.id.split('/').pop()
        const item = projectLibrary.getItem(itemID);
        const img = e.composedPath()[0];
        _toggleComplete(item, img);
        saveLocal();
    });
    return checkboxIcon
}

const _toggleComplete = (item, img) => {
    const itemDiv = document.getElementById(item.ID);
    if (!item.itemCompletion){
        itemDiv.classList.add('completed');
        img.src = "./dist/icons/checkbox-outline.svg";
    } else if (item.itemCompletion) {
        itemDiv.classList.remove('completed');
        img.src =  './dist/icons/checkbox-blank-outline.svg';
    }
    item.itemCompletion = !item.itemCompletion;
}

const _createTrashIcon = (obj, verbose, dateWindow) => {
    const trashIcon = document.createElement('img');
    trashIcon.src = './dist/icons/trash-can-outline.svg';
    trashIcon.classList.add('icon');
    trashIcon.id = "trash/" + `${obj.ID}`

    const type = obj.type;
    const verb = verbose;

    if (type == 'item'){
        trashIcon.addEventListener('click', (e) => {
            const itemDiv = document.getElementById(e.target.id.split('/').pop());
            const item = projectLibrary.getItem(e.target.id.split('/').pop());
            const project = projectLibrary.getProject(item.projectTitle);

            if(itemDiv.parentElement.childNodes.length <= 2){
                projectLibrary.removeProject(project.title);
                manageSideBar.regenerateProjectArea(projectLibrary);
                manageDisplayArea.regenerateDisplayArea(projectLibrary);
            }
            itemDiv.remove()
            project.removeItem(item.ID);
            saveLocal();
        });
    } else if (type == 'project'){
        trashIcon.addEventListener('click', (e) => {
            const project = projectLibrary.getProject(e.target.id.split('/').pop());
            projectLibrary.removeProject(project.title);
            manageSideBar.regenerateProjectArea(projectLibrary);
            manageDisplayArea.regenerateDisplayArea(projectLibrary);
            saveLocal();
        })
    }
    return trashIcon
}

const _createEditIcon = (obj) => {
    const editIcon = document.createElement('img');
    editIcon.classList.add('icon');
    editIcon.src = './dist/icons/text-box-edit-outline.svg';
    editIcon.id = "edit/"+`${obj.ID}`
    if (obj.type == 'project'){
        editIcon.addEventListener('click', (e) => {
            const project = projectLibrary.getProject(e.target.id.split('/').pop());
            manageVerboseProject.openVerboseProject(project);
        })
    } else if (obj.type == 'item'){
        editIcon.addEventListener('click', (e) => {
            const itemID = e.target.id.split('/').pop()
            const item = projectLibrary.getItem(itemID);
            _openItemWindow(item);
        })
    }

    return editIcon
};

const _createCloseIcon = () => {
    const closeIcon = document.createElement('img');
    closeIcon.src = "./dist/icons/close.svg";
    closeIcon.classList.add('icon');
    closeIcon.addEventListener('click', () =>{
        //probably will need to accept a type in here 
        manageDisplayArea.regenerateDisplayArea(projectLibrary);
    })
    return closeIcon
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// input fields /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _createTitle = (obj) => {
    const title = document.createElement('input');
    title.classList.add('verbose');

    title.type = 'text';
    title.value = `${obj.title}`;
    title.size = (title.value.length)+3;
    title.readOnly = true;
    if (obj.type == 'item'){
        title.id = "title/"+`${obj.ID}`
    } else if (obj.type == 'project'){
        title.style = "text-transform: uppercase;"
    }

    title.oninput = () => {
        if (title.value.length==0){
            return
        } else {
            title.size = (title.value.length)+3;
        }
    }

    title.ondblclick = (e) => {
        e.target.readOnly = false;
        e.target.classList.add('focused');
    };

    title.addEventListener('focusout', (e) => {
        e.target.readOnly = true;
        e.target.classList.remove("focused");
        title.size = (title.value.length)+3;
    });

    if (obj.type == 'item'){
        title.onchange = (e) => {
            if (e.target.value == '') {
                e.target.value = e.target.id.split('/').pop();
            } else {
                const newTitle = e.target.value;
                const itemID = e.target.id.split('/').pop()
                const item = projectLibrary.getItem(itemID);
                item.title = newTitle;
                e.target.id = newTitle;
                saveLocal();
            } 
        };
    } else if (obj.type == 'project'){
        title.onchange = (e) => {
            if (e.target.value == '' || projectLibrary.isInProjectLibrary(e.target.value.toUpperCase())) {
                e.target.value = e.composedPath()[2].id;
            } else {
                const newTitle = e.target.value.toUpperCase();
                const project = projectLibrary.getProject(e.composedPath()[2].id);
                _updateProject(newTitle, project);
                manageSideBar.regenerateProjectArea(projectLibrary);
                saveLocal();
            } 
        };
    }

    return title
};

const _createDueDate = (item) => {
    const dueDate = document.createElement('input');
    dueDate.type = 'date';
    dueDate.value = item.itemDueDate;
    dueDate.readOnly = true;
    dueDate.id = "dueDate/"+`${item.ID}`

    dueDate.ondblclick = (e) => {
        e.target.readOnly = false;
    };

    dueDate.addEventListener('focusout', (e) => {
        e.target.readOnly = true;
    });

    dueDate.onchange = (e) => {
        const itemID = e.target.id.split('/').pop()
        const item = projectLibrary.getItem(itemID);
        item.itemDueDate = e.target.value;
        saveLocal();
    };

    return dueDate
};

const _createDescription = (item) => {
    const itemDescription = document.createElement('textarea');
    itemDescription.value = item.itemDescription;
    itemDescription.readOnly = true;
    itemDescription.id = "description/"+`${item.ID}`

    itemDescription.ondblclick = (e) => {
        e.target.readOnly = false;
    };

    itemDescription.addEventListener('focusout', (e) => {
        e.target.readOnly = true;
    });

    itemDescription.onchange = (e) => {
        const itemID = e.target.id.split('/').pop()
        const item = projectLibrary.getItem(itemID);
        item.itemDescription = e.target.value;
        saveLocal();
    };

    itemDescription.classList.add('itemDescription');

    return itemDescription
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const _updateProject = (newTitle, project) => {
    for (let item of project.items){
        _updateItem(newTitle, item, project);
    }
    const projectDisp = document.getElementById(project.title);
    project.title = newTitle;
    projectDisp.id = project.title;
    saveLocal();
};

const _updateItem = (newTitle, item, project) => {
    const itemDiv = document.getElementById(item.ID);
    const checkBox = document.getElementById('checkBox/'+`${item.ID}`);
    const trashIcon = document.getElementById('trash/'+`${item.ID}`);
    if (!!document.getElementById('edit/'+`${item.ID}`)){
        console.log('hi')
        const editIcon = document.getElementById('edit/'+`${item.ID}`);

        item.ID = `${newTitle}-` + `${project.giveID()}`;
        itemDiv.id = item.ID;
        item.projectTitle = newTitle;
    
        checkBox.id = 'checkBox/'+`${item.ID}`;
        trashIcon.id = 'trash/'+`${item.ID}`;
        editIcon.id = 'edit/'+`${item.ID}`;
    } else {
        item.ID = `${newTitle}-` + `${project.giveID()}`;
        itemDiv.id = item.ID;
        item.projectTitle = newTitle;
        checkBox.id = 'checkBox/'+`${item.ID}`;
        trashIcon.id = 'trash/'+`${item.ID}`;
    }
};

export {createDisplayArea, manageVerboseProject, manageDisplayArea, manageDateWindow}