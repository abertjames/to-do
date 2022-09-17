import {projectLibrary} from "./input";
import {manageSideBar} from "./sideBar";

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
        listItem.classList.add('itemDiv');
        listItem.setAttribute('id', item.itemID);

        listItem.appendChild(_createCheckIcon());
        listItem.appendChild(_createTitle(item));
        listItem.appendChild(_createEditIcon());
        listItem.appendChild(_createTrashIcon('item'));
    
        return listItem
    }

    
    const _createProjectTile = (project) => {
    
        const projectTile = document.createElement('div');
        projectTile.classList.add('projectTile');
        projectTile.setAttribute('id', project.title);

        const headerDiv = document.createElement('div');
        headerDiv.classList.add('headerDiv');

        headerDiv.appendChild(_createTitle(project));
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
            verboseProject.appendChild(_createVerboseItem(item));
        }
        displayArea.appendChild(verboseProject);
    }


    const _createVerboseHeader = (project) => {
        const verboseHeader = document.createElement('div');
        verboseHeader.classList.add('headerDiv');
        verboseHeader.appendChild(_createTitle(project));
        verboseHeader.appendChild(_createTrashIcon('project'));
        verboseHeader.appendChild(_createCloseIcon());

        return verboseHeader
    }
    
    
    const _createVerboseItem = (item) => {    
        const verboseItem = document.createElement('div');
        verboseItem.classList.add('itemDiv');
        verboseItem.setAttribute('id', `${item.itemID}`);

        // verboseItem.appendChild(_createDescription(item));
        verboseItem.appendChild(_createCheckIcon());
        verboseItem.appendChild(_createTitle(item));
        verboseItem.appendChild(_createDueDate(item));
        verboseItem.appendChild(_createTrashIcon('verboseItem'));

        return verboseItem
    }

    return {openVerboseProject}
})();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////// icons /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

const _createTrashIcon = (type) => {
    const trashIcon = document.createElement('img');
    trashIcon.src = '../dist/icons/trash-can-outline.svg';
    trashIcon.classList.add('icon');

    if (type == 'item'){
        trashIcon.addEventListener('click', (e) => {
            const item = projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
            const project = projectLibrary.getProject(e.composedPath()[2].id);
            project.removeItem(item.itemID);
            if (project.items.length == 0){
                projectLibrary.removeProject(project.title);
                manageSideBar.regenerateProjectArea(projectLibrary)
            }
            manageDisplayArea.regenerateDisplayArea(projectLibrary);
        });
    } else if (type == 'verboseItem'){
        trashIcon.addEventListener('click', (e) => {
            const item = projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
            const project = projectLibrary.getProject(e.composedPath()[2].id);
            project.removeItem(item.itemID);
            if (project.items.length == 0){
                projectLibrary.removeProject(project.title);
                manageDisplayArea.regenerateDisplayArea(projectLibrary);
                manageSideBar.regenerateProjectArea(projectLibrary)
            } else {
                manageVerboseProject.openVerboseProject(project);
            }
        })
    } else if (type == 'project'){
        trashIcon.addEventListener('click', (e) => {
            const project = projectLibrary.getProject(e.composedPath()[2].id);
            projectLibrary.removeProject(project.title);
            manageSideBar.regenerateProjectArea(projectLibrary);
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

        //could have it focus in on the project title or could have it open the project window or could remove it
        // from the project header entirely since it isnt really needed 
    })
    return editIcon
};

const _createCloseIcon = () => {
    const closeIcon = document.createElement('img');
    closeIcon.src = "../dist/icons/close.svg";
    closeIcon.classList.add('icon');
    closeIcon.addEventListener('click', () =>{
        //probably will need to accept a type in here 
        manageDisplayArea.regenerateDisplayArea(projectLibrary);
    })
    return closeIcon
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        title.id = obj.title;
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
                e.target.value = e.target.id;
            } else {
                const newTitle = e.target.value;
                const item = projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
                item.title = newTitle;
                e.target.id = newTitle;
            } 
        };
    } else if (obj.type == 'project'){
        title.onchange = (e) => {
            if (e.target.value == '') {
                e.target.value = e.composedPath()[2].id;
            } else {
                const newTitle = e.target.value;
                const project = projectLibrary.getProject(e.composedPath()[2].id);
                _updateProject(newTitle, project);
                manageSideBar.regenerateProjectArea(projectLibrary)
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

    dueDate.ondblclick = (e) => {
        e.target.readOnly = false;
    };

    dueDate.addEventListener('focusout', (e) => {
        e.target.readOnly = true;
    });

    dueDate.onchange = (e) => {
        const item = projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
        item.itemDueDate = e.target.value;
    };

    return dueDate
};

const _createDescription = () => {
    const itemDescription = document.createElement('textarea');
    // itemDescription.id = 'itemDescription';
    itemDescription.cols = '30';
    itemDescription.rows = '10';
    itemDescription.value = item.itemDescription;
    itemDescription.readOnly = true;

    return itemDescription
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const _updateProject = (newTitle, project) => {
    for (let item of project.items){
        const itemDiv = document.getElementById(item.itemID);
        item.itemID = `${newTitle}-` + `${project.giveID()}`;
        itemDiv.id = item.itemID;
        item.projectTitle = newTitle;
    }
    const projectDisp = document.getElementById(project.title);
    project.title = newTitle;
    projectDisp.id = project.title;
};

// const _updateItem = (newTitle, item) => {
//     item.projectTitle = newTitle;
// };

export {createDisplayArea, manageVerboseProject, manageDisplayArea}