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

const manageDisplayArea = (() => {
    const addToDisplayArea = (project) => {
        const displayArea = document.getElementById('displayArea');
        displayArea.appendChild(_createProjectTile(project));
    }
    
    const removeFromDisplayArea = (project) => {
        const displayArea = document.getElementById('displayArea');
        displayArea.removeChild(document.getElementById(project.projectTitle));
    
        (0,_sideBar__WEBPACK_IMPORTED_MODULE_1__.removeProjectButton)(project);
    }
    
    const addToProjectTile = (item) => {
        const projectTile = document.getElementById(item.projectTitle);
        projectTile.appendChild(_createItem(item));
    }
    
    const removeFromProjectTile = (item) => {
        const projectTile = document.getElementById(item.projectTitle);
        projectTile.removeChild(document.getElementById(item.itemID));
    
        if (projectTile.childNodes.length == 1){
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(item.projectTitle);
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
                const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.target.id);
                updateProject(newTitle, project);
                e.target.id = newTitle;
            } 
        };
    
        const closeIcon = document.createElement('img');
        closeIcon.src = "../dist/icons/close.svg";
        closeIcon.classList.add('icon');
        closeIcon.addEventListener('click', () =>{
            manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
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
                const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.target.id);
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
        const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
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
            const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id);
            project.removeItem(item.itemID);
            manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
        });
    } else if (type == 'verboseItem'){
        trashIcon.addEventListener('click', (e) => {
            const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id);
            project.removeItem(item.itemID);
            if (project.items.length == 0){
                _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.removeProject(project.projectTitle);
                manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
                (0,_sideBar__WEBPACK_IMPORTED_MODULE_1__.removeProjectButton)(project);
            } else {
                manageVerboseProject.openVerboseProject(project);
            }
        })
    } else if (type == 'project'){
        trashIcon.addEventListener('click', (e) => {
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id);
            (0,_sideBar__WEBPACK_IMPORTED_MODULE_1__.removeProjectButton)(project);
            _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.removeProject(project.projectTitle);
            manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
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
    container.appendChild((0,_sideBar__WEBPACK_IMPORTED_MODULE_1__.createSideBar)());
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
        itemTitle = "unknown",
        projectTitle = "unknown",
        itemDueDate = "unknown",
        itemDescription = "unknown",
        itemCompletion = 'unknown',
        itemID = 'unknown',
    ){
        this.itemTitle = itemTitle
        this.projectTitle = projectTitle
        this.itemDueDate = itemDueDate
        this.itemDescription = itemDescription
        this.itemCompletion = itemCompletion
        this.itemID = itemID
        this.type = 'item'
    }
}

class Project {
    constructor(        
        projectTitle = 'unknown',
    ){
        this.items = [];
        this.IDAssigner = -1;
        this.projectTitle = projectTitle;
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
        this.items = this.items.filter((item) => item.itemID !== itemID)
    }
    getItem(itemID) {
        return this.items.find((item) => item.itemID === itemID);
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
        this.projects = this.projects.filter((project) => project.projectTitle !== projectTitle)
    }
    getProject(projectTitle) {
        return this.projects.find((project) => project.projectTitle === projectTitle)
    }
    isInProjectLibrary(projectTitle) {
        return this.projects.some((project) => project.projectTitle === projectTitle)
    }
}

const projectLibrary = new ProjectLibrary()


const createInput = (() => {

    const _titleInput = () => {
        const newItemInput = document.createElement('input')
        newItemInput.type = "text";
        newItemInput.id = 'itemInput';
        newItemInput.placeholder = 'Title';
    
        return newItemInput
    }
    
    const _projectInput = () => {
        const newProjectInput = document.createElement('input');
        newProjectInput.type = 'text';
        newProjectInput.id = 'projectInput';
        newProjectInput.placeholder = 'Project';
        
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
    
        const itemTitle = document.getElementById('itemInput').value;
        const projectTitle = document.getElementById('projectInput').value.toUpperCase();
        const dueDate = document.getElementById('dueDate').value;
        const itemDescription = document.getElementById('itemDescription').value;
    
        inputForm.reset();
    
        return new Item(itemTitle, projectTitle, dueDate, itemDescription, false, 'unknown')
    }
    
    const _addItem = (e) => {
        e.preventDefault();
    
        const newItem = _createItemFromInput();
    
        if (newItem.itemTitle == '' || newItem.projectTitle == '') {
            return
        } else if (projectLibrary.isInProjectLibrary(newItem.projectTitle)){
            newItem.itemID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).giveID()}`;
            projectLibrary.getProject(newItem.projectTitle).addItem(newItem);
            _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.addToProjectTile(newItem);
    
        } else if (!projectLibrary.isInProjectLibrary(newItem.projectTitle)){
            const project = new Project(newItem.projectTitle);
            projectLibrary.addProject(project);
            newItem.itemID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).giveID()}`;
            project.addItem(newItem);
            _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.addToDisplayArea(project);
            _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.addToProjectTile(newItem);
    
            (0,_sideBar__WEBPACK_IMPORTED_MODULE_1__.addProjectButton)(project);
        }
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
/* harmony export */   "addProjectButton": () => (/* binding */ addProjectButton),
/* harmony export */   "createSideBar": () => (/* binding */ createSideBar),
/* harmony export */   "removeProjectButton": () => (/* binding */ removeProjectButton)
/* harmony export */ });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.js");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input */ "./src/input.js");



const createSideBar = () => {
    const sideBar = document.createElement('div');
    sideBar.classList.add('sideBar');

    const homeButton = document.createElement('button');
    homeButton.textContent = 'Home';
    homeButton.addEventListener('click', () => {
        // console.log(projectLibrary)
        _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_1__.projectLibrary);
    });

    const todayButton = document.createElement('button');
    todayButton.textContent = 'Today';
    const weekButton = document.createElement('button');
    weekButton.textContent = 'This Week'

    sideBar.appendChild(homeButton);
    sideBar.appendChild(todayButton);
    sideBar.appendChild(weekButton);
    sideBar.appendChild(createProjectArea());

    return sideBar
}

const createProjectArea = () => {
    const projectAreaContainer = document.createElement('div');

    const projectArea = document.createElement('div');
    projectArea.setAttribute('id','projectArea');

    const projectHeading = document.createElement('span');
    projectHeading.textContent = 'Projects';

    projectAreaContainer.appendChild(projectHeading);
    projectAreaContainer.appendChild(projectArea);

    return projectAreaContainer
}

// const resetProjectArea = () => {
//     const projectArea = document.getElementById('projectArea');
//     projectArea.innerHTML = '';
// }

const addProjectButton = (project) => {
    const projectArea = document.getElementById('projectArea');

    const newProjectButton = document.createElement('button');
    newProjectButton.setAttribute('id',`${project.projectTitle}`+'-button');
    newProjectButton.textContent = project.projectTitle;

    newProjectButton.addEventListener('click', (e) => {
        const project = _input__WEBPACK_IMPORTED_MODULE_1__.projectLibrary.getProject(e.target.id.slice(0,-7));
        _display__WEBPACK_IMPORTED_MODULE_0__.manageVerboseProject.openVerboseProject(project);
    });
    projectArea.appendChild(newProjectButton);
}

const removeProjectButton = (project) => {
    const projectArea = document.getElementById('projectArea');
    projectArea.removeChild(document.getElementById(`${project.projectTitle}`+ '-button'));
}

//need a function to rename and re ID these 



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxxQkFBcUI7QUFDL0Q7O0FBRUE7QUFDQSx3QkFBd0IsNkRBQXlCO0FBQ2pELFFBQVEsNkVBQXVDO0FBQy9DLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQscUJBQXFCO0FBQzVFOztBQUVBOzs7Ozs7OztVQ2xFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhDOztBQUU5Qyx3REFBaUIsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaGVhZGVyLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2luaXRXZWJzaXRlLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2lucHV0LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL3NpZGVCYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Byb2plY3RMaWJyYXJ5fSBmcm9tIFwiLi9pbnB1dFwiO1xuaW1wb3J0IHtyZW1vdmVQcm9qZWN0QnV0dG9ufSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5cbmNvbnN0IGNyZWF0ZURpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGlzcGxheUFyZWEuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5QXJlYScpO1xuXG4gICAgcmV0dXJuIGRpc3BsYXlBcmVhXG59XG5cbmNvbnN0IG1hbmFnZURpc3BsYXlBcmVhID0gKCgpID0+IHtcbiAgICBjb25zdCBhZGRUb0Rpc3BsYXlBcmVhID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICAgICAgZGlzcGxheUFyZWEuYXBwZW5kQ2hpbGQoX2NyZWF0ZVByb2plY3RUaWxlKHByb2plY3QpKTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgcmVtb3ZlRnJvbURpc3BsYXlBcmVhID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICAgICAgZGlzcGxheUFyZWEucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdC5wcm9qZWN0VGl0bGUpKTtcbiAgICBcbiAgICAgICAgcmVtb3ZlUHJvamVjdEJ1dHRvbihwcm9qZWN0KTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgYWRkVG9Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgICAgICBwcm9qZWN0VGlsZS5hcHBlbmRDaGlsZChfY3JlYXRlSXRlbShpdGVtKSk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHJlbW92ZUZyb21Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgICAgICBwcm9qZWN0VGlsZS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLml0ZW1JRCkpO1xuICAgIFxuICAgICAgICBpZiAocHJvamVjdFRpbGUuY2hpbGROb2Rlcy5sZW5ndGggPT0gMSl7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChpdGVtLnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICByZW1vdmVGcm9tRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdpdGVtRGl2Jyk7XG4gICAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBpdGVtLml0ZW1JRCk7XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVDaGVja0ljb24oKSk7XG4gICAgICAgIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IGl0ZW0uaXRlbVRpdGxlO1xuICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChpdGVtTmFtZSk7XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbigpKTtcbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoX2NyZWF0ZVRyYXNoSWNvbignaXRlbScpKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGxpc3RJdGVtXG4gICAgfVxuXG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZVByb2plY3RUaWxlID0gKHByb2plY3QpID0+IHtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdFRpbGUnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuc2V0QXR0cmlidXRlKCdpZCcsIHByb2plY3QucHJvamVjdFRpdGxlKTtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIHByb2plY3RIZWFkZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0LnByb2plY3RUaXRsZTtcbiAgICBcbiAgICAgICAgY29uc3QgaGVhZGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGhlYWRlckRpdi5jbGFzc0xpc3QuYWRkKCdoZWFkZXJEaXYnKTtcbiAgICAgICAgLy8gaGVhZGVyRGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0SGVhZGVyXCIpO1xuICAgIFxuICAgICAgICBoZWFkZXJEaXYuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRlcik7XG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChfY3JlYXRlRWRpdEljb24oKSk7XG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKCdwcm9qZWN0JykpO1xuICAgIFxuICAgICAgICBwcm9qZWN0VGlsZS5hcHBlbmRDaGlsZChoZWFkZXJEaXYpO1xuICAgIFxuICAgICAgICByZXR1cm4gcHJvamVjdFRpbGVcbiAgICB9XG5cbiAgICBjb25zdCByZWdlbmVyYXRlRGlzcGxheUFyZWEgPSAocHJvamVjdExpYnJhcnkpID0+IHtcbiAgICAgICAgY2xlYXJEaXNwbGF5QXJlYSgpO1xuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaWJyYXJ5LnByb2plY3RzKXtcbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvUHJvamVjdFRpbGUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHthZGRUb0Rpc3BsYXlBcmVhLCBhZGRUb1Byb2plY3RUaWxlLCByZW1vdmVGcm9tRGlzcGxheUFyZWEsIHJlbW92ZUZyb21Qcm9qZWN0VGlsZSwgcmVnZW5lcmF0ZURpc3BsYXlBcmVhfVxufSkoKTtcblxuXG5cbi8vLy8vLy8gb3ZlcmxheSBmdW5jdGlvbnMgLy8vLy8vLyBcblxuY29uc3QgbWFuYWdlVmVyYm9zZVByb2plY3QgPSAoKCkgPT4ge1xuICAgIGNvbnN0IG9wZW5WZXJib3NlUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG5cbiAgICAgICAgY2xlYXJEaXNwbGF5QXJlYSgpO1xuXG4gICAgICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IHZlcmJvc2VQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ292ZXJsYXknKTtcbiAgICAgICAgdmVyYm9zZVByb2plY3Quc2V0QXR0cmlidXRlKCdpZCcsIGAke3Byb2plY3QucHJvamVjdFRpdGxlfWApO1xuXG4gICAgICAgIHZlcmJvc2VQcm9qZWN0LmFwcGVuZENoaWxkKF9jcmVhdGVWZXJib3NlSGVhZGVyKHByb2plY3QpKTtcblxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICAgICAgdmVyYm9zZVByb2plY3QuYXBwZW5kQ2hpbGQoX2NyZWF0ZVZlcmJvc2VJdGVtKGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZCh2ZXJib3NlUHJvamVjdCk7XG4gICAgfVxuXG5cbiAgICBjb25zdCBfY3JlYXRlVmVyYm9zZUhlYWRlciA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIC8vIGNvbnN0IHByb2plY3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgICAgICBjb25zdCB2ZXJib3NlSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHZlcmJvc2VIZWFkZXIuY2xhc3NMaXN0LmFkZCgndmVyYm9zZUhlYWRlcicpO1xuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBwcm9qZWN0VGl0bGUuY2xhc3NMaXN0LmFkZCgndmVyYm9zZVByb2plY3RUaXRsZScpO1xuICAgICAgICBwcm9qZWN0VGl0bGUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgLy8gcHJvamVjdFRpdGxlLmlkID0gYCR7cHJvamVjdC5wcm9qZWN0VGl0bGV9YDtcbiAgICAgICAgcHJvamVjdFRpdGxlLnZhbHVlID0gYCR7cHJvamVjdC5wcm9qZWN0VGl0bGV9YDtcbiAgICAgICAgLy8gcHJvamVjdFRpdGxlLnN0eWxlLndpZHRoID0gKHByb2plY3RUaXRsZS52YWx1ZS5sZW5ndGgpKzEgKyAncmVtJztcbiAgICAgICAgcHJvamVjdFRpdGxlLnNpemUgPSAocHJvamVjdFRpdGxlLnZhbHVlLmxlbmd0aCkrMztcbiAgICAgICAgcHJvamVjdFRpdGxlLnJlYWRPbmx5ID0gdHJ1ZTtcblxuICAgICAgICBwcm9qZWN0VGl0bGUub25pbnB1dCA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0VGl0bGUudmFsdWUubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcHJvamVjdFRpdGxlLnN0eWxlLndpZHRoID0gKHByb2plY3RUaXRsZS52YWx1ZS5sZW5ndGgpKzEgKyAncmVtJztcbiAgICAgICAgICAgICAgICBwcm9qZWN0VGl0bGUuc2l6ZSA9IChwcm9qZWN0VGl0bGUudmFsdWUubGVuZ3RoKSszO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vLy8vLy8vLyBtYWtlIHRoZXNlIHR3byB0aGVpciBvd24gZnVuY3Rpb25zIHRoYXQgdGhlIG1haW4gZGlzcGxheSBjYW4gYWxzbyB1c2UgXG4gICAgICAgIHByb2plY3RUaXRsZS5vbmRibGNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gZmFsc2U7XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdmb2N1c2VkJyk7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHByb2plY3RUaXRsZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IHRydWU7XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9jdXNlZFwiKTtcbiAgICAgICAgICAgIC8vIGUudGFyZ2V0LnN0eWxlLndpZHRoID0gZS50YXJnZXQudmFsdWUubGVuZ3RoICsgMSArICdyZW0nO1xuICAgICAgICAgICAgcHJvamVjdFRpdGxlLnNpemUgPSAocHJvamVjdFRpdGxlLnZhbHVlLmxlbmd0aCkrMztcbiAgICAgICAgfSk7XG4gICAgLy8vLy8vLy8vIFxuICAgIFxuICAgICAgICBwcm9qZWN0VGl0bGUub25jaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICAgICAgLy91cGRhdGUgcHJvamVjdFxuICAgICAgICAgICAgLy91cGRhdGUgaXRlbXMgaW4gcHJvamVjdC5pdGVtc1xuICAgICAgICAgICAgLy91cGRhdGUgdmVyYm9zZVByb2plY3QgPyB0aGlzIG1heSBkZXBlbmQgb24gd2hhdCBpcyBjYWxsaW5nIGl0XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9IGUudGFyZ2V0LmlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUudGFyZ2V0LmlkKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVQcm9qZWN0KG5ld1RpdGxlLCBwcm9qZWN0KTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5pZCA9IG5ld1RpdGxlO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgY29uc3QgY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGNsb3NlSWNvbi5zcmMgPSBcIi4uL2Rpc3QvaWNvbnMvY2xvc2Uuc3ZnXCI7XG4gICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgICAgIGNsb3NlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgdmVyYm9zZUhlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVUcmFzaEljb24oJ3Byb2plY3QnKSk7XG4gICAgICAgIHZlcmJvc2VIZWFkZXIuYXBwZW5kQ2hpbGQoY2xvc2VJY29uKTtcblxuICAgICAgICByZXR1cm4gdmVyYm9zZUhlYWRlclxuICAgIH1cbiAgICBcbiAgICBcbiAgICBjb25zdCBfY3JlYXRlVmVyYm9zZUl0ZW0gPSAoaXRlbSkgPT4geyAgICBcbiAgICAgICAgY29uc3QgdmVyYm9zZUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdmVyYm9zZUl0ZW0uY2xhc3NMaXN0LmFkZCgndmVyYm9zZUl0ZW0nKTtcbiAgICAgICAgdmVyYm9zZUl0ZW0uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l0ZW0uaXRlbUlEfWApO1xuXG4gICAgICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGl0ZW1UaXRsZS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlSXRlbVRpdGxlJyk7XG4gICAgICAgIGl0ZW1UaXRsZS50eXBlID0gJ3RleHQnO1xuICAgICAgICAvLyBpdGVtVGl0bGUuaWQgPSBgJHtpdGVtLml0ZW1UaXRsZX1gO1xuICAgICAgICBpdGVtVGl0bGUudmFsdWUgPSBgJHtpdGVtLml0ZW1UaXRsZX1gO1xuICAgICAgICAvLyBwcm9qZWN0VGl0bGUuc3R5bGUud2lkdGggPSAocHJvamVjdFRpdGxlLnZhbHVlLmxlbmd0aCkrMSArICdyZW0nO1xuICAgICAgICBpdGVtVGl0bGUuc2l6ZSA9IChpdGVtVGl0bGUudmFsdWUubGVuZ3RoKSszO1xuICAgICAgICBpdGVtVGl0bGUucmVhZE9ubHkgPSB0cnVlO1xuXG4gICAgICAgIGl0ZW1UaXRsZS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW1UaXRsZS52YWx1ZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwcm9qZWN0VGl0bGUuc3R5bGUud2lkdGggPSAocHJvamVjdFRpdGxlLnZhbHVlLmxlbmd0aCkrMSArICdyZW0nO1xuICAgICAgICAgICAgICAgIGl0ZW1UaXRsZS5zaXplID0gKGl0ZW1UaXRsZS52YWx1ZS5sZW5ndGgpKzM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaXRlbVRpdGxlLm9uZGJsY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2ZvY3VzZWQnKTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgaXRlbVRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJmb2N1c2VkXCIpO1xuICAgICAgICAgICAgLy8gZS50YXJnZXQuc3R5bGUud2lkdGggPSBlLnRhcmdldC52YWx1ZS5sZW5ndGggKyAxICsgJ3JlbSc7XG4gICAgICAgICAgICBpdGVtVGl0bGUuc2l6ZSA9IChpdGVtVGl0bGUudmFsdWUubGVuZ3RoKSszO1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgaXRlbVRpdGxlLm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgICAgIC8vdXBkYXRlIHByb2plY3RcbiAgICAgICAgICAgIC8vdXBkYXRlIGl0ZW1zIGluIHByb2plY3QuaXRlbXNcbiAgICAgICAgICAgIC8vdXBkYXRlIHZlcmJvc2VQcm9qZWN0ID8gdGhpcyBtYXkgZGVwZW5kIG9uIHdoYXQgaXMgY2FsbGluZyBpdFxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09ICcnKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSBlLnRhcmdldC5pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLy8vLy8vY2hhbmdlIHRoaXMgZm9yIHRoZSBpdGVtIGlucHV0cyBcbiAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIGlkIG9mIHRoZSBjb250YWluaW5nIGRpdiBcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUudGFyZ2V0LmlkKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVQcm9qZWN0KG5ld1RpdGxlLCBwcm9qZWN0KTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5pZCA9IG5ld1RpdGxlO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgLy93aGF0IGFib3V0IGlkIGhlcmVcbiAgICAgICAgZHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICBkdWVEYXRlLmlkID0gXCJkdWVEYXRlXCI7XG4gICAgICAgIGR1ZURhdGUudmFsdWUgPSBpdGVtLmR1ZURhdGU7XG4gICAgICAgIGR1ZURhdGUucmVhZE9ubHkgPSB0cnVlO1xuXG4gICAgICAgIC8vLy8vLy8vIHRleHQgYXJlYSBkZXNjcmlwdGlvbiBhZGQgaGVyZSBcblxuICAgICAgICBjb25zdCBpdGVtRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAvL3doYXQgYWJvdXQgaWQgaGVyZVxuICAgICAgICBpdGVtRGVzY3JpcHRpb24uaWQgPSAnaXRlbURlc2NyaXB0aW9uJztcbiAgICAgICAgaXRlbURlc2NyaXB0aW9uLmNvbHMgPSAnMzAnO1xuICAgICAgICBpdGVtRGVzY3JpcHRpb24ucm93cyA9ICcxMCc7XG4gICAgICAgIGl0ZW1EZXNjcmlwdGlvbi52YWx1ZSA9IGl0ZW0uaXRlbURlc2NyaXB0aW9uO1xuICAgICAgICBpdGVtRGVzY3JpcHRpb24ucmVhZE9ubHkgPSB0cnVlO1xuXG4gICAgICAgIC8vIHZlcmJvc2VJdGVtLmFwcGVuZENoaWxkKGl0ZW1EZXNjcmlwdGlvbik7XG4gICAgICAgIHZlcmJvc2VJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVDaGVja0ljb24oKSk7XG4gICAgICAgIHZlcmJvc2VJdGVtLmFwcGVuZENoaWxkKGl0ZW1UaXRsZSk7XG4gICAgICAgIHZlcmJvc2VJdGVtLmFwcGVuZENoaWxkKGR1ZURhdGUpO1xuICAgICAgICB2ZXJib3NlSXRlbS5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKCd2ZXJib3NlSXRlbScpKTtcblxuICAgICAgICByZXR1cm4gdmVyYm9zZUl0ZW1cbiAgICB9XG5cbiAgICByZXR1cm4ge29wZW5WZXJib3NlUHJvamVjdH1cbn0pKCk7XG5cbmNvbnN0IF9jcmVhdGVDaGVja0ljb24gPSAoKSA9PiB7XG4gICAgY29uc3QgY2hlY2tib3hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgY2hlY2tib3hJY29uLnNyYyA9ICcuLi9kaXN0L2ljb25zL2NoZWNrYm94LWJsYW5rLW91dGxpbmUuc3ZnJztcbiAgICBjaGVja2JveEljb24uY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuICAgIGNoZWNrYm94SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUuY29tcG9zZWRQYXRoKClbMl0uaWQpLmdldEl0ZW0oZS5jb21wb3NlZFBhdGgoKVsxXS5pZCk7XG4gICAgICAgIGNvbnN0IGltZyA9IGUuY29tcG9zZWRQYXRoKClbMF07XG4gICAgICAgIF90b2dnbGVDb21wbGV0ZShpdGVtLCBpbWcpXG4gICAgfSk7XG4gICAgcmV0dXJuIGNoZWNrYm94SWNvblxufVxuXG5jb25zdCBfY3JlYXRlVHJhc2hJY29uID0gKHR5cGUpID0+IHtcbiAgICBjb25zdCB0cmFzaEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB0cmFzaEljb24uc3JjID0gJy4uL2Rpc3QvaWNvbnMvdHJhc2gtY2FuLW91dGxpbmUuc3ZnJztcbiAgICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuXG4gICAgaWYgKHR5cGUgPT0gJ2l0ZW0nKXtcbiAgICAgICAgdHJhc2hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUuY29tcG9zZWRQYXRoKClbMl0uaWQpLmdldEl0ZW0oZS5jb21wb3NlZFBhdGgoKVsxXS5pZCk7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLmNvbXBvc2VkUGF0aCgpWzJdLmlkKTtcbiAgICAgICAgICAgIHByb2plY3QucmVtb3ZlSXRlbShpdGVtLml0ZW1JRCk7XG4gICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3ZlcmJvc2VJdGVtJyl7XG4gICAgICAgIHRyYXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLmNvbXBvc2VkUGF0aCgpWzJdLmlkKS5nZXRJdGVtKGUuY29tcG9zZWRQYXRoKClbMV0uaWQpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVsyXS5pZCk7XG4gICAgICAgICAgICBwcm9qZWN0LnJlbW92ZUl0ZW0oaXRlbS5pdGVtSUQpO1xuICAgICAgICAgICAgaWYgKHByb2plY3QuaXRlbXMubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgIHByb2plY3RMaWJyYXJ5LnJlbW92ZVByb2plY3QocHJvamVjdC5wcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLnJlZ2VuZXJhdGVEaXNwbGF5QXJlYShwcm9qZWN0TGlicmFyeSk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlUHJvamVjdEJ1dHRvbihwcm9qZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFuYWdlVmVyYm9zZVByb2plY3Qub3BlblZlcmJvc2VQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PSAncHJvamVjdCcpe1xuICAgICAgICB0cmFzaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVsyXS5pZCk7XG4gICAgICAgICAgICByZW1vdmVQcm9qZWN0QnV0dG9uKHByb2plY3QpO1xuICAgICAgICAgICAgcHJvamVjdExpYnJhcnkucmVtb3ZlUHJvamVjdChwcm9qZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdHJhc2hJY29uXG59XG5cbmNvbnN0IF9jcmVhdGVFZGl0SWNvbiA9ICgpID0+IHtcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGVkaXRJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICBlZGl0SWNvbi5zcmMgPSAnLi4vZGlzdC9pY29ucy90ZXh0LWJveC1lZGl0LW91dGxpbmUuc3ZnJztcbiAgICBlZGl0SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIC8vIG9wZW4gYSB2ZXJib3NlIGl0ZW0gbW9kYWwgXG4gICAgICAgIC8vIGdldCBpdGVtIGlkXG4gICAgICAgIC8vIG9wZW4gbW9kYWxcbiAgICAgICAgLy8gb25seSBjYWxsIGZyb20gbWFpbiBkaXNwbGF5IFxuICAgIH0pXG4gICAgcmV0dXJuIGVkaXRJY29uXG59O1xuXG4vL3RoZXNlIHNob3VsZCB1cGRhdGUgdGhlIGRpdidzIGFzIHdlbGwgP1xuY29uc3QgdXBkYXRlUHJvamVjdCA9IChuZXdUaXRsZSwgcHJvamVjdCkgPT4ge1xuICAgIGZvciAobGV0IGl0ZW0gb2YgcHJvamVjdC5pdGVtcyl7XG4gICAgICAgIGl0ZW0ucHJvamVjdFRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuICAgIHByb2plY3QucHJvamVjdFRpdGxlID0gbmV3VGl0bGU7XG59O1xuXG5jb25zdCB1cGRhdGVJdGVtID0gKGl0ZW0pID0+IHtcblxufTtcblxuLy9zZXBhcmF0ZSBmdW5jdGlvbnMuIG9uZSB0byBkbyB0aGUgaW1nIHNvdXJjZSBhbmQgdGhlIG90aGVyIHRvIGNoYW5nZSB0aGUgb2JqZWN0IGluZm9ybWF0aW9uIFxuLy9tYWtlIHRoaXMgYWNjZXNzYWJsZSBnbG9hYmxseSBoZXJlIFxuY29uc3QgX3RvZ2dsZUNvbXBsZXRlID0gKGl0ZW0sIGltZykgPT4ge1xuICAgIGNvbnN0IGl0ZW1EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLml0ZW1JRCk7XG4gICAgaWYgKCFpdGVtLml0ZW1Db21wbGV0aW9uKXtcbiAgICAgICAgaXRlbURpdi5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgaW1nLnNyYyA9IFwiLi4vZGlzdC9pY29ucy9jaGVja2JveC1vdXRsaW5lLnN2Z1wiO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5pdGVtQ29tcGxldGlvbikge1xuICAgICAgICBpdGVtRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICBpbWcuc3JjID0gICcuLi9kaXN0L2ljb25zL2NoZWNrYm94LWJsYW5rLW91dGxpbmUuc3ZnJztcbiAgICB9XG4gICAgaXRlbS5pdGVtQ29tcGxldGlvbiA9ICFpdGVtLml0ZW1Db21wbGV0aW9uO1xufVxuXG5jb25zdCBjbGVhckRpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgZGlzcGxheUFyZWEuaW5uZXJIVE1MID0gJyc7XG59XG5cbmV4cG9ydCB7Y3JlYXRlRGlzcGxheUFyZWEsIG1hbmFnZVZlcmJvc2VQcm9qZWN0LCBtYW5hZ2VEaXNwbGF5QXJlYX0iLCJjb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyQmFyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicpO1xuXG4gICAgaGVhZGVyQmFyLnRleHRDb250ZW50ID0gXCJUby1Eb1wiXG4gICAgXG4gICAgcmV0dXJuIGhlYWRlckJhclxufVxuXG5leHBvcnQge2NyZWF0ZUhlYWRlcn0iLCJpbXBvcnQge2NyZWF0ZUhlYWRlcn0gZnJvbSBcIi4vaGVhZGVyXCI7XG5pbXBvcnQge2NyZWF0ZVNpZGVCYXJ9IGZyb20gXCIuL3NpZGVCYXJcIjtcbmltcG9ydCB7Y3JlYXRlRGlzcGxheUFyZWF9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7Y3JlYXRlSW5wdXR9IGZyb20gXCIuL2lucHV0XCI7XG5cblxuLy9vbmNlIGkgYWRkIGxvZyBpbiBpbmZvcm1hdGlvbiBpIHNob3VsZCBtYWtlIGFub3RoZXIganMgc2NyaXB0IGZvciBtYWtpbmcgdGhlIGhlYWRlciBcblxuXG5cbmNvbnN0IGluaXRpYWxpemVXZWJzaXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVNpZGVCYXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURpc3BsYXlBcmVhKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dC5jcmVhdGVJbnB1dEJhcigpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdGlhbGl6ZVdlYnNpdGU7IiwiaW1wb3J0IHttYW5hZ2VEaXNwbGF5QXJlYX0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHthZGRQcm9qZWN0QnV0dG9ufSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5cbmNsYXNzIEl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpdGVtVGl0bGUgPSBcInVua25vd25cIixcbiAgICAgICAgcHJvamVjdFRpdGxlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1EdWVEYXRlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1EZXNjcmlwdGlvbiA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtQ29tcGxldGlvbiA9ICd1bmtub3duJyxcbiAgICAgICAgaXRlbUlEID0gJ3Vua25vd24nLFxuICAgICl7XG4gICAgICAgIHRoaXMuaXRlbVRpdGxlID0gaXRlbVRpdGxlXG4gICAgICAgIHRoaXMucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlXG4gICAgICAgIHRoaXMuaXRlbUR1ZURhdGUgPSBpdGVtRHVlRGF0ZVxuICAgICAgICB0aGlzLml0ZW1EZXNjcmlwdGlvbiA9IGl0ZW1EZXNjcmlwdGlvblxuICAgICAgICB0aGlzLml0ZW1Db21wbGV0aW9uID0gaXRlbUNvbXBsZXRpb25cbiAgICAgICAgdGhpcy5pdGVtSUQgPSBpdGVtSURcbiAgICAgICAgdGhpcy50eXBlID0gJ2l0ZW0nXG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvciggICAgICAgIFxuICAgICAgICBwcm9qZWN0VGl0bGUgPSAndW5rbm93bicsXG4gICAgKXtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLklEQXNzaWduZXIgPSAtMTtcbiAgICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGU7XG4gICAgICAgIHRoaXMudHlwZSA9ICdwcm9qZWN0JztcbiAgICB9XG4gICAgZ2l2ZUlEKCkge1xuICAgICAgICB0aGlzLklEQXNzaWduZXIgKz0xO1xuICAgICAgICByZXR1cm4gdGhpcy5JREFzc2lnbmVyXG4gICAgfVxuICAgIGFkZEl0ZW0obmV3SXRlbSkge1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3SXRlbSlcbiAgICB9XG4gICAgcmVtb3ZlSXRlbShpdGVtSUQpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLml0ZW1JRCAhPT0gaXRlbUlEKVxuICAgIH1cbiAgICBnZXRJdGVtKGl0ZW1JRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maW5kKChpdGVtKSA9PiBpdGVtLml0ZW1JRCA9PT0gaXRlbUlEKTtcbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3RMaWJyYXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdXG4gICAgfVxuICAgIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJblByb2plY3RMaWJyYXJ5KG5ld1Byb2plY3QpKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZVByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0VGl0bGUgIT09IHByb2plY3RUaXRsZSlcbiAgICB9XG4gICAgZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0VGl0bGUgPT09IHByb2plY3RUaXRsZSlcbiAgICB9XG4gICAgaXNJblByb2plY3RMaWJyYXJ5KHByb2plY3RUaXRsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RUaXRsZSA9PT0gcHJvamVjdFRpdGxlKVxuICAgIH1cbn1cblxuY29uc3QgcHJvamVjdExpYnJhcnkgPSBuZXcgUHJvamVjdExpYnJhcnkoKVxuXG5cbmNvbnN0IGNyZWF0ZUlucHV0ID0gKCgpID0+IHtcblxuICAgIGNvbnN0IF90aXRsZUlucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICAgIG5ld0l0ZW1JbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgIG5ld0l0ZW1JbnB1dC5pZCA9ICdpdGVtSW5wdXQnO1xuICAgICAgICBuZXdJdGVtSW5wdXQucGxhY2Vob2xkZXIgPSAnVGl0bGUnO1xuICAgIFxuICAgICAgICByZXR1cm4gbmV3SXRlbUlucHV0XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9wcm9qZWN0SW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgICAgICBuZXdQcm9qZWN0SW5wdXQuaWQgPSAncHJvamVjdElucHV0JztcbiAgICAgICAgbmV3UHJvamVjdElucHV0LnBsYWNlaG9sZGVyID0gJ1Byb2plY3QnO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ld1Byb2plY3RJbnB1dFxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfZHVlRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICBkdWVEYXRlLmlkID0gJ2R1ZURhdGUnO1xuICAgIFxuICAgICAgICByZXR1cm4gZHVlRGF0ZVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfZGVzY3JpcHRpb25JbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICBkZXNjcmlwdGlvbi5pZCA9ICdpdGVtRGVzY3JpcHRpb24nO1xuICAgICAgICBkZXNjcmlwdGlvbi5jb2xzID0gJzMwJztcbiAgICAgICAgZGVzY3JpcHRpb24ucm93cyA9ICcxMCc7XG4gICAgICAgIGRlc2NyaXB0aW9uLnBsYWNlaG9sZGVyID0gJ0Rlc2NyaXB0aW9uJztcbiAgICBcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVBZGRCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhZGRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIEl0ZW0nO1xuICAgICAgICBhZGRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgIFxuICAgICAgICByZXR1cm4gYWRkQnV0dG9uXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVJdGVtRnJvbUlucHV0ID0gKCkgPT4ge1xuICAgIFxuICAgICAgICBjb25zdCBpdGVtVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbUlucHV0JykudmFsdWU7XG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0SW5wdXQnKS52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZURhdGUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgaXRlbURlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW1EZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgIFxuICAgICAgICBpbnB1dEZvcm0ucmVzZXQoKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVtKGl0ZW1UaXRsZSwgcHJvamVjdFRpdGxlLCBkdWVEYXRlLCBpdGVtRGVzY3JpcHRpb24sIGZhbHNlLCAndW5rbm93bicpXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9hZGRJdGVtID0gKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBjb25zdCBuZXdJdGVtID0gX2NyZWF0ZUl0ZW1Gcm9tSW5wdXQoKTtcbiAgICBcbiAgICAgICAgaWYgKG5ld0l0ZW0uaXRlbVRpdGxlID09ICcnIHx8IG5ld0l0ZW0ucHJvamVjdFRpdGxlID09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkobmV3SXRlbS5wcm9qZWN0VGl0bGUpKXtcbiAgICAgICAgICAgIG5ld0l0ZW0uaXRlbUlEID0gYCR7bmV3SXRlbS5wcm9qZWN0VGl0bGV9LWArYCR7cHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSkuZ2l2ZUlEKCl9YDtcbiAgICAgICAgICAgIHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpLmFkZEl0ZW0obmV3SXRlbSk7XG4gICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5hZGRUb1Byb2plY3RUaWxlKG5ld0l0ZW0pO1xuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKCFwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkobmV3SXRlbS5wcm9qZWN0VGl0bGUpKXtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0TGlicmFyeS5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICAgICAgbmV3SXRlbS5pdGVtSUQgPSBgJHtuZXdJdGVtLnByb2plY3RUaXRsZX0tYCtgJHtwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKS5naXZlSUQoKX1gO1xuICAgICAgICAgICAgcHJvamVjdC5hZGRJdGVtKG5ld0l0ZW0pO1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9EaXNwbGF5QXJlYShwcm9qZWN0KTtcbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvUHJvamVjdFRpbGUobmV3SXRlbSk7XG4gICAgXG4gICAgICAgICAgICBhZGRQcm9qZWN0QnV0dG9uKHByb2plY3QpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVDbGVhckJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2xlYXJCdXR0b24udGV4dENvbnRlbnQgPSAnQ2xlYXInO1xuICAgICAgICBjbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpbnB1dEZvcm0ucmVzZXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGNsZWFyQnV0dG9uXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVJbnB1dEZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgaW5wdXRGb3JtLmNsYXNzTGlzdC5hZGQoJ25ld0l0ZW1Gb3JtJyk7XG4gICAgICAgIGlucHV0Rm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywnaW5wdXRGb3JtJyk7XG4gICAgICAgIGlucHV0Rm9ybS5vbnN1Ym1pdCA9IF9hZGRJdGVtO1xuICAgIFxuICAgICAgICBjb25zdCBuZXdJdGVtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBuZXdJdGVtSGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBOZXcgSXRlbSdcbiAgICBcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKG5ld0l0ZW1IZWFkZXIpO1xuICAgIFxuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX3RpdGxlSW5wdXQoKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfcHJvamVjdElucHV0KCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX2R1ZURhdGVJbnB1dCgpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9kZXNjcmlwdGlvbklucHV0KCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX2NyZWF0ZUFkZEJ1dHRvbigpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9jcmVhdGVDbGVhckJ1dHRvbigpKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGlucHV0Rm9ybVxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZUlucHV0QmFyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdJdGVtQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld0l0ZW1CYXIuY2xhc3NMaXN0LmFkZCgnbmV3SXRlbUJhcicpO1xuICAgICAgICBuZXdJdGVtQmFyLmFwcGVuZENoaWxkKF9jcmVhdGVJbnB1dEZvcm0oKSk7XG4gICAgXG4gICAgICAgIHJldHVybiBuZXdJdGVtQmFyXG4gICAgfVxuXG4gICAgcmV0dXJuIHtjcmVhdGVJbnB1dEJhcn1cbn0pKCk7XG5cblxuZXhwb3J0IHtjcmVhdGVJbnB1dCwgcHJvamVjdExpYnJhcnl9IiwiaW1wb3J0IHsgbWFuYWdlVmVyYm9zZVByb2plY3QsIG1hbmFnZURpc3BsYXlBcmVhIH0gZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IHsgcHJvamVjdExpYnJhcnkgfSBmcm9tIFwiLi9pbnB1dFwiO1xuXG5jb25zdCBjcmVhdGVTaWRlQmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGVCYXInKTtcblxuICAgIGNvbnN0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBob21lQnV0dG9uLnRleHRDb250ZW50ID0gJ0hvbWUnO1xuICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RMaWJyYXJ5KVxuICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9kYXlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB0b2RheUJ1dHRvbi50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgY29uc3Qgd2Vla0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHdlZWtCdXR0b24udGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJ1xuXG4gICAgc2lkZUJhci5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcbiAgICBzaWRlQmFyLmFwcGVuZENoaWxkKHRvZGF5QnV0dG9uKTtcbiAgICBzaWRlQmFyLmFwcGVuZENoaWxkKHdlZWtCdXR0b24pO1xuICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdEFyZWEoKSk7XG5cbiAgICByZXR1cm4gc2lkZUJhclxufVxuXG5jb25zdCBjcmVhdGVQcm9qZWN0QXJlYSA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0QXJlYUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0QXJlYS5zZXRBdHRyaWJ1dGUoJ2lkJywncHJvamVjdEFyZWEnKTtcblxuICAgIGNvbnN0IHByb2plY3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHByb2plY3RIZWFkaW5nLnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcblxuICAgIHByb2plY3RBcmVhQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RIZWFkaW5nKTtcbiAgICBwcm9qZWN0QXJlYUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0QXJlYSk7XG5cbiAgICByZXR1cm4gcHJvamVjdEFyZWFDb250YWluZXJcbn1cblxuLy8gY29uc3QgcmVzZXRQcm9qZWN0QXJlYSA9ICgpID0+IHtcbi8vICAgICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0QXJlYScpO1xuLy8gICAgIHByb2plY3RBcmVhLmlubmVySFRNTCA9ICcnO1xuLy8gfVxuXG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0QXJlYScpO1xuXG4gICAgY29uc3QgbmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG5ld1Byb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKCdpZCcsYCR7cHJvamVjdC5wcm9qZWN0VGl0bGV9YCsnLWJ1dHRvbicpO1xuICAgIG5ld1Byb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0LnByb2plY3RUaXRsZTtcblxuICAgIG5ld1Byb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLnRhcmdldC5pZC5zbGljZSgwLC03KSk7XG4gICAgICAgIG1hbmFnZVZlcmJvc2VQcm9qZWN0Lm9wZW5WZXJib3NlUHJvamVjdChwcm9qZWN0KTtcbiAgICB9KTtcbiAgICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnV0dG9uKTtcbn1cblxuY29uc3QgcmVtb3ZlUHJvamVjdEJ1dHRvbiA9IChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEFyZWEnKTtcbiAgICBwcm9qZWN0QXJlYS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwcm9qZWN0LnByb2plY3RUaXRsZX1gKyAnLWJ1dHRvbicpKTtcbn1cblxuLy9uZWVkIGEgZnVuY3Rpb24gdG8gcmVuYW1lIGFuZCByZSBJRCB0aGVzZSBcblxuZXhwb3J0IHtjcmVhdGVTaWRlQmFyLCBhZGRQcm9qZWN0QnV0dG9uLCByZW1vdmVQcm9qZWN0QnV0dG9ufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemVXZWJzaXRlIGZyb20gXCIuL2luaXRXZWJzaXRlXCI7XG5cbmluaXRpYWxpemVXZWJzaXRlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9