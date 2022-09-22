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
        checkboxIcon.src =  './icons/checkbox-blank-outline.svg';
    } else if (item.itemCompletion) {
        checkboxIcon.src = "./icons/checkbox-outline.svg";
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
        img.src = "./icons/checkbox-outline.svg";
    } else if (item.itemCompletion) {
        itemDiv.classList.remove('completed');
        img.src =  './dist/icons/checkbox-blank-outline.svg';
    }
    item.itemCompletion = !item.itemCompletion;
}

const _createTrashIcon = (obj, verbose, dateWindow) => {
    const trashIcon = document.createElement('img');
    trashIcon.src = './icons/trash-can-outline.svg';
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
    editIcon.src = './icons/text-box-edit-outline.svg';
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
    closeIcon.src = "./icons/close.svg";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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STtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkVBQXVDLENBQUMsa0RBQWM7QUFDOUQsUUFBUSx5RUFBbUMsQ0FBQyxrREFBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7VUNsRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044Qzs7QUFFOUMsd0RBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbml0V2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbnB1dC5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zaWRlQmFyLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb2plY3RMaWJyYXJ5fSBmcm9tIFwiLi9pbnB1dFwiO1xuaW1wb3J0IHttYW5hZ2VTaWRlQmFyfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5pbXBvcnQgeyBzYXZlTG9jYWwgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmNvbnN0IGNyZWF0ZURpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGlzcGxheUFyZWEuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5QXJlYScpO1xuXG4gICAgcmV0dXJuIGRpc3BsYXlBcmVhXG59XG5cbmNvbnN0IGNsZWFyRGlzcGxheUFyZWEgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICBkaXNwbGF5QXJlYS5pbm5lckhUTUwgPSAnJztcbn1cblxuY29uc3QgbWFuYWdlRGlzcGxheUFyZWEgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRvRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgICAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZChfY3JlYXRlUHJvamVjdFRpbGUocHJvamVjdCkpO1xuICAgIH1cbiAgICBcbiAgICAvLyBjb25zdCByZW1vdmVGcm9tRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgIC8vICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgIC8vICAgICBkaXNwbGF5QXJlYS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0LnByb2plY3RUaXRsZSkpO1xuICAgIC8vICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSlcbiAgICAvLyB9XG4gICAgXG4gICAgY29uc3QgYWRkVG9Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgICAgICBwcm9qZWN0VGlsZS5hcHBlbmRDaGlsZChfY3JlYXRlSXRlbShpdGVtKSk7XG4gICAgfVxuICAgIFxuICAgIC8vIGNvbnN0IHJlbW92ZUZyb21Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgIC8vICAgICBwcm9qZWN0VGlsZS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLml0ZW1JRCkpO1xuICAgIFxuICAgIC8vICAgICBpZiAocHJvamVjdFRpbGUuY2hpbGROb2Rlcy5sZW5ndGggPT0gMSl7XG4gICAgLy8gICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChpdGVtLnByb2plY3RUaXRsZSk7XG4gICAgLy8gICAgICAgICByZW1vdmVGcm9tRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlSXRlbURpdicpO1xuICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaXRlbS5JRCk7XG5cbiAgICAgICAgY29uc3QgdG9wUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvcFJvdy5jbGFzc0xpc3QuYWRkKCdpdGVtRGl2Jyk7XG5cbiAgICAgICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbUNvbXBsZXRpb24pIHtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVDaGVja0ljb24oaXRlbSkpO1xuICAgICAgICB0b3BSb3cuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRpdGxlKGl0ZW0pKTtcbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbihpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKGl0ZW0sIGZhbHNlKSk7XG5cbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodG9wUm93KTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGxpc3RJdGVtXG4gICAgfVxuXG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZVByb2plY3RUaWxlID0gKHByb2plY3QpID0+IHtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdFRpbGUnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuc2V0QXR0cmlidXRlKCdpZCcsIHByb2plY3QudGl0bGUpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoZWFkZXJEaXYuY2xhc3NMaXN0LmFkZCgnaGVhZGVyRGl2Jyk7XG5cbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShwcm9qZWN0KSk7XG5cbiAgICAgICAgLy8vIG1pZ2h0IHdhbnQgdG8gcmVtb3ZlIHRoaXMgYnV0IGl0IGlzIG5pY2UgdG8gaGF2ZSBpdCBcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbihwcm9qZWN0KSk7XG4gICAgICAgIC8vL1xuXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKHByb2plY3QsIGZhbHNlKSk7XG4gICAgXG4gICAgICAgIHByb2plY3RUaWxlLmFwcGVuZENoaWxkKGhlYWRlckRpdik7XG4gICAgXG4gICAgICAgIHJldHVybiBwcm9qZWN0VGlsZVxuICAgIH1cblxuICAgIGNvbnN0IHJlZ2VuZXJhdGVEaXNwbGF5QXJlYSA9IChwcm9qZWN0TGlicmFyeSkgPT4ge1xuICAgICAgICBjbGVhckRpc3BsYXlBcmVhKCk7XG4gICAgICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpYnJhcnkucHJvamVjdHMpe1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9EaXNwbGF5QXJlYShwcm9qZWN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9Qcm9qZWN0VGlsZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge2FkZFRvRGlzcGxheUFyZWEsIGFkZFRvUHJvamVjdFRpbGUsIHJlZ2VuZXJhdGVEaXNwbGF5QXJlYX1cblxufSkoKTtcblxuY29uc3QgbWFuYWdlVmVyYm9zZVByb2plY3QgPSAoKCkgPT4ge1xuICAgIGNvbnN0IG9wZW5WZXJib3NlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNsZWFyRGlzcGxheUFyZWEoKTtcblxuICAgICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgIFxuICAgICAgICBjb25zdCB2ZXJib3NlUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlUHJvamVjdC5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtwcm9qZWN0LnRpdGxlfWApO1xuXG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LmFwcGVuZENoaWxkKF9jcmVhdGVWZXJib3NlSGVhZGVyKHByb2plY3QpKTtcblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICAgICAgdmVyYm9zZVByb2plY3QuYXBwZW5kQ2hpbGQoY3JlYXRlVmVyYm9zZUl0ZW0oaXRlbSkpO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BsYXlBcmVhLmFwcGVuZENoaWxkKHZlcmJvc2VQcm9qZWN0KTtcbiAgICB9XG5cblxuICAgIGNvbnN0IF9jcmVhdGVWZXJib3NlSGVhZGVyID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgdmVyYm9zZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlckRpdicpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShwcm9qZWN0KSk7XG4gICAgICAgIHZlcmJvc2VIZWFkZXIuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRyYXNoSWNvbihwcm9qZWN0LCBmYWxzZSkpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVDbG9zZUljb24oKSk7XG5cbiAgICAgICAgcmV0dXJuIHZlcmJvc2VIZWFkZXJcbiAgICB9XG4gICAgXG4gICAgXG4gICAgY29uc3QgY3JlYXRlVmVyYm9zZUl0ZW0gPSAoaXRlbSkgPT4geyAgICBcbiAgICAgICAgLy8gY291bGQgdGFrZSBpbiB0d28gdmFyaWFibGVzLCBvbmUgZm9yIHZlcmJvc2UgYW5kIFxuICAgICAgICAvLyBvbmUgZm9yIGRhdGUgd2luZG93IGFuZCB0aGVuIHdpdGggdGhlIHJpZ2h0IGNvbmRpdGlvbnMgaSB3b3VsZCBcbiAgICAgICAgLy8gbm90IG5lZWQgdHdvIGl0ZW0gZnVuY3Rpb25zIFxuICAgICAgICBjb25zdCB2ZXJib3NlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlSXRlbURpdicpO1xuICAgICAgICB2ZXJib3NlSXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aXRlbS5JRH1gKTtcblxuICAgICAgICBjb25zdCB0b3BSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9wUm93LmNsYXNzTGlzdC5hZGQoJ2l0ZW1EaXYnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghaXRlbS5pdGVtQ29tcGxldGlvbil7XG4gICAgICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLml0ZW1Db21wbGV0aW9uKSB7XG4gICAgICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlQ2hlY2tJY29uKGl0ZW0pKTtcbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlRHVlRGF0ZShpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKGl0ZW0pKTtcblxuICAgICAgICB2ZXJib3NlSXRlbS5hcHBlbmRDaGlsZCh0b3BSb3cpO1xuICAgICAgICB2ZXJib3NlSXRlbS5hcHBlbmRDaGlsZChfY3JlYXRlRGVzY3JpcHRpb24oaXRlbSkpO1xuICAgICAgICByZXR1cm4gdmVyYm9zZUl0ZW1cbiAgICB9XG5cbiAgICByZXR1cm4ge29wZW5WZXJib3NlUHJvamVjdCwgY3JlYXRlVmVyYm9zZUl0ZW19XG59KSgpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGRhdGUgd2luZG93IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IG1hbmFnZURhdGVXaW5kb3cgPSAoKCkgPT4ge1xuXG4gICAgY29uc3Qgb3BlbkRhdGVXaW5kb3cgPSAodGFyZ2V0KSA9PiB7XG5cbiAgICAgICAgY2xlYXJEaXNwbGF5QXJlYSgpO1xuXG4gICAgICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgICAgIGNvbnN0IGRhdGVXaW5kb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGF0ZVdpbmRvdy5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdkYXRlSGVhZGVyJyk7XG4gICAgICAgIGlmICh0YXJnZXQgPT0gMCl7XG4gICAgICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PSA3KXtcbiAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnO1xuICAgICAgICB9XG4gICAgICAgIGRhdGVXaW5kb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaWJyYXJ5LnByb2plY3RzKXtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgICAgICAgICAgaWYgKF9nZXREYXRlRGlmZmVyZW5jZShuZXcgRGF0ZShpdGVtLml0ZW1EdWVEYXRlKSk8PXRhcmdldCl7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVXaW5kb3cuYXBwZW5kQ2hpbGQobWFuYWdlVmVyYm9zZVByb2plY3QuY3JlYXRlVmVyYm9zZUl0ZW0oaXRlbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZChkYXRlV2luZG93KTtcbiAgICB9XG5cbiAgICBjb25zdCBfZ2V0RGF0ZURpZmZlcmVuY2UgPSAoZGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBkdWVEYXRlTWlsaVNlYyA9IERhdGUuVVRDKFxuICAgICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0b2RheU1pbGlTZWMgPSBEYXRlLlVUQyh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCB0b2RheS5nZXREYXRlKCkpO1xuICAgICAgXG4gICAgICAgIGNvbnN0IGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA9IGR1ZURhdGVNaWxpU2VjIC0gdG9kYXlNaWxpU2VjO1xuICAgICAgXG4gICAgICAgIGNvbnN0IGRpZmZlcmVuY2VJbkRheXMgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgLyAxMDAwIC8gNjAgLyA2MCAvIDI0O1xuICAgICAgXG4gICAgICAgIHJldHVybiBkaWZmZXJlbmNlSW5EYXlzKzE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtvcGVuRGF0ZVdpbmRvd31cbn0pKCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gaXRlbSB3aW5kb3cgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNvbnN0IF9vcGVuSXRlbVdpbmRvdyA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICBjb25zdCBpdGVtTW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpdGVtTW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgICB3aW5kb3cub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PSBpdGVtTW9kYWwpIHtcbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXRlbU1vZGFsLmFwcGVuZENoaWxkKG1hbmFnZVZlcmJvc2VQcm9qZWN0LmNyZWF0ZVZlcmJvc2VJdGVtKGl0ZW0pKTtcbiAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZChpdGVtTW9kYWwpO1xufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGljb25zIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBfY3JlYXRlQ2hlY2tJY29uID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBjaGVja2JveEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBjaGVja2JveEljb24uY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuICAgIGNoZWNrYm94SWNvbi5pZCA9IFwiY2hlY2tCb3gvXCIrYCR7aXRlbS5JRH1gO1xuXG4gICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgY2hlY2tib3hJY29uLnNyYyA9ICAnLi9pY29ucy9jaGVja2JveC1ibGFuay1vdXRsaW5lLnN2Zyc7XG4gICAgfSBlbHNlIGlmIChpdGVtLml0ZW1Db21wbGV0aW9uKSB7XG4gICAgICAgIGNoZWNrYm94SWNvbi5zcmMgPSBcIi4vaWNvbnMvY2hlY2tib3gtb3V0bGluZS5zdmdcIjtcbiAgICB9XG5cbiAgICBjaGVja2JveEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtSUQgPSBlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRJdGVtKGl0ZW1JRCk7XG4gICAgICAgIGNvbnN0IGltZyA9IGUuY29tcG9zZWRQYXRoKClbMF07XG4gICAgICAgIF90b2dnbGVDb21wbGV0ZShpdGVtLCBpbWcpO1xuICAgICAgICBzYXZlTG9jYWwoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2hlY2tib3hJY29uXG59XG5cbmNvbnN0IF90b2dnbGVDb21wbGV0ZSA9IChpdGVtLCBpbWcpID0+IHtcbiAgICBjb25zdCBpdGVtRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5JRCk7XG4gICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgaXRlbURpdi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgaW1nLnNyYyA9IFwiLi9pY29ucy9jaGVja2JveC1vdXRsaW5lLnN2Z1wiO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtQ29tcGxldGlvbikge1xuICAgICAgICBpdGVtRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICBpbWcuc3JjID0gICcuL2Rpc3QvaWNvbnMvY2hlY2tib3gtYmxhbmstb3V0bGluZS5zdmcnO1xuICAgIH1cbiAgICBpdGVtLml0ZW1Db21wbGV0aW9uID0gIWl0ZW0uaXRlbUNvbXBsZXRpb247XG59XG5cbmNvbnN0IF9jcmVhdGVUcmFzaEljb24gPSAob2JqLCB2ZXJib3NlLCBkYXRlV2luZG93KSA9PiB7XG4gICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgdHJhc2hJY29uLnNyYyA9ICcuL2ljb25zL3RyYXNoLWNhbi1vdXRsaW5lLnN2Zyc7XG4gICAgdHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICB0cmFzaEljb24uaWQgPSBcInRyYXNoL1wiICsgYCR7b2JqLklEfWBcblxuICAgIGNvbnN0IHR5cGUgPSBvYmoudHlwZTtcbiAgICBjb25zdCB2ZXJiID0gdmVyYm9zZTtcblxuICAgIGlmICh0eXBlID09ICdpdGVtJyl7XG4gICAgICAgIHRyYXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKSk7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0SXRlbShlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGl0ZW0ucHJvamVjdFRpdGxlKTtcblxuICAgICAgICAgICAgaWYoaXRlbURpdi5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoIDw9IDIpe1xuICAgICAgICAgICAgICAgIHByb2plY3RMaWJyYXJ5LnJlbW92ZVByb2plY3QocHJvamVjdC50aXRsZSk7XG4gICAgICAgICAgICAgICAgbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtRGl2LnJlbW92ZSgpXG4gICAgICAgICAgICBwcm9qZWN0LnJlbW92ZUl0ZW0oaXRlbS5JRCk7XG4gICAgICAgICAgICBzYXZlTG9jYWwoKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09ICdwcm9qZWN0Jyl7XG4gICAgICAgIHRyYXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpKTtcbiAgICAgICAgICAgIHByb2plY3RMaWJyYXJ5LnJlbW92ZVByb2plY3QocHJvamVjdC50aXRsZSk7XG4gICAgICAgICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICAgICAgc2F2ZUxvY2FsKCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0cmFzaEljb25cbn1cblxuY29uc3QgX2NyZWF0ZUVkaXRJY29uID0gKG9iaikgPT4ge1xuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgZWRpdEljb24uY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuICAgIGVkaXRJY29uLnNyYyA9ICcuL2ljb25zL3RleHQtYm94LWVkaXQtb3V0bGluZS5zdmcnO1xuICAgIGVkaXRJY29uLmlkID0gXCJlZGl0L1wiK2Ake29iai5JRH1gXG4gICAgaWYgKG9iai50eXBlID09ICdwcm9qZWN0Jyl7XG4gICAgICAgIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKCkpO1xuICAgICAgICAgICAgbWFuYWdlVmVyYm9zZVByb2plY3Qub3BlblZlcmJvc2VQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICB9KVxuICAgIH0gZWxzZSBpZiAob2JqLnR5cGUgPT0gJ2l0ZW0nKXtcbiAgICAgICAgZWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlEID0gZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKVxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldEl0ZW0oaXRlbUlEKTtcbiAgICAgICAgICAgIF9vcGVuSXRlbVdpbmRvdyhpdGVtKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gZWRpdEljb25cbn07XG5cbmNvbnN0IF9jcmVhdGVDbG9zZUljb24gPSAoKSA9PiB7XG4gICAgY29uc3QgY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgY2xvc2VJY29uLnNyYyA9IFwiLi9pY29ucy9jbG9zZS5zdmdcIjtcbiAgICBjbG9zZUljb24uY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuICAgIGNsb3NlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xuICAgICAgICAvL3Byb2JhYmx5IHdpbGwgbmVlZCB0byBhY2NlcHQgYSB0eXBlIGluIGhlcmUgXG4gICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgfSlcbiAgICByZXR1cm4gY2xvc2VJY29uXG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBpbnB1dCBmaWVsZHMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBfY3JlYXRlVGl0bGUgPSAob2JqKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3ZlcmJvc2UnKTtcblxuICAgIHRpdGxlLnR5cGUgPSAndGV4dCc7XG4gICAgdGl0bGUudmFsdWUgPSBgJHtvYmoudGl0bGV9YDtcbiAgICB0aXRsZS5zaXplID0gKHRpdGxlLnZhbHVlLmxlbmd0aCkrMztcbiAgICB0aXRsZS5yZWFkT25seSA9IHRydWU7XG4gICAgaWYgKG9iai50eXBlID09ICdpdGVtJyl7XG4gICAgICAgIHRpdGxlLmlkID0gXCJ0aXRsZS9cIitgJHtvYmouSUR9YFxuICAgIH0gZWxzZSBpZiAob2JqLnR5cGUgPT0gJ3Byb2plY3QnKXtcbiAgICAgICAgdGl0bGUuc3R5bGUgPSBcInRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XCJcbiAgICB9XG5cbiAgICB0aXRsZS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICBpZiAodGl0bGUudmFsdWUubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGl0bGUuc2l6ZSA9ICh0aXRsZS52YWx1ZS5sZW5ndGgpKzM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aXRsZS5vbmRibGNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSBmYWxzZTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICAgIH07XG5cbiAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzZWRcIik7XG4gICAgICAgIHRpdGxlLnNpemUgPSAodGl0bGUudmFsdWUubGVuZ3RoKSszO1xuICAgIH0pO1xuXG4gICAgaWYgKG9iai50eXBlID09ICdpdGVtJyl7XG4gICAgICAgIHRpdGxlLm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtSUQgPSBlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldEl0ZW0oaXRlbUlEKTtcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuaWQgPSBuZXdUaXRsZTtcbiAgICAgICAgICAgICAgICBzYXZlTG9jYWwoKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChvYmoudHlwZSA9PSAncHJvamVjdCcpe1xuICAgICAgICB0aXRsZS5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gJycgfHwgcHJvamVjdExpYnJhcnkuaXNJblByb2plY3RMaWJyYXJ5KGUudGFyZ2V0LnZhbHVlLnRvVXBwZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSBlLmNvbXBvc2VkUGF0aCgpWzJdLmlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVsyXS5pZCk7XG4gICAgICAgICAgICAgICAgX3VwZGF0ZVByb2plY3QobmV3VGl0bGUsIHByb2plY3QpO1xuICAgICAgICAgICAgICAgIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgICAgICAgICBzYXZlTG9jYWwoKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRpdGxlXG59O1xuXG5jb25zdCBfY3JlYXRlRHVlRGF0ZSA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgZHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgIGR1ZURhdGUudmFsdWUgPSBpdGVtLml0ZW1EdWVEYXRlO1xuICAgIGR1ZURhdGUucmVhZE9ubHkgPSB0cnVlO1xuICAgIGR1ZURhdGUuaWQgPSBcImR1ZURhdGUvXCIrYCR7aXRlbS5JRH1gXG5cbiAgICBkdWVEYXRlLm9uZGJsY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgZHVlRGF0ZS5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1JRCA9IGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKClcbiAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldEl0ZW0oaXRlbUlEKTtcbiAgICAgICAgaXRlbS5pdGVtRHVlRGF0ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBzYXZlTG9jYWwoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGR1ZURhdGVcbn07XG5cbmNvbnN0IF9jcmVhdGVEZXNjcmlwdGlvbiA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgaXRlbURlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICBpdGVtRGVzY3JpcHRpb24udmFsdWUgPSBpdGVtLml0ZW1EZXNjcmlwdGlvbjtcbiAgICBpdGVtRGVzY3JpcHRpb24ucmVhZE9ubHkgPSB0cnVlO1xuICAgIGl0ZW1EZXNjcmlwdGlvbi5pZCA9IFwiZGVzY3JpcHRpb24vXCIrYCR7aXRlbS5JRH1gXG5cbiAgICBpdGVtRGVzY3JpcHRpb24ub25kYmxjbGljayA9IChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgfTtcblxuICAgIGl0ZW1EZXNjcmlwdGlvbi5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGl0ZW1EZXNjcmlwdGlvbi5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1JRCA9IGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKClcbiAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldEl0ZW0oaXRlbUlEKTtcbiAgICAgICAgaXRlbS5pdGVtRGVzY3JpcHRpb24gPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgc2F2ZUxvY2FsKCk7XG4gICAgfTtcblxuICAgIGl0ZW1EZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdpdGVtRGVzY3JpcHRpb24nKTtcblxuICAgIHJldHVybiBpdGVtRGVzY3JpcHRpb25cbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblxuY29uc3QgX3VwZGF0ZVByb2plY3QgPSAobmV3VGl0bGUsIHByb2plY3QpID0+IHtcbiAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICBfdXBkYXRlSXRlbShuZXdUaXRsZSwgaXRlbSwgcHJvamVjdCk7XG4gICAgfVxuICAgIGNvbnN0IHByb2plY3REaXNwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdC50aXRsZSk7XG4gICAgcHJvamVjdC50aXRsZSA9IG5ld1RpdGxlO1xuICAgIHByb2plY3REaXNwLmlkID0gcHJvamVjdC50aXRsZTtcbiAgICBzYXZlTG9jYWwoKTtcbn07XG5cbmNvbnN0IF91cGRhdGVJdGVtID0gKG5ld1RpdGxlLCBpdGVtLCBwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgaXRlbURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uSUQpO1xuICAgIGNvbnN0IGNoZWNrQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrQm94LycrYCR7aXRlbS5JRH1gKTtcbiAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhc2gvJytgJHtpdGVtLklEfWApO1xuICAgIGlmICghIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LycrYCR7aXRlbS5JRH1gKSl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoaScpXG4gICAgICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQvJytgJHtpdGVtLklEfWApO1xuXG4gICAgICAgIGl0ZW0uSUQgPSBgJHtuZXdUaXRsZX0tYCArIGAke3Byb2plY3QuZ2l2ZUlEKCl9YDtcbiAgICAgICAgaXRlbURpdi5pZCA9IGl0ZW0uSUQ7XG4gICAgICAgIGl0ZW0ucHJvamVjdFRpdGxlID0gbmV3VGl0bGU7XG4gICAgXG4gICAgICAgIGNoZWNrQm94LmlkID0gJ2NoZWNrQm94LycrYCR7aXRlbS5JRH1gO1xuICAgICAgICB0cmFzaEljb24uaWQgPSAndHJhc2gvJytgJHtpdGVtLklEfWA7XG4gICAgICAgIGVkaXRJY29uLmlkID0gJ2VkaXQvJytgJHtpdGVtLklEfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5JRCA9IGAke25ld1RpdGxlfS1gICsgYCR7cHJvamVjdC5naXZlSUQoKX1gO1xuICAgICAgICBpdGVtRGl2LmlkID0gaXRlbS5JRDtcbiAgICAgICAgaXRlbS5wcm9qZWN0VGl0bGUgPSBuZXdUaXRsZTtcbiAgICAgICAgY2hlY2tCb3guaWQgPSAnY2hlY2tCb3gvJytgJHtpdGVtLklEfWA7XG4gICAgICAgIHRyYXNoSWNvbi5pZCA9ICd0cmFzaC8nK2Ake2l0ZW0uSUR9YDtcbiAgICB9XG59O1xuXG5leHBvcnQge2NyZWF0ZURpc3BsYXlBcmVhLCBtYW5hZ2VWZXJib3NlUHJvamVjdCwgbWFuYWdlRGlzcGxheUFyZWEsIG1hbmFnZURhdGVXaW5kb3d9IiwiY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlckJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGhlYWRlckJhci5jbGFzc0xpc3QuYWRkKCdoZWFkZXInKTtcblxuICAgIGhlYWRlckJhci50ZXh0Q29udGVudCA9IFwiVG8tRG9cIlxuICAgIFxuICAgIHJldHVybiBoZWFkZXJCYXJcbn1cblxuZXhwb3J0IHtjcmVhdGVIZWFkZXJ9IiwiaW1wb3J0IHsgY3JlYXRlSGVhZGVyIH0gZnJvbSBcIi4vaGVhZGVyXCI7XG5pbXBvcnQgeyBtYW5hZ2VTaWRlQmFyIH0gZnJvbSBcIi4vc2lkZUJhclwiO1xuaW1wb3J0IHsgY3JlYXRlRGlzcGxheUFyZWEgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBjcmVhdGVJbnB1dCB9IGZyb20gXCIuL2lucHV0XCI7XG5pbXBvcnQgeyBjaGVja1N0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbi8vb25jZSBpIGFkZCBsb2cgaW4gaW5mb3JtYXRpb24gaSBzaG91bGQgbWFrZSBhbm90aGVyIGpzIHNjcmlwdCBmb3IgbWFraW5nIHRoZSBoZWFkZXIgXG5cblxuXG5jb25zdCBpbml0aWFsaXplV2Vic2l0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSGVhZGVyKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtYW5hZ2VTaWRlQmFyLmNyZWF0ZVNpZGVCYXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURpc3BsYXlBcmVhKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dC5jcmVhdGVJbnB1dEJhcigpKTtcblxuICAgIGNoZWNrU3RvcmFnZSgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplV2Vic2l0ZTsiLCJpbXBvcnQge21hbmFnZURpc3BsYXlBcmVhfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQge21hbmFnZVNpZGVCYXJ9IGZyb20gXCIuL3NpZGVCYXJcIjtcbmltcG9ydCB7c2F2ZUxvY2FsLCByZXRyaWV2ZUxvY2FsfSBmcm9tIFwiLi9zdG9yYWdlXCJcblxuY2xhc3MgSXRlbSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHRpdGxlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIHByb2plY3RUaXRsZSA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtRHVlRGF0ZSA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtRGVzY3JpcHRpb24gPSBcInVua25vd25cIixcbiAgICAgICAgaXRlbUNvbXBsZXRpb24gPSAndW5rbm93bicsXG4gICAgICAgIElEID0gJ3Vua25vd24nLFxuICAgICl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZVxuICAgICAgICB0aGlzLnByb2plY3RUaXRsZSA9IHByb2plY3RUaXRsZVxuICAgICAgICB0aGlzLml0ZW1EdWVEYXRlID0gaXRlbUR1ZURhdGVcbiAgICAgICAgdGhpcy5pdGVtRGVzY3JpcHRpb24gPSBpdGVtRGVzY3JpcHRpb25cbiAgICAgICAgdGhpcy5pdGVtQ29tcGxldGlvbiA9IGl0ZW1Db21wbGV0aW9uXG4gICAgICAgIHRoaXMuSUQgPSBJRFxuICAgICAgICB0aGlzLnR5cGUgPSAnaXRlbSdcbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKCAgICAgICAgXG4gICAgICAgIHRpdGxlID0gJ3Vua25vd24nLFxuICAgICl7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5JREFzc2lnbmVyID0gLTE7XG4gICAgICAgIHRoaXMuSUQgPSB0aXRsZTtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLnR5cGUgPSAncHJvamVjdCc7XG4gICAgfVxuXG4gICAgZ2l2ZUlEKCkge1xuICAgICAgICB0aGlzLklEQXNzaWduZXIgKz0xO1xuICAgICAgICByZXR1cm4gdGhpcy5JREFzc2lnbmVyXG4gICAgfVxuICAgIGFkZEl0ZW0obmV3SXRlbSkge1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3SXRlbSlcbiAgICB9XG4gICAgcmVtb3ZlSXRlbShpdGVtSUQpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLklEICE9PSBpdGVtSUQpXG4gICAgfVxuICAgIGdldEl0ZW0oaXRlbUlEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW0uSUQgPT09IGl0ZW1JRCk7XG4gICAgfVxuICAgIGlzSW5Qcm9qZWN0KGl0ZW1JRCl7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnNvbWUoKGl0ZW0pID0+IGl0ZW0uSUQgPT09IGl0ZW1JRClcbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3RMaWJyYXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdXG4gICAgfVxuICAgIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJblByb2plY3RMaWJyYXJ5KG5ld1Byb2plY3QpKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZVByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSAhPT0gcHJvamVjdFRpdGxlKVxuICAgIH1cbiAgICBnZXRQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxuICAgIGdldEl0ZW0oaXRlbUlEKXtcbiAgICAgICAgZm9yIChsZXQgcHJvamVjdCBvZiB0aGlzLnByb2plY3RzKXtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0LmlzSW5Qcm9qZWN0KGl0ZW1JRCkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0LmdldEl0ZW0oaXRlbUlEKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlzSW5Qcm9qZWN0TGlicmFyeShwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHMuc29tZSgocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdFRpdGxlKVxuICAgIH1cbn1cblxuY29uc3QgcHJvamVjdExpYnJhcnkgPSBuZXcgUHJvamVjdExpYnJhcnkoKVxuXG5cbmNvbnN0IGNyZWF0ZUlucHV0ID0gKCgpID0+IHtcblxuICAgIGNvbnN0IF90aXRsZUlucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgIG5ld0l0ZW1JbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIG5ld0l0ZW1JbnB1dC5pZCA9ICdpdGVtSW5wdXQnO1xuICAgICAgICBuZXdJdGVtSW5wdXQucGxhY2Vob2xkZXIgPSAnVGl0bGUnO1xuICAgICAgICBuZXdJdGVtSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgIFxuICAgICAgICByZXR1cm4gbmV3SXRlbUlucHV0XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9wcm9qZWN0SW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICBuZXdQcm9qZWN0SW5wdXQuaWQgPSAncHJvamVjdElucHV0JztcbiAgICAgICAgbmV3UHJvamVjdElucHV0LnBsYWNlaG9sZGVyID0gJ1Byb2plY3QnO1xuICAgICAgICBuZXdQcm9qZWN0SW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICBuZXdQcm9qZWN0SW5wdXQuc3R5bGUgPSBcInRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XCJcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXdQcm9qZWN0SW5wdXRcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2R1ZURhdGVJbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGR1ZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgZHVlRGF0ZS5pZCA9ICdkdWVEYXRlJztcbiAgICBcbiAgICAgICAgcmV0dXJuIGR1ZURhdGVcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2Rlc2NyaXB0aW9uSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgZGVzY3JpcHRpb24uaWQgPSAnaXRlbURlc2NyaXB0aW9uJztcbiAgICAgICAgZGVzY3JpcHRpb24uY29scyA9ICczMCc7XG4gICAgICAgIGRlc2NyaXB0aW9uLnJvd3MgPSAnMTAnO1xuICAgICAgICBkZXNjcmlwdGlvbi5wbGFjZWhvbGRlciA9ICdEZXNjcmlwdGlvbic7XG4gICAgXG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvblxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfY3JlYXRlQWRkQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBJdGVtJztcbiAgICAgICAgYWRkQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICBcbiAgICAgICAgcmV0dXJuIGFkZEJ1dHRvblxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfY3JlYXRlSXRlbUZyb21JbnB1dCA9ICgpID0+IHtcbiAgICBcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbUlucHV0JykudmFsdWU7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0SW5wdXQnKS52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZURhdGUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgaXRlbURlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW1EZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgIFxuICAgICAgICBpbnB1dEZvcm0ucmVzZXQoKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVtKHRpdGxlLCBwcm9qZWN0VGl0bGUsIGR1ZURhdGUsIGl0ZW1EZXNjcmlwdGlvbiwgZmFsc2UsICd1bmtub3duJylcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2FkZEl0ZW0gPSAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgXG4gICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBfY3JlYXRlSXRlbUZyb21JbnB1dCgpO1xuICAgIFxuICAgICAgICBpZiAocHJvamVjdExpYnJhcnkuaXNJblByb2plY3RMaWJyYXJ5KG5ld0l0ZW0ucHJvamVjdFRpdGxlKSl7XG4gICAgICAgICAgICBuZXdJdGVtLklEID0gYCR7bmV3SXRlbS5wcm9qZWN0VGl0bGV9LWArYCR7cHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSkuZ2l2ZUlEKCl9YDtcbiAgICAgICAgICAgIHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpLmFkZEl0ZW0obmV3SXRlbSk7XG4gICAgICAgICAgICAvLyBtYW5hZ2VEaXNwbGF5QXJlYS5hZGRUb1Byb2plY3RUaWxlKG5ld0l0ZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKCFwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkobmV3SXRlbS5wcm9qZWN0VGl0bGUpKXtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0TGlicmFyeS5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICAgICAgbmV3SXRlbS5JRCA9IGAke25ld0l0ZW0ucHJvamVjdFRpdGxlfS1gK2Ake3Byb2plY3RMaWJyYXJ5LmdldFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpLmdpdmVJRCgpfWA7XG4gICAgICAgICAgICBwcm9qZWN0LmFkZEl0ZW0obmV3SXRlbSk7XG4gICAgICAgICAgICAvLyBtYW5hZ2VEaXNwbGF5QXJlYS5hZGRUb0Rpc3BsYXlBcmVhKHByb2plY3QpO1xuICAgICAgICAgICAgLy8gbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9Qcm9qZWN0VGlsZShuZXdJdGVtKTtcbiAgICAgICAgICAgIC8vIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RMaWJyYXJ5LnByb2plY3RzKVxuICAgICAgICAgICAgLy8gc2F2ZUxvY2FsKClcbiAgICAgICAgICAgIC8vIHJldHJpZXZlTG9jYWwoKVxuICAgICAgICB9XG4gICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgc2F2ZUxvY2FsKClcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUNsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjbGVhckJ1dHRvbi50ZXh0Q29udGVudCA9ICdDbGVhcic7XG4gICAgICAgIGNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlucHV0Rm9ybS5yZXNldCgpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY2xlYXJCdXR0b25cbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUlucHV0Rm9ybSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgICAgICBpbnB1dEZvcm0uY2xhc3NMaXN0LmFkZCgnbmV3SXRlbUZvcm0nKTtcbiAgICAgICAgaW5wdXRGb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCdpbnB1dEZvcm0nKTtcbiAgICAgICAgaW5wdXRGb3JtLm9uc3VibWl0ID0gX2FkZEl0ZW07XG4gICAgXG4gICAgICAgIGNvbnN0IG5ld0l0ZW1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIG5ld0l0ZW1IZWFkZXIudGV4dENvbnRlbnQgPSAnQWRkIE5ldyBJdGVtJ1xuICAgIFxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQobmV3SXRlbUhlYWRlcik7XG4gICAgXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfdGl0bGVJbnB1dCgpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9wcm9qZWN0SW5wdXQoKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfZHVlRGF0ZUlucHV0KCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX2Rlc2NyaXB0aW9uSW5wdXQoKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfY3JlYXRlQWRkQnV0dG9uKCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX2NyZWF0ZUNsZWFyQnV0dG9uKCkpO1xuICAgIFxuICAgICAgICByZXR1cm4gaW5wdXRGb3JtXG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlSW5wdXRCYXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW1CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV3SXRlbUJhci5jbGFzc0xpc3QuYWRkKCduZXdJdGVtQmFyJyk7XG4gICAgICAgIG5ld0l0ZW1CYXIuYXBwZW5kQ2hpbGQoX2NyZWF0ZUlucHV0Rm9ybSgpKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1CYXJcbiAgICB9XG5cbiAgICByZXR1cm4ge2NyZWF0ZUlucHV0QmFyfVxufSkoKTtcblxuZXhwb3J0IHtjcmVhdGVJbnB1dCwgcHJvamVjdExpYnJhcnksIFByb2plY3RMaWJyYXJ5LCBQcm9qZWN0LCBJdGVtfSIsImltcG9ydCB7IG1hbmFnZVZlcmJvc2VQcm9qZWN0LCBtYW5hZ2VEaXNwbGF5QXJlYSwgbWFuYWdlRGF0ZVdpbmRvdyB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IHByb2plY3RMaWJyYXJ5IH0gZnJvbSBcIi4vaW5wdXRcIjtcblxuY29uc3QgbWFuYWdlU2lkZUJhciA9ICgoKSA9PiB7XG4gICAgY29uc3QgY3JlYXRlU2lkZUJhciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGVCYXInKTtcbiAgICBcbiAgICAgICAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBob21lQnV0dG9uLnRleHRDb250ZW50ID0gJ0hvbWUnO1xuICAgICAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRvZGF5QnV0dG9uLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgdG9kYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBtYW5hZ2VEYXRlV2luZG93Lm9wZW5EYXRlV2luZG93KDApO1xuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHdlZWtCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgd2Vla0J1dHRvbi50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnO1xuICAgICAgICB3ZWVrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbWFuYWdlRGF0ZVdpbmRvdy5vcGVuRGF0ZVdpbmRvdyg3KTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoaG9tZUJ1dHRvbik7XG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQodG9kYXlCdXR0b24pO1xuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKHdlZWtCdXR0b24pO1xuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKF9jcmVhdGVQcm9qZWN0QXJlYSgpKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIHNpZGVCYXJcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZVByb2plY3RBcmVhID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0QXJlYUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFxuICAgICAgICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcm9qZWN0QXJlYS5zZXRBdHRyaWJ1dGUoJ2lkJywncHJvamVjdEFyZWEnKTtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHByb2plY3RIZWFkaW5nLnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcbiAgICBcbiAgICAgICAgcHJvamVjdEFyZWFDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRpbmcpO1xuICAgICAgICBwcm9qZWN0QXJlYUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0QXJlYSk7XG4gICAgXG4gICAgICAgIHJldHVybiBwcm9qZWN0QXJlYUNvbnRhaW5lclxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfcmVzZXRQcm9qZWN0QXJlYSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEFyZWEnKTtcbiAgICAgICAgcHJvamVjdEFyZWEuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHJlZ2VuZXJhdGVQcm9qZWN0QXJlYSA9IChwcm9qZWN0TGlicmFyeSkgPT4ge1xuICAgICAgICBfcmVzZXRQcm9qZWN0QXJlYSgpO1xuICAgICAgICAvLyBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb2plY3RBcmVhJyk7IFxuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaWJyYXJ5LnByb2plY3RzKXtcbiAgICAgICAgICAgIF9hZGRQcm9qZWN0QnV0dG9uKHByb2plY3QpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2FkZFByb2plY3RCdXR0b24gPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0QXJlYScpO1xuICAgIFxuICAgICAgICBjb25zdCBuZXdQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIG5ld1Byb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsYCR7cHJvamVjdC50aXRsZX1gKyctYnV0dG9uJyk7XG4gICAgICAgIG5ld1Byb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xuICAgIFxuICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUudGFyZ2V0LmlkLnNsaWNlKDAsLTcpKTtcbiAgICAgICAgICAgIG1hbmFnZVZlcmJvc2VQcm9qZWN0Lm9wZW5WZXJib3NlUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdXR0b24pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdQcm9qZWN0QnV0dG9uKVxuICAgICAgICAvLyByZXR1cm4gKG5ld1Byb2plY3RCdXR0b24pXG4gICAgfVxuICAgIFxuICAgIC8vIGNvbnN0IHJlbW92ZVByb2plY3RCdXR0b24gPSAocHJvamVjdCkgPT4ge1xuICAgIC8vICAgICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0QXJlYScpO1xuICAgIC8vICAgICBwcm9qZWN0QXJlYS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwcm9qZWN0LnByb2plY3RUaXRsZX1gKyAnLWJ1dHRvbicpKTtcbiAgICAvLyB9XG5cbiAgICByZXR1cm4ge2NyZWF0ZVNpZGVCYXIsIHJlZ2VuZXJhdGVQcm9qZWN0QXJlYX1cbn0pKCk7XG5cblxuLy9uZWVkIGEgZnVuY3Rpb24gdG8gcmVuYW1lIGFuZCByZSBJRCB0aGVzZSBcbmV4cG9ydCB7bWFuYWdlU2lkZUJhcn1cblxuLy8gZXhwb3J0IHtjcmVhdGVTaWRlQmFyLCBhZGRQcm9qZWN0QnV0dG9uLCByZW1vdmVQcm9qZWN0QnV0dG9ufSIsImltcG9ydCB7IHByb2plY3RMaWJyYXJ5LCBQcm9qZWN0TGlicmFyeSwgUHJvamVjdCwgSXRlbSB9IGZyb20gXCIuL2lucHV0XCJcbmltcG9ydCB7IG1hbmFnZURpc3BsYXlBcmVhIH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgbWFuYWdlU2lkZUJhciB9IGZyb20gXCIuL3NpZGVCYXJcIjtcblxuLy8gbG9jYWwgc3RvcmFnZSBcblxuY29uc3Qgc2F2ZUxvY2FsID0gKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0TGlicmFyeScsIEpTT04uc3RyaW5naWZ5KHByb2plY3RMaWJyYXJ5LnByb2plY3RzKSk7XG4gICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlKVxufVxuXG5jb25zdCByZXRyaWV2ZUxvY2FsID0gKCkgPT4ge1xuXG4gICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0TGlicmFyeScpKVxuICAgIGlmIChwcm9qZWN0cykge1xuICAgICAgICAvL2xpYnJhcnkuYm9va3MgPSBib29rcy5tYXAoKGJvb2spID0+IEpTT05Ub0Jvb2soYm9vaykpXG4gICAgICAgIHByb2plY3RMaWJyYXJ5LnByb2plY3RzID0gcHJvamVjdHMubWFwKChwcm9qZWN0KSA9PiByZWNvbnN0cnVjdFByb2plY3QocHJvamVjdCkpO1xuICAgICAgICAvLyByZWNvbnN0cnVjdFByb2plY3RMaWJyYXJ5KHByb2plY3RMaWJyYXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvamVjdExpYnJhcnkucHJvamVjdHMgPSBbXVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHByb2plY3RMaWJyYXJ5KVxufVxuXG4vLyBjb25zdCByZWNvbnN0cnVjdFByb2plY3RMaWJyYXJ5ID0gKHByb2plY3RzKSA9PiB7XG4vLyAgICAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0cyl7XG4vLyAgICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdCAocHJvamVjdC50aXRsZSk7XG4vLyAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4vLyAgICAgICAgICAgICBjb25zdCBuZXdJdGVtID0gbmV3IEl0ZW0gKGl0ZW0udGl0bGUsIGl0ZW0ucHJvamVjdFRpdGxlLCBpdGVtLml0ZW1EdWVEYXRlLCBpdGVtLml0ZW1EZXNjcmlwdGlvbixpdGVtLml0ZW1Db21wbGV0aW9uKVxuLy8gICAgICAgICAgICAgbmV3UHJvamVjdC5hZGRJdGVtKG5ld0l0ZW0pXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9XG5cbmNvbnN0IHJlY29uc3RydWN0UHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3QudGl0bGUpO1xuICAgIG5ld1Byb2plY3QuaXRlbXMgPSBwcm9qZWN0Lml0ZW1zLm1hcCgoaXRlbSkgPT4gcmVjb25zdHJ1Y3RJdGVtKGl0ZW0pKVxuICAgIHJldHVybiBuZXdQcm9qZWN0XG59XG5cbmNvbnN0IHJlY29uc3RydWN0SXRlbSA9IChpdGVtKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBJdGVtIChpdGVtLnRpdGxlLCBpdGVtLnByb2plY3RUaXRsZSwgaXRlbS5pdGVtRHVlRGF0ZSwgaXRlbS5pdGVtRGVzY3JpcHRpb24sIGl0ZW0uaXRlbUNvbXBsZXRpb24sIGl0ZW0uSUQpXG59XG5cbmNvbnN0IGNoZWNrU3RvcmFnZSA9ICgpID0+IHtcbiAgICBpZiAoX3N0b3JhZ2VBdmFpbGFibGUoJ2xvY2FsU3RvcmFnZScpKSB7XG4gICAgICAgIC8vIFlpcHBlZSEgV2UgY2FuIHVzZSBsb2NhbFN0b3JhZ2UgYXdlc29tZW5lc3NcbiAgICAgICAgcmV0cmlldmVMb2NhbCgpO1xuICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gVG9vIGJhZCwgbm8gbG9jYWxTdG9yYWdlIGZvciB1c1xuICAgIH1cbn1cblxuY29uc3QgX3N0b3JhZ2VBdmFpbGFibGUgPSAodHlwZSk9PiAge1xuICAgIGxldCBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgICAgICAoc3RvcmFnZSAmJiBzdG9yYWdlLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxufVxuXG4vLyBjbG91ZCBzdG9yYWdlIFxuXG5leHBvcnQge3NhdmVMb2NhbCwgcmV0cmlldmVMb2NhbCwgY2hlY2tTdG9yYWdlfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemVXZWJzaXRlIGZyb20gXCIuL2luaXRXZWJzaXRlXCI7XG5cbmluaXRpYWxpemVXZWJzaXRlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9