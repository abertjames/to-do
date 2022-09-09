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
/* harmony export */   "addToDisplayArea": () => (/* binding */ addToDisplayArea),
/* harmony export */   "addToProjectTile": () => (/* binding */ addToProjectTile),
/* harmony export */   "createDisplayArea": () => (/* binding */ createDisplayArea)
/* harmony export */ });
const createDisplayArea = () => {
    const displayArea = document.createElement('div');
    displayArea.setAttribute('id', 'displayArea');

    return displayArea
}

// const resetDisplayArea = () => {
//     const displayArea = document.getElementById('displayArea');
//     displayArea.innerHTML = '';
// }

// const updateDisplayArea = (projectLibrary) => {
//     resetDisplayArea();
//     const displayArea = document.getElementById('displayArea');

//     for (let project of projectLibrary) {
//         displayArea.appendChild(createProjectTile(project));
//     }
// }

////////
const addToDisplayArea = (project) => {
    const displayArea = document.getElementById('displayArea');
    displayArea.appendChild(createProjectTile(project));
}

const removeFromDisplayArea = (project) => {
    const displayArea = document.getElementById('displayArea');
    displayArea.removeChild(document.getElementById(project.projectTitle));
}

const addToProjectTile = (item) => {
    const projectTile = document.getElementById(item.projectTitle);
    projectTile.appendChild(createItem(item));
}

const removeFromProjectTile = (item) => {
    const projectTile = document.getElementById(item.projectTitle);
    //get index of the item here. or give it an id of index - project name something 
    projectTile.removeChild(document.getElementById())
}


// const resetProjectTile = (project) => {
//     const itemList = document.getElementById(project.projectTitle);
//     itemList.innerHTML = '';
// }

// const updateProjectTile = (project) => {
//     resetProjectTile(project);
//     const itemList = document.getElementById(project.projectTitle);

//     for (let item of project.items){
//         const listItem = document.createElement('li');
//         listItem.textContent = item.itemTitle;
//         itemList.appendChild(listItem);
//     }

// }

// const createLineItem = (project) => {
//     const itemList = document.createElement('div');
//     itemList.classList.add('list');
//     itemList.setAttribute('id', project.projectTitle);

//     for (let item of project.items){
//         const listItem = document.createElement('li');

//         const checkboxIcon = document.createElement('img');
//         const editIcon = document.createElement('img');
//         const trashIcon = document.createElement('img');
//         checkboxIcon.classList.add('icon');
//         editIcon.classList.add('icon');
//         trashIcon.classList.add('icon');
//         editIcon.src = '../dist/icons/text-box-edit-outline.svg';
//         trashIcon.src = '../dist/icons/trash-can-outline.svg';

//         if (!item.itemCompletion){
//             checkboxIcon.src = '../dist/icons/checkbox-blank-outline.svg';
//         } else {
//             checkboxIcon.src = '../dist/icons/checkbox-outline.svg';
//         }

//         listItem.appendChild(checkboxIcon);
//         const itemName = document.createElement('span');
//         itemName.textContent = item.itemTitle;
//         listItem.appendChild(itemName);
//         listItem.appendChild(editIcon);
//         listItem.appendChild(trashIcon);
//         itemList.appendChild(listItem);
//     }
// }

const createItem = (item) => {
    const listItem = document.createElement('div');
    listItem.classList.add('itemDiv');
    listItem.setAttribute('id', item.itemID)

    const checkboxIcon = document.createElement('img');
    const editIcon = document.createElement('img');
    const trashIcon = document.createElement('img');
    checkboxIcon.classList.add('icon');
    editIcon.classList.add('icon');
    trashIcon.classList.add('icon');
    editIcon.src = '../dist/icons/text-box-edit-outline.svg';
    trashIcon.src = '../dist/icons/trash-can-outline.svg';

    checkboxIcon.src = '../dist/icons/checkbox-blank-outline.svg';

    listItem.appendChild(checkboxIcon);
    const itemName = document.createElement('span');
    itemName.textContent = item.itemTitle;
    listItem.appendChild(itemName);
    listItem.appendChild(editIcon);
    listItem.appendChild(trashIcon);

    return listItem
}

const createProjectTile = (project) => {

    const projectTile = document.createElement('div');
    projectTile.classList.add('projectTile');
    projectTile.setAttribute('id', project.projectTitle);

    const projectHeader = document.createElement('h3');
    projectHeader.textContent = project.projectTitle;
    projectHeader.classList.add("projectHeader")

    projectTile.appendChild(projectHeader);

    return projectTile
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
    container.appendChild((0,_input__WEBPACK_IMPORTED_MODULE_3__["default"])());

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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sideBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sideBar */ "./src/sideBar.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ "./src/display.js");



class Item {
    constructor(
        itemTitle = "unknown",
        projectTitle = "unknown",
        itemDueDate = "unknown",
        itemDescription = "unknown",
        itemCompletion = 'unknown',
        itemID = 'unknown'
    ){
        this.itemTitle = itemTitle
        this.projectTitle = projectTitle
        this.itemDueDate = itemDueDate
        this.itemDescription = itemDescription
        this.itemCompletion = itemCompletion
        this.itemID = itemID
    }
}

class Project {
    constructor(        
        projectTitle = 'unknown'
    ){
        this.items = [];
        this.projectTitle = projectTitle;
    }
    addItem(newItem) {
        if (!this.isInProject(newItem)) {
            // might not even want to check if another item by the same name exist because you could want
            // to do the same task multiple times 
        this.items.push(newItem)
        }
        // this.items.push(newItem)
    }
  
    removeItem(itemTitle) {
        this.items = this.items.filter((item) => item.itemTitle !== itemTitle)
    }
  
    getItem(itemTitle) {
        return this.items.find((item) => item.itemTitle === itemTitle)
    }
  
    isInProject(newItem) {
        return this.items.some((item) => item.itemTitle === newItem.itemTitle)
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

const createInputBar = () => {
    const newItemBar = document.createElement('div');
    newItemBar.classList.add('newItemBar');

    newItemBar.appendChild(createInputForm());
    return newItemBar
}

const titleInput = () => {
    const newItemInput = document.createElement('input')
    newItemInput.type = "text";
    newItemInput.name = 'itemTitle';
    newItemInput.id = 'itemTitle';
    newItemInput.placeholder = 'Title';

    return newItemInput
}

const projectInput = () => {
    const newProjectInput = document.createElement('input');
    newProjectInput.type = 'text';
    newProjectInput.name = 'projectTitle';
    newProjectInput.id = 'projectTitle';
    newProjectInput.placeholder = 'Project';
    
    return newProjectInput
}

const dueDateInput = () => {
    const dueDate = document.createElement('input');
    dueDate.type = 'date';
    dueDate.name = 'dueDate';
    dueDate.id = 'dueDate';

    return dueDate
}

const descriptionInput = () => {
    const description = document.createElement('textarea');
    description.name = 'itemDescription';
    description.id = 'itemDescription';
    description.cols = '30';
    description.rows = '10';
    description.placeholder = 'Description';

    return description
}

const createAddButton = () => {
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Item';
    addButton.type = 'submit';
    return addButton
}

const createItemFromInput = () => {

    const itemTitle = document.getElementById('itemTitle').value;
    const projectTitle = document.getElementById('projectTitle').value.toUpperCase();
    const dueDate = document.getElementById('dueDate').value;
    const itemDescription = document.getElementById('itemDescription').value;

    inputForm.reset();

    return new Item(itemTitle, projectTitle, dueDate, itemDescription, false, 'unknown')
}

// const getItemID = (projectTitle) => {
//     itemID = `${projectTitle}`+`-${projectLibrary.getProject(projectTitle).items.length}`;
//     console.log(newItem.itemID);
//     console.log(`${projectTitle}`+`-${projectLibrary.getProject(projectTitle).items.length}`);
//     return itemID
// }

const addItem = (e) => {
    e.preventDefault();

    const newItem = createItemFromInput();

    if (newItem.itemTitle == '' || newItem.projectTitle == '') {
        return
    } else if (projectLibrary.isInProjectLibrary(newItem.projectTitle)){
        newItem.itemID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).items.length}`;
        projectLibrary.getProject(newItem.projectTitle).addItem(newItem);
        (0,_display__WEBPACK_IMPORTED_MODULE_1__.addToProjectTile)(newItem);

    } else if (!projectLibrary.isInProjectLibrary(newItem.projectTitle)){
        const project = new Project(newItem.projectTitle);
        projectLibrary.addProject(project);
        newItem.itemID = `${newItem.projectTitle}-`+`${projectLibrary.getProject(newItem.projectTitle).items.length}`;
        project.addItem(newItem)
        
        ;(0,_display__WEBPACK_IMPORTED_MODULE_1__.addToDisplayArea)(project);
        (0,_display__WEBPACK_IMPORTED_MODULE_1__.addToProjectTile)(newItem);
        //change this too
        (0,_sideBar__WEBPACK_IMPORTED_MODULE_0__.updateProjectArea)(projectLibrary.projects);
    }
}

const createClearButton = () => {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        inputForm.reset();
    })
    return clearButton
}

const createInputForm = () => {
    const inputForm = document.createElement('form');
    inputForm.classList.add('newItemForm');
    inputForm.setAttribute('id','inputForm');
    inputForm.onsubmit = addItem;

    const newItemHeader = document.createElement('p');
    newItemHeader.textContent = 'Add New Item'

    inputForm.appendChild(newItemHeader);

    inputForm.appendChild(titleInput());
    inputForm.appendChild(projectInput());
    inputForm.appendChild(dueDateInput());
    inputForm.appendChild(descriptionInput());
    inputForm.appendChild(createAddButton());
    inputForm.appendChild(createClearButton());

    return inputForm
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createInputBar);

/***/ }),

/***/ "./src/sideBar.js":
/*!************************!*\
  !*** ./src/sideBar.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSideBar": () => (/* binding */ createSideBar),
/* harmony export */   "updateProjectArea": () => (/* binding */ updateProjectArea)
/* harmony export */ });
const createSideBar = () => {
    const sideBar = document.createElement('div');
    sideBar.classList.add('sideBar');

    const homeButton = document.createElement('button');
    homeButton.textContent = 'Home';
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

const resetProjectArea = () => {
    const projectArea = document.getElementById('projectArea');
    projectArea.innerHTML = '';
}

// maybe make this an un ordered list 
const updateProjectArea = (projectLibrary) => {
    resetProjectArea();
    const projectArea = document.getElementById('projectArea');

    for (let project of projectLibrary){
        const newProjectButton = document.createElement('button');
        newProjectButton.textContent = project.projectTitle;
        projectArea.appendChild(newProjectButton);
    }
    
    return projectArea
}




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDL01mO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O1VDbkRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEM7O0FBRTlDLHdEQUFpQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5pdFdlYnNpdGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvc2lkZUJhci5qcyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNyZWF0ZURpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGlzcGxheUFyZWEuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5QXJlYScpO1xuXG4gICAgcmV0dXJuIGRpc3BsYXlBcmVhXG59XG5cbi8vIGNvbnN0IHJlc2V0RGlzcGxheUFyZWEgPSAoKSA9PiB7XG4vLyAgICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbi8vICAgICBkaXNwbGF5QXJlYS5pbm5lckhUTUwgPSAnJztcbi8vIH1cblxuLy8gY29uc3QgdXBkYXRlRGlzcGxheUFyZWEgPSAocHJvamVjdExpYnJhcnkpID0+IHtcbi8vICAgICByZXNldERpc3BsYXlBcmVhKCk7XG4vLyAgICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcblxuLy8gICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpYnJhcnkpIHtcbi8vICAgICAgICAgZGlzcGxheUFyZWEuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdFRpbGUocHJvamVjdCkpO1xuLy8gICAgIH1cbi8vIH1cblxuLy8vLy8vLy9cbmNvbnN0IGFkZFRvRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgZGlzcGxheUFyZWEuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdFRpbGUocHJvamVjdCkpO1xufVxuXG5jb25zdCByZW1vdmVGcm9tRGlzcGxheUFyZWEgPSAocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG4gICAgZGlzcGxheUFyZWEucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvamVjdC5wcm9qZWN0VGl0bGUpKTtcbn1cblxuY29uc3QgYWRkVG9Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLnByb2plY3RUaXRsZSk7XG4gICAgcHJvamVjdFRpbGUuYXBwZW5kQ2hpbGQoY3JlYXRlSXRlbShpdGVtKSk7XG59XG5cbmNvbnN0IHJlbW92ZUZyb21Qcm9qZWN0VGlsZSA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLnByb2plY3RUaXRsZSk7XG4gICAgLy9nZXQgaW5kZXggb2YgdGhlIGl0ZW0gaGVyZS4gb3IgZ2l2ZSBpdCBhbiBpZCBvZiBpbmRleCAtIHByb2plY3QgbmFtZSBzb21ldGhpbmcgXG4gICAgcHJvamVjdFRpbGUucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKSlcbn1cblxuXG4vLyBjb25zdCByZXNldFByb2plY3RUaWxlID0gKHByb2plY3QpID0+IHtcbi8vICAgICBjb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByb2plY3QucHJvamVjdFRpdGxlKTtcbi8vICAgICBpdGVtTGlzdC5pbm5lckhUTUwgPSAnJztcbi8vIH1cblxuLy8gY29uc3QgdXBkYXRlUHJvamVjdFRpbGUgPSAocHJvamVjdCkgPT4ge1xuLy8gICAgIHJlc2V0UHJvamVjdFRpbGUocHJvamVjdCk7XG4vLyAgICAgY29uc3QgaXRlbUxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9qZWN0LnByb2plY3RUaXRsZSk7XG5cbi8vICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuLy8gICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4vLyAgICAgICAgIGxpc3RJdGVtLnRleHRDb250ZW50ID0gaXRlbS5pdGVtVGl0bGU7XG4vLyAgICAgICAgIGl0ZW1MaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbi8vICAgICB9XG5cbi8vIH1cblxuLy8gY29uc3QgY3JlYXRlTGluZUl0ZW0gPSAocHJvamVjdCkgPT4ge1xuLy8gICAgIGNvbnN0IGl0ZW1MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgICAgaXRlbUxpc3QuY2xhc3NMaXN0LmFkZCgnbGlzdCcpO1xuLy8gICAgIGl0ZW1MaXN0LnNldEF0dHJpYnV0ZSgnaWQnLCBwcm9qZWN0LnByb2plY3RUaXRsZSk7XG5cbi8vICAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuLy8gICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG5cbi8vICAgICAgICAgY29uc3QgY2hlY2tib3hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4vLyAgICAgICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4vLyAgICAgICAgIGNvbnN0IHRyYXNoSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuLy8gICAgICAgICBjaGVja2JveEljb24uY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuLy8gICAgICAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4vLyAgICAgICAgIHRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4vLyAgICAgICAgIGVkaXRJY29uLnNyYyA9ICcuLi9kaXN0L2ljb25zL3RleHQtYm94LWVkaXQtb3V0bGluZS5zdmcnO1xuLy8gICAgICAgICB0cmFzaEljb24uc3JjID0gJy4uL2Rpc3QvaWNvbnMvdHJhc2gtY2FuLW91dGxpbmUuc3ZnJztcblxuLy8gICAgICAgICBpZiAoIWl0ZW0uaXRlbUNvbXBsZXRpb24pe1xuLy8gICAgICAgICAgICAgY2hlY2tib3hJY29uLnNyYyA9ICcuLi9kaXN0L2ljb25zL2NoZWNrYm94LWJsYW5rLW91dGxpbmUuc3ZnJztcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGNoZWNrYm94SWNvbi5zcmMgPSAnLi4vZGlzdC9pY29ucy9jaGVja2JveC1vdXRsaW5lLnN2Zyc7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChjaGVja2JveEljb24pO1xuLy8gICAgICAgICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbi8vICAgICAgICAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSBpdGVtLml0ZW1UaXRsZTtcbi8vICAgICAgICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoaXRlbU5hbWUpO1xuLy8gICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG4vLyAgICAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKHRyYXNoSWNvbik7XG4vLyAgICAgICAgIGl0ZW1MaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbi8vICAgICB9XG4vLyB9XG5cbmNvbnN0IGNyZWF0ZUl0ZW0gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnaXRlbURpdicpO1xuICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBpdGVtLml0ZW1JRClcblxuICAgIGNvbnN0IGNoZWNrYm94SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgY2hlY2tib3hJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICBlZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgdHJhc2hJY29uLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICBlZGl0SWNvbi5zcmMgPSAnLi4vZGlzdC9pY29ucy90ZXh0LWJveC1lZGl0LW91dGxpbmUuc3ZnJztcbiAgICB0cmFzaEljb24uc3JjID0gJy4uL2Rpc3QvaWNvbnMvdHJhc2gtY2FuLW91dGxpbmUuc3ZnJztcblxuICAgIGNoZWNrYm94SWNvbi5zcmMgPSAnLi4vZGlzdC9pY29ucy9jaGVja2JveC1ibGFuay1vdXRsaW5lLnN2Zyc7XG5cbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChjaGVja2JveEljb24pO1xuICAgIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGl0ZW1OYW1lLnRleHRDb250ZW50ID0gaXRlbS5pdGVtVGl0bGU7XG4gICAgbGlzdEl0ZW0uYXBwZW5kQ2hpbGQoaXRlbU5hbWUpO1xuICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcbiAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZCh0cmFzaEljb24pO1xuXG4gICAgcmV0dXJuIGxpc3RJdGVtXG59XG5cbmNvbnN0IGNyZWF0ZVByb2plY3RUaWxlID0gKHByb2plY3QpID0+IHtcblxuICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdFRpbGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdFRpbGUnKTtcbiAgICBwcm9qZWN0VGlsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgcHJvamVjdC5wcm9qZWN0VGl0bGUpO1xuXG4gICAgY29uc3QgcHJvamVjdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgcHJvamVjdEhlYWRlci50ZXh0Q29udGVudCA9IHByb2plY3QucHJvamVjdFRpdGxlO1xuICAgIHByb2plY3RIZWFkZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3RIZWFkZXJcIilcblxuICAgIHByb2plY3RUaWxlLmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuXG4gICAgcmV0dXJuIHByb2plY3RUaWxlXG59XG5cbmV4cG9ydCB7Y3JlYXRlRGlzcGxheUFyZWEsIGFkZFRvRGlzcGxheUFyZWEsIGFkZFRvUHJvamVjdFRpbGV9IiwiY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlckJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGhlYWRlckJhci5jbGFzc0xpc3QuYWRkKCdoZWFkZXInKTtcblxuICAgIGhlYWRlckJhci50ZXh0Q29udGVudCA9IFwiVG8tRG9cIlxuICAgIFxuICAgIHJldHVybiBoZWFkZXJCYXJcbn1cblxuZXhwb3J0IHtjcmVhdGVIZWFkZXJ9IiwiaW1wb3J0IHtjcmVhdGVIZWFkZXJ9IGZyb20gXCIuL2hlYWRlclwiO1xuaW1wb3J0IHtjcmVhdGVTaWRlQmFyfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5pbXBvcnQge2NyZWF0ZURpc3BsYXlBcmVhfSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgY3JlYXRlSW5wdXRCYXIgZnJvbSBcIi4vaW5wdXRcIjtcblxuXG4vL29uY2UgaSBhZGQgbG9nIGluIGluZm9ybWF0aW9uIGkgc2hvdWxkIG1ha2UgYW5vdGhlciBqcyBzY3JpcHQgZm9yIG1ha2luZyB0aGUgaGVhZGVyIFxuXG5cblxuY29uc3QgaW5pdGlhbGl6ZVdlYnNpdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuXG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSGVhZGVyKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVTaWRlQmFyKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVEaXNwbGF5QXJlYSgpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRCYXIoKSk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdGlhbGl6ZVdlYnNpdGU7IiwiaW1wb3J0IHt1cGRhdGVQcm9qZWN0QXJlYX0gZnJvbSBcIi4vc2lkZUJhclwiO1xuaW1wb3J0IHthZGRUb0Rpc3BsYXlBcmVhLCBhZGRUb1Byb2plY3RUaWxlfSBmcm9tIFwiLi9kaXNwbGF5XCJcblxuY2xhc3MgSXRlbSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGl0ZW1UaXRsZSA9IFwidW5rbm93blwiLFxuICAgICAgICBwcm9qZWN0VGl0bGUgPSBcInVua25vd25cIixcbiAgICAgICAgaXRlbUR1ZURhdGUgPSBcInVua25vd25cIixcbiAgICAgICAgaXRlbURlc2NyaXB0aW9uID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1Db21wbGV0aW9uID0gJ3Vua25vd24nLFxuICAgICAgICBpdGVtSUQgPSAndW5rbm93bidcbiAgICApe1xuICAgICAgICB0aGlzLml0ZW1UaXRsZSA9IGl0ZW1UaXRsZVxuICAgICAgICB0aGlzLnByb2plY3RUaXRsZSA9IHByb2plY3RUaXRsZVxuICAgICAgICB0aGlzLml0ZW1EdWVEYXRlID0gaXRlbUR1ZURhdGVcbiAgICAgICAgdGhpcy5pdGVtRGVzY3JpcHRpb24gPSBpdGVtRGVzY3JpcHRpb25cbiAgICAgICAgdGhpcy5pdGVtQ29tcGxldGlvbiA9IGl0ZW1Db21wbGV0aW9uXG4gICAgICAgIHRoaXMuaXRlbUlEID0gaXRlbUlEXG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvciggICAgICAgIFxuICAgICAgICBwcm9qZWN0VGl0bGUgPSAndW5rbm93bidcbiAgICApe1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIHRoaXMucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlO1xuICAgIH1cbiAgICBhZGRJdGVtKG5ld0l0ZW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW5Qcm9qZWN0KG5ld0l0ZW0pKSB7XG4gICAgICAgICAgICAvLyBtaWdodCBub3QgZXZlbiB3YW50IHRvIGNoZWNrIGlmIGFub3RoZXIgaXRlbSBieSB0aGUgc2FtZSBuYW1lIGV4aXN0IGJlY2F1c2UgeW91IGNvdWxkIHdhbnRcbiAgICAgICAgICAgIC8vIHRvIGRvIHRoZSBzYW1lIHRhc2sgbXVsdGlwbGUgdGltZXMgXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXdJdGVtKVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuaXRlbXMucHVzaChuZXdJdGVtKVxuICAgIH1cbiAgXG4gICAgcmVtb3ZlSXRlbShpdGVtVGl0bGUpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLml0ZW1UaXRsZSAhPT0gaXRlbVRpdGxlKVxuICAgIH1cbiAgXG4gICAgZ2V0SXRlbShpdGVtVGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pdGVtVGl0bGUgPT09IGl0ZW1UaXRsZSlcbiAgICB9XG4gIFxuICAgIGlzSW5Qcm9qZWN0KG5ld0l0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5pdGVtVGl0bGUgPT09IG5ld0l0ZW0uaXRlbVRpdGxlKVxuICAgIH1cbn1cblxuY2xhc3MgUHJvamVjdExpYnJhcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb2plY3RzID0gW11cbiAgICB9XG4gIFxuICAgIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJblByb2plY3RMaWJyYXJ5KG5ld1Byb2plY3QpKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KVxuICAgICAgICB9XG4gICAgfVxuICBcbiAgICByZW1vdmVQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICAgICAgICB0aGlzLnByb2plY3RzID0gdGhpcy5wcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QucHJvamVjdFRpdGxlICE9PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxuICBcbiAgICBnZXRQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RUaXRsZSA9PT0gcHJvamVjdFRpdGxlKVxuICAgIH1cbiAgXG4gICAgaXNJblByb2plY3RMaWJyYXJ5KHByb2plY3RUaXRsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RUaXRsZSA9PT0gcHJvamVjdFRpdGxlKVxuICAgIH1cbn1cblxuY29uc3QgcHJvamVjdExpYnJhcnkgPSBuZXcgUHJvamVjdExpYnJhcnkoKVxuXG5jb25zdCBjcmVhdGVJbnB1dEJhciA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3SXRlbUJhci5jbGFzc0xpc3QuYWRkKCduZXdJdGVtQmFyJyk7XG5cbiAgICBuZXdJdGVtQmFyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0Rm9ybSgpKTtcbiAgICByZXR1cm4gbmV3SXRlbUJhclxufVxuXG5jb25zdCB0aXRsZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuZXdJdGVtSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIG5ld0l0ZW1JbnB1dC5uYW1lID0gJ2l0ZW1UaXRsZSc7XG4gICAgbmV3SXRlbUlucHV0LmlkID0gJ2l0ZW1UaXRsZSc7XG4gICAgbmV3SXRlbUlucHV0LnBsYWNlaG9sZGVyID0gJ1RpdGxlJztcblxuICAgIHJldHVybiBuZXdJdGVtSW5wdXRcbn1cblxuY29uc3QgcHJvamVjdElucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1Byb2plY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbmV3UHJvamVjdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgbmV3UHJvamVjdElucHV0Lm5hbWUgPSAncHJvamVjdFRpdGxlJztcbiAgICBuZXdQcm9qZWN0SW5wdXQuaWQgPSAncHJvamVjdFRpdGxlJztcbiAgICBuZXdQcm9qZWN0SW5wdXQucGxhY2Vob2xkZXIgPSAnUHJvamVjdCc7XG4gICAgXG4gICAgcmV0dXJuIG5ld1Byb2plY3RJbnB1dFxufVxuXG5jb25zdCBkdWVEYXRlSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgZHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgIGR1ZURhdGUubmFtZSA9ICdkdWVEYXRlJztcbiAgICBkdWVEYXRlLmlkID0gJ2R1ZURhdGUnO1xuXG4gICAgcmV0dXJuIGR1ZURhdGVcbn1cblxuY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgZGVzY3JpcHRpb24ubmFtZSA9ICdpdGVtRGVzY3JpcHRpb24nO1xuICAgIGRlc2NyaXB0aW9uLmlkID0gJ2l0ZW1EZXNjcmlwdGlvbic7XG4gICAgZGVzY3JpcHRpb24uY29scyA9ICczMCc7XG4gICAgZGVzY3JpcHRpb24ucm93cyA9ICcxMCc7XG4gICAgZGVzY3JpcHRpb24ucGxhY2Vob2xkZXIgPSAnRGVzY3JpcHRpb24nO1xuXG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uXG59XG5cbmNvbnN0IGNyZWF0ZUFkZEJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIEl0ZW0nO1xuICAgIGFkZEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgcmV0dXJuIGFkZEJ1dHRvblxufVxuXG5jb25zdCBjcmVhdGVJdGVtRnJvbUlucHV0ID0gKCkgPT4ge1xuXG4gICAgY29uc3QgaXRlbVRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW1UaXRsZScpLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0VGl0bGUnKS52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVlRGF0ZScpLnZhbHVlO1xuICAgIGNvbnN0IGl0ZW1EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtRGVzY3JpcHRpb24nKS52YWx1ZTtcblxuICAgIGlucHV0Rm9ybS5yZXNldCgpO1xuXG4gICAgcmV0dXJuIG5ldyBJdGVtKGl0ZW1UaXRsZSwgcHJvamVjdFRpdGxlLCBkdWVEYXRlLCBpdGVtRGVzY3JpcHRpb24sIGZhbHNlLCAndW5rbm93bicpXG59XG5cbi8vIGNvbnN0IGdldEl0ZW1JRCA9IChwcm9qZWN0VGl0bGUpID0+IHtcbi8vICAgICBpdGVtSUQgPSBgJHtwcm9qZWN0VGl0bGV9YCtgLSR7cHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLml0ZW1zLmxlbmd0aH1gO1xuLy8gICAgIGNvbnNvbGUubG9nKG5ld0l0ZW0uaXRlbUlEKTtcbi8vICAgICBjb25zb2xlLmxvZyhgJHtwcm9qZWN0VGl0bGV9YCtgLSR7cHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpLml0ZW1zLmxlbmd0aH1gKTtcbi8vICAgICByZXR1cm4gaXRlbUlEXG4vLyB9XG5cbmNvbnN0IGFkZEl0ZW0gPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IG5ld0l0ZW0gPSBjcmVhdGVJdGVtRnJvbUlucHV0KCk7XG5cbiAgICBpZiAobmV3SXRlbS5pdGVtVGl0bGUgPT0gJycgfHwgbmV3SXRlbS5wcm9qZWN0VGl0bGUgPT0gJycpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkobmV3SXRlbS5wcm9qZWN0VGl0bGUpKXtcbiAgICAgICAgbmV3SXRlbS5pdGVtSUQgPSBgJHtuZXdJdGVtLnByb2plY3RUaXRsZX0tYCtgJHtwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKS5pdGVtcy5sZW5ndGh9YDtcbiAgICAgICAgcHJvamVjdExpYnJhcnkuZ2V0UHJvamVjdChuZXdJdGVtLnByb2plY3RUaXRsZSkuYWRkSXRlbShuZXdJdGVtKTtcbiAgICAgICAgYWRkVG9Qcm9qZWN0VGlsZShuZXdJdGVtKTtcblxuICAgIH0gZWxzZSBpZiAoIXByb2plY3RMaWJyYXJ5LmlzSW5Qcm9qZWN0TGlicmFyeShuZXdJdGVtLnByb2plY3RUaXRsZSkpe1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgICAgICBwcm9qZWN0TGlicmFyeS5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICBuZXdJdGVtLml0ZW1JRCA9IGAke25ld0l0ZW0ucHJvamVjdFRpdGxlfS1gK2Ake3Byb2plY3RMaWJyYXJ5LmdldFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpLml0ZW1zLmxlbmd0aH1gO1xuICAgICAgICBwcm9qZWN0LmFkZEl0ZW0obmV3SXRlbSlcbiAgICAgICAgXG4gICAgICAgIGFkZFRvRGlzcGxheUFyZWEocHJvamVjdCk7XG4gICAgICAgIGFkZFRvUHJvamVjdFRpbGUobmV3SXRlbSk7XG4gICAgICAgIC8vY2hhbmdlIHRoaXMgdG9vXG4gICAgICAgIHVwZGF0ZVByb2plY3RBcmVhKHByb2plY3RMaWJyYXJ5LnByb2plY3RzKTtcbiAgICB9XG59XG5cbmNvbnN0IGNyZWF0ZUNsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2xlYXJCdXR0b24udGV4dENvbnRlbnQgPSAnQ2xlYXInO1xuICAgIGNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpbnB1dEZvcm0ucmVzZXQoKTtcbiAgICB9KVxuICAgIHJldHVybiBjbGVhckJ1dHRvblxufVxuXG5jb25zdCBjcmVhdGVJbnB1dEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGlucHV0Rm9ybS5jbGFzc0xpc3QuYWRkKCduZXdJdGVtRm9ybScpO1xuICAgIGlucHV0Rm9ybS5zZXRBdHRyaWJ1dGUoJ2lkJywnaW5wdXRGb3JtJyk7XG4gICAgaW5wdXRGb3JtLm9uc3VibWl0ID0gYWRkSXRlbTtcblxuICAgIGNvbnN0IG5ld0l0ZW1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV3SXRlbUhlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgTmV3IEl0ZW0nXG5cbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQobmV3SXRlbUhlYWRlcik7XG5cbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCgpKTtcbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQocHJvamVjdElucHV0KCkpO1xuICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChkdWVEYXRlSW5wdXQoKSk7XG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQoKSk7XG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGNyZWF0ZUFkZEJ1dHRvbigpKTtcbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoY3JlYXRlQ2xlYXJCdXR0b24oKSk7XG5cbiAgICByZXR1cm4gaW5wdXRGb3JtXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSW5wdXRCYXIiLCJjb25zdCBjcmVhdGVTaWRlQmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGVCYXInKTtcblxuICAgIGNvbnN0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBob21lQnV0dG9uLnRleHRDb250ZW50ID0gJ0hvbWUnO1xuICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdG9kYXlCdXR0b24udGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgIGNvbnN0IHdlZWtCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB3ZWVrQnV0dG9uLnRleHRDb250ZW50ID0gJ1RoaXMgV2VlaydcblxuICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoaG9tZUJ1dHRvbik7XG4gICAgc2lkZUJhci5hcHBlbmRDaGlsZCh0b2RheUJ1dHRvbik7XG4gICAgc2lkZUJhci5hcHBlbmRDaGlsZCh3ZWVrQnV0dG9uKTtcbiAgICBzaWRlQmFyLmFwcGVuZENoaWxkKGNyZWF0ZVByb2plY3RBcmVhKCkpO1xuXG4gICAgcmV0dXJuIHNpZGVCYXJcbn1cblxuY29uc3QgY3JlYXRlUHJvamVjdEFyZWEgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEFyZWFDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdEFyZWEuc2V0QXR0cmlidXRlKCdpZCcsJ3Byb2plY3RBcmVhJyk7XG5cbiAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG5cbiAgICBwcm9qZWN0QXJlYUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGluZyk7XG4gICAgcHJvamVjdEFyZWFDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEFyZWEpO1xuXG4gICAgcmV0dXJuIHByb2plY3RBcmVhQ29udGFpbmVyXG59XG5cbmNvbnN0IHJlc2V0UHJvamVjdEFyZWEgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEFyZWEnKTtcbiAgICBwcm9qZWN0QXJlYS5pbm5lckhUTUwgPSAnJztcbn1cblxuLy8gbWF5YmUgbWFrZSB0aGlzIGFuIHVuIG9yZGVyZWQgbGlzdCBcbmNvbnN0IHVwZGF0ZVByb2plY3RBcmVhID0gKHByb2plY3RMaWJyYXJ5KSA9PiB7XG4gICAgcmVzZXRQcm9qZWN0QXJlYSgpO1xuICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RBcmVhJyk7XG5cbiAgICBmb3IgKGxldCBwcm9qZWN0IG9mIHByb2plY3RMaWJyYXJ5KXtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdC5wcm9qZWN0VGl0bGU7XG4gICAgICAgIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdXR0b24pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcHJvamVjdEFyZWFcbn1cblxuXG5leHBvcnQge2NyZWF0ZVNpZGVCYXIsIHVwZGF0ZVByb2plY3RBcmVhfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemVXZWJzaXRlIGZyb20gXCIuL2luaXRXZWJzaXRlXCI7XG5cbmluaXRpYWxpemVXZWJzaXRlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9