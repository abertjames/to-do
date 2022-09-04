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
/* harmony export */   "createDisplayArea": () => (/* binding */ createDisplayArea)
/* harmony export */ });
const createDisplayArea = () => {
    const displayArea = document.createElement('div');
    displayArea.setAttribute('id', 'displayArea');

    return displayArea
}

const updateDisplayArea = (newProject) => {
    const displayArea = document.getElementById('displayArea');

    const projectTile = document.createElement('div');
    projectTile.classList.add('projectTile');

    const projectHeader = document.createElement('h3');
    // projectHeader.textContent = newProject.

    projectTile.appendChild(projectHeader);
    displayArea.appendChild(projectTile);

    return displayArea
}

const createProjectTile = () => {
    const projectTile = document.createElement('div');
    projectTile.setAttribute('id', 'projectTile');
    
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
        console.log(projectLibrary)
    } else if (!projectLibrary.isInProjectLibrary(newItem.projectTitle)){
        const project = new Project(newItem.projectTitle);
        project.addItem(newItem);
        projectLibrary.addProject(project);
        (0,_sideBar__WEBPACK_IMPORTED_MODULE_0__.updateProjectArea)(project.projectTitle);
        console.log(projectLibrary)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbml0V2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbnB1dC5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zaWRlQmFyLmpzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3JlYXRlRGlzcGxheUFyZWEgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXNwbGF5QXJlYS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Rpc3BsYXlBcmVhJyk7XG5cbiAgICByZXR1cm4gZGlzcGxheUFyZWFcbn1cblxuY29uc3QgdXBkYXRlRGlzcGxheUFyZWEgPSAobmV3UHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXlBcmVhJyk7XG5cbiAgICBjb25zdCBwcm9qZWN0VGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RUaWxlLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RUaWxlJyk7XG5cbiAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAvLyBwcm9qZWN0SGVhZGVyLnRleHRDb250ZW50ID0gbmV3UHJvamVjdC5cblxuICAgIHByb2plY3RUaWxlLmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuICAgIGRpc3BsYXlBcmVhLmFwcGVuZENoaWxkKHByb2plY3RUaWxlKTtcblxuICAgIHJldHVybiBkaXNwbGF5QXJlYVxufVxuXG5jb25zdCBjcmVhdGVQcm9qZWN0VGlsZSA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0VGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RUaWxlLnNldEF0dHJpYnV0ZSgnaWQnLCAncHJvamVjdFRpbGUnKTtcbiAgICBcbiAgICByZXR1cm4gcHJvamVjdFRpbGVcbn1cblxuZXhwb3J0IHtjcmVhdGVEaXNwbGF5QXJlYX0iLCJjb25zdCBjcmVhdGVIZWFkZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVyQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgaGVhZGVyQmFyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicpO1xuXG4gICAgaGVhZGVyQmFyLnRleHRDb250ZW50ID0gXCJUby1Eb1wiXG4gICAgXG4gICAgcmV0dXJuIGhlYWRlckJhclxufVxuXG5leHBvcnQge2NyZWF0ZUhlYWRlcn0iLCJpbXBvcnQge2NyZWF0ZUhlYWRlcn0gZnJvbSBcIi4vaGVhZGVyXCI7XG5pbXBvcnQge2NyZWF0ZVNpZGVCYXJ9IGZyb20gXCIuL3NpZGVCYXJcIjtcbmltcG9ydCB7Y3JlYXRlRGlzcGxheUFyZWF9IGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCBjcmVhdGVJbnB1dEJhciBmcm9tIFwiLi9pbnB1dFwiO1xuXG5cbi8vb25jZSBpIGFkZCBsb2cgaW4gaW5mb3JtYXRpb24gaSBzaG91bGQgbWFrZSBhbm90aGVyIGpzIHNjcmlwdCBmb3IgbWFraW5nIHRoZSBoZWFkZXIgXG5cblxuXG5jb25zdCBpbml0aWFsaXplV2Vic2l0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG5cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVNpZGVCYXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURpc3BsYXlBcmVhKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEJhcigpKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplV2Vic2l0ZTsiLCJpbXBvcnQge3VwZGF0ZVByb2plY3RBcmVhfSBmcm9tIFwiLi9zaWRlQmFyXCI7XG5cbmNsYXNzIEl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpdGVtVGl0bGUgPSBcInVua25vd25cIixcbiAgICAgICAgcHJvamVjdFRpdGxlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1EdWVEYXRlID0gXCJ1bmtub3duXCIsXG4gICAgICAgIGl0ZW1EZXNjcmlwdGlvbiA9IFwidW5rbm93blwiXG4gICAgKXtcbiAgICAgICAgdGhpcy5pdGVtVGl0bGUgPSBpdGVtVGl0bGVcbiAgICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGVcbiAgICAgICAgdGhpcy5pdGVtRHVlRGF0ZSA9IGl0ZW1EdWVEYXRlXG4gICAgICAgIHRoaXMuaXRlbURlc2NyaXB0aW9uID0gaXRlbURlc2NyaXB0aW9uXG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvciggICAgICAgIFxuICAgICAgICBwcm9qZWN0VGl0bGUgPSAndW5rbm93bidcbiAgICApe1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIHRoaXMucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlO1xuICAgIH1cbiAgICBhZGRJdGVtKG5ld0l0ZW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW5Qcm9qZWN0KG5ld0l0ZW0pKSB7XG4gICAgICAgICAgICAvLyBtaWdodCBub3QgZXZlbiB3YW50IHRvIGNoZWNrIGlmIGFub3RoZXIgaXRlbSBieSB0aGUgc2FtZSBuYW1lIGV4aXN0IGJlY2F1c2UgeW91IGNvdWxkIHdhbnRcbiAgICAgICAgICAgIC8vIHRvIGRvIHRoZSBzYW1lIHRhc2sgbXVsdGlwbGUgdGltZXMgXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXdJdGVtKVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuaXRlbXMucHVzaChuZXdJdGVtKVxuXG4gICAgfVxuICBcbiAgICByZW1vdmVJdGVtKGl0ZW1UaXRsZSkge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaXRlbVRpdGxlICE9PSBpdGVtVGl0bGUpXG4gICAgfVxuICBcbiAgICBnZXRJdGVtKGl0ZW1UaXRsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maW5kKChpdGVtKSA9PiBpdGVtLml0ZW1UaXRsZSA9PT0gaXRlbVRpdGxlKVxuICAgIH1cbiAgXG4gICAgaXNJblByb2plY3QobmV3SXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5zb21lKChpdGVtKSA9PiBpdGVtLml0ZW1UaXRsZSA9PT0gbmV3SXRlbS5pdGVtVGl0bGUpXG4gICAgfVxufVxuXG5jbGFzcyBQcm9qZWN0TGlicmFyeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXVxuICAgIH1cbiAgXG4gICAgYWRkUHJvamVjdChuZXdQcm9qZWN0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0luUHJvamVjdExpYnJhcnkobmV3UHJvamVjdCkpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpXG4gICAgICAgIH1cbiAgICB9XG4gIFxuICAgIHJlbW92ZVByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0VGl0bGUgIT09IHByb2plY3RUaXRsZSlcbiAgICB9XG4gIFxuICAgIGdldFByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QucHJvamVjdFRpdGxlID09PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxuICBcbiAgICBpc0luUHJvamVjdExpYnJhcnkocHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLnNvbWUoKHByb2plY3QpID0+IHByb2plY3QucHJvamVjdFRpdGxlID09PSBwcm9qZWN0VGl0bGUpXG4gICAgfVxufVxuXG5jb25zdCBwcm9qZWN0TGlicmFyeSA9IG5ldyBQcm9qZWN0TGlicmFyeSgpXG5cbmNvbnN0IGNyZWF0ZUlucHV0QmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXdJdGVtQmFyLmNsYXNzTGlzdC5hZGQoJ25ld0l0ZW1CYXInKTtcblxuICAgIG5ld0l0ZW1CYXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRGb3JtKCkpO1xuICAgIHJldHVybiBuZXdJdGVtQmFyXG59XG5cbmNvbnN0IHRpdGxlSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIG5ld0l0ZW1JbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgbmV3SXRlbUlucHV0Lm5hbWUgPSAnaXRlbVRpdGxlJztcbiAgICBuZXdJdGVtSW5wdXQuaWQgPSAnaXRlbVRpdGxlJztcbiAgICBuZXdJdGVtSW5wdXQucGxhY2Vob2xkZXIgPSAnVGl0bGUnO1xuXG4gICAgcmV0dXJuIG5ld0l0ZW1JbnB1dFxufVxuXG5jb25zdCBwcm9qZWN0SW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3UHJvamVjdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBuZXdQcm9qZWN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBuZXdQcm9qZWN0SW5wdXQubmFtZSA9ICdwcm9qZWN0VGl0bGUnO1xuICAgIG5ld1Byb2plY3RJbnB1dC5pZCA9ICdwcm9qZWN0VGl0bGUnO1xuICAgIG5ld1Byb2plY3RJbnB1dC5wbGFjZWhvbGRlciA9ICdQcm9qZWN0JztcbiAgICBcbiAgICByZXR1cm4gbmV3UHJvamVjdElucHV0XG59XG5cbmNvbnN0IGR1ZURhdGVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBkdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgZHVlRGF0ZS5uYW1lID0gJ2R1ZURhdGUnO1xuICAgIGR1ZURhdGUuaWQgPSAnZHVlRGF0ZSc7XG5cbiAgICByZXR1cm4gZHVlRGF0ZVxufVxuXG5jb25zdCBkZXNjcmlwdGlvbklucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICBkZXNjcmlwdGlvbi5uYW1lID0gJ2l0ZW1EZXNjcmlwdGlvbic7XG4gICAgZGVzY3JpcHRpb24uaWQgPSAnaXRlbURlc2NyaXB0aW9uJztcbiAgICBkZXNjcmlwdGlvbi5jb2xzID0gJzMwJztcbiAgICBkZXNjcmlwdGlvbi5yb3dzID0gJzEwJztcbiAgICBkZXNjcmlwdGlvbi5wbGFjZWhvbGRlciA9ICdEZXNjcmlwdGlvbic7XG5cbiAgICByZXR1cm4gZGVzY3JpcHRpb25cbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgSXRlbSc7XG4gICAgYWRkQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICByZXR1cm4gYWRkQnV0dG9uXG59XG5cbmNvbnN0IGNyZWF0ZUl0ZW1Gcm9tSW5wdXQgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBpdGVtVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXRlbVRpdGxlJykudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RUaXRsZScpLnZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdWVEYXRlJykudmFsdWU7XG4gICAgY29uc3QgaXRlbURlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW1EZXNjcmlwdGlvbicpLnZhbHVlO1xuXG4gICAgaW5wdXRGb3JtLnJlc2V0KCk7XG5cbiAgICByZXR1cm4gbmV3IEl0ZW0oaXRlbVRpdGxlLCBwcm9qZWN0VGl0bGUsIGR1ZURhdGUsIGl0ZW1EZXNjcmlwdGlvbilcbn1cblxuY29uc3QgYWRkSXRlbSA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgbmV3SXRlbSA9IGNyZWF0ZUl0ZW1Gcm9tSW5wdXQoKTtcblxuICAgIGlmIChuZXdJdGVtLml0ZW1UaXRsZSA9PSAnJyB8fCBuZXdJdGVtLnByb2plY3RUaXRsZSA9PSAnJykge1xuICAgICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKHByb2plY3RMaWJyYXJ5LmlzSW5Qcm9qZWN0TGlicmFyeShuZXdJdGVtLnByb2plY3RUaXRsZSkpe1xuICAgICAgICBwcm9qZWN0TGlicmFyeS5nZXRQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKS5hZGRJdGVtKG5ld0l0ZW0pO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0TGlicmFyeSlcbiAgICB9IGVsc2UgaWYgKCFwcm9qZWN0TGlicmFyeS5pc0luUHJvamVjdExpYnJhcnkobmV3SXRlbS5wcm9qZWN0VGl0bGUpKXtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5ld0l0ZW0ucHJvamVjdFRpdGxlKTtcbiAgICAgICAgcHJvamVjdC5hZGRJdGVtKG5ld0l0ZW0pO1xuICAgICAgICBwcm9qZWN0TGlicmFyeS5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICB1cGRhdGVQcm9qZWN0QXJlYShwcm9qZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RMaWJyYXJ5KVxuICAgIH1cbn1cblxuY29uc3QgY3JlYXRlQ2xlYXJCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjbGVhckJ1dHRvbi50ZXh0Q29udGVudCA9ICdDbGVhcic7XG4gICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdoZWxsbycpXG4gICAgICAgIGlucHV0Rm9ybS5yZXNldCgpO1xuICAgIH0pXG5cbiAgICByZXR1cm4gY2xlYXJCdXR0b25cbn1cblxuY29uc3QgY3JlYXRlSW5wdXRGb3JtID0gKCkgPT4ge1xuICAgIGNvbnN0IGlucHV0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBpbnB1dEZvcm0uY2xhc3NMaXN0LmFkZCgnbmV3SXRlbUZvcm0nKTtcbiAgICBpbnB1dEZvcm0uc2V0QXR0cmlidXRlKCdpZCcsJ2lucHV0Rm9ybScpO1xuICAgIC8vIGlucHV0Rm9ybS5vbnN1Ym1pdCA9IGNyZWF0ZUl0ZW1Gcm9tSW5wdXQ7XG4gICAgaW5wdXRGb3JtLm9uc3VibWl0ID0gYWRkSXRlbTtcblxuXG4gICAgY29uc3QgbmV3SXRlbUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBuZXdJdGVtSGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBOZXcgSXRlbSdcblxuICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChuZXdJdGVtSGVhZGVyKTtcblxuICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZCh0aXRsZUlucHV0KCkpO1xuICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChwcm9qZWN0SW5wdXQoKSk7XG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGR1ZURhdGVJbnB1dCgpKTtcbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dCgpKTtcbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoY3JlYXRlQWRkQnV0dG9uKCkpO1xuICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChjcmVhdGVDbGVhckJ1dHRvbigpKTtcblxuICAgIHJldHVybiBpbnB1dEZvcm1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVJbnB1dEJhciIsImNvbnN0IGNyZWF0ZVNpZGVCYXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2lkZUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNpZGVCYXIuY2xhc3NMaXN0LmFkZCgnc2lkZUJhcicpO1xuXG4gICAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGhvbWVCdXR0b24udGV4dENvbnRlbnQgPSAnSG9tZSc7XG4gICAgY29uc3QgdG9kYXlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICB0b2RheUJ1dHRvbi50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gICAgY29uc3Qgd2Vla0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHdlZWtCdXR0b24udGV4dENvbnRlbnQgPSAnVGhpcyBXZWVrJ1xuXG4gICAgc2lkZUJhci5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcbiAgICBzaWRlQmFyLmFwcGVuZENoaWxkKHRvZGF5QnV0dG9uKTtcbiAgICBzaWRlQmFyLmFwcGVuZENoaWxkKHdlZWtCdXR0b24pO1xuICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQoY3JlYXRlUHJvamVjdEFyZWEoKSk7XG5cbiAgICByZXR1cm4gc2lkZUJhclxufVxuXG5jb25zdCBjcmVhdGVQcm9qZWN0QXJlYSA9ICgpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHByb2plY3RBcmVhLnNldEF0dHJpYnV0ZSgnaWQnLCdwcm9qZWN0QXJlYScpO1xuICAgIGNvbnN0IHByb2plY3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHByb2plY3RIZWFkaW5nLnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcblxuICAgIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKHByb2plY3RIZWFkaW5nKTtcblxuICAgIHJldHVybiBwcm9qZWN0QXJlYVxufVxuXG5jb25zdCB1cGRhdGVQcm9qZWN0QXJlYSA9IChwcm9qVGl0bGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0QXJlYScpO1xuXG4gICAgY29uc3QgbmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIG5ld1Byb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qVGl0bGU7XG5cbiAgICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnV0dG9uKTtcbiAgICByZXR1cm4gcHJvamVjdEFyZWFcbn1cblxuXG5leHBvcnQge2NyZWF0ZVNpZGVCYXIsIHVwZGF0ZVByb2plY3RBcmVhfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemVXZWJzaXRlIGZyb20gXCIuL2luaXRXZWJzaXRlXCI7XG5cbmluaXRpYWxpemVXZWJzaXRlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9