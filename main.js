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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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STtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkVBQXVDLENBQUMsa0RBQWM7QUFDOUQsUUFBUSx5RUFBbUMsQ0FBQyxrREFBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7VUNsRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044Qzs7QUFFOUMsd0RBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbml0V2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbnB1dC5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zaWRlQmFyLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb2plY3RMaWJyYXJ5fSBmcm9tIFwiLi9pbnB1dFwiO1xuaW1wb3J0IHttYW5hZ2VTaWRlQmFyfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5pbXBvcnQgeyBzYXZlTG9jYWwgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmNvbnN0IGNyZWF0ZURpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGlzcGxheUFyZWEuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5QXJlYScpO1xuXG4gICAgcmV0dXJuIGRpc3BsYXlBcmVhXG59XG5cbmNvbnN0IGNsZWFyRGlzcGxheUFyZWEgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICBkaXNwbGF5QXJlYS5pbm5lckhUTUwgPSAnJztcbn1cblxuY29uc3QgbWFuYWdlRGlzcGxheUFyZWEgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRvRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgICAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZChfY3JlYXRlUHJvamVjdFRpbGUocHJvamVjdCkpO1xuICAgIH1cbiAgICBcbiAgICAvLyBjb25zdCByZW1vdmVGcm9tRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgIC8vICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgIC8vICAgICBkaXNwbGF5QXJlYS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0LnByb2plY3RUaXRsZSkpO1xuICAgIC8vICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSlcbiAgICAvLyB9XG4gICAgXG4gICAgY29uc3QgYWRkVG9Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgICAgICBwcm9qZWN0VGlsZS5hcHBlbmRDaGlsZChfY3JlYXRlSXRlbShpdGVtKSk7XG4gICAgfVxuICAgIFxuICAgIC8vIGNvbnN0IHJlbW92ZUZyb21Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgIC8vICAgICBwcm9qZWN0VGlsZS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLml0ZW1JRCkpO1xuICAgIFxuICAgIC8vICAgICBpZiAocHJvamVjdFRpbGUuY2hpbGROb2Rlcy5sZW5ndGggPT0gMSl7XG4gICAgLy8gICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChpdGVtLnByb2plY3RUaXRsZSk7XG4gICAgLy8gICAgICAgICByZW1vdmVGcm9tRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlSXRlbURpdicpO1xuICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaXRlbS5JRCk7XG5cbiAgICAgICAgY29uc3QgdG9wUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvcFJvdy5jbGFzc0xpc3QuYWRkKCdpdGVtRGl2Jyk7XG5cbiAgICAgICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbUNvbXBsZXRpb24pIHtcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVDaGVja0ljb24oaXRlbSkpO1xuICAgICAgICB0b3BSb3cuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRpdGxlKGl0ZW0pKTtcbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbihpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKGl0ZW0sIGZhbHNlKSk7XG5cbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQodG9wUm93KTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGxpc3RJdGVtXG4gICAgfVxuXG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZVByb2plY3RUaWxlID0gKHByb2plY3QpID0+IHtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdFRpbGUnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuc2V0QXR0cmlidXRlKCdpZCcsIHByb2plY3QudGl0bGUpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoZWFkZXJEaXYuY2xhc3NMaXN0LmFkZCgnaGVhZGVyRGl2Jyk7XG5cbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShwcm9qZWN0KSk7XG5cbiAgICAgICAgLy8vIG1pZ2h0IHdhbnQgdG8gcmVtb3ZlIHRoaXMgYnV0IGl0IGlzIG5pY2UgdG8gaGF2ZSBpdCBcbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbihwcm9qZWN0KSk7XG4gICAgICAgIC8vL1xuXG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKHByb2plY3QsIGZhbHNlKSk7XG4gICAgXG4gICAgICAgIHByb2plY3RUaWxlLmFwcGVuZENoaWxkKGhlYWRlckRpdik7XG4gICAgXG4gICAgICAgIHJldHVybiBwcm9qZWN0VGlsZVxuICAgIH1cblxuICAgIGNvbnN0IHJlZ2VuZXJhdGVEaXNwbGF5QXJlYSA9IChwcm9qZWN0TGlicmFyeSkgPT4ge1xuICAgICAgICBjbGVhckRpc3BsYXlBcmVhKCk7XG4gICAgICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpYnJhcnkucHJvamVjdHMpe1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9EaXNwbGF5QXJlYShwcm9qZWN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9Qcm9qZWN0VGlsZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge2FkZFRvRGlzcGxheUFyZWEsIGFkZFRvUHJvamVjdFRpbGUsIHJlZ2VuZXJhdGVEaXNwbGF5QXJlYX1cblxufSkoKTtcblxuY29uc3QgbWFuYWdlVmVyYm9zZVByb2plY3QgPSAoKCkgPT4ge1xuICAgIGNvbnN0IG9wZW5WZXJib3NlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNsZWFyRGlzcGxheUFyZWEoKTtcblxuICAgICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuICAgIFxuICAgICAgICBjb25zdCB2ZXJib3NlUHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlUHJvamVjdC5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtwcm9qZWN0LnRpdGxlfWApO1xuXG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LmFwcGVuZENoaWxkKF9jcmVhdGVWZXJib3NlSGVhZGVyKHByb2plY3QpKTtcblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICAgICAgdmVyYm9zZVByb2plY3QuYXBwZW5kQ2hpbGQoY3JlYXRlVmVyYm9zZUl0ZW0oaXRlbSkpO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BsYXlBcmVhLmFwcGVuZENoaWxkKHZlcmJvc2VQcm9qZWN0KTtcbiAgICB9XG5cblxuICAgIGNvbnN0IF9jcmVhdGVWZXJib3NlSGVhZGVyID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgdmVyYm9zZUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlckRpdicpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShwcm9qZWN0KSk7XG4gICAgICAgIHZlcmJvc2VIZWFkZXIuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRyYXNoSWNvbihwcm9qZWN0LCBmYWxzZSkpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVDbG9zZUljb24oKSk7XG5cbiAgICAgICAgcmV0dXJuIHZlcmJvc2VIZWFkZXJcbiAgICB9XG4gICAgXG4gICAgXG4gICAgY29uc3QgY3JlYXRlVmVyYm9zZUl0ZW0gPSAoaXRlbSkgPT4geyAgICBcbiAgICAgICAgLy8gY291bGQgdGFrZSBpbiB0d28gdmFyaWFibGVzLCBvbmUgZm9yIHZlcmJvc2UgYW5kIFxuICAgICAgICAvLyBvbmUgZm9yIGRhdGUgd2luZG93IGFuZCB0aGVuIHdpdGggdGhlIHJpZ2h0IGNvbmRpdGlvbnMgaSB3b3VsZCBcbiAgICAgICAgLy8gbm90IG5lZWQgdHdvIGl0ZW0gZnVuY3Rpb25zIFxuICAgICAgICBjb25zdCB2ZXJib3NlSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlSXRlbURpdicpO1xuICAgICAgICB2ZXJib3NlSXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7aXRlbS5JRH1gKTtcblxuICAgICAgICBjb25zdCB0b3BSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9wUm93LmNsYXNzTGlzdC5hZGQoJ2l0ZW1EaXYnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghaXRlbS5pdGVtQ29tcGxldGlvbil7XG4gICAgICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLml0ZW1Db21wbGV0aW9uKSB7XG4gICAgICAgICAgICB2ZXJib3NlSXRlbS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlQ2hlY2tJY29uKGl0ZW0pKTtcbiAgICAgICAgdG9wUm93LmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlRHVlRGF0ZShpdGVtKSk7XG4gICAgICAgIHRvcFJvdy5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKGl0ZW0pKTtcblxuICAgICAgICB2ZXJib3NlSXRlbS5hcHBlbmRDaGlsZCh0b3BSb3cpO1xuICAgICAgICB2ZXJib3NlSXRlbS5hcHBlbmRDaGlsZChfY3JlYXRlRGVzY3JpcHRpb24oaXRlbSkpO1xuICAgICAgICByZXR1cm4gdmVyYm9zZUl0ZW1cbiAgICB9XG5cbiAgICByZXR1cm4ge29wZW5WZXJib3NlUHJvamVjdCwgY3JlYXRlVmVyYm9zZUl0ZW19XG59KSgpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGRhdGUgd2luZG93IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IG1hbmFnZURhdGVXaW5kb3cgPSAoKCkgPT4ge1xuXG4gICAgY29uc3Qgb3BlbkRhdGVXaW5kb3cgPSAodGFyZ2V0KSA9PiB7XG5cbiAgICAgICAgY2xlYXJEaXNwbGF5QXJlYSgpO1xuXG4gICAgICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgICAgIGNvbnN0IGRhdGVXaW5kb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGF0ZVdpbmRvdy5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdkYXRlSGVhZGVyJyk7XG4gICAgICAgIGlmICh0YXJnZXQgPT0gMCl7XG4gICAgICAgICAgICBoZWFkZXIudGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PSA3KXtcbiAgICAgICAgICAgIGhlYWRlci50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnO1xuICAgICAgICB9XG4gICAgICAgIGRhdGVXaW5kb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaWJyYXJ5LnByb2plY3RzKXtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgICAgICAgICAgaWYgKF9nZXREYXRlRGlmZmVyZW5jZShuZXcgRGF0ZShpdGVtLml0ZW1EdWVEYXRlKSk8PXRhcmdldCl7XG4gICAgICAgICAgICAgICAgICAgIGRhdGVXaW5kb3cuYXBwZW5kQ2hpbGQobWFuYWdlVmVyYm9zZVByb2plY3QuY3JlYXRlVmVyYm9zZUl0ZW0oaXRlbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZChkYXRlV2luZG93KTtcbiAgICB9XG5cbiAgICBjb25zdCBfZ2V0RGF0ZURpZmZlcmVuY2UgPSAoZGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBkdWVEYXRlTWlsaVNlYyA9IERhdGUuVVRDKFxuICAgICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCB0b2RheU1pbGlTZWMgPSBEYXRlLlVUQyh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpLCB0b2RheS5nZXREYXRlKCkpO1xuICAgICAgXG4gICAgICAgIGNvbnN0IGRpZmZlcmVuY2VJbk1pbGxpc2Vjb25kcyA9IGR1ZURhdGVNaWxpU2VjIC0gdG9kYXlNaWxpU2VjO1xuICAgICAgXG4gICAgICAgIGNvbnN0IGRpZmZlcmVuY2VJbkRheXMgPSBkaWZmZXJlbmNlSW5NaWxsaXNlY29uZHMgLyAxMDAwIC8gNjAgLyA2MCAvIDI0O1xuICAgICAgXG4gICAgICAgIHJldHVybiBkaWZmZXJlbmNlSW5EYXlzKzE7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtvcGVuRGF0ZVdpbmRvd31cbn0pKCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gaXRlbSB3aW5kb3cgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNvbnN0IF9vcGVuSXRlbVdpbmRvdyA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICBjb25zdCBpdGVtTW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpdGVtTW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgICB3aW5kb3cub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PSBpdGVtTW9kYWwpIHtcbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXRlbU1vZGFsLmFwcGVuZENoaWxkKG1hbmFnZVZlcmJvc2VQcm9qZWN0LmNyZWF0ZVZlcmJvc2VJdGVtKGl0ZW0pKTtcbiAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZChpdGVtTW9kYWwpO1xufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIGljb25zIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBfY3JlYXRlQ2hlY2tJY29uID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBjaGVja2JveEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBjaGVja2JveEljb24uY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuICAgIGNoZWNrYm94SWNvbi5pZCA9IFwiY2hlY2tCb3gvXCIrYCR7aXRlbS5JRH1gO1xuXG4gICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgY2hlY2tib3hJY29uLnNyYyA9ICAnLi4vZGlzdC9pY29ucy9jaGVja2JveC1ibGFuay1vdXRsaW5lLnN2Zyc7XG4gICAgfSBlbHNlIGlmIChpdGVtLml0ZW1Db21wbGV0aW9uKSB7XG4gICAgICAgIGNoZWNrYm94SWNvbi5zcmMgPSBcIi4uL2Rpc3QvaWNvbnMvY2hlY2tib3gtb3V0bGluZS5zdmdcIjtcbiAgICB9XG5cbiAgICBjaGVja2JveEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtSUQgPSBlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRJdGVtKGl0ZW1JRCk7XG4gICAgICAgIGNvbnN0IGltZyA9IGUuY29tcG9zZWRQYXRoKClbMF07XG4gICAgICAgIF90b2dnbGVDb21wbGV0ZShpdGVtLCBpbWcpO1xuICAgICAgICBzYXZlTG9jYWwoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2hlY2tib3hJY29uXG59XG5cbmNvbnN0IF90b2dnbGVDb21wbGV0ZSA9IChpdGVtLCBpbWcpID0+IHtcbiAgICBjb25zdCBpdGVtRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5JRCk7XG4gICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgaXRlbURpdi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgaW1nLnNyYyA9IFwiLi4vZGlzdC9pY29ucy9jaGVja2JveC1vdXRsaW5lLnN2Z1wiO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtQ29tcGxldGlvbikge1xuICAgICAgICBpdGVtRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICBpbWcuc3JjID0gICcuLi9kaXN0L2ljb25zL2NoZWNrYm94LWJsYW5rLW91dGxpbmUuc3ZnJztcbiAgICB9XG4gICAgaXRlbS5pdGVtQ29tcGxldGlvbiA9ICFpdGVtLml0ZW1Db21wbGV0aW9uO1xufVxuXG5jb25zdCBfY3JlYXRlVHJhc2hJY29uID0gKG9iaiwgdmVyYm9zZSwgZGF0ZVdpbmRvdykgPT4ge1xuICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHRyYXNoSWNvbi5zcmMgPSAnLi4vZGlzdC9pY29ucy90cmFzaC1jYW4tb3V0bGluZS5zdmcnO1xuICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgdHJhc2hJY29uLmlkID0gXCJ0cmFzaC9cIiArIGAke29iai5JRH1gXG5cbiAgICBjb25zdCB0eXBlID0gb2JqLnR5cGU7XG4gICAgY29uc3QgdmVyYiA9IHZlcmJvc2U7XG5cbiAgICBpZiAodHlwZSA9PSAnaXRlbScpe1xuICAgICAgICB0cmFzaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKCkpO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldEl0ZW0oZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKSk7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChpdGVtLnByb2plY3RUaXRsZSk7XG5cbiAgICAgICAgICAgIGlmKGl0ZW1EaXYucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA8PSAyKXtcbiAgICAgICAgICAgICAgICBwcm9qZWN0TGlicmFyeS5yZW1vdmVQcm9qZWN0KHByb2plY3QudGl0bGUpO1xuICAgICAgICAgICAgICAgIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbURpdi5yZW1vdmUoKVxuICAgICAgICAgICAgcHJvamVjdC5yZW1vdmVJdGVtKGl0ZW0uSUQpO1xuICAgICAgICAgICAgc2F2ZUxvY2FsKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PSAncHJvamVjdCcpe1xuICAgICAgICB0cmFzaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKSk7XG4gICAgICAgICAgICBwcm9qZWN0TGlicmFyeS5yZW1vdmVQcm9qZWN0KHByb2plY3QudGl0bGUpO1xuICAgICAgICAgICAgbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgICAgIHNhdmVMb2NhbCgpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdHJhc2hJY29uXG59XG5cbmNvbnN0IF9jcmVhdGVFZGl0SWNvbiA9IChvYmopID0+IHtcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICBlZGl0SWNvbi5zcmMgPSAnLi4vZGlzdC9pY29ucy90ZXh0LWJveC1lZGl0LW91dGxpbmUuc3ZnJztcbiAgICBlZGl0SWNvbi5pZCA9IFwiZWRpdC9cIitgJHtvYmouSUR9YFxuICAgIGlmIChvYmoudHlwZSA9PSAncHJvamVjdCcpe1xuICAgICAgICBlZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpKTtcbiAgICAgICAgICAgIG1hbmFnZVZlcmJvc2VQcm9qZWN0Lm9wZW5WZXJib3NlUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKG9iai50eXBlID09ICdpdGVtJyl7XG4gICAgICAgIGVkaXRJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JRCA9IGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKClcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRJdGVtKGl0ZW1JRCk7XG4gICAgICAgICAgICBfb3Blbkl0ZW1XaW5kb3coaXRlbSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGVkaXRJY29uXG59O1xuXG5jb25zdCBfY3JlYXRlQ2xvc2VJY29uID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGNsb3NlSWNvbi5zcmMgPSBcIi4uL2Rpc3QvaWNvbnMvY2xvc2Uuc3ZnXCI7XG4gICAgY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICBjbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcbiAgICAgICAgLy9wcm9iYWJseSB3aWxsIG5lZWQgdG8gYWNjZXB0IGEgdHlwZSBpbiBoZXJlIFxuICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgIH0pXG4gICAgcmV0dXJuIGNsb3NlSWNvblxufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gaW5wdXQgZmllbGRzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3QgX2NyZWF0ZVRpdGxlID0gKG9iaikgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlJyk7XG5cbiAgICB0aXRsZS50eXBlID0gJ3RleHQnO1xuICAgIHRpdGxlLnZhbHVlID0gYCR7b2JqLnRpdGxlfWA7XG4gICAgdGl0bGUuc2l6ZSA9ICh0aXRsZS52YWx1ZS5sZW5ndGgpKzM7XG4gICAgdGl0bGUucmVhZE9ubHkgPSB0cnVlO1xuICAgIGlmIChvYmoudHlwZSA9PSAnaXRlbScpe1xuICAgICAgICB0aXRsZS5pZCA9IFwidGl0bGUvXCIrYCR7b2JqLklEfWBcbiAgICB9IGVsc2UgaWYgKG9iai50eXBlID09ICdwcm9qZWN0Jyl7XG4gICAgICAgIHRpdGxlLnN0eWxlID0gXCJ0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1wiXG4gICAgfVxuXG4gICAgdGl0bGUub25pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRpdGxlLnZhbHVlLmxlbmd0aD09MCl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpdGxlLnNpemUgPSAodGl0bGUudmFsdWUubGVuZ3RoKSszO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGl0bGUub25kYmxjbGljayA9IChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICB9O1xuXG4gICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IHRydWU7XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJmb2N1c2VkXCIpO1xuICAgICAgICB0aXRsZS5zaXplID0gKHRpdGxlLnZhbHVlLmxlbmd0aCkrMztcbiAgICB9KTtcblxuICAgIGlmIChvYmoudHlwZSA9PSAnaXRlbScpe1xuICAgICAgICB0aXRsZS5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9IGUudGFyZ2V0LmlkLnNwbGl0KCcvJykucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUlEID0gZS50YXJnZXQuaWQuc3BsaXQoJy8nKS5wb3AoKVxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRJdGVtKGl0ZW1JRCk7XG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IG5ld1RpdGxlO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmlkID0gbmV3VGl0bGU7XG4gICAgICAgICAgICAgICAgc2F2ZUxvY2FsKCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAob2JqLnR5cGUgPT0gJ3Byb2plY3QnKXtcbiAgICAgICAgdGl0bGUub25jaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09ICcnIHx8IHByb2plY3RMaWJyYXJ5LmlzSW5Qcm9qZWN0TGlicmFyeShlLnRhcmdldC52YWx1ZS50b1VwcGVyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gZS5jb21wb3NlZFBhdGgoKVsyXS5pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBlLnRhcmdldC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUuY29tcG9zZWRQYXRoKClbMl0uaWQpO1xuICAgICAgICAgICAgICAgIF91cGRhdGVQcm9qZWN0KG5ld1RpdGxlLCBwcm9qZWN0KTtcbiAgICAgICAgICAgICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgICAgICAgICAgc2F2ZUxvY2FsKCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aXRsZVxufTtcblxuY29uc3QgX2NyZWF0ZUR1ZURhdGUgPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGR1ZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICBkdWVEYXRlLnZhbHVlID0gaXRlbS5pdGVtRHVlRGF0ZTtcbiAgICBkdWVEYXRlLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICBkdWVEYXRlLmlkID0gXCJkdWVEYXRlL1wiK2Ake2l0ZW0uSUR9YFxuXG4gICAgZHVlRGF0ZS5vbmRibGNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgZHVlRGF0ZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGR1ZURhdGUub25jaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtSUQgPSBlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRJdGVtKGl0ZW1JRCk7XG4gICAgICAgIGl0ZW0uaXRlbUR1ZURhdGUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgc2F2ZUxvY2FsKCk7XG4gICAgfTtcblxuICAgIHJldHVybiBkdWVEYXRlXG59O1xuXG5jb25zdCBfY3JlYXRlRGVzY3JpcHRpb24gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGl0ZW1EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgaXRlbURlc2NyaXB0aW9uLnZhbHVlID0gaXRlbS5pdGVtRGVzY3JpcHRpb247XG4gICAgaXRlbURlc2NyaXB0aW9uLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICBpdGVtRGVzY3JpcHRpb24uaWQgPSBcImRlc2NyaXB0aW9uL1wiK2Ake2l0ZW0uSUR9YFxuXG4gICAgaXRlbURlc2NyaXB0aW9uLm9uZGJsY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBpdGVtRGVzY3JpcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICBpdGVtRGVzY3JpcHRpb24ub25jaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtSUQgPSBlLnRhcmdldC5pZC5zcGxpdCgnLycpLnBvcCgpXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRJdGVtKGl0ZW1JRCk7XG4gICAgICAgIGl0ZW0uaXRlbURlc2NyaXB0aW9uID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgIHNhdmVMb2NhbCgpO1xuICAgIH07XG5cbiAgICBpdGVtRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnaXRlbURlc2NyaXB0aW9uJyk7XG5cbiAgICByZXR1cm4gaXRlbURlc2NyaXB0aW9uXG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cbmNvbnN0IF91cGRhdGVQcm9qZWN0ID0gKG5ld1RpdGxlLCBwcm9qZWN0KSA9PiB7XG4gICAgZm9yIChsZXQgaXRlbSBvZiBwcm9qZWN0Lml0ZW1zKXtcbiAgICAgICAgX3VwZGF0ZUl0ZW0obmV3VGl0bGUsIGl0ZW0sIHByb2plY3QpO1xuICAgIH1cbiAgICBjb25zdCBwcm9qZWN0RGlzcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByb2plY3QudGl0bGUpO1xuICAgIHByb2plY3QudGl0bGUgPSBuZXdUaXRsZTtcbiAgICBwcm9qZWN0RGlzcC5pZCA9IHByb2plY3QudGl0bGU7XG4gICAgc2F2ZUxvY2FsKCk7XG59O1xuXG5jb25zdCBfdXBkYXRlSXRlbSA9IChuZXdUaXRsZSwgaXRlbSwgcHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IGl0ZW1EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLklEKTtcbiAgICBjb25zdCBjaGVja0JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVja0JveC8nK2Ake2l0ZW0uSUR9YCk7XG4gICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYXNoLycrYCR7aXRlbS5JRH1gKTtcbiAgICBpZiAoISFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC8nK2Ake2l0ZW0uSUR9YCkpe1xuICAgICAgICBjb25zb2xlLmxvZygnaGknKVxuICAgICAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LycrYCR7aXRlbS5JRH1gKTtcblxuICAgICAgICBpdGVtLklEID0gYCR7bmV3VGl0bGV9LWAgKyBgJHtwcm9qZWN0LmdpdmVJRCgpfWA7XG4gICAgICAgIGl0ZW1EaXYuaWQgPSBpdGVtLklEO1xuICAgICAgICBpdGVtLnByb2plY3RUaXRsZSA9IG5ld1RpdGxlO1xuICAgIFxuICAgICAgICBjaGVja0JveC5pZCA9ICdjaGVja0JveC8nK2Ake2l0ZW0uSUR9YDtcbiAgICAgICAgdHJhc2hJY29uLmlkID0gJ3RyYXNoLycrYCR7aXRlbS5JRH1gO1xuICAgICAgICBlZGl0SWNvbi5pZCA9ICdlZGl0LycrYCR7aXRlbS5JRH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uSUQgPSBgJHtuZXdUaXRsZX0tYCArIGAke3Byb2plY3QuZ2l2ZUlEKCl9YDtcbiAgICAgICAgaXRlbURpdi5pZCA9IGl0ZW0uSUQ7XG4gICAgICAgIGl0ZW0ucHJvamVjdFRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgIGNoZWNrQm94LmlkID0gJ2NoZWNrQm94LycrYCR7aXRlbS5JRH1gO1xuICAgICAgICB0cmFzaEljb24uaWQgPSAndHJhc2gvJytgJHtpdGVtLklEfWA7XG4gICAgfVxufTtcblxuZXhwb3J0IHtjcmVhdGVEaXNwbGF5QXJlYSwgbWFuYWdlVmVyYm9zZVByb2plY3QsIG1hbmFnZURpc3BsYXlBcmVhLCBtYW5hZ2VEYXRlV2luZG93fSIsImNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXJCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBoZWFkZXJCYXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJyk7XG5cbiAgICBoZWFkZXJCYXIudGV4dENvbnRlbnQgPSBcIlRvLURvXCJcbiAgICBcbiAgICByZXR1cm4gaGVhZGVyQmFyXG59XG5cbmV4cG9ydCB7Y3JlYXRlSGVhZGVyfSIsImltcG9ydCB7IGNyZWF0ZUhlYWRlciB9IGZyb20gXCIuL2hlYWRlclwiO1xuaW1wb3J0IHsgbWFuYWdlU2lkZUJhciB9IGZyb20gXCIuL3NpZGVCYXJcIjtcbmltcG9ydCB7IGNyZWF0ZURpc3BsYXlBcmVhIH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgY3JlYXRlSW5wdXQgfSBmcm9tIFwiLi9pbnB1dFwiO1xuaW1wb3J0IHsgY2hlY2tTdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG4vL29uY2UgaSBhZGQgbG9nIGluIGluZm9ybWF0aW9uIGkgc2hvdWxkIG1ha2UgYW5vdGhlciBqcyBzY3JpcHQgZm9yIG1ha2luZyB0aGUgaGVhZGVyIFxuXG5cblxuY29uc3QgaW5pdGlhbGl6ZVdlYnNpdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUhlYWRlcigpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWFuYWdlU2lkZUJhci5jcmVhdGVTaWRlQmFyKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVEaXNwbGF5QXJlYSgpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXQuY3JlYXRlSW5wdXRCYXIoKSk7XG5cbiAgICBjaGVja1N0b3JhZ2UoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdGlhbGl6ZVdlYnNpdGU7IiwiaW1wb3J0IHttYW5hZ2VEaXNwbGF5QXJlYX0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHttYW5hZ2VTaWRlQmFyfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5pbXBvcnQge3NhdmVMb2NhbCwgcmV0cmlldmVMb2NhbH0gZnJvbSBcIi4vc3RvcmFnZVwiXG5cbmNsYXNzIEl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICB0aXRsZSA9IFwidW5rbm93blwiLFxuICAgICAgICBwcm9qZWN0VGl0bGUgPSBcInVua25vd25cIixcbiAgICAgICAgaXRlbUR1ZURhdGUgPSBcInVua25vd25cIixcbiAgICAgICAgaXRlbURlc2NyaXB0aW9uID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1Db21wbGV0aW9uID0gJ3Vua25vd24nLFxuICAgICAgICBJRCA9ICd1bmtub3duJyxcbiAgICApe1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGVcbiAgICAgICAgdGhpcy5pdGVtRHVlRGF0ZSA9IGl0ZW1EdWVEYXRlXG4gICAgICAgIHRoaXMuaXRlbURlc2NyaXB0aW9uID0gaXRlbURlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMuaXRlbUNvbXBsZXRpb24gPSBpdGVtQ29tcGxldGlvblxuICAgICAgICB0aGlzLklEID0gSURcbiAgICAgICAgdGhpcy50eXBlID0gJ2l0ZW0nXG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvciggICAgICAgIFxuICAgICAgICB0aXRsZSA9ICd1bmtub3duJyxcbiAgICApe1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIHRoaXMuSURBc3NpZ25lciA9IC0xO1xuICAgICAgICB0aGlzLklEID0gdGl0bGU7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy50eXBlID0gJ3Byb2plY3QnO1xuICAgIH1cblxuICAgIGdpdmVJRCgpIHtcbiAgICAgICAgdGhpcy5JREFzc2lnbmVyICs9MTtcbiAgICAgICAgcmV0dXJuIHRoaXMuSURBc3NpZ25lclxuICAgIH1cbiAgICBhZGRJdGVtKG5ld0l0ZW0pIHtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ld0l0ZW0pXG4gICAgfVxuICAgIHJlbW92ZUl0ZW0oaXRlbUlEKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5JRCAhPT0gaXRlbUlEKVxuICAgIH1cbiAgICBnZXRJdGVtKGl0ZW1JRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maW5kKChpdGVtKSA9PiBpdGVtLklEID09PSBpdGVtSUQpO1xuICAgIH1cbiAgICBpc0luUHJvamVjdChpdGVtSUQpe1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5zb21lKChpdGVtKSA9PiBpdGVtLklEID09PSBpdGVtSUQpXG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0TGlicmFyeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXVxuICAgIH1cbiAgICBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW5Qcm9qZWN0TGlicmFyeShuZXdQcm9qZWN0KSkge1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdClcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmVQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICAgICAgICB0aGlzLnByb2plY3RzID0gdGhpcy5wcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgIT09IHByb2plY3RUaXRsZSlcbiAgICB9XG4gICAgZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC50aXRsZSA9PT0gcHJvamVjdFRpdGxlKVxuICAgIH1cbiAgICBnZXRJdGVtKGl0ZW1JRCl7XG4gICAgICAgIGZvciAobGV0IHByb2plY3Qgb2YgdGhpcy5wcm9qZWN0cyl7XG4gICAgICAgICAgICBpZiAocHJvamVjdC5pc0luUHJvamVjdChpdGVtSUQpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdC5nZXRJdGVtKGl0ZW1JRClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpc0luUHJvamVjdExpYnJhcnkocHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLnNvbWUoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3RUaXRsZSlcbiAgICB9XG59XG5cbmNvbnN0IHByb2plY3RMaWJyYXJ5ID0gbmV3IFByb2plY3RMaWJyYXJ5KClcblxuXG5jb25zdCBjcmVhdGVJbnB1dCA9ICgoKSA9PiB7XG5cbiAgICBjb25zdCBfdGl0bGVJbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgICBuZXdJdGVtSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgICBuZXdJdGVtSW5wdXQuaWQgPSAnaXRlbUlucHV0JztcbiAgICAgICAgbmV3SXRlbUlucHV0LnBsYWNlaG9sZGVyID0gJ1RpdGxlJztcbiAgICAgICAgbmV3SXRlbUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBcbiAgICAgICAgcmV0dXJuIG5ld0l0ZW1JbnB1dFxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfcHJvamVjdElucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBuZXdQcm9qZWN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgbmV3UHJvamVjdElucHV0LmlkID0gJ3Byb2plY3RJbnB1dCc7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC5wbGFjZWhvbGRlciA9ICdQcm9qZWN0JztcbiAgICAgICAgbmV3UHJvamVjdElucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgbmV3UHJvamVjdElucHV0LnN0eWxlID0gXCJ0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1wiXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3UHJvamVjdElucHV0XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9kdWVEYXRlSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIGR1ZURhdGUuaWQgPSAnZHVlRGF0ZSc7XG4gICAgXG4gICAgICAgIHJldHVybiBkdWVEYXRlXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9kZXNjcmlwdGlvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlkID0gJ2l0ZW1EZXNjcmlwdGlvbic7XG4gICAgICAgIGRlc2NyaXB0aW9uLmNvbHMgPSAnMzAnO1xuICAgICAgICBkZXNjcmlwdGlvbi5yb3dzID0gJzEwJztcbiAgICAgICAgZGVzY3JpcHRpb24ucGxhY2Vob2xkZXIgPSAnRGVzY3JpcHRpb24nO1xuICAgIFxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25cbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUFkZEJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgSXRlbSc7XG4gICAgICAgIGFkZEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgXG4gICAgICAgIHJldHVybiBhZGRCdXR0b25cbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUl0ZW1Gcm9tSW5wdXQgPSAoKSA9PiB7XG4gICAgXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW1JbnB1dCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdElucHV0JykudmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdWVEYXRlJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGl0ZW1EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtRGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICBcbiAgICAgICAgaW5wdXRGb3JtLnJlc2V0KCk7XG4gICAgXG4gICAgICAgIHJldHVybiBuZXcgSXRlbSh0aXRsZSwgcHJvamVjdFRpdGxlLCBkdWVEYXRlLCBpdGVtRGVzY3JpcHRpb24sIGZhbHNlLCAndW5rbm93bicpXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9hZGRJdGVtID0gKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBjb25zdCBuZXdJdGVtID0gX2NyZWF0ZUl0ZW1Gcm9tSW5wdXQoKTtcbiAgICBcbiAgICAgICAgaWYgKHByb2plY3RMaWJyYXJ5LmlzSW5Qcm9qZWN0TGlicmFyeShuZXdJdGVtLnByb2plY3RUaXRsZSkpe1xuICAgICAgICAgICAgbmV3SXRlbS5JRCA9IGAke25ld0l0ZW0ucHJvamVjdFRpdGxlfS1gK2Ake3Byb2plY3RMaWJyYXJ5LmdldFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpLmdpdmVJRCgpfWA7XG4gICAgICAgICAgICBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKS5hZGRJdGVtKG5ld0l0ZW0pO1xuICAgICAgICAgICAgLy8gbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9Qcm9qZWN0VGlsZShuZXdJdGVtKTtcbiAgICAgICAgfSBlbHNlIGlmICghcHJvamVjdExpYnJhcnkuaXNJblByb2plY3RMaWJyYXJ5KG5ld0l0ZW0ucHJvamVjdFRpdGxlKSl7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgcHJvamVjdExpYnJhcnkuYWRkUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgICAgIG5ld0l0ZW0uSUQgPSBgJHtuZXdJdGVtLnByb2plY3RUaXRsZX0tYCtgJHtwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKS5naXZlSUQoKX1gO1xuICAgICAgICAgICAgcHJvamVjdC5hZGRJdGVtKG5ld0l0ZW0pO1xuICAgICAgICAgICAgLy8gbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9EaXNwbGF5QXJlYShwcm9qZWN0KTtcbiAgICAgICAgICAgIC8vIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvUHJvamVjdFRpbGUobmV3SXRlbSk7XG4gICAgICAgICAgICAvLyBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0TGlicmFyeS5wcm9qZWN0cylcbiAgICAgICAgICAgIC8vIHNhdmVMb2NhbCgpXG4gICAgICAgICAgICAvLyByZXRyaWV2ZUxvY2FsKClcbiAgICAgICAgfVxuICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgIHNhdmVMb2NhbCgpXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVDbGVhckJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2xlYXJCdXR0b24udGV4dENvbnRlbnQgPSAnQ2xlYXInO1xuICAgICAgICBjbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpbnB1dEZvcm0ucmVzZXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGNsZWFyQnV0dG9uXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVJbnB1dEZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgaW5wdXRGb3JtLmNsYXNzTGlzdC5hZGQoJ25ld0l0ZW1Gb3JtJyk7XG4gICAgICAgIGlucHV0Rm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywnaW5wdXRGb3JtJyk7XG4gICAgICAgIGlucHV0Rm9ybS5vbnN1Ym1pdCA9IF9hZGRJdGVtO1xuICAgIFxuICAgICAgICBjb25zdCBuZXdJdGVtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBuZXdJdGVtSGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBOZXcgSXRlbSdcbiAgICBcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKG5ld0l0ZW1IZWFkZXIpO1xuICAgIFxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX3RpdGxlSW5wdXQoKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfcHJvamVjdElucHV0KCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX2R1ZURhdGVJbnB1dCgpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9kZXNjcmlwdGlvbklucHV0KCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX2NyZWF0ZUFkZEJ1dHRvbigpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9jcmVhdGVDbGVhckJ1dHRvbigpKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGlucHV0Rm9ybVxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZUlucHV0QmFyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld0l0ZW1CYXIuY2xhc3NMaXN0LmFkZCgnbmV3SXRlbUJhcicpO1xuICAgICAgICBuZXdJdGVtQmFyLmFwcGVuZENoaWxkKF9jcmVhdGVJbnB1dEZvcm0oKSk7XG4gICAgXG4gICAgICAgIHJldHVybiBuZXdJdGVtQmFyXG4gICAgfVxuXG4gICAgcmV0dXJuIHtjcmVhdGVJbnB1dEJhcn1cbn0pKCk7XG5cbmV4cG9ydCB7Y3JlYXRlSW5wdXQsIHByb2plY3RMaWJyYXJ5LCBQcm9qZWN0TGlicmFyeSwgUHJvamVjdCwgSXRlbX0iLCJpbXBvcnQgeyBtYW5hZ2VWZXJib3NlUHJvamVjdCwgbWFuYWdlRGlzcGxheUFyZWEsIG1hbmFnZURhdGVXaW5kb3cgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgeyBwcm9qZWN0TGlicmFyeSB9IGZyb20gXCIuL2lucHV0XCI7XG5cbmNvbnN0IG1hbmFnZVNpZGVCYXIgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGNyZWF0ZVNpZGVCYXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2lkZUJhci5jbGFzc0xpc3QuYWRkKCdzaWRlQmFyJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgaG9tZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdIb21lJztcbiAgICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0b2RheUJ1dHRvbi50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgICAgIHRvZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbWFuYWdlRGF0ZVdpbmRvdy5vcGVuRGF0ZVdpbmRvdygwKTtcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB3ZWVrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHdlZWtCdXR0b24udGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJztcbiAgICAgICAgd2Vla0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1hbmFnZURhdGVXaW5kb3cub3BlbkRhdGVXaW5kb3coNyk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKGhvbWVCdXR0b24pO1xuICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKHRvZGF5QnV0dG9uKTtcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZCh3ZWVrQnV0dG9uKTtcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZChfY3JlYXRlUHJvamVjdEFyZWEoKSk7XG4gICAgXG4gICAgICAgIHJldHVybiBzaWRlQmFyXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVQcm9qZWN0QXJlYSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFyZWFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdEFyZWEuc2V0QXR0cmlidXRlKCdpZCcsJ3Byb2plY3RBcmVhJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IHByb2plY3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgXG4gICAgICAgIHByb2plY3RBcmVhQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RIZWFkaW5nKTtcbiAgICAgICAgcHJvamVjdEFyZWFDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEFyZWEpO1xuICAgIFxuICAgICAgICByZXR1cm4gcHJvamVjdEFyZWFDb250YWluZXJcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX3Jlc2V0UHJvamVjdEFyZWEgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RBcmVhJyk7XG4gICAgICAgIHByb2plY3RBcmVhLmlubmVySFRNTCA9ICcnO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCByZWdlbmVyYXRlUHJvamVjdEFyZWEgPSAocHJvamVjdExpYnJhcnkpID0+IHtcbiAgICAgICAgX3Jlc2V0UHJvamVjdEFyZWEoKTtcbiAgICAgICAgLy8gY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9qZWN0QXJlYScpOyBcbiAgICAgICAgZm9yIChsZXQgcHJvamVjdCBvZiBwcm9qZWN0TGlicmFyeS5wcm9qZWN0cyl7XG4gICAgICAgICAgICBfYWRkUHJvamVjdEJ1dHRvbihwcm9qZWN0KVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9hZGRQcm9qZWN0QnV0dG9uID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEFyZWEnKTtcbiAgICBcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLGAke3Byb2plY3QudGl0bGV9YCsnLWJ1dHRvbicpO1xuICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcbiAgICBcbiAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLnRhcmdldC5pZC5zbGljZSgwLC03KSk7XG4gICAgICAgICAgICBtYW5hZ2VWZXJib3NlUHJvamVjdC5vcGVuVmVyYm9zZVByb2plY3QocHJvamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnV0dG9uKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3UHJvamVjdEJ1dHRvbilcbiAgICAgICAgLy8gcmV0dXJuIChuZXdQcm9qZWN0QnV0dG9uKVxuICAgIH1cbiAgICBcbiAgICAvLyBjb25zdCByZW1vdmVQcm9qZWN0QnV0dG9uID0gKHByb2plY3QpID0+IHtcbiAgICAvLyAgICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEFyZWEnKTtcbiAgICAvLyAgICAgcHJvamVjdEFyZWEucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cHJvamVjdC5wcm9qZWN0VGl0bGV9YCsgJy1idXR0b24nKSk7XG4gICAgLy8gfVxuXG4gICAgcmV0dXJuIHtjcmVhdGVTaWRlQmFyLCByZWdlbmVyYXRlUHJvamVjdEFyZWF9XG59KSgpO1xuXG5cbi8vbmVlZCBhIGZ1bmN0aW9uIHRvIHJlbmFtZSBhbmQgcmUgSUQgdGhlc2UgXG5leHBvcnQge21hbmFnZVNpZGVCYXJ9XG5cbi8vIGV4cG9ydCB7Y3JlYXRlU2lkZUJhciwgYWRkUHJvamVjdEJ1dHRvbiwgcmVtb3ZlUHJvamVjdEJ1dHRvbn0iLCJpbXBvcnQgeyBwcm9qZWN0TGlicmFyeSwgUHJvamVjdExpYnJhcnksIFByb2plY3QsIEl0ZW0gfSBmcm9tIFwiLi9pbnB1dFwiXG5pbXBvcnQgeyBtYW5hZ2VEaXNwbGF5QXJlYSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IG1hbmFnZVNpZGVCYXIgfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5cbi8vIGxvY2FsIHN0b3JhZ2UgXG5cbmNvbnN0IHNhdmVMb2NhbCA9ICgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdExpYnJhcnknLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlicmFyeS5wcm9qZWN0cykpO1xuICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZSlcbn1cblxuY29uc3QgcmV0cmlldmVMb2NhbCA9ICgpID0+IHtcblxuICAgIGNvbnN0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdExpYnJhcnknKSlcbiAgICBpZiAocHJvamVjdHMpIHtcbiAgICAgICAgLy9saWJyYXJ5LmJvb2tzID0gYm9va3MubWFwKChib29rKSA9PiBKU09OVG9Cb29rKGJvb2spKVxuICAgICAgICBwcm9qZWN0TGlicmFyeS5wcm9qZWN0cyA9IHByb2plY3RzLm1hcCgocHJvamVjdCkgPT4gcmVjb25zdHJ1Y3RQcm9qZWN0KHByb2plY3QpKTtcbiAgICAgICAgLy8gcmVjb25zdHJ1Y3RQcm9qZWN0TGlicmFyeShwcm9qZWN0TGlicmFyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2plY3RMaWJyYXJ5LnByb2plY3RzID0gW11cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0TGlicmFyeSlcbn1cblxuLy8gY29uc3QgcmVjb25zdHJ1Y3RQcm9qZWN0TGlicmFyeSA9IChwcm9qZWN0cykgPT4ge1xuLy8gICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdHMpe1xuLy8gICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QgKHByb2plY3QudGl0bGUpO1xuLy8gICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuLy8gICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IG5ldyBJdGVtIChpdGVtLnRpdGxlLCBpdGVtLnByb2plY3RUaXRsZSwgaXRlbS5pdGVtRHVlRGF0ZSwgaXRlbS5pdGVtRGVzY3JpcHRpb24saXRlbS5pdGVtQ29tcGxldGlvbilcbi8vICAgICAgICAgICAgIG5ld1Byb2plY3QuYWRkSXRlbShuZXdJdGVtKVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfVxuXG5jb25zdCByZWNvbnN0cnVjdFByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0LnRpdGxlKTtcbiAgICBuZXdQcm9qZWN0Lml0ZW1zID0gcHJvamVjdC5pdGVtcy5tYXAoKGl0ZW0pID0+IHJlY29uc3RydWN0SXRlbShpdGVtKSlcbiAgICByZXR1cm4gbmV3UHJvamVjdFxufVxuXG5jb25zdCByZWNvbnN0cnVjdEl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgIHJldHVybiBuZXcgSXRlbSAoaXRlbS50aXRsZSwgaXRlbS5wcm9qZWN0VGl0bGUsIGl0ZW0uaXRlbUR1ZURhdGUsIGl0ZW0uaXRlbURlc2NyaXB0aW9uLCBpdGVtLml0ZW1Db21wbGV0aW9uLCBpdGVtLklEKVxufVxuXG5jb25zdCBjaGVja1N0b3JhZ2UgPSAoKSA9PiB7XG4gICAgaWYgKF9zdG9yYWdlQXZhaWxhYmxlKCdsb2NhbFN0b3JhZ2UnKSkge1xuICAgICAgICAvLyBZaXBwZWUhIFdlIGNhbiB1c2UgbG9jYWxTdG9yYWdlIGF3ZXNvbWVuZXNzXG4gICAgICAgIHJldHJpZXZlTG9jYWwoKTtcbiAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIFRvbyBiYWQsIG5vIGxvY2FsU3RvcmFnZSBmb3IgdXNcbiAgICB9XG59XG5cbmNvbnN0IF9zdG9yYWdlQXZhaWxhYmxlID0gKHR5cGUpPT4gIHtcbiAgICBsZXQgc3RvcmFnZTtcbiAgICB0cnkge1xuICAgICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgICBjb25zdCB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgIGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICAgICAgKHN0b3JhZ2UgJiYgc3RvcmFnZS5sZW5ndGggIT09IDApO1xuICAgIH1cbn1cblxuLy8gY2xvdWQgc3RvcmFnZSBcblxuZXhwb3J0IHtzYXZlTG9jYWwsIHJldHJpZXZlTG9jYWwsIGNoZWNrU3RvcmFnZX0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBpbml0aWFsaXplV2Vic2l0ZSBmcm9tIFwiLi9pbml0V2Vic2l0ZVwiO1xuXG5pbml0aWFsaXplV2Vic2l0ZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==