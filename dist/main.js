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
        const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
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
            const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id);
            project.removeItem(item.itemID);
            if (project.items.length == 0){
                _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.removeProject(project.title);
                _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary)
            }
            manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
        });
    } else if (type == 'verboseItem'){
        trashIcon.addEventListener('click', (e) => {
            const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id);
            project.removeItem(item.itemID);
            if (project.items.length == 0){
                _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.removeProject(project.title);
                manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
                _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary)
            } else {
                manageVerboseProject.openVerboseProject(project);
            }
        })
    } else if (type == 'project'){
        trashIcon.addEventListener('click', (e) => {
            const project = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id);
            _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.removeProject(project.title);
            _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
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
        manageDisplayArea.regenerateDisplayArea(_input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary);
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
                const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
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
        const item = _input__WEBPACK_IMPORTED_MODULE_0__.projectLibrary.getProject(e.composedPath()[2].id).getItem(e.composedPath()[1].id);
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
        itemID = 'unknown',
    ){
        this.title = title
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
        title = 'unknown',
    ){
        this.items = [];
        this.IDAssigner = -1;
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
        this.projects = this.projects.filter((project) => project.title !== projectTitle)
    }
    getProject(projectTitle) {
        return this.projects.find((project) => project.title === projectTitle)
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
    
        if (newItem.title == '' || newItem.projectTitle == '') {
            return
        } else if (projectLibrary.isInProjectLibrary(newItem.projectTitle)){
            newItem.itemID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).giveID()}`;
            projectLibrary.getProject(newItem.projectTitle).addItem(newItem);
            ///
            _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.addToProjectTile(newItem);
            ///
    
        } else if (!projectLibrary.isInProjectLibrary(newItem.projectTitle)){
            const project = new Project(newItem.projectTitle);
            projectLibrary.addProject(project);
            newItem.itemID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).giveID()}`;
            project.addItem(newItem);

            ///
            _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.addToDisplayArea(project);
            _display__WEBPACK_IMPORTED_MODULE_0__.manageDisplayArea.addToProjectTile(newItem);
            ///
    
            _sideBar__WEBPACK_IMPORTED_MODULE_1__.manageSideBar.regenerateProjectArea(projectLibrary)
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
        const weekButton = document.createElement('button');
        weekButton.textContent = 'This Week'
    
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNkRBQXlCO0FBQ3JELFlBQVksNkVBQXVDO0FBQ25ELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxxQkFBcUI7QUFDbkY7O0FBRUEsWUFBWTtBQUNaLENBQUM7OztBQUdEO0FBQ3NCOztBQUV0QixXQUFXOzs7Ozs7VUNuRlg7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044Qzs7QUFFOUMsd0RBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbml0V2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbnB1dC5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zaWRlQmFyLmpzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwcm9qZWN0TGlicmFyeX0gZnJvbSBcIi4vaW5wdXRcIjtcbmltcG9ydCB7bWFuYWdlU2lkZUJhcn0gZnJvbSBcIi4vc2lkZUJhclwiO1xuXG5jb25zdCBjcmVhdGVEaXNwbGF5QXJlYSA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpc3BsYXlBcmVhLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGlzcGxheUFyZWEnKTtcblxuICAgIHJldHVybiBkaXNwbGF5QXJlYVxufVxuXG5jb25zdCBjbGVhckRpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgZGlzcGxheUFyZWEuaW5uZXJIVE1MID0gJyc7XG59XG5cbmNvbnN0IG1hbmFnZURpc3BsYXlBcmVhID0gKCgpID0+IHtcbiAgICBjb25zdCBhZGRUb0Rpc3BsYXlBcmVhID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICAgICAgZGlzcGxheUFyZWEuYXBwZW5kQ2hpbGQoX2NyZWF0ZVByb2plY3RUaWxlKHByb2plY3QpKTtcbiAgICB9XG4gICAgXG4gICAgLy8gY29uc3QgcmVtb3ZlRnJvbURpc3BsYXlBcmVhID0gKHByb2plY3QpID0+IHtcbiAgICAvLyAgICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICAvLyAgICAgZGlzcGxheUFyZWEucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdC5wcm9qZWN0VGl0bGUpKTtcbiAgICAvLyAgICAgbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpXG4gICAgLy8gfVxuICAgIFxuICAgIGNvbnN0IGFkZFRvUHJvamVjdFRpbGUgPSAoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0VGlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0ucHJvamVjdFRpdGxlKTtcbiAgICAgICAgcHJvamVjdFRpbGUuYXBwZW5kQ2hpbGQoX2NyZWF0ZUl0ZW0oaXRlbSkpO1xuICAgIH1cbiAgICBcbiAgICAvLyBjb25zdCByZW1vdmVGcm9tUHJvamVjdFRpbGUgPSAoaXRlbSkgPT4ge1xuICAgIC8vICAgICBjb25zdCBwcm9qZWN0VGlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0ucHJvamVjdFRpdGxlKTtcbiAgICAvLyAgICAgcHJvamVjdFRpbGUucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5pdGVtSUQpKTtcbiAgICBcbiAgICAvLyAgICAgaWYgKHByb2plY3RUaWxlLmNoaWxkTm9kZXMubGVuZ3RoID09IDEpe1xuICAgIC8vICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoaXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgIC8vICAgICAgICAgcmVtb3ZlRnJvbURpc3BsYXlBcmVhKHByb2plY3QpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIFxuICAgIGNvbnN0IF9jcmVhdGVJdGVtID0gKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnaXRlbURpdicpO1xuICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaXRlbS5pdGVtSUQpO1xuXG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVDaGVja0ljb24oKSk7XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShpdGVtKSk7XG4gICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVFZGl0SWNvbigpKTtcbiAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoX2NyZWF0ZVRyYXNoSWNvbignaXRlbScpKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGxpc3RJdGVtXG4gICAgfVxuXG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZVByb2plY3RUaWxlID0gKHByb2plY3QpID0+IHtcbiAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdFRpbGUnKTtcbiAgICAgICAgcHJvamVjdFRpbGUuc2V0QXR0cmlidXRlKCdpZCcsIHByb2plY3QudGl0bGUpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoZWFkZXJEaXYuY2xhc3NMaXN0LmFkZCgnaGVhZGVyRGl2Jyk7XG5cbiAgICAgICAgaGVhZGVyRGl2LmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShwcm9qZWN0KSk7XG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChfY3JlYXRlRWRpdEljb24oKSk7XG4gICAgICAgIGhlYWRlckRpdi5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKCdwcm9qZWN0JykpO1xuICAgIFxuICAgICAgICBwcm9qZWN0VGlsZS5hcHBlbmRDaGlsZChoZWFkZXJEaXYpO1xuICAgIFxuICAgICAgICByZXR1cm4gcHJvamVjdFRpbGVcbiAgICB9XG5cbiAgICBjb25zdCByZWdlbmVyYXRlRGlzcGxheUFyZWEgPSAocHJvamVjdExpYnJhcnkpID0+IHtcbiAgICAgICAgY2xlYXJEaXNwbGF5QXJlYSgpO1xuICAgICAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaWJyYXJ5LnByb2plY3RzKXtcbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvUHJvamVjdFRpbGUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHthZGRUb0Rpc3BsYXlBcmVhLCBhZGRUb1Byb2plY3RUaWxlLCByZWdlbmVyYXRlRGlzcGxheUFyZWF9XG5cbn0pKCk7XG5cbmNvbnN0IG1hbmFnZVZlcmJvc2VQcm9qZWN0ID0gKCgpID0+IHtcbiAgICBjb25zdCBvcGVuVmVyYm9zZVByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBjbGVhckRpc3BsYXlBcmVhKCk7XG5cbiAgICAgICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICBcbiAgICAgICAgY29uc3QgdmVyYm9zZVByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdmVyYm9zZVByb2plY3QuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheScpO1xuICAgICAgICB2ZXJib3NlUHJvamVjdC5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7cHJvamVjdC50aXRsZX1gKTtcblxuICAgICAgICB2ZXJib3NlUHJvamVjdC5hcHBlbmRDaGlsZChfY3JlYXRlVmVyYm9zZUhlYWRlcihwcm9qZWN0KSk7XG5cbiAgICAgICAgZm9yIChsZXQgaXRlbSBvZiBwcm9qZWN0Lml0ZW1zKXtcbiAgICAgICAgICAgIHZlcmJvc2VQcm9qZWN0LmFwcGVuZENoaWxkKF9jcmVhdGVWZXJib3NlSXRlbShpdGVtKSk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGxheUFyZWEuYXBwZW5kQ2hpbGQodmVyYm9zZVByb2plY3QpO1xuICAgIH1cblxuXG4gICAgY29uc3QgX2NyZWF0ZVZlcmJvc2VIZWFkZXIgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJib3NlSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHZlcmJvc2VIZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyRGl2Jyk7XG4gICAgICAgIHZlcmJvc2VIZWFkZXIuYXBwZW5kQ2hpbGQoX2NyZWF0ZVRpdGxlKHByb2plY3QpKTtcbiAgICAgICAgdmVyYm9zZUhlYWRlci5hcHBlbmRDaGlsZChfY3JlYXRlVHJhc2hJY29uKCdwcm9qZWN0JykpO1xuICAgICAgICB2ZXJib3NlSGVhZGVyLmFwcGVuZENoaWxkKF9jcmVhdGVDbG9zZUljb24oKSk7XG5cbiAgICAgICAgcmV0dXJuIHZlcmJvc2VIZWFkZXJcbiAgICB9XG4gICAgXG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZVZlcmJvc2VJdGVtID0gKGl0ZW0pID0+IHsgICAgXG4gICAgICAgIGNvbnN0IHZlcmJvc2VJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHZlcmJvc2VJdGVtLmNsYXNzTGlzdC5hZGQoJ2l0ZW1EaXYnKTtcbiAgICAgICAgdmVyYm9zZUl0ZW0uc2V0QXR0cmlidXRlKCdpZCcsIGAke2l0ZW0uaXRlbUlEfWApO1xuXG4gICAgICAgIC8vIHZlcmJvc2VJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVEZXNjcmlwdGlvbihpdGVtKSk7XG4gICAgICAgIHZlcmJvc2VJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVDaGVja0ljb24oKSk7XG4gICAgICAgIHZlcmJvc2VJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVUaXRsZShpdGVtKSk7XG4gICAgICAgIHZlcmJvc2VJdGVtLmFwcGVuZENoaWxkKF9jcmVhdGVEdWVEYXRlKGl0ZW0pKTtcbiAgICAgICAgdmVyYm9zZUl0ZW0uYXBwZW5kQ2hpbGQoX2NyZWF0ZVRyYXNoSWNvbigndmVyYm9zZUl0ZW0nKSk7XG5cbiAgICAgICAgcmV0dXJuIHZlcmJvc2VJdGVtXG4gICAgfVxuXG4gICAgcmV0dXJuIHtvcGVuVmVyYm9zZVByb2plY3R9XG59KSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBpY29ucyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3QgX2NyZWF0ZUNoZWNrSWNvbiA9ICgpID0+IHtcbiAgICBjb25zdCBjaGVja2JveEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBjaGVja2JveEljb24uc3JjID0gJy4uL2Rpc3QvaWNvbnMvY2hlY2tib3gtYmxhbmstb3V0bGluZS5zdmcnO1xuICAgIGNoZWNrYm94SWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgY2hlY2tib3hJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVsyXS5pZCkuZ2V0SXRlbShlLmNvbXBvc2VkUGF0aCgpWzFdLmlkKTtcbiAgICAgICAgY29uc3QgaW1nID0gZS5jb21wb3NlZFBhdGgoKVswXTtcbiAgICAgICAgX3RvZ2dsZUNvbXBsZXRlKGl0ZW0sIGltZylcbiAgICB9KTtcbiAgICByZXR1cm4gY2hlY2tib3hJY29uXG59XG5cbmNvbnN0IF90b2dnbGVDb21wbGV0ZSA9IChpdGVtLCBpbWcpID0+IHtcbiAgICBjb25zdCBpdGVtRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5pdGVtSUQpO1xuICAgIGlmICghaXRlbS5pdGVtQ29tcGxldGlvbil7XG4gICAgICAgIGl0ZW1EaXYuY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XG4gICAgICAgIGltZy5zcmMgPSBcIi4uL2Rpc3QvaWNvbnMvY2hlY2tib3gtb3V0bGluZS5zdmdcIjtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uaXRlbUNvbXBsZXRpb24pIHtcbiAgICAgICAgaXRlbURpdi5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgaW1nLnNyYyA9ICAnLi4vZGlzdC9pY29ucy9jaGVja2JveC1ibGFuay1vdXRsaW5lLnN2Zyc7XG4gICAgfVxuICAgIGl0ZW0uaXRlbUNvbXBsZXRpb24gPSAhaXRlbS5pdGVtQ29tcGxldGlvbjtcbn1cblxuY29uc3QgX2NyZWF0ZVRyYXNoSWNvbiA9ICh0eXBlKSA9PiB7XG4gICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgdHJhc2hJY29uLnNyYyA9ICcuLi9kaXN0L2ljb25zL3RyYXNoLWNhbi1vdXRsaW5lLnN2Zyc7XG4gICAgdHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcblxuICAgIGlmICh0eXBlID09ICdpdGVtJyl7XG4gICAgICAgIHRyYXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLmNvbXBvc2VkUGF0aCgpWzJdLmlkKS5nZXRJdGVtKGUuY29tcG9zZWRQYXRoKClbMV0uaWQpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVsyXS5pZCk7XG4gICAgICAgICAgICBwcm9qZWN0LnJlbW92ZUl0ZW0oaXRlbS5pdGVtSUQpO1xuICAgICAgICAgICAgaWYgKHByb2plY3QuaXRlbXMubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgIHByb2plY3RMaWJyYXJ5LnJlbW92ZVByb2plY3QocHJvamVjdC50aXRsZSk7XG4gICAgICAgICAgICAgICAgbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3ZlcmJvc2VJdGVtJyl7XG4gICAgICAgIHRyYXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChlLmNvbXBvc2VkUGF0aCgpWzJdLmlkKS5nZXRJdGVtKGUuY29tcG9zZWRQYXRoKClbMV0uaWQpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVsyXS5pZCk7XG4gICAgICAgICAgICBwcm9qZWN0LnJlbW92ZUl0ZW0oaXRlbS5pdGVtSUQpO1xuICAgICAgICAgICAgaWYgKHByb2plY3QuaXRlbXMubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgIHByb2plY3RMaWJyYXJ5LnJlbW92ZVByb2plY3QocHJvamVjdC50aXRsZSk7XG4gICAgICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgICAgICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFuYWdlVmVyYm9zZVByb2plY3Qub3BlblZlcmJvc2VQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PSAncHJvamVjdCcpe1xuICAgICAgICB0cmFzaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVsyXS5pZCk7XG4gICAgICAgICAgICBwcm9qZWN0TGlicmFyeS5yZW1vdmVQcm9qZWN0KHByb2plY3QudGl0bGUpO1xuICAgICAgICAgICAgbWFuYWdlU2lkZUJhci5yZWdlbmVyYXRlUHJvamVjdEFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRyYXNoSWNvblxufVxuXG5jb25zdCBfY3JlYXRlRWRpdEljb24gPSAoKSA9PiB7XG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgZWRpdEljb24uc3JjID0gJy4uL2Rpc3QvaWNvbnMvdGV4dC1ib3gtZWRpdC1vdXRsaW5lLnN2Zyc7XG4gICAgZWRpdEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAvLyBvcGVuIGEgdmVyYm9zZSBpdGVtIG1vZGFsIFxuICAgICAgICAvLyBnZXQgaXRlbSBpZFxuICAgICAgICAvLyBvcGVuIG1vZGFsXG4gICAgICAgIC8vIG9ubHkgY2FsbCBmcm9tIG1haW4gZGlzcGxheSBcblxuICAgICAgICAvL2NvdWxkIGhhdmUgaXQgZm9jdXMgaW4gb24gdGhlIHByb2plY3QgdGl0bGUgb3IgY291bGQgaGF2ZSBpdCBvcGVuIHRoZSBwcm9qZWN0IHdpbmRvdyBvciBjb3VsZCByZW1vdmUgaXRcbiAgICAgICAgLy8gZnJvbSB0aGUgcHJvamVjdCBoZWFkZXIgZW50aXJlbHkgc2luY2UgaXQgaXNudCByZWFsbHkgbmVlZGVkIFxuICAgIH0pXG4gICAgcmV0dXJuIGVkaXRJY29uXG59O1xuXG5jb25zdCBfY3JlYXRlQ2xvc2VJY29uID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGNsb3NlSWNvbi5zcmMgPSBcIi4uL2Rpc3QvaWNvbnMvY2xvc2Uuc3ZnXCI7XG4gICAgY2xvc2VJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICBjbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcbiAgICAgICAgLy9wcm9iYWJseSB3aWxsIG5lZWQgdG8gYWNjZXB0IGEgdHlwZSBpbiBoZXJlIFxuICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5yZWdlbmVyYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkpO1xuICAgIH0pXG4gICAgcmV0dXJuIGNsb3NlSWNvblxufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gaW5wdXQgZmllbGRzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3QgX2NyZWF0ZVRpdGxlID0gKG9iaikgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd2ZXJib3NlJyk7XG5cbiAgICB0aXRsZS50eXBlID0gJ3RleHQnO1xuICAgIHRpdGxlLnZhbHVlID0gYCR7b2JqLnRpdGxlfWA7XG4gICAgdGl0bGUuc2l6ZSA9ICh0aXRsZS52YWx1ZS5sZW5ndGgpKzM7XG4gICAgdGl0bGUucmVhZE9ubHkgPSB0cnVlO1xuICAgIGlmIChvYmoudHlwZSA9PSAnaXRlbScpe1xuICAgICAgICB0aXRsZS5pZCA9IG9iai50aXRsZTtcbiAgICB9XG5cbiAgICB0aXRsZS5vbmlucHV0ID0gKCkgPT4ge1xuICAgICAgICBpZiAodGl0bGUudmFsdWUubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGl0bGUuc2l6ZSA9ICh0aXRsZS52YWx1ZS5sZW5ndGgpKzM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aXRsZS5vbmRibGNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSBmYWxzZTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZm9jdXNlZCcpO1xuICAgIH07XG5cbiAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImZvY3VzZWRcIik7XG4gICAgICAgIHRpdGxlLnNpemUgPSAodGl0bGUudmFsdWUubGVuZ3RoKSszO1xuICAgIH0pO1xuXG4gICAgaWYgKG9iai50eXBlID09ICdpdGVtJyl7XG4gICAgICAgIHRpdGxlLm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gZS50YXJnZXQuaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVsyXS5pZCkuZ2V0SXRlbShlLmNvbXBvc2VkUGF0aCgpWzFdLmlkKTtcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuaWQgPSBuZXdUaXRsZTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChvYmoudHlwZSA9PSAncHJvamVjdCcpe1xuICAgICAgICB0aXRsZS5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gJycpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9IGUuY29tcG9zZWRQYXRoKClbMl0uaWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RpdGxlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS5jb21wb3NlZFBhdGgoKVsyXS5pZCk7XG4gICAgICAgICAgICAgICAgX3VwZGF0ZVByb2plY3QobmV3VGl0bGUsIHByb2plY3QpO1xuICAgICAgICAgICAgICAgIG1hbmFnZVNpZGVCYXIucmVnZW5lcmF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5KVxuICAgICAgICAgICAgfSBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGl0bGVcbn07XG5cbmNvbnN0IF9jcmVhdGVEdWVEYXRlID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBkdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgZHVlRGF0ZS52YWx1ZSA9IGl0ZW0uaXRlbUR1ZURhdGU7XG4gICAgZHVlRGF0ZS5yZWFkT25seSA9IHRydWU7XG5cbiAgICBkdWVEYXRlLm9uZGJsY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICBlLnRhcmdldC5yZWFkT25seSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBkdWVEYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgICAgZS50YXJnZXQucmVhZE9ubHkgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgZHVlRGF0ZS5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KGUuY29tcG9zZWRQYXRoKClbMl0uaWQpLmdldEl0ZW0oZS5jb21wb3NlZFBhdGgoKVsxXS5pZCk7XG4gICAgICAgIGl0ZW0uaXRlbUR1ZURhdGUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGR1ZURhdGVcbn07XG5cbmNvbnN0IF9jcmVhdGVEZXNjcmlwdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBpdGVtRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIC8vIGl0ZW1EZXNjcmlwdGlvbi5pZCA9ICdpdGVtRGVzY3JpcHRpb24nO1xuICAgIGl0ZW1EZXNjcmlwdGlvbi5jb2xzID0gJzMwJztcbiAgICBpdGVtRGVzY3JpcHRpb24ucm93cyA9ICcxMCc7XG4gICAgaXRlbURlc2NyaXB0aW9uLnZhbHVlID0gaXRlbS5pdGVtRGVzY3JpcHRpb247XG4gICAgaXRlbURlc2NyaXB0aW9uLnJlYWRPbmx5ID0gdHJ1ZTtcblxuICAgIHJldHVybiBpdGVtRGVzY3JpcHRpb25cbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3QgX3VwZGF0ZVByb2plY3QgPSAobmV3VGl0bGUsIHByb2plY3QpID0+IHtcbiAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICBjb25zdCBpdGVtRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5pdGVtSUQpO1xuICAgICAgICBpdGVtLml0ZW1JRCA9IGAke25ld1RpdGxlfS1gICsgYCR7cHJvamVjdC5naXZlSUQoKX1gO1xuICAgICAgICBpdGVtRGl2LmlkID0gaXRlbS5pdGVtSUQ7XG4gICAgICAgIGl0ZW0ucHJvamVjdFRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuICAgIGNvbnN0IHByb2plY3REaXNwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdC50aXRsZSk7XG4gICAgcHJvamVjdC50aXRsZSA9IG5ld1RpdGxlO1xuICAgIHByb2plY3REaXNwLmlkID0gcHJvamVjdC50aXRsZTtcbn07XG5cbi8vIGNvbnN0IF91cGRhdGVJdGVtID0gKG5ld1RpdGxlLCBpdGVtKSA9PiB7XG4vLyAgICAgaXRlbS5wcm9qZWN0VGl0bGUgPSBuZXdUaXRsZTtcbi8vIH07XG5cbmV4cG9ydCB7Y3JlYXRlRGlzcGxheUFyZWEsIG1hbmFnZVZlcmJvc2VQcm9qZWN0LCBtYW5hZ2VEaXNwbGF5QXJlYX0iLCJjb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyQmFyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicpO1xuXG4gICAgaGVhZGVyQmFyLnRleHRDb250ZW50ID0gXCJUby1Eb1wiXG4gICAgXG4gICAgcmV0dXJuIGhlYWRlckJhclxufVxuXG5leHBvcnQge2NyZWF0ZUhlYWRlcn0iLCJpbXBvcnQge2NyZWF0ZUhlYWRlcn0gZnJvbSBcIi4vaGVhZGVyXCI7XG5pbXBvcnQge21hbmFnZVNpZGVCYXJ9IGZyb20gXCIuL3NpZGVCYXJcIjtcbmltcG9ydCB7Y3JlYXRlRGlzcGxheUFyZWF9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7Y3JlYXRlSW5wdXR9IGZyb20gXCIuL2lucHV0XCI7XG5cblxuLy9vbmNlIGkgYWRkIGxvZyBpbiBpbmZvcm1hdGlvbiBpIHNob3VsZCBtYWtlIGFub3RoZXIganMgc2NyaXB0IGZvciBtYWtpbmcgdGhlIGhlYWRlciBcblxuXG5cbmNvbnN0IGluaXRpYWxpemVXZWJzaXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1hbmFnZVNpZGVCYXIuY3JlYXRlU2lkZUJhcigpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRGlzcGxheUFyZWEoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0LmNyZWF0ZUlucHV0QmFyKCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplV2Vic2l0ZTsiLCJpbXBvcnQge21hbmFnZURpc3BsYXlBcmVhfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQge21hbmFnZVNpZGVCYXJ9IGZyb20gXCIuL3NpZGVCYXJcIjtcblxuY2xhc3MgSXRlbSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHRpdGxlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIHByb2plY3RUaXRsZSA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtRHVlRGF0ZSA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtRGVzY3JpcHRpb24gPSBcInVua25vd25cIixcbiAgICAgICAgaXRlbUNvbXBsZXRpb24gPSAndW5rbm93bicsXG4gICAgICAgIGl0ZW1JRCA9ICd1bmtub3duJyxcbiAgICApe1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGVcbiAgICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGVcbiAgICAgICAgdGhpcy5pdGVtRHVlRGF0ZSA9IGl0ZW1EdWVEYXRlXG4gICAgICAgIHRoaXMuaXRlbURlc2NyaXB0aW9uID0gaXRlbURlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMuaXRlbUNvbXBsZXRpb24gPSBpdGVtQ29tcGxldGlvblxuICAgICAgICB0aGlzLml0ZW1JRCA9IGl0ZW1JRFxuICAgICAgICB0aGlzLnR5cGUgPSAnaXRlbSdcbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKCAgICAgICAgXG4gICAgICAgIHRpdGxlID0gJ3Vua25vd24nLFxuICAgICl7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5JREFzc2lnbmVyID0gLTE7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy50eXBlID0gJ3Byb2plY3QnO1xuICAgIH1cbiAgICBnaXZlSUQoKSB7XG4gICAgICAgIHRoaXMuSURBc3NpZ25lciArPTE7XG4gICAgICAgIHJldHVybiB0aGlzLklEQXNzaWduZXJcbiAgICB9XG4gICAgYWRkSXRlbShuZXdJdGVtKSB7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXdJdGVtKVxuICAgIH1cbiAgICByZW1vdmVJdGVtKGl0ZW1JRCkge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaXRlbUlEICE9PSBpdGVtSUQpXG4gICAgfVxuICAgIGdldEl0ZW0oaXRlbUlEKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaXRlbUlEID09PSBpdGVtSUQpO1xuICAgIH1cbn1cblxuY2xhc3MgUHJvamVjdExpYnJhcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb2plY3RzID0gW11cbiAgICB9XG4gICAgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0luUHJvamVjdExpYnJhcnkobmV3UHJvamVjdCkpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlUHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlICE9PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxuICAgIGdldFByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QudGl0bGUgPT09IHByb2plY3RUaXRsZSlcbiAgICB9XG4gICAgaXNJblByb2plY3RMaWJyYXJ5KHByb2plY3RUaXRsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LnRpdGxlID09PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0TGlicmFyeSA9IG5ldyBQcm9qZWN0TGlicmFyeSgpXG5cblxuY29uc3QgY3JlYXRlSW5wdXQgPSAoKCkgPT4ge1xuXG4gICAgY29uc3QgX3RpdGxlSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0l0ZW1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgICAgbmV3SXRlbUlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgbmV3SXRlbUlucHV0LmlkID0gJ2l0ZW1JbnB1dCc7XG4gICAgICAgIG5ld0l0ZW1JbnB1dC5wbGFjZWhvbGRlciA9ICdUaXRsZSc7XG4gICAgXG4gICAgICAgIHJldHVybiBuZXdJdGVtSW5wdXRcbiAgICB9XG4gICAgXG4gICAgY29uc3QgX3Byb2plY3RJbnB1dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgbmV3UHJvamVjdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIG5ld1Byb2plY3RJbnB1dC5pZCA9ICdwcm9qZWN0SW5wdXQnO1xuICAgICAgICBuZXdQcm9qZWN0SW5wdXQucGxhY2Vob2xkZXIgPSAnUHJvamVjdCc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3UHJvamVjdElucHV0XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9kdWVEYXRlSW5wdXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBkdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIGR1ZURhdGUuaWQgPSAnZHVlRGF0ZSc7XG4gICAgXG4gICAgICAgIHJldHVybiBkdWVEYXRlXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9kZXNjcmlwdGlvbklucHV0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgICAgIGRlc2NyaXB0aW9uLmlkID0gJ2l0ZW1EZXNjcmlwdGlvbic7XG4gICAgICAgIGRlc2NyaXB0aW9uLmNvbHMgPSAnMzAnO1xuICAgICAgICBkZXNjcmlwdGlvbi5yb3dzID0gJzEwJztcbiAgICAgICAgZGVzY3JpcHRpb24ucGxhY2Vob2xkZXIgPSAnRGVzY3JpcHRpb24nO1xuICAgIFxuICAgICAgICByZXR1cm4gZGVzY3JpcHRpb25cbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUFkZEJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgSXRlbSc7XG4gICAgICAgIGFkZEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgXG4gICAgICAgIHJldHVybiBhZGRCdXR0b25cbiAgICB9XG4gICAgXG4gICAgY29uc3QgX2NyZWF0ZUl0ZW1Gcm9tSW5wdXQgPSAoKSA9PiB7XG4gICAgXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW1JbnB1dCcpLnZhbHVlO1xuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdElucHV0JykudmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdWVEYXRlJykudmFsdWU7XG4gICAgICAgIGNvbnN0IGl0ZW1EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtRGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICBcbiAgICAgICAgaW5wdXRGb3JtLnJlc2V0KCk7XG4gICAgXG4gICAgICAgIHJldHVybiBuZXcgSXRlbSh0aXRsZSwgcHJvamVjdFRpdGxlLCBkdWVEYXRlLCBpdGVtRGVzY3JpcHRpb24sIGZhbHNlLCAndW5rbm93bicpXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9hZGRJdGVtID0gKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgICAgICBjb25zdCBuZXdJdGVtID0gX2NyZWF0ZUl0ZW1Gcm9tSW5wdXQoKTtcbiAgICBcbiAgICAgICAgaWYgKG5ld0l0ZW0udGl0bGUgPT0gJycgfHwgbmV3SXRlbS5wcm9qZWN0VGl0bGUgPT0gJycpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RMaWJyYXJ5LmlzSW5Qcm9qZWN0TGlicmFyeShuZXdJdGVtLnByb2plY3RUaXRsZSkpe1xuICAgICAgICAgICAgbmV3SXRlbS5pdGVtSUQgPSBgJHtuZXdJdGVtLnByb2plY3RUaXRsZX0tYCtgJHtwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKS5naXZlSUQoKX1gO1xuICAgICAgICAgICAgcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSkuYWRkSXRlbShuZXdJdGVtKTtcbiAgICAgICAgICAgIC8vL1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEuYWRkVG9Qcm9qZWN0VGlsZShuZXdJdGVtKTtcbiAgICAgICAgICAgIC8vL1xuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKCFwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkobmV3SXRlbS5wcm9qZWN0VGl0bGUpKXtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0TGlicmFyeS5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICAgICAgbmV3SXRlbS5pdGVtSUQgPSBgJHtuZXdJdGVtLnByb2plY3RUaXRsZX0tYCtgJHtwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKS5naXZlSUQoKX1gO1xuICAgICAgICAgICAgcHJvamVjdC5hZGRJdGVtKG5ld0l0ZW0pO1xuXG4gICAgICAgICAgICAvLy9cbiAgICAgICAgICAgIG1hbmFnZURpc3BsYXlBcmVhLmFkZFRvRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgICAgICAgICBtYW5hZ2VEaXNwbGF5QXJlYS5hZGRUb1Byb2plY3RUaWxlKG5ld0l0ZW0pO1xuICAgICAgICAgICAgLy8vXG4gICAgXG4gICAgICAgICAgICBtYW5hZ2VTaWRlQmFyLnJlZ2VuZXJhdGVQcm9qZWN0QXJlYShwcm9qZWN0TGlicmFyeSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfY3JlYXRlQ2xlYXJCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNsZWFyQnV0dG9uLnRleHRDb250ZW50ID0gJ0NsZWFyJztcbiAgICAgICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaW5wdXRGb3JtLnJlc2V0KCk7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjbGVhckJ1dHRvblxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfY3JlYXRlSW5wdXRGb3JtID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIGlucHV0Rm9ybS5jbGFzc0xpc3QuYWRkKCduZXdJdGVtRm9ybScpO1xuICAgICAgICBpbnB1dEZvcm0uc2V0QXR0cmlidXRlKCdpZCcsJ2lucHV0Rm9ybScpO1xuICAgICAgICBpbnB1dEZvcm0ub25zdWJtaXQgPSBfYWRkSXRlbTtcbiAgICBcbiAgICAgICAgY29uc3QgbmV3SXRlbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbmV3SXRlbUhlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgTmV3IEl0ZW0nXG4gICAgXG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChuZXdJdGVtSGVhZGVyKTtcbiAgICBcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF90aXRsZUlucHV0KCkpO1xuICAgICAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoX3Byb2plY3RJbnB1dCgpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9kdWVEYXRlSW5wdXQoKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfZGVzY3JpcHRpb25JbnB1dCgpKTtcbiAgICAgICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKF9jcmVhdGVBZGRCdXR0b24oKSk7XG4gICAgICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChfY3JlYXRlQ2xlYXJCdXR0b24oKSk7XG4gICAgXG4gICAgICAgIHJldHVybiBpbnB1dEZvcm1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVJbnB1dEJhciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXdJdGVtQmFyLmNsYXNzTGlzdC5hZGQoJ25ld0l0ZW1CYXInKTtcbiAgICAgICAgbmV3SXRlbUJhci5hcHBlbmRDaGlsZChfY3JlYXRlSW5wdXRGb3JtKCkpO1xuICAgIFxuICAgICAgICByZXR1cm4gbmV3SXRlbUJhclxuICAgIH1cblxuICAgIHJldHVybiB7Y3JlYXRlSW5wdXRCYXJ9XG59KSgpO1xuXG5cbmV4cG9ydCB7Y3JlYXRlSW5wdXQsIHByb2plY3RMaWJyYXJ5fSIsImltcG9ydCB7IG1hbmFnZVZlcmJvc2VQcm9qZWN0LCBtYW5hZ2VEaXNwbGF5QXJlYSB9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCB7IHByb2plY3RMaWJyYXJ5IH0gZnJvbSBcIi4vaW5wdXRcIjtcblxuY29uc3QgbWFuYWdlU2lkZUJhciA9ICgoKSA9PiB7XG4gICAgY29uc3QgY3JlYXRlU2lkZUJhciA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGVCYXInKTtcbiAgICBcbiAgICAgICAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBob21lQnV0dG9uLnRleHRDb250ZW50ID0gJ0hvbWUnO1xuICAgICAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgbWFuYWdlRGlzcGxheUFyZWEucmVnZW5lcmF0ZURpc3BsYXlBcmVhKHByb2plY3RMaWJyYXJ5KTtcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHRvZGF5QnV0dG9uLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICAgICAgY29uc3Qgd2Vla0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB3ZWVrQnV0dG9uLnRleHRDb250ZW50ID0gJ1RoaXMgV2VlaydcbiAgICBcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcbiAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZCh0b2RheUJ1dHRvbik7XG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQod2Vla0J1dHRvbik7XG4gICAgICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoX2NyZWF0ZVByb2plY3RBcmVhKCkpO1xuICAgIFxuICAgICAgICByZXR1cm4gc2lkZUJhclxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfY3JlYXRlUHJvamVjdEFyZWEgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RBcmVhQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgXG4gICAgICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3RBcmVhLnNldEF0dHJpYnV0ZSgnaWQnLCdwcm9qZWN0QXJlYScpO1xuICAgIFxuICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgcHJvamVjdEhlYWRpbmcudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuICAgIFxuICAgICAgICBwcm9qZWN0QXJlYUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGluZyk7XG4gICAgICAgIHByb2plY3RBcmVhQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RBcmVhKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIHByb2plY3RBcmVhQ29udGFpbmVyXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IF9yZXNldFByb2plY3RBcmVhID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0QXJlYScpO1xuICAgICAgICBwcm9qZWN0QXJlYS5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gICAgXG4gICAgY29uc3QgcmVnZW5lcmF0ZVByb2plY3RBcmVhID0gKHByb2plY3RMaWJyYXJ5KSA9PiB7XG4gICAgICAgIF9yZXNldFByb2plY3RBcmVhKCk7XG4gICAgICAgIC8vIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvamVjdEFyZWEnKTsgXG4gICAgICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpYnJhcnkucHJvamVjdHMpe1xuICAgICAgICAgICAgX2FkZFByb2plY3RCdXR0b24ocHJvamVjdClcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBfYWRkUHJvamVjdEJ1dHRvbiA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RBcmVhJyk7XG4gICAgXG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJyxgJHtwcm9qZWN0LnRpdGxlfWArJy1idXR0b24nKTtcbiAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG4gICAgXG4gICAgICAgIG5ld1Byb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QoZS50YXJnZXQuaWQuc2xpY2UoMCwtNykpO1xuICAgICAgICAgICAgbWFuYWdlVmVyYm9zZVByb2plY3Qub3BlblZlcmJvc2VQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ1dHRvbik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1Byb2plY3RCdXR0b24pXG4gICAgICAgIC8vIHJldHVybiAobmV3UHJvamVjdEJ1dHRvbilcbiAgICB9XG4gICAgXG4gICAgLy8gY29uc3QgcmVtb3ZlUHJvamVjdEJ1dHRvbiA9IChwcm9qZWN0KSA9PiB7XG4gICAgLy8gICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RBcmVhJyk7XG4gICAgLy8gICAgIHByb2plY3RBcmVhLnJlbW92ZUNoaWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Byb2plY3QucHJvamVjdFRpdGxlfWArICctYnV0dG9uJykpO1xuICAgIC8vIH1cblxuICAgIHJldHVybiB7Y3JlYXRlU2lkZUJhciwgcmVnZW5lcmF0ZVByb2plY3RBcmVhfVxufSkoKTtcblxuXG4vL25lZWQgYSBmdW5jdGlvbiB0byByZW5hbWUgYW5kIHJlIElEIHRoZXNlIFxuZXhwb3J0IHttYW5hZ2VTaWRlQmFyfVxuXG4vLyBleHBvcnQge2NyZWF0ZVNpZGVCYXIsIGFkZFByb2plY3RCdXR0b24sIHJlbW92ZVByb2plY3RCdXR0b259IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaW5pdGlhbGl6ZVdlYnNpdGUgZnJvbSBcIi4vaW5pdFdlYnNpdGVcIjtcblxuaW5pdGlhbGl6ZVdlYnNpdGUoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=