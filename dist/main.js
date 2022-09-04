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
/* harmony export */   "updateDisplayArea": () => (/* binding */ updateDisplayArea)
/* harmony export */ });
const createDisplayArea = () => {
    const displayArea = document.createElement('div');
    displayArea.setAttribute('id', 'displayArea');

    return displayArea
}

const resetDisplayArea = () => {
    const displayArea = document.getElementById('displayArea');
    displayArea.innerHTML = '';
}

const updateDisplayArea = (projectLibrary) => {
    resetDisplayArea();
    const displayArea = document.getElementById('displayArea');

    for (let project of projectLibrary) {
        displayArea.appendChild(createProjectTile(project));
    }
}

// const resetProjectTile = (project) => {
//     const proj = document.getElementById(project.projectTitle);
//     proj.innerHTML = '';
// }

// const updateProjectTile = () => {
//     resetProjectTile(project);


// }

const createProjectTile = (project) => {

    const projectTile = document.createElement('div');
    projectTile.classList.add('projectTile');
    projectTile.setAttribute('id', project.projectTitle);

    const projectHeader = document.createElement('h3');
    projectHeader.textContent = project.projectTitle;
    projectHeader.classList.add("projectHeader")

    projectTile.appendChild(projectHeader);

    const itemList = document.createElement('ul');

    for (let item of project.items){
        const listItem = document.createElement('li');
        listItem.classList.add('unfinished');
        listItem.textContent = item.itemTitle;
        itemList.appendChild(listItem);
    }

    projectTile.appendChild(itemList);

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
        itemDescription = "unknown"
    ){
        this.itemTitle = itemTitle
        this.projectTitle = projectTitle
        this.itemDueDate = itemDueDate
        this.itemDescription = itemDescription
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

    return new Item(itemTitle, projectTitle, dueDate, itemDescription)
}

const addItem = (e) => {
    e.preventDefault();

    const newItem = createItemFromInput();

    if (newItem.itemTitle == '' || newItem.projectTitle == '') {
        return
    } else if (projectLibrary.isInProjectLibrary(newItem.projectTitle)){
        projectLibrary.getProject(newItem.projectTitle).addItem(newItem);
        // updateProjectTile(projectLibrary.getProject(newItem.projectTitle));
        (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateDisplayArea)(projectLibrary.projects);

        // console.log(projectLibrary)
    } else if (!projectLibrary.isInProjectLibrary(newItem.projectTitle)){
        const project = new Project(newItem.projectTitle);
        project.addItem(newItem);
        projectLibrary.addProject(project);
        (0,_sideBar__WEBPACK_IMPORTED_MODULE_0__.updateProjectArea)(project.projectTitle);
        (0,_display__WEBPACK_IMPORTED_MODULE_1__.updateDisplayArea)(projectLibrary.projects);
        // console.log(projectLibrary)
    }
}

const createClearButton = () => {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log('hello')
        inputForm.reset();
    })

    return clearButton
}

const createInputForm = () => {
    const inputForm = document.createElement('form');
    inputForm.classList.add('newItemForm');
    inputForm.setAttribute('id','inputForm');
    // inputForm.onsubmit = createItemFromInput;
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
    const projectArea = document.createElement('div');
    projectArea.setAttribute('id','projectArea');
    const projectHeading = document.createElement('span');
    projectHeading.textContent = 'Projects';

    projectArea.appendChild(projectHeading);

    return projectArea
}

// will need to change this to update like the display area for when things are deleted 
const updateProjectArea = (projTitle) => {
    const projectArea = document.getElementById('projectArea');

    const newProjectButton = document.createElement('button');
    newProjectButton.textContent = projTitle;

    projectArea.appendChild(newProjectButton);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHNDO0FBQ0U7QUFDSTtBQUNQOzs7QUFHckM7Ozs7QUFJQTtBQUNBOzs7QUFHQSwwQkFBMEIscURBQVk7QUFDdEMsMEJBQTBCLHVEQUFhO0FBQ3ZDLDBCQUEwQiwyREFBaUI7QUFDM0MsMEJBQTBCLGtEQUFjOztBQUV4Qzs7QUFFQSxpRUFBZSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQlk7QUFDRDs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxRQUFRLDJEQUFpQjs7QUFFekI7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsUUFBUSwyREFBaUI7QUFDekIsUUFBUSwyREFBaUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQ3ZNZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7O1VDdkNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEM7O0FBRTlDLHdEQUFpQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5pdFdlYnNpdGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvc2lkZUJhci5qcyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNyZWF0ZURpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGlzcGxheUFyZWEuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5QXJlYScpO1xuXG4gICAgcmV0dXJuIGRpc3BsYXlBcmVhXG59XG5cbmNvbnN0IHJlc2V0RGlzcGxheUFyZWEgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcbiAgICBkaXNwbGF5QXJlYS5pbm5lckhUTUwgPSAnJztcbn1cblxuY29uc3QgdXBkYXRlRGlzcGxheUFyZWEgPSAocHJvamVjdExpYnJhcnkpID0+IHtcbiAgICByZXNldERpc3BsYXlBcmVhKCk7XG4gICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcblxuICAgIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpYnJhcnkpIHtcbiAgICAgICAgZGlzcGxheUFyZWEuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdFRpbGUocHJvamVjdCkpO1xuICAgIH1cbn1cblxuLy8gY29uc3QgcmVzZXRQcm9qZWN0VGlsZSA9IChwcm9qZWN0KSA9PiB7XG4vLyAgICAgY29uc3QgcHJvaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByb2plY3QucHJvamVjdFRpdGxlKTtcbi8vICAgICBwcm9qLmlubmVySFRNTCA9ICcnO1xuLy8gfVxuXG4vLyBjb25zdCB1cGRhdGVQcm9qZWN0VGlsZSA9ICgpID0+IHtcbi8vICAgICByZXNldFByb2plY3RUaWxlKHByb2plY3QpO1xuXG5cbi8vIH1cblxuY29uc3QgY3JlYXRlUHJvamVjdFRpbGUgPSAocHJvamVjdCkgPT4ge1xuXG4gICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0VGlsZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0VGlsZScpO1xuICAgIHByb2plY3RUaWxlLnNldEF0dHJpYnV0ZSgnaWQnLCBwcm9qZWN0LnByb2plY3RUaXRsZSk7XG5cbiAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBwcm9qZWN0SGVhZGVyLnRleHRDb250ZW50ID0gcHJvamVjdC5wcm9qZWN0VGl0bGU7XG4gICAgcHJvamVjdEhlYWRlci5jbGFzc0xpc3QuYWRkKFwicHJvamVjdEhlYWRlclwiKVxuXG4gICAgcHJvamVjdFRpbGUuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRlcik7XG5cbiAgICBjb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cbiAgICBmb3IgKGxldCBpdGVtIG9mIHByb2plY3QuaXRlbXMpe1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3VuZmluaXNoZWQnKTtcbiAgICAgICAgbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBpdGVtLml0ZW1UaXRsZTtcbiAgICAgICAgaXRlbUxpc3QuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xuICAgIH1cblxuICAgIHByb2plY3RUaWxlLmFwcGVuZENoaWxkKGl0ZW1MaXN0KTtcblxuICAgIHJldHVybiBwcm9qZWN0VGlsZVxufVxuXG5leHBvcnQge2NyZWF0ZURpc3BsYXlBcmVhLCB1cGRhdGVEaXNwbGF5QXJlYX0iLCJjb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyQmFyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicpO1xuXG4gICAgaGVhZGVyQmFyLnRleHRDb250ZW50ID0gXCJUby1Eb1wiXG4gICAgXG4gICAgcmV0dXJuIGhlYWRlckJhclxufVxuXG5leHBvcnQge2NyZWF0ZUhlYWRlcn0iLCJpbXBvcnQge2NyZWF0ZUhlYWRlcn0gZnJvbSBcIi4vaGVhZGVyXCI7XG5pbXBvcnQge2NyZWF0ZVNpZGVCYXJ9IGZyb20gXCIuL3NpZGVCYXJcIjtcbmltcG9ydCB7Y3JlYXRlRGlzcGxheUFyZWF9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCBjcmVhdGVJbnB1dEJhciBmcm9tIFwiLi9pbnB1dFwiO1xuXG5cbi8vb25jZSBpIGFkZCBsb2cgaW4gaW5mb3JtYXRpb24gaSBzaG91bGQgbWFrZSBhbm90aGVyIGpzIHNjcmlwdCBmb3IgbWFraW5nIHRoZSBoZWFkZXIgXG5cblxuXG5jb25zdCBpbml0aWFsaXplV2Vic2l0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG5cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVNpZGVCYXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURpc3BsYXlBcmVhKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEJhcigpKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplV2Vic2l0ZTsiLCJpbXBvcnQge3VwZGF0ZVByb2plY3RBcmVhfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5pbXBvcnQge3VwZGF0ZURpc3BsYXlBcmVhfSBmcm9tIFwiLi9kaXNwbGF5XCJcblxuY2xhc3MgSXRlbSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGl0ZW1UaXRsZSA9IFwidW5rbm93blwiLFxuICAgICAgICBwcm9qZWN0VGl0bGUgPSBcInVua25vd25cIixcbiAgICAgICAgaXRlbUR1ZURhdGUgPSBcInVua25vd25cIixcbiAgICAgICAgaXRlbURlc2NyaXB0aW9uID0gXCJ1bmtub3duXCJcbiAgICApe1xuICAgICAgICB0aGlzLml0ZW1UaXRsZSA9IGl0ZW1UaXRsZVxuICAgICAgICB0aGlzLnByb2plY3RUaXRsZSA9IHByb2plY3RUaXRsZVxuICAgICAgICB0aGlzLml0ZW1EdWVEYXRlID0gaXRlbUR1ZURhdGVcbiAgICAgICAgdGhpcy5pdGVtRGVzY3JpcHRpb24gPSBpdGVtRGVzY3JpcHRpb25cbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKCAgICAgICAgXG4gICAgICAgIHByb2plY3RUaXRsZSA9ICd1bmtub3duJ1xuICAgICl7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGU7XG4gICAgfVxuICAgIGFkZEl0ZW0obmV3SXRlbSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJblByb2plY3QobmV3SXRlbSkpIHtcbiAgICAgICAgICAgIC8vIG1pZ2h0IG5vdCBldmVuIHdhbnQgdG8gY2hlY2sgaWYgYW5vdGhlciBpdGVtIGJ5IHRoZSBzYW1lIG5hbWUgZXhpc3QgYmVjYXVzZSB5b3UgY291bGQgd2FudFxuICAgICAgICAgICAgLy8gdG8gZG8gdGhlIHNhbWUgdGFzayBtdWx0aXBsZSB0aW1lcyBcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ld0l0ZW0pXG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5pdGVtcy5wdXNoKG5ld0l0ZW0pXG5cbiAgICB9XG4gIFxuICAgIHJlbW92ZUl0ZW0oaXRlbVRpdGxlKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pdGVtVGl0bGUgIT09IGl0ZW1UaXRsZSlcbiAgICB9XG4gIFxuICAgIGdldEl0ZW0oaXRlbVRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaXRlbVRpdGxlID09PSBpdGVtVGl0bGUpXG4gICAgfVxuICBcbiAgICBpc0luUHJvamVjdChuZXdJdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLnNvbWUoKGl0ZW0pID0+IGl0ZW0uaXRlbVRpdGxlID09PSBuZXdJdGVtLml0ZW1UaXRsZSlcbiAgICB9XG59XG5cbmNsYXNzIFByb2plY3RMaWJyYXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdXG4gICAgfVxuICBcbiAgICBhZGRQcm9qZWN0KG5ld1Byb2plY3QpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW5Qcm9qZWN0TGlicmFyeShuZXdQcm9qZWN0KSkge1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdClcbiAgICAgICAgfVxuICAgIH1cbiAgXG4gICAgcmVtb3ZlUHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RUaXRsZSAhPT0gcHJvamVjdFRpdGxlKVxuICAgIH1cbiAgXG4gICAgZ2V0UHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0VGl0bGUgPT09IHByb2plY3RUaXRsZSlcbiAgICB9XG4gIFxuICAgIGlzSW5Qcm9qZWN0TGlicmFyeShwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHMuc29tZSgocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0VGl0bGUgPT09IHByb2plY3RUaXRsZSlcbiAgICB9XG59XG5cbmNvbnN0IHByb2plY3RMaWJyYXJ5ID0gbmV3IFByb2plY3RMaWJyYXJ5KClcblxuY29uc3QgY3JlYXRlSW5wdXRCYXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG5ld0l0ZW1CYXIuY2xhc3NMaXN0LmFkZCgnbmV3SXRlbUJhcicpO1xuXG4gICAgbmV3SXRlbUJhci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEZvcm0oKSk7XG4gICAgcmV0dXJuIG5ld0l0ZW1CYXJcbn1cblxuY29uc3QgdGl0bGVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgbmV3SXRlbUlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICBuZXdJdGVtSW5wdXQubmFtZSA9ICdpdGVtVGl0bGUnO1xuICAgIG5ld0l0ZW1JbnB1dC5pZCA9ICdpdGVtVGl0bGUnO1xuICAgIG5ld0l0ZW1JbnB1dC5wbGFjZWhvbGRlciA9ICdUaXRsZSc7XG5cbiAgICByZXR1cm4gbmV3SXRlbUlucHV0XG59XG5cbmNvbnN0IHByb2plY3RJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIG5ld1Byb2plY3RJbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIG5ld1Byb2plY3RJbnB1dC5uYW1lID0gJ3Byb2plY3RUaXRsZSc7XG4gICAgbmV3UHJvamVjdElucHV0LmlkID0gJ3Byb2plY3RUaXRsZSc7XG4gICAgbmV3UHJvamVjdElucHV0LnBsYWNlaG9sZGVyID0gJ1Byb2plY3QnO1xuICAgIFxuICAgIHJldHVybiBuZXdQcm9qZWN0SW5wdXRcbn1cblxuY29uc3QgZHVlRGF0ZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGR1ZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICBkdWVEYXRlLm5hbWUgPSAnZHVlRGF0ZSc7XG4gICAgZHVlRGF0ZS5pZCA9ICdkdWVEYXRlJztcblxuICAgIHJldHVybiBkdWVEYXRlXG59XG5cbmNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIGRlc2NyaXB0aW9uLm5hbWUgPSAnaXRlbURlc2NyaXB0aW9uJztcbiAgICBkZXNjcmlwdGlvbi5pZCA9ICdpdGVtRGVzY3JpcHRpb24nO1xuICAgIGRlc2NyaXB0aW9uLmNvbHMgPSAnMzAnO1xuICAgIGRlc2NyaXB0aW9uLnJvd3MgPSAnMTAnO1xuICAgIGRlc2NyaXB0aW9uLnBsYWNlaG9sZGVyID0gJ0Rlc2NyaXB0aW9uJztcblxuICAgIHJldHVybiBkZXNjcmlwdGlvblxufVxuXG5jb25zdCBjcmVhdGVBZGRCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgYWRkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWRkQnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCBJdGVtJztcbiAgICBhZGRCdXR0b24udHlwZSA9ICdzdWJtaXQnO1xuICAgIHJldHVybiBhZGRCdXR0b25cbn1cblxuY29uc3QgY3JlYXRlSXRlbUZyb21JbnB1dCA9ICgpID0+IHtcblxuICAgIGNvbnN0IGl0ZW1UaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtVGl0bGUnKS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdFRpdGxlJykudmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZURhdGUnKS52YWx1ZTtcbiAgICBjb25zdCBpdGVtRGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbURlc2NyaXB0aW9uJykudmFsdWU7XG5cbiAgICBpbnB1dEZvcm0ucmVzZXQoKTtcblxuICAgIHJldHVybiBuZXcgSXRlbShpdGVtVGl0bGUsIHByb2plY3RUaXRsZSwgZHVlRGF0ZSwgaXRlbURlc2NyaXB0aW9uKVxufVxuXG5jb25zdCBhZGRJdGVtID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBuZXdJdGVtID0gY3JlYXRlSXRlbUZyb21JbnB1dCgpO1xuXG4gICAgaWYgKG5ld0l0ZW0uaXRlbVRpdGxlID09ICcnIHx8IG5ld0l0ZW0ucHJvamVjdFRpdGxlID09ICcnKSB7XG4gICAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAocHJvamVjdExpYnJhcnkuaXNJblByb2plY3RMaWJyYXJ5KG5ld0l0ZW0ucHJvamVjdFRpdGxlKSl7XG4gICAgICAgIHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpLmFkZEl0ZW0obmV3SXRlbSk7XG4gICAgICAgIC8vIHVwZGF0ZVByb2plY3RUaWxlKHByb2plY3RMaWJyYXJ5LmdldFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpKTtcbiAgICAgICAgdXBkYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkucHJvamVjdHMpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3RMaWJyYXJ5KVxuICAgIH0gZWxzZSBpZiAoIXByb2plY3RMaWJyYXJ5LmlzSW5Qcm9qZWN0TGlicmFyeShuZXdJdGVtLnByb2plY3RUaXRsZSkpe1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QobmV3SXRlbS5wcm9qZWN0VGl0bGUpO1xuICAgICAgICBwcm9qZWN0LmFkZEl0ZW0obmV3SXRlbSk7XG4gICAgICAgIHByb2plY3RMaWJyYXJ5LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgICAgIHVwZGF0ZVByb2plY3RBcmVhKHByb2plY3QucHJvamVjdFRpdGxlKTtcbiAgICAgICAgdXBkYXRlRGlzcGxheUFyZWEocHJvamVjdExpYnJhcnkucHJvamVjdHMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0TGlicmFyeSlcbiAgICB9XG59XG5cbmNvbnN0IGNyZWF0ZUNsZWFyQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFyQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY2xlYXJCdXR0b24udGV4dENvbnRlbnQgPSAnQ2xlYXInO1xuICAgIGNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnaGVsbG8nKVxuICAgICAgICBpbnB1dEZvcm0ucmVzZXQoKTtcbiAgICB9KVxuXG4gICAgcmV0dXJuIGNsZWFyQnV0dG9uXG59XG5cbmNvbnN0IGNyZWF0ZUlucHV0Rm9ybSA9ICgpID0+IHtcbiAgICBjb25zdCBpbnB1dEZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgaW5wdXRGb3JtLmNsYXNzTGlzdC5hZGQoJ25ld0l0ZW1Gb3JtJyk7XG4gICAgaW5wdXRGb3JtLnNldEF0dHJpYnV0ZSgnaWQnLCdpbnB1dEZvcm0nKTtcbiAgICAvLyBpbnB1dEZvcm0ub25zdWJtaXQgPSBjcmVhdGVJdGVtRnJvbUlucHV0O1xuICAgIGlucHV0Rm9ybS5vbnN1Ym1pdCA9IGFkZEl0ZW07XG5cblxuICAgIGNvbnN0IG5ld0l0ZW1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV3SXRlbUhlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgTmV3IEl0ZW0nXG5cbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQobmV3SXRlbUhlYWRlcik7XG5cbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCgpKTtcbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQocHJvamVjdElucHV0KCkpO1xuICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChkdWVEYXRlSW5wdXQoKSk7XG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQoKSk7XG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGNyZWF0ZUFkZEJ1dHRvbigpKTtcbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoY3JlYXRlQ2xlYXJCdXR0b24oKSk7XG5cbiAgICByZXR1cm4gaW5wdXRGb3JtXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSW5wdXRCYXIiLCJjb25zdCBjcmVhdGVTaWRlQmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IHNpZGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzaWRlQmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGVCYXInKTtcblxuICAgIGNvbnN0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBob21lQnV0dG9uLnRleHRDb250ZW50ID0gJ0hvbWUnO1xuICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdG9kYXlCdXR0b24udGV4dENvbnRlbnQgPSAnVG9kYXknO1xuICAgIGNvbnN0IHdlZWtCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB3ZWVrQnV0dG9uLnRleHRDb250ZW50ID0gJ1RoaXMgV2VlaydcblxuICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoaG9tZUJ1dHRvbik7XG4gICAgc2lkZUJhci5hcHBlbmRDaGlsZCh0b2RheUJ1dHRvbik7XG4gICAgc2lkZUJhci5hcHBlbmRDaGlsZCh3ZWVrQnV0dG9uKTtcbiAgICBzaWRlQmFyLmFwcGVuZENoaWxkKGNyZWF0ZVByb2plY3RBcmVhKCkpO1xuXG4gICAgcmV0dXJuIHNpZGVCYXJcbn1cblxuY29uc3QgY3JlYXRlUHJvamVjdEFyZWEgPSAoKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9qZWN0QXJlYS5zZXRBdHRyaWJ1dGUoJ2lkJywncHJvamVjdEFyZWEnKTtcbiAgICBjb25zdCBwcm9qZWN0SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBwcm9qZWN0SGVhZGluZy50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG5cbiAgICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGluZyk7XG5cbiAgICByZXR1cm4gcHJvamVjdEFyZWFcbn1cblxuLy8gd2lsbCBuZWVkIHRvIGNoYW5nZSB0aGlzIHRvIHVwZGF0ZSBsaWtlIHRoZSBkaXNwbGF5IGFyZWEgZm9yIHdoZW4gdGhpbmdzIGFyZSBkZWxldGVkIFxuY29uc3QgdXBkYXRlUHJvamVjdEFyZWEgPSAocHJvalRpdGxlKSA9PiB7XG4gICAgY29uc3QgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdEFyZWEnKTtcblxuICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBuZXdQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gcHJvalRpdGxlO1xuXG4gICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ1dHRvbik7XG4gICAgcmV0dXJuIHByb2plY3RBcmVhXG59XG5cblxuZXhwb3J0IHtjcmVhdGVTaWRlQmFyLCB1cGRhdGVQcm9qZWN0QXJlYX0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBpbml0aWFsaXplV2Vic2l0ZSBmcm9tIFwiLi9pbml0V2Vic2l0ZVwiO1xuXG5pbml0aWFsaXplV2Vic2l0ZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==