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
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");




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
    const displayArea = document.getElementById('displayArea');
    const itemModal = document.createElement('div');
    itemModal.classList.add('modal');
    window.onclick = (e) => {
        if (e.target == itemModal) {
            manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
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
        checkboxIcon.src =  '../dist/icons/checkbox-blank-outline.svg';
    } else if (item.itemCompletion) {
        checkboxIcon.src = "../dist/icons/checkbox-outline.svg";
    }

    checkboxIcon.addEventListener('click', (e) => {
        const itemID = e.target.id.split('/').pop()
        const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getItem(itemID);
        const img = e.composedPath()[0];
        _toggleComplete(item, img);
        (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveLocal)();
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
            (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveLocal)();
        });
    } else if (type == 'project'){
        trashIcon.addEventListener('click', (e) => {
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.target.id.split('/').pop());
            _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.removeProject(project.title);
            _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
            manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
            (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveLocal)();
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
            const itemID = e.target.id.split('/').pop()
            const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getItem(itemID);
            _openItemWindow(item);
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
                const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getItem(itemID);
                item.title = newTitle;
                e.target.id = newTitle;
                (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveLocal)();
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
                _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
                (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveLocal)();
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
        const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getItem(itemID);
        item.itemDueDate = e.target.value;
        (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveLocal)();
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
        const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getItem(itemID);
        item.itemDescription = e.target.value;
        (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveLocal)();
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
    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveLocal)();
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
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storage */ "./src/storage.js");






//once i add log in information i should make another js script for making the header 



const initializeWebsite = () => {
    const container = document.getElementById('container');

    container.appendChild((0,_header__WEBPACK_IMPORTED_MODULE_0__.createHeader)());
    container.appendChild(_sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.createSideBar());
    container.appendChild((0,_display__WEBPACK_IMPORTED_MODULE_2__.createDisplayArea)());
    container.appendChild(_input__WEBPACK_IMPORTED_MODULE_3__.createInput.createInputBar());

    (0,_storage__WEBPACK_IMPORTED_MODULE_4__.checkStorage)();
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
/* harmony export */   "Item": () => (/* binding */ Item),
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ProjectLibrary": () => (/* binding */ ProjectLibrary),
/* harmony export */   "createInput": () => (/* binding */ createInput),
/* harmony export */   "projectLibrary": () => (/* binding */ projectLibrary)
/* harmony export */ });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _sideBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sideBar */ "./src/sideBar.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");




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
        _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.regenerateDisplayArea(projectLibrary);
        _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(projectLibrary);
        (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveLocal)()
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

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkStorage": () => (/* binding */ checkStorage),
/* harmony export */   "retrieveLocal": () => (/* binding */ retrieveLocal),
/* harmony export */   "saveLocal": () => (/* binding */ saveLocal)
/* harmony export */ });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/input.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _sideBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sideBar */ "./src/sideBar.js");




// local storage 

const saveLocal = () => {
    localStorage.setItem('projectLibrary', JSON.stringify(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.projects));
    console.log(localStorage)
}

const retrieveLocal = () => {

    const projects = JSON.parse(localStorage.getItem('projectLibrary'))
    if (projects) {
        //library.books = books.map((book) => JSONToBook(book))
        _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.projects = projects.map((project) => reconstructProject(project));
        // reconstructProjectLibrary(projectLibrary);
    } else {
      _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.projects = []
    }

    console.log(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary)
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
    const newProject = new _input__WEBPACK_IMPORTED_MODULE_0__.Project(project.title);
    newProject.items = project.items.map((item) => reconstructItem(item))
    return newProject
}

const reconstructItem = (item) => {
    return new _input__WEBPACK_IMPORTED_MODULE_0__.Item (item.title, item.projectTitle, item.itemDueDate, item.itemDescription, item.itemCompletion, item.ID)
}

const checkStorage = () => {
    if (_storageAvailable('localStorage')) {
        // Yippee! We can use localStorage awesomeness
        retrieveLocal();
        _display__WEBPACK_IMPORTED_MODULE_1__.manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
        _sideBar__WEBPACK_IMPORTED_MODULE_2__.manageSideBar.regenerateProjectArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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STtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkVBQXVDLENBQUMsa0RBQWM7QUFDOUQsUUFBUSx5RUFBbUMsQ0FBQyxrREFBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7VUNsRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044Qzs7QUFFOUMsd0RBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbml0V2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbnB1dC5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zaWRlQmFyLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb2plY3RMaWJyYXJ5fSBmcm9tIFwiLi9pbnB1dFwiO1xuaW1wb3J0IHttYW5hZ2VTaWRlQmFyfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5pbXBvcnQgeyBzYXZlTG9jYWwgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmNvbnN0IGNyZWF0ZURpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGlzcGxheUFyZWEuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5QXJlYScpO1xuXG4gICAgcmV0dXJuIGRpc3BsYXlBcmVhXG59XG5cbmNvbnN0IGNsZWFyRGlzcGxheUFyZWEgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICBkaXNwbGF5QXJlYS5pbm5lckhUTUwgPSAnJztcbn1cblxuY29uc3QgbWFuYWdlRGlzcGxheUFyZWEgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRvRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgICAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZChfY3JlYXRlUHJvamVjdFRpbGUocHJvamVjdCkpO1xuICAgIH1cbiAgICBcbiAgICAvLyBjb25zdCByZW1vdmVGcm9tRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgIC8vICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgIC8vICAgICBkaXNwbGF5QXJlYS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0LnByb2plY3RUaXRsZSkpO1xuICAgIC8vICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSlcbiAgICAvLyB9XG4gICAgXG4gICAgY29uc3QgYWRkVG9Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgICAgICBwcm9qZWN0VGlsZS5hcHBlbmRDaGlsZChfY3JlYXRlSXRlbShpdGVtKSk7XG4gICAgfVxuICAgIFxuICAgIC8vIGNvbnN0IHJlbW92ZUZyb21Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgIC8vICAgICBwcm9qZWN0VGlsZS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLml0ZW1JRCkpO1xuICAgIFxuICAgIC8vICAgICBpZiAocHJvamVjdFRpbGUuY2hpbGROb2Rlcy5sZW5ndGggPT0gMSl7XG4gICAgLy8gICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChpdGVtLnByb2plY3RUaXRsZSk7XG4gICAgLy8gICAgICAgICByZW1vdmVGcm9tRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlSXRlbURpdicpO1xuICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaXRlbS5JRCk7XG5cbiAgICAgICAgY29uc3QgdG9wUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvcFJvdy5jbGFzc0xpc3QuYWRkKCdpdGVtRGl2Jyk7XG5cbiAgICAgICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbUNvbXBsZXRpb24pIHtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVDaGVja0ljb24oaXRlbSkpO1xuICAgICAgICB0b3BSb3cuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRpdGxlKGl0ZW0pKTtcbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbihpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKGl0ZW0sIGZhbHNlKSk7XG5cbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodG9wUm93KTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGxpc3RJdGVtXG4gICAgfVxuXG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZVByb2plY3RUaWxlID0gKHByb2plY3QpID0+IHtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdFRpbGUnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuc2V0QXR0cmlidXRlKCdpZCcsIHByb2plY3QudGl0bGUpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoZWFkZXJEaXYuY2xhc3NMaXN0LmFkZCgnaGVhZGVyRGl2Jyk7XG5cbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShwcm9qZWN0KSk7XG5cbiAgICAgICAgLy8vIG1pZ2h0IHdhbnQgdG8gcmVtb3ZlIHRoaXMgYnV0IGl0IGlzIG5pY2UgdG8gaGF2ZSBpdCBcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbihwcm9qZWN0KSk7XG4gICAgICAgIC8vL1xuXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKHByb2plY3QsIGZhbHNlKSk7XG4gICAgXG4gICAgICAgIHByb2plY3RUaWxlLmFwcGVuZENoaWxkKGhlYWRlckRpdik7XG4gICAgXG4gICAgICAgIHJldHVybiBwcm9qZWN0VGlsZVxuICAgIH1cblxuICAgIGNvbnN0IHJlZ2VuZXJhdGVEaXNwbGF5QXJlYSA9IChwcm9qZWN0TGlicmFyeSkgPT4ge1xuICAgICAgICBjbGVhckRpc3BsYXlBcmVhKCk7XG4gICAgICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpYnJhcnkucHJvamVjdHMpe1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9EaXNwbGF5QXJlYShwcm9qZWN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9Qcm9qZWN0VGlsZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge2FkZFRvRGlzcGxheUFyZWEsIGFkZFRvUHJvamVjdFRpbGUsIHJlZ2VuZXJhdGVEaXNwbGF5QXJlYX1cblxufSkoKTtcblxuY29uc3QgbWFuYWdlVmVyYm9zZVByb2plY3QgPSAoKCkgPT4ge1xuICAgIGNvbnN0IG9wZW5WZXJib3NlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNsZWFyRGlzcGxheUFyZWEoKTtcblxuICAgICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgIFxuICAgICAgICBjb25zdCB2ZXJib3NlUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlUHJvamVjdC5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtwcm9qZWN0LnRpdGxlfWApO1xuXG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LmFwcGVuZENoaWxkKF9jcmVhdGVWZXJib3NlSGVhZGVyKHByb2plY3QpKTtcblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICAgICAgdmVyYm9zZVByb2plY3QuYXBwZW5kQ2hpbGQoY3JlYXRlVmVyYm9zZUl0ZW0oaXRlbSkpO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BsYXlBcmVhLmFwcGVuZENoaWxkKHZlcmJvc2VQcm9qZWN0KTtcbiAgICB9XG5cblxuICAgIGNvbnN0IF9jcmVhdGVWZXJib3NlSGVhZGVyID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgdmVyYm9zZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlckRpdicpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShwcm9qZWN0KSk7XG4gICAgICAgIHZlcmJvc2VIZWFkZXIuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRyYXNoSWNvbihwcm9qZWN0LCBmYWxzZSkpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVDbG9zZUljb24oKSk7XG5cbiAgICAgICAgcmV0dXJuIHZlcmJvc2VIZWFkZXJcbiAgICB9XG4gICAgXG4gICAgXG4gICAgY29uc3QgY3JlYXRlVmVyYm9zZUl0ZW0gPSAoaXRlbSkgPT4geyAgICBcbiAgICAgICAgLy8gY291bGQgdGFrZSBpbiB0d28gdmFyaWFibGVzLCBvbmUgZm9yIHZlcmJvc2UgYW5kIFxuICAgICAgICAvLyBvbmUgZm9yIGRhdGUgd2luZG93IGFuZCB0aGVuIHdpdGggdGhlIHJpZ2h0IGNvbmRpdGlvbnMgaSB3b3VsZCBcbiAgICAgICAgLy8gbm90IG5lZWQgdHdvIGl0ZW0gZnVuY3Rpb25zIFxuICAgICAgICBjb25zdCB2ZXJib3NlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlSXRlbURpdicpO1xuICAgICAgICB2ZXJib3NlSXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aXRlbS5JRH1gKTtcblxuICAgICAgICBjb25zdCB0b3BSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9wUm93LmNsYXNzTGlzdC5hZGQoJ2l0ZW1EaXYnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghaXRlbS5pdGVtQ29tcGxldGlvbil7XG4gICAgICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLml0ZW1Db21wbGV0aW9uKSB7XG4gICAgICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlQ2hlY2tJY29uKGl0ZW0pKTtcbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlRHVlRGF0ZShpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKGl0ZW0pKTtcblxuICAgICAgICB2ZXJib3NlSXRlbS5hcHBlbmRDaGlsZCh0b3BSb3cpO1xuICAgICAgICB2ZXJib3NlSXRlbS5hcHBlbmRDaGlsZChfY3JlYXRlRGVzY3JpcHRpb24oaXRlbSkpO1xuICAgICAgICByZXR1cm4gdmVyYm9zZUl0ZW1cbiAgICB9XG5cbiAgICByZXR1cm4ge29wZW5WZXJib3NlUHJvamVjdCwgY3JlYXRlVmVyYm9zZUl0ZW19XG59KSgpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGRhdGUgd2luZG93IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IG1hbmFnZURhdGVXaW5kb3cgPSAoKCkgPT4ge1xuXG4gICAgY29uc3Qgb3BlbkRhdGVXaW5kb3cgPSAodGFyZ2V0KSA9PiB7XG5cbiAgICAgICAgY2xlYXJEaXNwbGF5QXJlYSgpO1xuXG4gICAgICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgICAgIGNvbnN0IGRhdGVXaW5kb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGF0ZVdpbmRvdy5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdkYXRlSGVhZGVyJyk7XG4gICAgICAgIGlmICh0YXJnZXQgPT0gMCl7XG4gICAgICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PSA3KXtcbiAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnO1xuICAgICAgICB9XG4gICAgICAgIGRhdGVXaW5kb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaWJyYXJ5LnByb2plY3RzKXtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgICAgICAgICAgaWYgKGdldERhdGVEaWZmZXJlbmNlKG5ldyBEYXRlKGl0ZW0uaXRlbUR1ZURhdGUpKTw9dGFyZ2V0KXtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZVdpbmRvdy5hcHBlbmRDaGlsZChtYW5hZ2VWZXJib3NlUHJvamVjdC5jcmVhdGVWZXJib3NlSXRlbShpdGVtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRpc3BsYXlBcmVhLmFwcGVuZENoaWxkKGRhdGVXaW5kb3cpO1xuICAgIH1cblxuICAgIGNvbnN0IGdldERhdGVEaWZmZXJlbmNlID0gKGRhdGUpID0+IHtcbiAgICAgICAgY29uc3QgZHVlRGF0ZU1pbGlTZWMgPSBEYXRlLlVUQyhcbiAgICAgICAgICBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgIGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdG9kYXlNaWxpU2VjID0gRGF0ZS5VVEModG9kYXkuZ2V0RnVsbFllYXIoKSwgdG9kYXkuZ2V0TW9udGgoKSwgdG9kYXkuZ2V0RGF0ZSgpKTtcbiAgICAgIFxuICAgICAgICBjb25zdCBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgPSBkdWVEYXRlTWlsaVNlYyAtIHRvZGF5TWlsaVNlYztcbiAgICAgIFxuICAgICAgICBjb25zdCBkaWZmZXJlbmNlSW5EYXlzID0gZGlmZmVyZW5jZUluTWlsbGlzZWNvbmRzIC8gMTAwMCAvIDYwIC8gNjAgLyAyNDtcbiAgICAgIFxuICAgICAgICByZXR1cm4gZGlmZmVyZW5jZUluRGF5cysxO1xuICAgIH1cblxuICAgIHJldHVybiB7b3BlbkRhdGVXaW5kb3d9XG59KSgpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGl0ZW0gd2luZG93IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBfb3Blbkl0ZW1XaW5kb3cgPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgY29uc3QgaXRlbU1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaXRlbU1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgd2luZG93Lm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT0gaXRlbU1vZGFsKSB7XG4gICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGl0ZW1Nb2RhbC5hcHBlbmRDaGlsZChtYW5hZ2VWZXJib3NlUHJvamVjdC5jcmVhdGVWZXJib3NlSXRlbShpdGVtKSk7XG4gICAgZGlzcGxheUFyZWEuYXBwZW5kQ2hpbGQoaXRlbU1vZGFsKTtcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBpY29ucyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3QgX2NyZWF0ZUNoZWNrSWNvbiA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgY2hlY2tib3hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgY2hlY2tib3hJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICBjaGVja2JveEljb24uaWQgPSBcImNoZWNrQm94L1wiK2Ake2l0ZW0uSUR9YDtcblxuICAgIGlmICghaXRlbS5pdGVtQ29tcGxldGlvbil7XG4gICAgICAgIGNoZWNrYm94SWNvbi5zcmMgPSAgJy4uL2Rpc3QvaWNvbnMvY2hlY2tib3gtYmxhbmstb3V0bGluZS5zdmcnO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtQ29tcGxldGlvbikge1xuICAgICAgICBjaGVja2JveEljb24uc3JjID0gXCIuLi9kaXN0L2ljb25zL2NoZWNrYm94LW91dGxpbmUuc3ZnXCI7XG4gICAgfVxuXG4gICAgY2hlY2tib3hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbUlEID0gZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKVxuICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0SXRlbShpdGVtSUQpO1xuICAgICAgICBjb25zdCBpbWcgPSBlLmNvbXBvc2VkUGF0aCgpWzBdO1xuICAgICAgICBfdG9nZ2xlQ29tcGxldGUoaXRlbSwgaW1nKTtcbiAgICAgICAgc2F2ZUxvY2FsKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGNoZWNrYm94SWNvblxufVxuXG5jb25zdCBfdG9nZ2xlQ29tcGxldGUgPSAoaXRlbSwgaW1nKSA9PiB7XG4gICAgY29uc3QgaXRlbURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uSUQpO1xuICAgIGlmICghaXRlbS5pdGVtQ29tcGxldGlvbil7XG4gICAgICAgIGl0ZW1EaXYuY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XG4gICAgICAgIGltZy5zcmMgPSBcIi4uL2Rpc3QvaWNvbnMvY2hlY2tib3gtb3V0bGluZS5zdmdcIjtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbUNvbXBsZXRpb24pIHtcbiAgICAgICAgaXRlbURpdi5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgaW1nLnNyYyA9ICAnLi4vZGlzdC9pY29ucy9jaGVja2JveC1ibGFuay1vdXRsaW5lLnN2Zyc7XG4gICAgfVxuICAgIGl0ZW0uaXRlbUNvbXBsZXRpb24gPSAhaXRlbS5pdGVtQ29tcGxldGlvbjtcbn1cblxuY29uc3QgX2NyZWF0ZVRyYXNoSWNvbiA9IChvYmosIHZlcmJvc2UsIGRhdGVXaW5kb3cpID0+IHtcbiAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB0cmFzaEljb24uc3JjID0gJy4uL2Rpc3QvaWNvbnMvdHJhc2gtY2FuLW91dGxpbmUuc3ZnJztcbiAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuICAgIHRyYXNoSWNvbi5pZCA9IFwidHJhc2gvXCIgKyBgJHtvYmouSUR9YFxuXG4gICAgY29uc3QgdHlwZSA9IG9iai50eXBlO1xuICAgIGNvbnN0IHZlcmIgPSB2ZXJib3NlO1xuXG4gICAgaWYgKHR5cGUgPT0gJ2l0ZW0nKXtcbiAgICAgICAgdHJhc2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpKTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRJdGVtKGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKCkpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoaXRlbS5wcm9qZWN0VGl0bGUpO1xuXG4gICAgICAgICAgICBpZihpdGVtRGl2LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPD0gMil7XG4gICAgICAgICAgICAgICAgcHJvamVjdExpYnJhcnkucmVtb3ZlUHJvamVjdChwcm9qZWN0LnRpdGxlKTtcbiAgICAgICAgICAgICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGl0ZW1EaXYucmVtb3ZlKClcbiAgICAgICAgICAgIHByb2plY3QucmVtb3ZlSXRlbShpdGVtLklEKTtcbiAgICAgICAgICAgIHNhdmVMb2NhbCgpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3Byb2plY3QnKXtcbiAgICAgICAgdHJhc2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKCkpO1xuICAgICAgICAgICAgcHJvamVjdExpYnJhcnkucmVtb3ZlUHJvamVjdChwcm9qZWN0LnRpdGxlKTtcbiAgICAgICAgICAgIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgICAgICBzYXZlTG9jYWwoKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRyYXNoSWNvblxufVxuXG5jb25zdCBfY3JlYXRlRWRpdEljb24gPSAob2JqKSA9PiB7XG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgZWRpdEljb24uc3JjID0gJy4uL2Rpc3QvaWNvbnMvdGV4dC1ib3gtZWRpdC1vdXRsaW5lLnN2Zyc7XG4gICAgZWRpdEljb24uaWQgPSBcImVkaXQvXCIrYCR7b2JqLklEfWBcbiAgICBpZiAob2JqLnR5cGUgPT0gJ3Byb2plY3QnKXtcbiAgICAgICAgZWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKSk7XG4gICAgICAgICAgICBtYW5hZ2VWZXJib3NlUHJvamVjdC5vcGVuVmVyYm9zZVByb2plY3QocHJvamVjdCk7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIGlmIChvYmoudHlwZSA9PSAnaXRlbScpe1xuICAgICAgICBlZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSUQgPSBlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0SXRlbShpdGVtSUQpO1xuICAgICAgICAgICAgX29wZW5JdGVtV2luZG93KGl0ZW0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBlZGl0SWNvblxufTtcblxuY29uc3QgX2NyZWF0ZUNsb3NlSWNvbiA9ICgpID0+IHtcbiAgICBjb25zdCBjbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBjbG9zZUljb24uc3JjID0gXCIuLi9kaXN0L2ljb25zL2Nsb3NlLnN2Z1wiO1xuICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgY2xvc2VJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XG4gICAgICAgIC8vcHJvYmFibHkgd2lsbCBuZWVkIHRvIGFjY2VwdCBhIHR5cGUgaW4gaGVyZSBcbiAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICB9KVxuICAgIHJldHVybiBjbG9zZUljb25cbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGlucHV0IGZpZWxkcyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IF9jcmVhdGVUaXRsZSA9IChvYmopID0+IHtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndmVyYm9zZScpO1xuXG4gICAgdGl0bGUudHlwZSA9ICd0ZXh0JztcbiAgICB0aXRsZS52YWx1ZSA9IGAke29iai50aXRsZX1gO1xuICAgIHRpdGxlLnNpemUgPSAodGl0bGUudmFsdWUubGVuZ3RoKSszO1xuICAgIHRpdGxlLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICBpZiAob2JqLnR5cGUgPT0gJ2l0ZW0nKXtcbiAgICAgICAgdGl0bGUuaWQgPSBcInRpdGxlL1wiK2Ake29iai5JRH1gXG4gICAgfSBlbHNlIGlmIChvYmoudHlwZSA9PSAncHJvamVjdCcpe1xuICAgICAgICB0aXRsZS5zdHlsZSA9IFwidGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcIlxuICAgIH1cblxuICAgIHRpdGxlLm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aXRsZS52YWx1ZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aXRsZS5zaXplID0gKHRpdGxlLnZhbHVlLmxlbmd0aCkrMztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRpdGxlLm9uZGJsY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IGZhbHNlO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgfTtcblxuICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9jdXNlZFwiKTtcbiAgICAgICAgdGl0bGUuc2l6ZSA9ICh0aXRsZS52YWx1ZS5sZW5ndGgpKzM7XG4gICAgfSk7XG5cbiAgICBpZiAob2JqLnR5cGUgPT0gJ2l0ZW0nKXtcbiAgICAgICAgdGl0bGUub25jaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSBlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1JRCA9IGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKClcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0SXRlbShpdGVtSUQpO1xuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBuZXdUaXRsZTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5pZCA9IG5ld1RpdGxlO1xuICAgICAgICAgICAgICAgIHNhdmVMb2NhbCgpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG9iai50eXBlID09ICdwcm9qZWN0Jyl7XG4gICAgICAgIHRpdGxlLm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PSAnJyB8fCBwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkoZS50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9IGUuY29tcG9zZWRQYXRoKClbMl0uaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZS50YXJnZXQudmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLmNvbXBvc2VkUGF0aCgpWzJdLmlkKTtcbiAgICAgICAgICAgICAgICBfdXBkYXRlUHJvamVjdChuZXdUaXRsZSwgcHJvamVjdCk7XG4gICAgICAgICAgICAgICAgbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICAgICAgICAgIHNhdmVMb2NhbCgpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGl0bGVcbn07XG5cbmNvbnN0IF9jcmVhdGVEdWVEYXRlID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBkdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgZHVlRGF0ZS52YWx1ZSA9IGl0ZW0uaXRlbUR1ZURhdGU7XG4gICAgZHVlRGF0ZS5yZWFkT25seSA9IHRydWU7XG4gICAgZHVlRGF0ZS5pZCA9IFwiZHVlRGF0ZS9cIitgJHtpdGVtLklEfWBcblxuICAgIGR1ZURhdGUub25kYmxjbGljayA9IChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgfTtcblxuICAgIGR1ZURhdGUuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICBkdWVEYXRlLm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbUlEID0gZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKVxuICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0SXRlbShpdGVtSUQpO1xuICAgICAgICBpdGVtLml0ZW1EdWVEYXRlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHNhdmVMb2NhbCgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZHVlRGF0ZVxufTtcblxuY29uc3QgX2NyZWF0ZURlc2NyaXB0aW9uID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBpdGVtRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIGl0ZW1EZXNjcmlwdGlvbi52YWx1ZSA9IGl0ZW0uaXRlbURlc2NyaXB0aW9uO1xuICAgIGl0ZW1EZXNjcmlwdGlvbi5yZWFkT25seSA9IHRydWU7XG4gICAgaXRlbURlc2NyaXB0aW9uLmlkID0gXCJkZXNjcmlwdGlvbi9cIitgJHtpdGVtLklEfWBcblxuICAgIGl0ZW1EZXNjcmlwdGlvbi5vbmRibGNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgaXRlbURlc2NyaXB0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgaXRlbURlc2NyaXB0aW9uLm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbUlEID0gZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKVxuICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0SXRlbShpdGVtSUQpO1xuICAgICAgICBpdGVtLml0ZW1EZXNjcmlwdGlvbiA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBzYXZlTG9jYWwoKTtcbiAgICB9O1xuXG4gICAgaXRlbURlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ2l0ZW1EZXNjcmlwdGlvbicpO1xuXG4gICAgcmV0dXJuIGl0ZW1EZXNjcmlwdGlvblxufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXG5jb25zdCBfdXBkYXRlUHJvamVjdCA9IChuZXdUaXRsZSwgcHJvamVjdCkgPT4ge1xuICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgIF91cGRhdGVJdGVtKG5ld1RpdGxlLCBpdGVtLCBwcm9qZWN0KTtcbiAgICB9XG4gICAgY29uc3QgcHJvamVjdERpc3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0LnRpdGxlKTtcbiAgICBwcm9qZWN0LnRpdGxlID0gbmV3VGl0bGU7XG4gICAgcHJvamVjdERpc3AuaWQgPSBwcm9qZWN0LnRpdGxlO1xuICAgIHNhdmVMb2NhbCgpO1xufTtcblxuY29uc3QgX3VwZGF0ZUl0ZW0gPSAobmV3VGl0bGUsIGl0ZW0sIHByb2plY3QpID0+IHtcbiAgICBjb25zdCBpdGVtRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5JRCk7XG4gICAgY29uc3QgY2hlY2tCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hlY2tCb3gvJytgJHtpdGVtLklEfWApO1xuICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFzaC8nK2Ake2l0ZW0uSUR9YCk7XG4gICAgaWYgKCEhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQvJytgJHtpdGVtLklEfWApKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2hpJylcbiAgICAgICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC8nK2Ake2l0ZW0uSUR9YCk7XG5cbiAgICAgICAgaXRlbS5JRCA9IGAke25ld1RpdGxlfS1gICsgYCR7cHJvamVjdC5naXZlSUQoKX1gO1xuICAgICAgICBpdGVtRGl2LmlkID0gaXRlbS5JRDtcbiAgICAgICAgaXRlbS5wcm9qZWN0VGl0bGUgPSBuZXdUaXRsZTtcbiAgICBcbiAgICAgICAgY2hlY2tCb3guaWQgPSAnY2hlY2tCb3gvJytgJHtpdGVtLklEfWA7XG4gICAgICAgIHRyYXNoSWNvbi5pZCA9ICd0cmFzaC8nK2Ake2l0ZW0uSUR9YDtcbiAgICAgICAgZWRpdEljb24uaWQgPSAnZWRpdC8nK2Ake2l0ZW0uSUR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLklEID0gYCR7bmV3VGl0bGV9LWAgKyBgJHtwcm9qZWN0LmdpdmVJRCgpfWA7XG4gICAgICAgIGl0ZW1EaXYuaWQgPSBpdGVtLklEO1xuICAgICAgICBpdGVtLnByb2plY3RUaXRsZSA9IG5ld1RpdGxlO1xuICAgICAgICBjaGVja0JveC5pZCA9ICdjaGVja0JveC8nK2Ake2l0ZW0uSUR9YDtcbiAgICAgICAgdHJhc2hJY29uLmlkID0gJ3RyYXNoLycrYCR7aXRlbS5JRH1gO1xuICAgIH1cbn07XG5cbmV4cG9ydCB7Y3JlYXRlRGlzcGxheUFyZWEsIG1hbmFnZVZlcmJvc2VQcm9qZWN0LCBtYW5hZ2VEaXNwbGF5QXJlYSwgbWFuYWdlRGF0ZVdpbmRvd30iLCJjb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyQmFyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicpO1xuXG4gICAgaGVhZGVyQmFyLnRleHRDb250ZW50ID0gXCJUby1Eb1wiXG4gICAgXG4gICAgcmV0dXJuIGhlYWRlckJhclxufVxuXG5leHBvcnQge2NyZWF0ZUhlYWRlcn0iLCJpbXBvcnQgeyBjcmVhdGVIZWFkZXIgfSBmcm9tIFwiLi9oZWFkZXJcIjtcbmltcG9ydCB7IG1hbmFnZVNpZGVCYXIgfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5pbXBvcnQgeyBjcmVhdGVEaXNwbGF5QXJlYSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IGNyZWF0ZUlucHV0IH0gZnJvbSBcIi4vaW5wdXRcIjtcbmltcG9ydCB7IGNoZWNrU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuLy9vbmNlIGkgYWRkIGxvZyBpbiBpbmZvcm1hdGlvbiBpIHNob3VsZCBtYWtlIGFub3RoZXIganMgc2NyaXB0IGZvciBtYWtpbmcgdGhlIGhlYWRlciBcblxuXG5cbmNvbnN0IGluaXRpYWxpemVXZWJzaXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1hbmFnZVNpZGVCYXIuY3JlYXRlU2lkZUJhcigpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRGlzcGxheUFyZWEoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0LmNyZWF0ZUlucHV0QmFyKCkpO1xuXG4gICAgY2hlY2tTdG9yYWdlKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXRpYWxpemVXZWJzaXRlOyIsImltcG9ydCB7bWFuYWdlRGlzcGxheUFyZWF9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7bWFuYWdlU2lkZUJhcn0gZnJvbSBcIi4vc2lkZUJhclwiO1xuaW1wb3J0IHtzYXZlTG9jYWwsIHJldHJpZXZlTG9jYWx9IGZyb20gXCIuL3N0b3JhZ2VcIlxuXG5jbGFzcyBJdGVtIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgdGl0bGUgPSBcInVua25vd25cIixcbiAgICAgICAgcHJvamVjdFRpdGxlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1EdWVEYXRlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1EZXNjcmlwdGlvbiA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtQ29tcGxldGlvbiA9ICd1bmtub3duJyxcbiAgICAgICAgSUQgPSAndW5rbm93bicsXG4gICAgKXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlXG4gICAgICAgIHRoaXMucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlXG4gICAgICAgIHRoaXMuaXRlbUR1ZURhdGUgPSBpdGVtRHVlRGF0ZVxuICAgICAgICB0aGlzLml0ZW1EZXNjcmlwdGlvbiA9IGl0ZW1EZXNjcmlwdGlvblxuICAgICAgICB0aGlzLml0ZW1Db21wbGV0aW9uID0gaXRlbUNvbXBsZXRpb25cbiAgICAgICAgdGhpcy5JRCA9IElEXG4gICAgICAgIHRoaXMudHlwZSA9ICdpdGVtJ1xuICAgIH1cbn1cblxuY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IoICAgICAgICBcbiAgICAgICAgdGl0bGUgPSAndW5rbm93bicsXG4gICAgKXtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLklEQXNzaWduZXIgPSAtMTtcbiAgICAgICAgdGhpcy5JRCA9IHRpdGxlO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMudHlwZSA9ICdwcm9qZWN0JztcbiAgICB9XG5cbiAgICBnaXZlSUQoKSB7XG4gICAgICAgIHRoaXMuSURBc3NpZ25lciArPTE7XG4gICAgICAgIHJldHVybiB0aGlzLklEQXNzaWduZXJcbiAgICB9XG4gICAgYWRkSXRlbShuZXdJdGVtKSB7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXdJdGVtKVxuICAgIH1cbiAgICByZW1vdmVJdGVtKGl0ZW1JRCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uSUQgIT09IGl0ZW1JRClcbiAgICB9XG4gICAgZ2V0SXRlbShpdGVtSUQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5JRCA9PT0gaXRlbUlEKTtcbiAgICB9XG4gICAgaXNJblByb2plY3QoaXRlbUlEKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5JRCA9PT0gaXRlbUlEKVxuICAgIH1cbn1cblxuY2xhc3MgUHJvamVjdExpYnJhcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb2plY3RzID0gW11cbiAgICB9XG4gICAgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0luUHJvamVjdExpYnJhcnkobmV3UHJvamVjdCkpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlUHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlICE9PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxuICAgIGdldFByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3RUaXRsZSlcbiAgICB9XG4gICAgZ2V0SXRlbShpdGVtSUQpe1xuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHRoaXMucHJvamVjdHMpe1xuICAgICAgICAgICAgaWYgKHByb2plY3QuaXNJblByb2plY3QoaXRlbUlEKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3QuZ2V0SXRlbShpdGVtSUQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNJblByb2plY3RMaWJyYXJ5KHByb2plY3RUaXRsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0TGlicmFyeSA9IG5ldyBQcm9qZWN0TGlicmFyeSgpXG5cblxuY29uc3QgY3JlYXRlSW5wdXQgPSAoKCkgPT4ge1xuXG4gICAgY29uc3QgX3RpdGxlSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgbmV3SXRlbUlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgbmV3SXRlbUlucHV0LmlkID0gJ2l0ZW1JbnB1dCc7XG4gICAgICAgIG5ld0l0ZW1JbnB1dC5wbGFjZWhvbGRlciA9ICdUaXRsZSc7XG4gICAgICAgIG5ld0l0ZW1JbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgXG4gICAgICAgIHJldHVybiBuZXdJdGVtSW5wdXRcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX3Byb2plY3RJbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgbmV3UHJvamVjdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC5pZCA9ICdwcm9qZWN0SW5wdXQnO1xuICAgICAgICBuZXdQcm9qZWN0SW5wdXQucGxhY2Vob2xkZXIgPSAnUHJvamVjdCc7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC5zdHlsZSA9IFwidGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcIlxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ld1Byb2plY3RJbnB1dFxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfZHVlRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICBkdWVEYXRlLmlkID0gJ2R1ZURhdGUnO1xuICAgIFxuICAgICAgICByZXR1cm4gZHVlRGF0ZVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfZGVzY3JpcHRpb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICBkZXNjcmlwdGlvbi5pZCA9ICdpdGVtRGVzY3JpcHRpb24nO1xuICAgICAgICBkZXNjcmlwdGlvbi5jb2xzID0gJzMwJztcbiAgICAgICAgZGVzY3JpcHRpb24ucm93cyA9ICcxMCc7XG4gICAgICAgIGRlc2NyaXB0aW9uLnBsYWNlaG9sZGVyID0gJ0Rlc2NyaXB0aW9uJztcbiAgICBcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVBZGRCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhZGRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIEl0ZW0nO1xuICAgICAgICBhZGRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgIFxuICAgICAgICByZXR1cm4gYWRkQnV0dG9uXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVJdGVtRnJvbUlucHV0ID0gKCkgPT4ge1xuICAgIFxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtSW5wdXQnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RJbnB1dCcpLnZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVlRGF0ZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBpdGVtRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbURlc2NyaXB0aW9uJykudmFsdWU7XG4gICAgXG4gICAgICAgIGlucHV0Rm9ybS5yZXNldCgpO1xuICAgIFxuICAgICAgICByZXR1cm4gbmV3IEl0ZW0odGl0bGUsIHByb2plY3RUaXRsZSwgZHVlRGF0ZSwgaXRlbURlc2NyaXB0aW9uLCBmYWxzZSwgJ3Vua25vd24nKVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfYWRkSXRlbSA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IF9jcmVhdGVJdGVtRnJvbUlucHV0KCk7XG4gICAgXG4gICAgICAgIGlmIChwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkobmV3SXRlbS5wcm9qZWN0VGl0bGUpKXtcbiAgICAgICAgICAgIG5ld0l0ZW0uSUQgPSBgJHtuZXdJdGVtLnByb2plY3RUaXRsZX0tYCtgJHtwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKS5naXZlSUQoKX1gO1xuICAgICAgICAgICAgcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSkuYWRkSXRlbShuZXdJdGVtKTtcbiAgICAgICAgICAgIC8vIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvUHJvamVjdFRpbGUobmV3SXRlbSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXByb2plY3RMaWJyYXJ5LmlzSW5Qcm9qZWN0TGlicmFyeShuZXdJdGVtLnByb2plY3RUaXRsZSkpe1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIHByb2plY3RMaWJyYXJ5LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgICAgICAgICBuZXdJdGVtLklEID0gYCR7bmV3SXRlbS5wcm9qZWN0VGl0bGV9LWArYCR7cHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSkuZ2l2ZUlEKCl9YDtcbiAgICAgICAgICAgIHByb2plY3QuYWRkSXRlbShuZXdJdGVtKTtcbiAgICAgICAgICAgIC8vIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgICAgICAgICAvLyBtYW5hZ2VEaXNwbGF5QXJlYS5hZGRUb1Byb2plY3RUaWxlKG5ld0l0ZW0pO1xuICAgICAgICAgICAgLy8gbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvamVjdExpYnJhcnkucHJvamVjdHMpXG4gICAgICAgICAgICAvLyBzYXZlTG9jYWwoKVxuICAgICAgICAgICAgLy8gcmV0cmlldmVMb2NhbCgpXG4gICAgICAgIH1cbiAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICBzYXZlTG9jYWwoKVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfY3JlYXRlQ2xlYXJCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNsZWFyQnV0dG9uLnRleHRDb250ZW50ID0gJ0NsZWFyJztcbiAgICAgICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaW5wdXRGb3JtLnJlc2V0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjbGVhckJ1dHRvblxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfY3JlYXRlSW5wdXRGb3JtID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIGlucHV0Rm9ybS5jbGFzc0xpc3QuYWRkKCduZXdJdGVtRm9ybScpO1xuICAgICAgICBpbnB1dEZvcm0uc2V0QXR0cmlidXRlKCdpZCcsJ2lucHV0Rm9ybScpO1xuICAgICAgICBpbnB1dEZvcm0ub25zdWJtaXQgPSBfYWRkSXRlbTtcbiAgICBcbiAgICAgICAgY29uc3QgbmV3SXRlbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbmV3SXRlbUhlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgTmV3IEl0ZW0nXG4gICAgXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChuZXdJdGVtSGVhZGVyKTtcbiAgICBcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF90aXRsZUlucHV0KCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX3Byb2plY3RJbnB1dCgpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9kdWVEYXRlSW5wdXQoKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfZGVzY3JpcHRpb25JbnB1dCgpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9jcmVhdGVBZGRCdXR0b24oKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfY3JlYXRlQ2xlYXJCdXR0b24oKSk7XG4gICAgXG4gICAgICAgIHJldHVybiBpbnB1dEZvcm1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVJbnB1dEJhciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXdJdGVtQmFyLmNsYXNzTGlzdC5hZGQoJ25ld0l0ZW1CYXInKTtcbiAgICAgICAgbmV3SXRlbUJhci5hcHBlbmRDaGlsZChfY3JlYXRlSW5wdXRGb3JtKCkpO1xuICAgIFxuICAgICAgICByZXR1cm4gbmV3SXRlbUJhclxuICAgIH1cblxuICAgIHJldHVybiB7Y3JlYXRlSW5wdXRCYXJ9XG59KSgpO1xuXG5leHBvcnQge2NyZWF0ZUlucHV0LCBwcm9qZWN0TGlicmFyeSwgUHJvamVjdExpYnJhcnksIFByb2plY3QsIEl0ZW19IiwiaW1wb3J0IHsgbWFuYWdlVmVyYm9zZVByb2plY3QsIG1hbmFnZURpc3BsYXlBcmVhLCBtYW5hZ2VEYXRlV2luZG93IH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgcHJvamVjdExpYnJhcnkgfSBmcm9tIFwiLi9pbnB1dFwiO1xuXG5jb25zdCBtYW5hZ2VTaWRlQmFyID0gKCgpID0+IHtcbiAgICBjb25zdCBjcmVhdGVTaWRlQmFyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNpZGVCYXIuY2xhc3NMaXN0LmFkZCgnc2lkZUJhcicpO1xuICAgIFxuICAgICAgICBjb25zdCBob21lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGhvbWVCdXR0b24udGV4dENvbnRlbnQgPSAnSG9tZSc7XG4gICAgICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgY29uc3QgdG9kYXlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgdG9kYXlCdXR0b24udGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICB0b2RheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1hbmFnZURhdGVXaW5kb3cub3BlbkRhdGVXaW5kb3coMCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3Qgd2Vla0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB3ZWVrQnV0dG9uLnRleHRDb250ZW50ID0gJ1RoaXMgV2Vlayc7XG4gICAgICAgIHdlZWtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBtYW5hZ2VEYXRlV2luZG93Lm9wZW5EYXRlV2luZG93KDcpO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZCh0b2RheUJ1dHRvbik7XG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQod2Vla0J1dHRvbik7XG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoX2NyZWF0ZVByb2plY3RBcmVhKCkpO1xuICAgIFxuICAgICAgICByZXR1cm4gc2lkZUJhclxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfY3JlYXRlUHJvamVjdEFyZWEgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RBcmVhQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgXG4gICAgICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3RBcmVhLnNldEF0dHJpYnV0ZSgnaWQnLCdwcm9qZWN0QXJlYScpO1xuICAgIFxuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgcHJvamVjdEhlYWRpbmcudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuICAgIFxuICAgICAgICBwcm9qZWN0QXJlYUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGluZyk7XG4gICAgICAgIHByb2plY3RBcmVhQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RBcmVhKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIHByb2plY3RBcmVhQ29udGFpbmVyXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9yZXNldFByb2plY3RBcmVhID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0QXJlYScpO1xuICAgICAgICBwcm9qZWN0QXJlYS5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gICAgXG4gICAgY29uc3QgcmVnZW5lcmF0ZVByb2plY3RBcmVhID0gKHByb2plY3RMaWJyYXJ5KSA9PiB7XG4gICAgICAgIF9yZXNldFByb2plY3RBcmVhKCk7XG4gICAgICAgIC8vIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvamVjdEFyZWEnKTsgXG4gICAgICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpYnJhcnkucHJvamVjdHMpe1xuICAgICAgICAgICAgX2FkZFByb2plY3RCdXR0b24ocHJvamVjdClcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfYWRkUHJvamVjdEJ1dHRvbiA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RBcmVhJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJyxgJHtwcm9qZWN0LnRpdGxlfWArJy1idXR0b24nKTtcbiAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG4gICAgXG4gICAgICAgIG5ld1Byb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS50YXJnZXQuaWQuc2xpY2UoMCwtNykpO1xuICAgICAgICAgICAgbWFuYWdlVmVyYm9zZVByb2plY3Qub3BlblZlcmJvc2VQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ1dHRvbik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1Byb2plY3RCdXR0b24pXG4gICAgICAgIC8vIHJldHVybiAobmV3UHJvamVjdEJ1dHRvbilcbiAgICB9XG4gICAgXG4gICAgLy8gY29uc3QgcmVtb3ZlUHJvamVjdEJ1dHRvbiA9IChwcm9qZWN0KSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RBcmVhJyk7XG4gICAgLy8gICAgIHByb2plY3RBcmVhLnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Byb2plY3QucHJvamVjdFRpdGxlfWArICctYnV0dG9uJykpO1xuICAgIC8vIH1cblxuICAgIHJldHVybiB7Y3JlYXRlU2lkZUJhciwgcmVnZW5lcmF0ZVByb2plY3RBcmVhfVxufSkoKTtcblxuXG4vL25lZWQgYSBmdW5jdGlvbiB0byByZW5hbWUgYW5kIHJlIElEIHRoZXNlIFxuZXhwb3J0IHttYW5hZ2VTaWRlQmFyfVxuXG4vLyBleHBvcnQge2NyZWF0ZVNpZGVCYXIsIGFkZFByb2plY3RCdXR0b24sIHJlbW92ZVByb2plY3RCdXR0b259IiwiaW1wb3J0IHsgcHJvamVjdExpYnJhcnksIFByb2plY3RMaWJyYXJ5LCBQcm9qZWN0LCBJdGVtIH0gZnJvbSBcIi4vaW5wdXRcIlxuaW1wb3J0IHsgbWFuYWdlRGlzcGxheUFyZWEgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBtYW5hZ2VTaWRlQmFyIH0gZnJvbSBcIi4vc2lkZUJhclwiO1xuXG4vLyBsb2NhbCBzdG9yYWdlIFxuXG5jb25zdCBzYXZlTG9jYWwgPSAoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RMaWJyYXJ5JywgSlNPTi5zdHJpbmdpZnkocHJvamVjdExpYnJhcnkucHJvamVjdHMpKTtcbiAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UpXG59XG5cbmNvbnN0IHJldHJpZXZlTG9jYWwgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RMaWJyYXJ5JykpXG4gICAgaWYgKHByb2plY3RzKSB7XG4gICAgICAgIC8vbGlicmFyeS5ib29rcyA9IGJvb2tzLm1hcCgoYm9vaykgPT4gSlNPTlRvQm9vayhib29rKSlcbiAgICAgICAgcHJvamVjdExpYnJhcnkucHJvamVjdHMgPSBwcm9qZWN0cy5tYXAoKHByb2plY3QpID0+IHJlY29uc3RydWN0UHJvamVjdChwcm9qZWN0KSk7XG4gICAgICAgIC8vIHJlY29uc3RydWN0UHJvamVjdExpYnJhcnkocHJvamVjdExpYnJhcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9qZWN0TGlicmFyeS5wcm9qZWN0cyA9IFtdXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2cocHJvamVjdExpYnJhcnkpXG59XG5cbi8vIGNvbnN0IHJlY29uc3RydWN0UHJvamVjdExpYnJhcnkgPSAocHJvamVjdHMpID0+IHtcbi8vICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RzKXtcbi8vICAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0IChwcm9qZWN0LnRpdGxlKTtcbi8vICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBwcm9qZWN0Lml0ZW1zKXtcbi8vICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBuZXcgSXRlbSAoaXRlbS50aXRsZSwgaXRlbS5wcm9qZWN0VGl0bGUsIGl0ZW0uaXRlbUR1ZURhdGUsIGl0ZW0uaXRlbURlc2NyaXB0aW9uLGl0ZW0uaXRlbUNvbXBsZXRpb24pXG4vLyAgICAgICAgICAgICBuZXdQcm9qZWN0LmFkZEl0ZW0obmV3SXRlbSlcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH1cblxuY29uc3QgcmVjb25zdHJ1Y3RQcm9qZWN0ID0gKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdC50aXRsZSk7XG4gICAgbmV3UHJvamVjdC5pdGVtcyA9IHByb2plY3QuaXRlbXMubWFwKChpdGVtKSA9PiByZWNvbnN0cnVjdEl0ZW0oaXRlbSkpXG4gICAgcmV0dXJuIG5ld1Byb2plY3Rcbn1cblxuY29uc3QgcmVjb25zdHJ1Y3RJdGVtID0gKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gbmV3IEl0ZW0gKGl0ZW0udGl0bGUsIGl0ZW0ucHJvamVjdFRpdGxlLCBpdGVtLml0ZW1EdWVEYXRlLCBpdGVtLml0ZW1EZXNjcmlwdGlvbiwgaXRlbS5pdGVtQ29tcGxldGlvbiwgaXRlbS5JRClcbn1cblxuY29uc3QgY2hlY2tTdG9yYWdlID0gKCkgPT4ge1xuICAgIGlmIChfc3RvcmFnZUF2YWlsYWJsZSgnbG9jYWxTdG9yYWdlJykpIHtcbiAgICAgICAgLy8gWWlwcGVlISBXZSBjYW4gdXNlIGxvY2FsU3RvcmFnZSBhd2Vzb21lbmVzc1xuICAgICAgICByZXRyaWV2ZUxvY2FsKCk7XG4gICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBUb28gYmFkLCBubyBsb2NhbFN0b3JhZ2UgZm9yIHVzXG4gICAgfVxufVxuXG5jb25zdCBfc3RvcmFnZUF2YWlsYWJsZSA9ICh0eXBlKT0+ICB7XG4gICAgbGV0IHN0b3JhZ2U7XG4gICAgdHJ5IHtcbiAgICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgICAgY29uc3QgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgICAgICAgIChzdG9yYWdlICYmIHN0b3JhZ2UubGVuZ3RoICE9PSAwKTtcbiAgICB9XG59XG5cbi8vIGNsb3VkIHN0b3JhZ2UgXG5cbmV4cG9ydCB7c2F2ZUxvY2FsLCByZXRyaWV2ZUxvY2FsLCBjaGVja1N0b3JhZ2V9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5pdGlhbGl6ZVdlYnNpdGUgZnJvbSBcIi4vaW5pdFdlYnNpdGVcIjtcblxuaW5pdGlhbGl6ZVdlYnNpdGUoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=