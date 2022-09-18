/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDisplayArea": () => (/* binding */ createDisplayArea),
/* harmony export */   "manageDateWindow": () => (/* binding */ manageDateWindow),
/* harmony export */   "manageDisplayArea": () => (/* binding */ manageDisplayArea),
/* harmony export */   "manageVerboseProject": () => (/* binding */ manageVerboseProject)
/* harmony export */ });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/input.js");
/* harmony import */ var _sideBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sideBar */ "./src/sideBar.js");



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

        for (let project of _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.projects){
            for (let item of project.items){
                if (getDateDifference(new Date(item.itemDueDate))<=target){
                    dateWindow.appendChild(manageVerboseProject.createVerboseItem(item));
                }
            }
        }
        displayArea.appendChild(dateWindow);
    }

    const getDateDifference = (date) => {
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
        checkboxIcon.src =  '../dist/icons/checkbox-blank-outline.svg';
    } else if (item.itemCompletion) {
        checkboxIcon.src = "../dist/icons/checkbox-outline.svg";
    }

    checkboxIcon.addEventListener('click', (e) => {
        const itemID = e.target.id.split('/').pop()
        const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getItem(itemID);
        const img = e.composedPath()[0];
        _toggleComplete(item, img)
    });
    return checkboxIcon
}

const _toggleComplete = (item, img) => {
    const itemDiv = document.getElementById(item.ID);
    if (!item.itemCompletion){
        itemDiv.classList.add('completed');
        img.src = "../dist/icons/checkbox-outline.svg";
    } else if (item.itemCompletion) {
        itemDiv.classList.remove('completed');
        img.src =  '../dist/icons/checkbox-blank-outline.svg';
    }
    item.itemCompletion = !item.itemCompletion;
}

const _createTrashIcon = (obj, verbose, dateWindow) => {
    const trashIcon = document.createElement('img');
    trashIcon.src = '../dist/icons/trash-can-outline.svg';
    trashIcon.classList.add('icon');
    trashIcon.id = "trash/" + `${obj.ID}`

    const type = obj.type;
    const verb = verbose;

    if (type == 'item'){
        trashIcon.addEventListener('click', (e) => {
            const itemDiv = document.getElementById(e.target.id.split('/').pop());
            const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getItem(e.target.id.split('/').pop());
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(item.projectTitle);

            if(itemDiv.parentElement.childNodes.length <= 2){
                _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.removeProject(project.title);
                _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
                manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
            }
            itemDiv.remove()
            project.removeItem(item.ID);
        });
    } else if (type == 'project'){
        trashIcon.addEventListener('click', (e) => {
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.target.id.split('/').pop());
            _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.removeProject(project.title);
            _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
            manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
        })
    }
    return trashIcon
}

const _createEditIcon = (obj) => {
    const editIcon = document.createElement('img');
    editIcon.classList.add('icon');
    editIcon.src = '../dist/icons/text-box-edit-outline.svg';
    editIcon.id = "edit/"+`${obj.ID}`
    if (obj.type == 'project'){
        editIcon.addEventListener('click', (e) => {
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.target.id.split('/').pop());
            manageVerboseProject.openVerboseProject(project);
        })
    } else if (obj.type == 'item'){
        editIcon.addEventListener('click', (e) => {
            // open a verbose item modal 
            // get item id
            // open modal
            // only call from main display
            
            const itemID = e.target.id.split('/').pop()
            const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getItem(itemID);
    
            //could have it focus in on the project title or could have it open the project window or could remove it
            // from the project header entirely since it isnt really needed 
        })
    }

    return editIcon
};

const _createCloseIcon = () => {
    const closeIcon = document.createElement('img');
    closeIcon.src = "../dist/icons/close.svg";
    closeIcon.classList.add('icon');
    closeIcon.addEventListener('click', () =>{
        //probably will need to accept a type in here 
        manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
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
        title.id = obj.title;
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
                e.target.value = e.target.id;
            } else {
                const newTitle = e.target.value;
                const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[3].id).getItem(e.composedPath()[2].id);
                item.title = newTitle;
                e.target.id = newTitle;
            } 
        };
    } else if (obj.type == 'project'){
        title.onchange = (e) => {
            if (e.target.value == '' || _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.isInProjectLibrary(e.target.value.toUpperCase())) {
                e.target.value = e.composedPath()[2].id;
            } else {
                const newTitle = e.target.value.toUpperCase();
                const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id);
                _updateProject(newTitle, project);
                _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary)
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
        const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[3].id).getItem(e.composedPath()[2].id);
        item.itemDueDate = e.target.value;
    };

    return dueDate
};

const _createDescription = (item) => {
    const itemDescription = document.createElement('textarea');
    itemDescription.value = item.itemDescription;
    itemDescription.readOnly = true;

    itemDescription.ondblclick = (e) => {
        e.target.readOnly = false;
    };

    itemDescription.addEventListener('focusout', (e) => {
        e.target.readOnly = true;
    });

    itemDescription.onchange = (e) => {
        const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[3].id).getItem(e.composedPath()[2].id);
        item.itemDescription = e.target.value;
    };

    itemDescription.classList.add('itemDescription');

    return itemDescription
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const _updateProject = (newTitle, project) => {
    for (let item of project.items){
        const itemDiv = document.getElementById(item.ID);
        item.ID = `${newTitle}-` + `${project.giveID()}`;
        itemDiv.id = item.ID;
        item.projectTitle = newTitle;
        _updateItemIcons()
    }
    const projectDisp = document.getElementById(project.title);
    project.title = newTitle;
    projectDisp.id = project.title;
};

const _updateItemIcons = (newTitle, item) => {
    const checkBox = document.getElementById()
    const trashIcon = document.getElementById()
    const editIcon = document.getElementById()
    //need to update trash icon, edit icon if there is one, and checkbox icon 
    //search by contains the old id if possible 
    //honestly needs to get called from the update project, everything else gets updated as inputs 
};



/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createHeader": () => (/* binding */ createHeader)
/* harmony export */ });
const createHeader = () => {
    const headerBar = document.createElement('header');
    headerBar.classList.add('header');

    headerBar.textContent = "To-Do"
    
    return headerBar
}



/***/ }),

/***/ "./src/initWebsite.js":
/*!****************************!*\
  !*** ./src/initWebsite.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _sideBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sideBar */ "./src/sideBar.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input */ "./src/input.js");






//once i add log in information i should make another js script for making the header 



const initializeWebsite = () => {
    const container = document.getElementById('container');

    container.appendChild((0,_header__WEBPACK_IMPORTED_MODULE_0__.createHeader)());
    container.appendChild(_sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.createSideBar());
    container.appendChild((0,_display__WEBPACK_IMPORTED_MODULE_2__.createDisplayArea)());
    container.appendChild(_input__WEBPACK_IMPORTED_MODULE_3__.createInput.createInputBar());
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initializeWebsite);

/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInput": () => (/* binding */ createInput),
/* harmony export */   "projectLibrary": () => (/* binding */ projectLibrary)
/* harmony export */ });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _sideBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sideBar */ "./src/sideBar.js");



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
        }
        _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.regenerateDisplayArea(projectLibrary);
        _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(projectLibrary);
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




/***/ }),

/***/ "./src/sideBar.js":
/*!************************!*\
  !*** ./src/sideBar.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "manageSideBar": () => (/* binding */ manageSideBar)
/* harmony export */ });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input */ "./src/input.js");



const manageSideBar = (() => {
    const createSideBar = () => {
        const sideBar = document.createElement('div');
        sideBar.classList.add('sideBar');
    
        const homeButton = document.createElement('button');
        homeButton.textContent = 'Home';
        homeButton.addEventListener('click', () => {
            _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_1__.projectLibrary);
        });
    
        const todayButton = document.createElement('button');
        todayButton.textContent = 'Today';
        todayButton.addEventListener('click', () => {
            _display__WEBPACK_IMPORTED_MODULE_0__.manageDateWindow.openDateWindow(0);
        })

        const weekButton = document.createElement('button');
        weekButton.textContent = 'This Week';
        weekButton.addEventListener('click', () => {
            _display__WEBPACK_IMPORTED_MODULE_0__.manageDateWindow.openDateWindow(7);
        });
    
        sideBar.appendChild(homeButton);
        sideBar.appendChild(todayButton);
        sideBar.appendChild(weekButton);
        sideBar.appendChild(_createProjectArea());
    
        return sideBar
    }
    
    const _createProjectArea = () => {
        const projectAreaContainer = document.createElement('div');
    
        const projectArea = document.createElement('div');
        projectArea.setAttribute('id','projectArea');
    
        const projectHeading = document.createElement('span');
        projectHeading.textContent = 'Projects';
    
        projectAreaContainer.appendChild(projectHeading);
        projectAreaContainer.appendChild(projectArea);
    
        return projectAreaContainer
    }
    
    const _resetProjectArea = () => {
        const projectArea = document.getElementById('projectArea');
        projectArea.innerHTML = '';
    }
    
    const regenerateProjectArea = (projectLibrary) => {
        _resetProjectArea();
        // const projectArea = document.getElementById('pojectArea'); 
        for (let project of projectLibrary.projects){
            _addProjectButton(project)
        }
    }
    
    const _addProjectButton = (project) => {
        const projectArea = document.getElementById('projectArea');
    
        const newProjectButton = document.createElement('button');
        newProjectButton.setAttribute('id',`${project.title}`+'-button');
        newProjectButton.textContent = project.title;
    
        newProjectButton.addEventListener('click', (e) => {
            const project = _input__WEBPACK_IMPORTED_MODULE_1__.projectLibrary.getProject(e.target.id.slice(0,-7));
            _display__WEBPACK_IMPORTED_MODULE_0__.manageVerboseProject.openVerboseProject(project);
        });
        projectArea.appendChild(newProjectButton);
        // console.log(newProjectButton)
        // return (newProjectButton)
    }
    
    // const removeProjectButton = (project) => {
    //     const projectArea = document.getElementById('projectArea');
    //     projectArea.removeChild(document.getElementById(`${project.projectTitle}`+ '-button'));
    // }

    return {createSideBar, regenerateProjectArea}
})();


//need a function to rename and re ID these 


// export {createSideBar, addProjectButton, removeProjectButton}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _initWebsite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initWebsite */ "./src/initWebsite.js");


(0,_initWebsite__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bkQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELHFCQUFxQjtBQUNuRjs7QUFFQSxZQUFZO0FBQ1osQ0FBQzs7O0FBR0Q7QUFDc0I7O0FBRXRCLFdBQVc7Ozs7OztVQzFGWDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhDOztBQUU5Qyx3REFBaUIsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaGVhZGVyLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2luaXRXZWJzaXRlLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2lucHV0LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL3NpZGVCYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb2plY3RMaWJyYXJ5fSBmcm9tIFwiLi9pbnB1dFwiO1xuaW1wb3J0IHttYW5hZ2VTaWRlQmFyfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5cbmNvbnN0IGNyZWF0ZURpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGlzcGxheUFyZWEuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5QXJlYScpO1xuXG4gICAgcmV0dXJuIGRpc3BsYXlBcmVhXG59XG5cbmNvbnN0IGNsZWFyRGlzcGxheUFyZWEgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICBkaXNwbGF5QXJlYS5pbm5lckhUTUwgPSAnJztcbn1cblxuY29uc3QgbWFuYWdlRGlzcGxheUFyZWEgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRvRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgICAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZChfY3JlYXRlUHJvamVjdFRpbGUocHJvamVjdCkpO1xuICAgIH1cbiAgICBcbiAgICAvLyBjb25zdCByZW1vdmVGcm9tRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgIC8vICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgIC8vICAgICBkaXNwbGF5QXJlYS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0LnByb2plY3RUaXRsZSkpO1xuICAgIC8vICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSlcbiAgICAvLyB9XG4gICAgXG4gICAgY29uc3QgYWRkVG9Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgICAgICBwcm9qZWN0VGlsZS5hcHBlbmRDaGlsZChfY3JlYXRlSXRlbShpdGVtKSk7XG4gICAgfVxuICAgIFxuICAgIC8vIGNvbnN0IHJlbW92ZUZyb21Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgIC8vICAgICBwcm9qZWN0VGlsZS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLml0ZW1JRCkpO1xuICAgIFxuICAgIC8vICAgICBpZiAocHJvamVjdFRpbGUuY2hpbGROb2Rlcy5sZW5ndGggPT0gMSl7XG4gICAgLy8gICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChpdGVtLnByb2plY3RUaXRsZSk7XG4gICAgLy8gICAgICAgICByZW1vdmVGcm9tRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlSXRlbURpdicpO1xuICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaXRlbS5JRCk7XG5cbiAgICAgICAgY29uc3QgdG9wUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvcFJvdy5jbGFzc0xpc3QuYWRkKCdpdGVtRGl2Jyk7XG5cbiAgICAgICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbUNvbXBsZXRpb24pIHtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVDaGVja0ljb24oaXRlbSkpO1xuICAgICAgICB0b3BSb3cuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRpdGxlKGl0ZW0pKTtcbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbihpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKGl0ZW0sIGZhbHNlKSk7XG5cbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodG9wUm93KTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGxpc3RJdGVtXG4gICAgfVxuXG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZVByb2plY3RUaWxlID0gKHByb2plY3QpID0+IHtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdFRpbGUnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuc2V0QXR0cmlidXRlKCdpZCcsIHByb2plY3QudGl0bGUpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoZWFkZXJEaXYuY2xhc3NMaXN0LmFkZCgnaGVhZGVyRGl2Jyk7XG5cbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShwcm9qZWN0KSk7XG5cbiAgICAgICAgLy8vIG1pZ2h0IHdhbnQgdG8gcmVtb3ZlIHRoaXMgYnV0IGl0IGlzIG5pY2UgdG8gaGF2ZSBpdCBcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbihwcm9qZWN0KSk7XG4gICAgICAgIC8vL1xuXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKHByb2plY3QsIGZhbHNlKSk7XG4gICAgXG4gICAgICAgIHByb2plY3RUaWxlLmFwcGVuZENoaWxkKGhlYWRlckRpdik7XG4gICAgXG4gICAgICAgIHJldHVybiBwcm9qZWN0VGlsZVxuICAgIH1cblxuICAgIGNvbnN0IHJlZ2VuZXJhdGVEaXNwbGF5QXJlYSA9IChwcm9qZWN0TGlicmFyeSkgPT4ge1xuICAgICAgICBjbGVhckRpc3BsYXlBcmVhKCk7XG4gICAgICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpYnJhcnkucHJvamVjdHMpe1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9EaXNwbGF5QXJlYShwcm9qZWN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9Qcm9qZWN0VGlsZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge2FkZFRvRGlzcGxheUFyZWEsIGFkZFRvUHJvamVjdFRpbGUsIHJlZ2VuZXJhdGVEaXNwbGF5QXJlYX1cblxufSkoKTtcblxuY29uc3QgbWFuYWdlVmVyYm9zZVByb2plY3QgPSAoKCkgPT4ge1xuICAgIGNvbnN0IG9wZW5WZXJib3NlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNsZWFyRGlzcGxheUFyZWEoKTtcblxuICAgICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgIFxuICAgICAgICBjb25zdCB2ZXJib3NlUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlUHJvamVjdC5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtwcm9qZWN0LnRpdGxlfWApO1xuXG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LmFwcGVuZENoaWxkKF9jcmVhdGVWZXJib3NlSGVhZGVyKHByb2plY3QpKTtcblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICAgICAgdmVyYm9zZVByb2plY3QuYXBwZW5kQ2hpbGQoY3JlYXRlVmVyYm9zZUl0ZW0oaXRlbSkpO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BsYXlBcmVhLmFwcGVuZENoaWxkKHZlcmJvc2VQcm9qZWN0KTtcbiAgICB9XG5cblxuICAgIGNvbnN0IF9jcmVhdGVWZXJib3NlSGVhZGVyID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgdmVyYm9zZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlckRpdicpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShwcm9qZWN0KSk7XG4gICAgICAgIHZlcmJvc2VIZWFkZXIuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRyYXNoSWNvbihwcm9qZWN0LCBmYWxzZSkpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVDbG9zZUljb24oKSk7XG5cbiAgICAgICAgcmV0dXJuIHZlcmJvc2VIZWFkZXJcbiAgICB9XG4gICAgXG4gICAgXG4gICAgY29uc3QgY3JlYXRlVmVyYm9zZUl0ZW0gPSAoaXRlbSkgPT4geyAgICBcbiAgICAgICAgLy8gY291bGQgdGFrZSBpbiB0d28gdmFyaWFibGVzLCBvbmUgZm9yIHZlcmJvc2UgYW5kIFxuICAgICAgICAvLyBvbmUgZm9yIGRhdGUgd2luZG93IGFuZCB0aGVuIHdpdGggdGhlIHJpZ2h0IGNvbmRpdGlvbnMgaSB3b3VsZCBcbiAgICAgICAgLy8gbm90IG5lZWQgdHdvIGl0ZW0gZnVuY3Rpb25zIFxuICAgICAgICBjb25zdCB2ZXJib3NlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlSXRlbURpdicpO1xuICAgICAgICB2ZXJib3NlSXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aXRlbS5JRH1gKTtcblxuICAgICAgICBjb25zdCB0b3BSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9wUm93LmNsYXNzTGlzdC5hZGQoJ2l0ZW1EaXYnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghaXRlbS5pdGVtQ29tcGxldGlvbil7XG4gICAgICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLml0ZW1Db21wbGV0aW9uKSB7XG4gICAgICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlQ2hlY2tJY29uKGl0ZW0pKTtcbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlRHVlRGF0ZShpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKGl0ZW0pKTtcblxuICAgICAgICB2ZXJib3NlSXRlbS5hcHBlbmRDaGlsZCh0b3BSb3cpO1xuICAgICAgICB2ZXJib3NlSXRlbS5hcHBlbmRDaGlsZChfY3JlYXRlRGVzY3JpcHRpb24oaXRlbSkpO1xuICAgICAgICByZXR1cm4gdmVyYm9zZUl0ZW1cbiAgICB9XG5cbiAgICByZXR1cm4ge29wZW5WZXJib3NlUHJvamVjdCwgY3JlYXRlVmVyYm9zZUl0ZW19XG59KSgpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGRhdGUgd2luZG93IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IG1hbmFnZURhdGVXaW5kb3cgPSAoKCkgPT4ge1xuXG4gICAgY29uc3Qgb3BlbkRhdGVXaW5kb3cgPSAodGFyZ2V0KSA9PiB7XG5cbiAgICAgICAgY2xlYXJEaXNwbGF5QXJlYSgpO1xuXG4gICAgICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgICAgIGNvbnN0IGRhdGVXaW5kb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGF0ZVdpbmRvdy5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdkYXRlSGVhZGVyJyk7XG4gICAgICAgIGlmICh0YXJnZXQgPT0gMCl7XG4gICAgICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PSA3KXtcbiAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnO1xuICAgICAgICB9XG4gICAgICAgIGRhdGVXaW5kb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaWJyYXJ5LnByb2plY3RzKXtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGVEaWZmZXJlbmNlKG5ldyBEYXRlKGl0ZW0uaXRlbUR1ZURhdGUpKTw9dGFyZ2V0KXtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVdpbmRvdy5hcHBlbmRDaGlsZChtYW5hZ2VWZXJib3NlUHJvamVjdC5jcmVhdGVWZXJib3NlSXRlbShpdGVtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRpc3BsYXlBcmVhLmFwcGVuZENoaWxkKGRhdGVXaW5kb3cpO1xuICAgIH1cblxuICAgIGNvbnN0IGdldERhdGVEaWZmZXJlbmNlID0gKGRhdGUpID0+IHtcbiAgICAgICAgY29uc3QgZHVlRGF0ZU1pbGlTZWMgPSBEYXRlLlVUQyhcbiAgICAgICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdG9kYXlNaWxpU2VjID0gRGF0ZS5VVEModG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSwgdG9kYXkuZ2V0RGF0ZSgpKTtcbiAgICAgIFxuICAgICAgICBjb25zdCBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPSBkdWVEYXRlTWlsaVNlYyAtIHRvZGF5TWlsaVNlYztcbiAgICAgIFxuICAgICAgICBjb25zdCBkaWZmZXJlbmNlSW5EYXlzID0gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzIC8gMTAwMCAvIDYwIC8gNjAgLyAyNDtcbiAgICAgIFxuICAgICAgICByZXR1cm4gZGlmZmVyZW5jZUluRGF5cysxO1xuICAgIH1cblxuICAgIHJldHVybiB7b3BlbkRhdGVXaW5kb3d9XG59KSgpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGl0ZW0gd2luZG93IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBfb3Blbkl0ZW1XaW5kb3cgPSAoaXRlbSkgPT4ge1xuXG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gaWNvbnMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IF9jcmVhdGVDaGVja0ljb24gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrYm94SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGNoZWNrYm94SWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgY2hlY2tib3hJY29uLmlkID0gXCJjaGVja0JveC9cIitgJHtpdGVtLklEfWA7XG5cbiAgICBpZiAoIWl0ZW0uaXRlbUNvbXBsZXRpb24pe1xuICAgICAgICBjaGVja2JveEljb24uc3JjID0gICcuLi9kaXN0L2ljb25zL2NoZWNrYm94LWJsYW5rLW91dGxpbmUuc3ZnJztcbiAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbUNvbXBsZXRpb24pIHtcbiAgICAgICAgY2hlY2tib3hJY29uLnNyYyA9IFwiLi4vZGlzdC9pY29ucy9jaGVja2JveC1vdXRsaW5lLnN2Z1wiO1xuICAgIH1cblxuICAgIGNoZWNrYm94SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1JRCA9IGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKClcbiAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldEl0ZW0oaXRlbUlEKTtcbiAgICAgICAgY29uc3QgaW1nID0gZS5jb21wb3NlZFBhdGgoKVswXTtcbiAgICAgICAgX3RvZ2dsZUNvbXBsZXRlKGl0ZW0sIGltZylcbiAgICB9KTtcbiAgICByZXR1cm4gY2hlY2tib3hJY29uXG59XG5cbmNvbnN0IF90b2dnbGVDb21wbGV0ZSA9IChpdGVtLCBpbWcpID0+IHtcbiAgICBjb25zdCBpdGVtRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5JRCk7XG4gICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgaXRlbURpdi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgaW1nLnNyYyA9IFwiLi4vZGlzdC9pY29ucy9jaGVja2JveC1vdXRsaW5lLnN2Z1wiO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtQ29tcGxldGlvbikge1xuICAgICAgICBpdGVtRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICBpbWcuc3JjID0gICcuLi9kaXN0L2ljb25zL2NoZWNrYm94LWJsYW5rLW91dGxpbmUuc3ZnJztcbiAgICB9XG4gICAgaXRlbS5pdGVtQ29tcGxldGlvbiA9ICFpdGVtLml0ZW1Db21wbGV0aW9uO1xufVxuXG5jb25zdCBfY3JlYXRlVHJhc2hJY29uID0gKG9iaiwgdmVyYm9zZSwgZGF0ZVdpbmRvdykgPT4ge1xuICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRyYXNoSWNvbi5zcmMgPSAnLi4vZGlzdC9pY29ucy90cmFzaC1jYW4tb3V0bGluZS5zdmcnO1xuICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgdHJhc2hJY29uLmlkID0gXCJ0cmFzaC9cIiArIGAke29iai5JRH1gXG5cbiAgICBjb25zdCB0eXBlID0gb2JqLnR5cGU7XG4gICAgY29uc3QgdmVyYiA9IHZlcmJvc2U7XG5cbiAgICBpZiAodHlwZSA9PSAnaXRlbScpe1xuICAgICAgICB0cmFzaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKCkpO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldEl0ZW0oZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKSk7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChpdGVtLnByb2plY3RUaXRsZSk7XG5cbiAgICAgICAgICAgIGlmKGl0ZW1EaXYucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA8PSAyKXtcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlicmFyeS5yZW1vdmVQcm9qZWN0KHByb2plY3QudGl0bGUpO1xuICAgICAgICAgICAgICAgIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbURpdi5yZW1vdmUoKVxuICAgICAgICAgICAgcHJvamVjdC5yZW1vdmVJdGVtKGl0ZW0uSUQpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3Byb2plY3QnKXtcbiAgICAgICAgdHJhc2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKCkpO1xuICAgICAgICAgICAgcHJvamVjdExpYnJhcnkucmVtb3ZlUHJvamVjdChwcm9qZWN0LnRpdGxlKTtcbiAgICAgICAgICAgIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0cmFzaEljb25cbn1cblxuY29uc3QgX2NyZWF0ZUVkaXRJY29uID0gKG9iaikgPT4ge1xuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuICAgIGVkaXRJY29uLnNyYyA9ICcuLi9kaXN0L2ljb25zL3RleHQtYm94LWVkaXQtb3V0bGluZS5zdmcnO1xuICAgIGVkaXRJY29uLmlkID0gXCJlZGl0L1wiK2Ake29iai5JRH1gXG4gICAgaWYgKG9iai50eXBlID09ICdwcm9qZWN0Jyl7XG4gICAgICAgIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKCkpO1xuICAgICAgICAgICAgbWFuYWdlVmVyYm9zZVByb2plY3Qub3BlblZlcmJvc2VQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICB9KVxuICAgIH0gZWxzZSBpZiAob2JqLnR5cGUgPT0gJ2l0ZW0nKXtcbiAgICAgICAgZWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgLy8gb3BlbiBhIHZlcmJvc2UgaXRlbSBtb2RhbCBcbiAgICAgICAgICAgIC8vIGdldCBpdGVtIGlkXG4gICAgICAgICAgICAvLyBvcGVuIG1vZGFsXG4gICAgICAgICAgICAvLyBvbmx5IGNhbGwgZnJvbSBtYWluIGRpc3BsYXlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgaXRlbUlEID0gZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKVxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldEl0ZW0oaXRlbUlEKTtcbiAgICBcbiAgICAgICAgICAgIC8vY291bGQgaGF2ZSBpdCBmb2N1cyBpbiBvbiB0aGUgcHJvamVjdCB0aXRsZSBvciBjb3VsZCBoYXZlIGl0IG9wZW4gdGhlIHByb2plY3Qgd2luZG93IG9yIGNvdWxkIHJlbW92ZSBpdFxuICAgICAgICAgICAgLy8gZnJvbSB0aGUgcHJvamVjdCBoZWFkZXIgZW50aXJlbHkgc2luY2UgaXQgaXNudCByZWFsbHkgbmVlZGVkIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBlZGl0SWNvblxufTtcblxuY29uc3QgX2NyZWF0ZUNsb3NlSWNvbiA9ICgpID0+IHtcbiAgICBjb25zdCBjbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBjbG9zZUljb24uc3JjID0gXCIuLi9kaXN0L2ljb25zL2Nsb3NlLnN2Z1wiO1xuICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgY2xvc2VJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XG4gICAgICAgIC8vcHJvYmFibHkgd2lsbCBuZWVkIHRvIGFjY2VwdCBhIHR5cGUgaW4gaGVyZSBcbiAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICB9KVxuICAgIHJldHVybiBjbG9zZUljb25cbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGlucHV0IGZpZWxkcyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IF9jcmVhdGVUaXRsZSA9IChvYmopID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndmVyYm9zZScpO1xuXG4gICAgdGl0bGUudHlwZSA9ICd0ZXh0JztcbiAgICB0aXRsZS52YWx1ZSA9IGAke29iai50aXRsZX1gO1xuICAgIHRpdGxlLnNpemUgPSAodGl0bGUudmFsdWUubGVuZ3RoKSszO1xuICAgIHRpdGxlLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICBpZiAob2JqLnR5cGUgPT0gJ2l0ZW0nKXtcbiAgICAgICAgdGl0bGUuaWQgPSBvYmoudGl0bGU7XG4gICAgfSBlbHNlIGlmIChvYmoudHlwZSA9PSAncHJvamVjdCcpe1xuICAgICAgICB0aXRsZS5zdHlsZSA9IFwidGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcIlxuICAgIH1cblxuICAgIHRpdGxlLm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aXRsZS52YWx1ZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aXRsZS5zaXplID0gKHRpdGxlLnZhbHVlLmxlbmd0aCkrMztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRpdGxlLm9uZGJsY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IGZhbHNlO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgfTtcblxuICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9jdXNlZFwiKTtcbiAgICAgICAgdGl0bGUuc2l6ZSA9ICh0aXRsZS52YWx1ZS5sZW5ndGgpKzM7XG4gICAgfSk7XG5cbiAgICBpZiAob2JqLnR5cGUgPT0gJ2l0ZW0nKXtcbiAgICAgICAgdGl0bGUub25jaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSBlLnRhcmdldC5pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLmNvbXBvc2VkUGF0aCgpWzNdLmlkKS5nZXRJdGVtKGUuY29tcG9zZWRQYXRoKClbMl0uaWQpO1xuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBuZXdUaXRsZTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5pZCA9IG5ld1RpdGxlO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG9iai50eXBlID09ICdwcm9qZWN0Jyl7XG4gICAgICAgIHRpdGxlLm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PSAnJyB8fCBwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkoZS50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9IGUuY29tcG9zZWRQYXRoKClbMl0uaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZS50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLmNvbXBvc2VkUGF0aCgpWzJdLmlkKTtcbiAgICAgICAgICAgICAgICBfdXBkYXRlUHJvamVjdChuZXdUaXRsZSwgcHJvamVjdCk7XG4gICAgICAgICAgICAgICAgbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpXG4gICAgICAgICAgICB9IFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aXRsZVxufTtcblxuY29uc3QgX2NyZWF0ZUR1ZURhdGUgPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGR1ZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICBkdWVEYXRlLnZhbHVlID0gaXRlbS5pdGVtRHVlRGF0ZTtcbiAgICBkdWVEYXRlLnJlYWRPbmx5ID0gdHJ1ZTtcblxuICAgIGR1ZURhdGUub25kYmxjbGljayA9IChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgfTtcblxuICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICBkdWVEYXRlLm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVszXS5pZCkuZ2V0SXRlbShlLmNvbXBvc2VkUGF0aCgpWzJdLmlkKTtcbiAgICAgICAgaXRlbS5pdGVtRHVlRGF0ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIH07XG5cbiAgICByZXR1cm4gZHVlRGF0ZVxufTtcblxuY29uc3QgX2NyZWF0ZURlc2NyaXB0aW9uID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBpdGVtRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIGl0ZW1EZXNjcmlwdGlvbi52YWx1ZSA9IGl0ZW0uaXRlbURlc2NyaXB0aW9uO1xuICAgIGl0ZW1EZXNjcmlwdGlvbi5yZWFkT25seSA9IHRydWU7XG5cbiAgICBpdGVtRGVzY3JpcHRpb24ub25kYmxjbGljayA9IChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgfTtcblxuICAgIGl0ZW1EZXNjcmlwdGlvbi5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGl0ZW1EZXNjcmlwdGlvbi5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUuY29tcG9zZWRQYXRoKClbM10uaWQpLmdldEl0ZW0oZS5jb21wb3NlZFBhdGgoKVsyXS5pZCk7XG4gICAgICAgIGl0ZW0uaXRlbURlc2NyaXB0aW9uID0gZS50YXJnZXQudmFsdWU7XG4gICAgfTtcblxuICAgIGl0ZW1EZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdpdGVtRGVzY3JpcHRpb24nKTtcblxuICAgIHJldHVybiBpdGVtRGVzY3JpcHRpb25cbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuY29uc3QgX3VwZGF0ZVByb2plY3QgPSAobmV3VGl0bGUsIHByb2plY3QpID0+IHtcbiAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICBjb25zdCBpdGVtRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5JRCk7XG4gICAgICAgIGl0ZW0uSUQgPSBgJHtuZXdUaXRsZX0tYCArIGAke3Byb2plY3QuZ2l2ZUlEKCl9YDtcbiAgICAgICAgaXRlbURpdi5pZCA9IGl0ZW0uSUQ7XG4gICAgICAgIGl0ZW0ucHJvamVjdFRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgIF91cGRhdGVJdGVtSWNvbnMoKVxuICAgIH1cbiAgICBjb25zdCBwcm9qZWN0RGlzcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByb2plY3QudGl0bGUpO1xuICAgIHByb2plY3QudGl0bGUgPSBuZXdUaXRsZTtcbiAgICBwcm9qZWN0RGlzcC5pZCA9IHByb2plY3QudGl0bGU7XG59O1xuXG5jb25zdCBfdXBkYXRlSXRlbUljb25zID0gKG5ld1RpdGxlLCBpdGVtKSA9PiB7XG4gICAgY29uc3QgY2hlY2tCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgpXG4gICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKVxuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKVxuICAgIC8vbmVlZCB0byB1cGRhdGUgdHJhc2ggaWNvbiwgZWRpdCBpY29uIGlmIHRoZXJlIGlzIG9uZSwgYW5kIGNoZWNrYm94IGljb24gXG4gICAgLy9zZWFyY2ggYnkgY29udGFpbnMgdGhlIG9sZCBpZCBpZiBwb3NzaWJsZSBcbiAgICAvL2hvbmVzdGx5IG5lZWRzIHRvIGdldCBjYWxsZWQgZnJvbSB0aGUgdXBkYXRlIHByb2plY3QsIGV2ZXJ5dGhpbmcgZWxzZSBnZXRzIHVwZGF0ZWQgYXMgaW5wdXRzIFxufTtcblxuZXhwb3J0IHtjcmVhdGVEaXNwbGF5QXJlYSwgbWFuYWdlVmVyYm9zZVByb2plY3QsIG1hbmFnZURpc3BsYXlBcmVhLCBtYW5hZ2VEYXRlV2luZG93fSIsImNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXJCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBoZWFkZXJCYXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJyk7XG5cbiAgICBoZWFkZXJCYXIudGV4dENvbnRlbnQgPSBcIlRvLURvXCJcbiAgICBcbiAgICByZXR1cm4gaGVhZGVyQmFyXG59XG5cbmV4cG9ydCB7Y3JlYXRlSGVhZGVyfSIsImltcG9ydCB7Y3JlYXRlSGVhZGVyfSBmcm9tIFwiLi9oZWFkZXJcIjtcbmltcG9ydCB7bWFuYWdlU2lkZUJhcn0gZnJvbSBcIi4vc2lkZUJhclwiO1xuaW1wb3J0IHtjcmVhdGVEaXNwbGF5QXJlYX0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHtjcmVhdGVJbnB1dH0gZnJvbSBcIi4vaW5wdXRcIjtcblxuXG4vL29uY2UgaSBhZGQgbG9nIGluIGluZm9ybWF0aW9uIGkgc2hvdWxkIG1ha2UgYW5vdGhlciBqcyBzY3JpcHQgZm9yIG1ha2luZyB0aGUgaGVhZGVyIFxuXG5cblxuY29uc3QgaW5pdGlhbGl6ZVdlYnNpdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWFuYWdlU2lkZUJhci5jcmVhdGVTaWRlQmFyKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVEaXNwbGF5QXJlYSgpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXQuY3JlYXRlSW5wdXRCYXIoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVXZWJzaXRlOyIsImltcG9ydCB7bWFuYWdlRGlzcGxheUFyZWF9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7bWFuYWdlU2lkZUJhcn0gZnJvbSBcIi4vc2lkZUJhclwiO1xuXG5jbGFzcyBJdGVtIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgdGl0bGUgPSBcInVua25vd25cIixcbiAgICAgICAgcHJvamVjdFRpdGxlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1EdWVEYXRlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1EZXNjcmlwdGlvbiA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtQ29tcGxldGlvbiA9ICd1bmtub3duJyxcbiAgICAgICAgSUQgPSAndW5rbm93bicsXG4gICAgKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlXG4gICAgICAgIHRoaXMuaXRlbUR1ZURhdGUgPSBpdGVtRHVlRGF0ZVxuICAgICAgICB0aGlzLml0ZW1EZXNjcmlwdGlvbiA9IGl0ZW1EZXNjcmlwdGlvblxuICAgICAgICB0aGlzLml0ZW1Db21wbGV0aW9uID0gaXRlbUNvbXBsZXRpb25cbiAgICAgICAgdGhpcy5JRCA9IElEXG4gICAgICAgIHRoaXMudHlwZSA9ICdpdGVtJ1xuICAgIH1cbn1cblxuY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IoICAgICAgICBcbiAgICAgICAgdGl0bGUgPSAndW5rbm93bicsXG4gICAgKXtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLklEQXNzaWduZXIgPSAtMTtcbiAgICAgICAgdGhpcy5JRCA9IHRpdGxlO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMudHlwZSA9ICdwcm9qZWN0JztcbiAgICB9XG5cbiAgICBnaXZlSUQoKSB7XG4gICAgICAgIHRoaXMuSURBc3NpZ25lciArPTE7XG4gICAgICAgIHJldHVybiB0aGlzLklEQXNzaWduZXJcbiAgICB9XG4gICAgYWRkSXRlbShuZXdJdGVtKSB7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXdJdGVtKVxuICAgIH1cbiAgICByZW1vdmVJdGVtKGl0ZW1JRCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uSUQgIT09IGl0ZW1JRClcbiAgICB9XG4gICAgZ2V0SXRlbShpdGVtSUQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5JRCA9PT0gaXRlbUlEKTtcbiAgICB9XG4gICAgaXNJblByb2plY3QoaXRlbUlEKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5JRCA9PT0gaXRlbUlEKVxuICAgIH1cbn1cblxuY2xhc3MgUHJvamVjdExpYnJhcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb2plY3RzID0gW11cbiAgICB9XG4gICAgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0luUHJvamVjdExpYnJhcnkobmV3UHJvamVjdCkpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlUHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlICE9PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxuICAgIGdldFByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3RUaXRsZSlcbiAgICB9XG4gICAgZ2V0SXRlbShpdGVtSUQpe1xuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHRoaXMucHJvamVjdHMpe1xuICAgICAgICAgICAgaWYgKHByb2plY3QuaXNJblByb2plY3QoaXRlbUlEKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3QuZ2V0SXRlbShpdGVtSUQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNJblByb2plY3RMaWJyYXJ5KHByb2plY3RUaXRsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0TGlicmFyeSA9IG5ldyBQcm9qZWN0TGlicmFyeSgpXG5cblxuY29uc3QgY3JlYXRlSW5wdXQgPSAoKCkgPT4ge1xuXG4gICAgY29uc3QgX3RpdGxlSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgbmV3SXRlbUlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgbmV3SXRlbUlucHV0LmlkID0gJ2l0ZW1JbnB1dCc7XG4gICAgICAgIG5ld0l0ZW1JbnB1dC5wbGFjZWhvbGRlciA9ICdUaXRsZSc7XG4gICAgICAgIG5ld0l0ZW1JbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgXG4gICAgICAgIHJldHVybiBuZXdJdGVtSW5wdXRcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX3Byb2plY3RJbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgbmV3UHJvamVjdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC5pZCA9ICdwcm9qZWN0SW5wdXQnO1xuICAgICAgICBuZXdQcm9qZWN0SW5wdXQucGxhY2Vob2xkZXIgPSAnUHJvamVjdCc7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC5zdHlsZSA9IFwidGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcIlxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ld1Byb2plY3RJbnB1dFxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfZHVlRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICBkdWVEYXRlLmlkID0gJ2R1ZURhdGUnO1xuICAgIFxuICAgICAgICByZXR1cm4gZHVlRGF0ZVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfZGVzY3JpcHRpb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICBkZXNjcmlwdGlvbi5pZCA9ICdpdGVtRGVzY3JpcHRpb24nO1xuICAgICAgICBkZXNjcmlwdGlvbi5jb2xzID0gJzMwJztcbiAgICAgICAgZGVzY3JpcHRpb24ucm93cyA9ICcxMCc7XG4gICAgICAgIGRlc2NyaXB0aW9uLnBsYWNlaG9sZGVyID0gJ0Rlc2NyaXB0aW9uJztcbiAgICBcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVBZGRCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhZGRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIEl0ZW0nO1xuICAgICAgICBhZGRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgIFxuICAgICAgICByZXR1cm4gYWRkQnV0dG9uXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVJdGVtRnJvbUlucHV0ID0gKCkgPT4ge1xuICAgIFxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtSW5wdXQnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RJbnB1dCcpLnZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVlRGF0ZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBpdGVtRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbURlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgXG4gICAgICAgIGlucHV0Rm9ybS5yZXNldCgpO1xuICAgIFxuICAgICAgICByZXR1cm4gbmV3IEl0ZW0odGl0bGUsIHByb2plY3RUaXRsZSwgZHVlRGF0ZSwgaXRlbURlc2NyaXB0aW9uLCBmYWxzZSwgJ3Vua25vd24nKVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfYWRkSXRlbSA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IF9jcmVhdGVJdGVtRnJvbUlucHV0KCk7XG4gICAgXG4gICAgICAgIGlmIChwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkobmV3SXRlbS5wcm9qZWN0VGl0bGUpKXtcbiAgICAgICAgICAgIG5ld0l0ZW0uSUQgPSBgJHtuZXdJdGVtLnByb2plY3RUaXRsZX0tYCtgJHtwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKS5naXZlSUQoKX1gO1xuICAgICAgICAgICAgcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSkuYWRkSXRlbShuZXdJdGVtKTtcbiAgICAgICAgICAgIC8vIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvUHJvamVjdFRpbGUobmV3SXRlbSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXByb2plY3RMaWJyYXJ5LmlzSW5Qcm9qZWN0TGlicmFyeShuZXdJdGVtLnByb2plY3RUaXRsZSkpe1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIHByb2plY3RMaWJyYXJ5LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgICAgICAgICBuZXdJdGVtLklEID0gYCR7bmV3SXRlbS5wcm9qZWN0VGl0bGV9LWArYCR7cHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSkuZ2l2ZUlEKCl9YDtcbiAgICAgICAgICAgIHByb2plY3QuYWRkSXRlbShuZXdJdGVtKTtcbiAgICAgICAgICAgIC8vIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgICAgICAgICAvLyBtYW5hZ2VEaXNwbGF5QXJlYS5hZGRUb1Byb2plY3RUaWxlKG5ld0l0ZW0pO1xuICAgICAgICAgICAgLy8gbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICB9XG4gICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUNsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjbGVhckJ1dHRvbi50ZXh0Q29udGVudCA9ICdDbGVhcic7XG4gICAgICAgIGNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlucHV0Rm9ybS5yZXNldCgpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY2xlYXJCdXR0b25cbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUlucHV0Rm9ybSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBpbnB1dEZvcm0uY2xhc3NMaXN0LmFkZCgnbmV3SXRlbUZvcm0nKTtcbiAgICAgICAgaW5wdXRGb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCdpbnB1dEZvcm0nKTtcbiAgICAgICAgaW5wdXRGb3JtLm9uc3VibWl0ID0gX2FkZEl0ZW07XG4gICAgXG4gICAgICAgIGNvbnN0IG5ld0l0ZW1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIG5ld0l0ZW1IZWFkZXIudGV4dENvbnRlbnQgPSAnQWRkIE5ldyBJdGVtJ1xuICAgIFxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQobmV3SXRlbUhlYWRlcik7XG4gICAgXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfdGl0bGVJbnB1dCgpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9wcm9qZWN0SW5wdXQoKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfZHVlRGF0ZUlucHV0KCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX2Rlc2NyaXB0aW9uSW5wdXQoKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfY3JlYXRlQWRkQnV0dG9uKCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX2NyZWF0ZUNsZWFyQnV0dG9uKCkpO1xuICAgIFxuICAgICAgICByZXR1cm4gaW5wdXRGb3JtXG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlSW5wdXRCYXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW1CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV3SXRlbUJhci5jbGFzc0xpc3QuYWRkKCduZXdJdGVtQmFyJyk7XG4gICAgICAgIG5ld0l0ZW1CYXIuYXBwZW5kQ2hpbGQoX2NyZWF0ZUlucHV0Rm9ybSgpKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1CYXJcbiAgICB9XG5cbiAgICByZXR1cm4ge2NyZWF0ZUlucHV0QmFyfVxufSkoKTtcblxuXG5leHBvcnQge2NyZWF0ZUlucHV0LCBwcm9qZWN0TGlicmFyeX0iLCJpbXBvcnQgeyBtYW5hZ2VWZXJib3NlUHJvamVjdCwgbWFuYWdlRGlzcGxheUFyZWEsIG1hbmFnZURhdGVXaW5kb3cgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBwcm9qZWN0TGlicmFyeSB9IGZyb20gXCIuL2lucHV0XCI7XG5cbmNvbnN0IG1hbmFnZVNpZGVCYXIgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGNyZWF0ZVNpZGVCYXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2lkZUJhci5jbGFzc0xpc3QuYWRkKCdzaWRlQmFyJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgaG9tZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdIb21lJztcbiAgICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0b2RheUJ1dHRvbi50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgIHRvZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbWFuYWdlRGF0ZVdpbmRvdy5vcGVuRGF0ZVdpbmRvdygwKTtcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB3ZWVrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHdlZWtCdXR0b24udGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJztcbiAgICAgICAgd2Vla0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1hbmFnZURhdGVXaW5kb3cub3BlbkRhdGVXaW5kb3coNyk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKGhvbWVCdXR0b24pO1xuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKHRvZGF5QnV0dG9uKTtcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZCh3ZWVrQnV0dG9uKTtcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZChfY3JlYXRlUHJvamVjdEFyZWEoKSk7XG4gICAgXG4gICAgICAgIHJldHVybiBzaWRlQmFyXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVQcm9qZWN0QXJlYSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFyZWFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdEFyZWEuc2V0QXR0cmlidXRlKCdpZCcsJ3Byb2plY3RBcmVhJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgXG4gICAgICAgIHByb2plY3RBcmVhQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RIZWFkaW5nKTtcbiAgICAgICAgcHJvamVjdEFyZWFDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEFyZWEpO1xuICAgIFxuICAgICAgICByZXR1cm4gcHJvamVjdEFyZWFDb250YWluZXJcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX3Jlc2V0UHJvamVjdEFyZWEgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RBcmVhJyk7XG4gICAgICAgIHByb2plY3RBcmVhLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCByZWdlbmVyYXRlUHJvamVjdEFyZWEgPSAocHJvamVjdExpYnJhcnkpID0+IHtcbiAgICAgICAgX3Jlc2V0UHJvamVjdEFyZWEoKTtcbiAgICAgICAgLy8gY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9qZWN0QXJlYScpOyBcbiAgICAgICAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0TGlicmFyeS5wcm9qZWN0cyl7XG4gICAgICAgICAgICBfYWRkUHJvamVjdEJ1dHRvbihwcm9qZWN0KVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9hZGRQcm9qZWN0QnV0dG9uID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEFyZWEnKTtcbiAgICBcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLGAke3Byb2plY3QudGl0bGV9YCsnLWJ1dHRvbicpO1xuICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcbiAgICBcbiAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLnRhcmdldC5pZC5zbGljZSgwLC03KSk7XG4gICAgICAgICAgICBtYW5hZ2VWZXJib3NlUHJvamVjdC5vcGVuVmVyYm9zZVByb2plY3QocHJvamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnV0dG9uKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3UHJvamVjdEJ1dHRvbilcbiAgICAgICAgLy8gcmV0dXJuIChuZXdQcm9qZWN0QnV0dG9uKVxuICAgIH1cbiAgICBcbiAgICAvLyBjb25zdCByZW1vdmVQcm9qZWN0QnV0dG9uID0gKHByb2plY3QpID0+IHtcbiAgICAvLyAgICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEFyZWEnKTtcbiAgICAvLyAgICAgcHJvamVjdEFyZWEucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cHJvamVjdC5wcm9qZWN0VGl0bGV9YCsgJy1idXR0b24nKSk7XG4gICAgLy8gfVxuXG4gICAgcmV0dXJuIHtjcmVhdGVTaWRlQmFyLCByZWdlbmVyYXRlUHJvamVjdEFyZWF9XG59KSgpO1xuXG5cbi8vbmVlZCBhIGZ1bmN0aW9uIHRvIHJlbmFtZSBhbmQgcmUgSUQgdGhlc2UgXG5leHBvcnQge21hbmFnZVNpZGVCYXJ9XG5cbi8vIGV4cG9ydCB7Y3JlYXRlU2lkZUJhciwgYWRkUHJvamVjdEJ1dHRvbiwgcmVtb3ZlUHJvamVjdEJ1dHRvbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBpbml0aWFsaXplV2Vic2l0ZSBmcm9tIFwiLi9pbml0V2Vic2l0ZVwiO1xuXG5pbml0aWFsaXplV2Vic2l0ZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==