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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// class Item {
//     constructor(
//         itemTitle = "unknown",
//         itemProject = "unknown",
//         itemDueDate = "unknown",
//         itemDescription = "unknown"
//     ){
//         this.itemTitle = itemTitle
//         this.itemProject = itemProject
//         this.itemDueDate = itemDueDate
//         this.itemDescription = itemDescription
//     }
// }

// class Project {
//     constructor(){
//         this.itmes = [];
//     }
//     addItem(newItem) {
//         if (!this.isInProject(newItem)) {
//         this.items.push(newItem)
//         }
//     }
  
//     removeItem(itemTitle) {
//         this.items = this.items.filter((item) => item.itemTitle !== itemTitle)
//     }
  
//     getItem(itemTitle) {
//         return this.items.find((item) => item.itemTitle === itemTitle)
//     }
  
//     isInProject(newItem) {
//         return this.items.some((item) => item.itemTitle === newItem.itemTitle)
//     }
// }

// class projectLibrary {
//     constructor() {
//         this.projects = []
//     }
  
//     addProject(newProject) {
//         if (!this.isInProjectLibrary(newProject)) {
//         this.projects.push(newProjet)
//         }
//     }
  
//     removeProject(projectTitle) {
//         this.projects = this.projects.filter((project) => project.projectTitle !== projectTitle)
//     }
  
//     getProject(projectTitle) {
//         return this.projects.find((project) => project.projectTitle === projectTitle)
//     }
  
//     isInProjectLibrary(newProject) {
//         return this.projects.some((project) => project.projectTitle === newProject.projectTitle)
//     }
// }

// const projectLibrary = new projectLibrary()

const createDisplayArea = () => {
    const displayArea = document.createElement('div');
    displayArea.setAttribute('id', 'displayArea');

    return displayArea
}

// const updateDisplayArea = (newProject) => {
//     const displayArea = document.getElementById('displayArea');

//     const projectTile = document.createElement('div');
//     projectTile.classList.add('projectTile');

//     const projectHeader = document.createElement('h3');
//     // projectHeader.textContent = newProject.

//     projectTile.appendChild(projectHeader);
//     displayArea.appendChild(projectTile);

//     return displayArea
// }

// const createProjectTile = () => {
//     const projectTile = document.createElement('div');
//     projectTile.setAttribute('id', 'projectTile');
    
//     return projectTile
// }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDisplayArea);

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
    container.appendChild((0,_sideBar__WEBPACK_IMPORTED_MODULE_1__["default"])());
    container.appendChild((0,_display__WEBPACK_IMPORTED_MODULE_2__["default"])());
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

    return addButton
}

const createClearButton = () => {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';

    return clearButton
}

const createInputForm = () => {
    const inputForm = document.createElement('div');
    inputForm.classList.add('newItemForm');

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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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

// const updateProjectArea = (projTitle) => {
//     const projectArea = document.getElementById('projectArea');

//     const newProjectButton = document.createElement('button');
//     newProjectButton.textContent = projTitle;

//     projectArea.appendChild(newProjectButton);
//     return projectArea
// }

// export {createSideBar, updateProjectArea};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSideBar);

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

console.log('hello')
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7QUM1RmY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BzQztBQUNBO0FBQ0k7QUFDTDs7O0FBR3JDOzs7O0FBSUE7QUFDQTs7O0FBR0EsMEJBQTBCLHFEQUFZO0FBQ3RDLDBCQUEwQixvREFBYTtBQUN2QywwQkFBMEIsb0RBQWlCO0FBQzNDLDBCQUEwQixrREFBYzs7QUFFeEM7O0FBRUEsaUVBQWUsaUJBQWlCOzs7Ozs7Ozs7Ozs7OztBQ3JCaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLGlFQUFlOzs7Ozs7Ozs7Ozs7OztBQ2xGZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVzs7QUFFWCxpRUFBZTs7Ozs7O1VDMUNmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEM7O0FBRTlDLHdEQUFpQjs7QUFFakIsb0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2hlYWRlci5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbml0V2Vic2l0ZS5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbnB1dC5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zaWRlQmFyLmpzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY2xhc3MgSXRlbSB7XG4vLyAgICAgY29uc3RydWN0b3IoXG4vLyAgICAgICAgIGl0ZW1UaXRsZSA9IFwidW5rbm93blwiLFxuLy8gICAgICAgICBpdGVtUHJvamVjdCA9IFwidW5rbm93blwiLFxuLy8gICAgICAgICBpdGVtRHVlRGF0ZSA9IFwidW5rbm93blwiLFxuLy8gICAgICAgICBpdGVtRGVzY3JpcHRpb24gPSBcInVua25vd25cIlxuLy8gICAgICl7XG4vLyAgICAgICAgIHRoaXMuaXRlbVRpdGxlID0gaXRlbVRpdGxlXG4vLyAgICAgICAgIHRoaXMuaXRlbVByb2plY3QgPSBpdGVtUHJvamVjdFxuLy8gICAgICAgICB0aGlzLml0ZW1EdWVEYXRlID0gaXRlbUR1ZURhdGVcbi8vICAgICAgICAgdGhpcy5pdGVtRGVzY3JpcHRpb24gPSBpdGVtRGVzY3JpcHRpb25cbi8vICAgICB9XG4vLyB9XG5cbi8vIGNsYXNzIFByb2plY3Qge1xuLy8gICAgIGNvbnN0cnVjdG9yKCl7XG4vLyAgICAgICAgIHRoaXMuaXRtZXMgPSBbXTtcbi8vICAgICB9XG4vLyAgICAgYWRkSXRlbShuZXdJdGVtKSB7XG4vLyAgICAgICAgIGlmICghdGhpcy5pc0luUHJvamVjdChuZXdJdGVtKSkge1xuLy8gICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3SXRlbSlcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbiAgXG4vLyAgICAgcmVtb3ZlSXRlbShpdGVtVGl0bGUpIHtcbi8vICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLml0ZW1UaXRsZSAhPT0gaXRlbVRpdGxlKVxuLy8gICAgIH1cbiAgXG4vLyAgICAgZ2V0SXRlbShpdGVtVGl0bGUpIHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pdGVtVGl0bGUgPT09IGl0ZW1UaXRsZSlcbi8vICAgICB9XG4gIFxuLy8gICAgIGlzSW5Qcm9qZWN0KG5ld0l0ZW0pIHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5pdGVtVGl0bGUgPT09IG5ld0l0ZW0uaXRlbVRpdGxlKVxuLy8gICAgIH1cbi8vIH1cblxuLy8gY2xhc3MgcHJvamVjdExpYnJhcnkge1xuLy8gICAgIGNvbnN0cnVjdG9yKCkge1xuLy8gICAgICAgICB0aGlzLnByb2plY3RzID0gW11cbi8vICAgICB9XG4gIFxuLy8gICAgIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuLy8gICAgICAgICBpZiAoIXRoaXMuaXNJblByb2plY3RMaWJyYXJ5KG5ld1Byb2plY3QpKSB7XG4vLyAgICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZXQpXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4gIFxuLy8gICAgIHJlbW92ZVByb2plY3QocHJvamVjdFRpdGxlKSB7XG4vLyAgICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0VGl0bGUgIT09IHByb2plY3RUaXRsZSlcbi8vICAgICB9XG4gIFxuLy8gICAgIGdldFByb2plY3QocHJvamVjdFRpdGxlKSB7XG4vLyAgICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QucHJvamVjdFRpdGxlID09PSBwcm9qZWN0VGl0bGUpXG4vLyAgICAgfVxuICBcbi8vICAgICBpc0luUHJvamVjdExpYnJhcnkobmV3UHJvamVjdCkge1xuLy8gICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RUaXRsZSA9PT0gbmV3UHJvamVjdC5wcm9qZWN0VGl0bGUpXG4vLyAgICAgfVxuLy8gfVxuXG4vLyBjb25zdCBwcm9qZWN0TGlicmFyeSA9IG5ldyBwcm9qZWN0TGlicmFyeSgpXG5cbmNvbnN0IGNyZWF0ZURpc3BsYXlBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGlzcGxheUFyZWEuc2V0QXR0cmlidXRlKCdpZCcsICdkaXNwbGF5QXJlYScpO1xuXG4gICAgcmV0dXJuIGRpc3BsYXlBcmVhXG59XG5cbi8vIGNvbnN0IHVwZGF0ZURpc3BsYXlBcmVhID0gKG5ld1Byb2plY3QpID0+IHtcbi8vICAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXNwbGF5QXJlYScpO1xuXG4vLyAgICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICBwcm9qZWN0VGlsZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0VGlsZScpO1xuXG4vLyAgICAgY29uc3QgcHJvamVjdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4vLyAgICAgLy8gcHJvamVjdEhlYWRlci50ZXh0Q29udGVudCA9IG5ld1Byb2plY3QuXG5cbi8vICAgICBwcm9qZWN0VGlsZS5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGVyKTtcbi8vICAgICBkaXNwbGF5QXJlYS5hcHBlbmRDaGlsZChwcm9qZWN0VGlsZSk7XG5cbi8vICAgICByZXR1cm4gZGlzcGxheUFyZWFcbi8vIH1cblxuLy8gY29uc3QgY3JlYXRlUHJvamVjdFRpbGUgPSAoKSA9PiB7XG4vLyAgICAgY29uc3QgcHJvamVjdFRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICBwcm9qZWN0VGlsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3Byb2plY3RUaWxlJyk7XG4gICAgXG4vLyAgICAgcmV0dXJuIHByb2plY3RUaWxlXG4vLyB9XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpc3BsYXlBcmVhIiwiY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlckJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGhlYWRlckJhci5jbGFzc0xpc3QuYWRkKCdoZWFkZXInKTtcblxuICAgIGhlYWRlckJhci50ZXh0Q29udGVudCA9IFwiVG8tRG9cIlxuICAgIFxuICAgIHJldHVybiBoZWFkZXJCYXJcbn1cblxuZXhwb3J0IHtjcmVhdGVIZWFkZXJ9IiwiaW1wb3J0IHtjcmVhdGVIZWFkZXJ9IGZyb20gXCIuL2hlYWRlclwiO1xuaW1wb3J0IGNyZWF0ZVNpZGVCYXIgZnJvbSBcIi4vc2lkZUJhclwiO1xuaW1wb3J0IGNyZWF0ZURpc3BsYXlBcmVhIGZyb20gXCIuL2Rpc3BsYXlcIjtcbmltcG9ydCBjcmVhdGVJbnB1dEJhciBmcm9tIFwiLi9pbnB1dFwiO1xuXG5cbi8vb25jZSBpIGFkZCBsb2cgaW4gaW5mb3JtYXRpb24gaSBzaG91bGQgbWFrZSBhbm90aGVyIGpzIHNjcmlwdCBmb3IgbWFraW5nIHRoZSBoZWFkZXIgXG5cblxuXG5jb25zdCBpbml0aWFsaXplV2Vic2l0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG5cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVIZWFkZXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVNpZGVCYXIoKSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZURpc3BsYXlBcmVhKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVJbnB1dEJhcigpKTtcblxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0aWFsaXplV2Vic2l0ZTsiLCJjb25zdCBjcmVhdGVJbnB1dEJhciA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdJdGVtQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3SXRlbUJhci5jbGFzc0xpc3QuYWRkKCduZXdJdGVtQmFyJyk7XG5cbiAgICBuZXdJdGVtQmFyLmFwcGVuZENoaWxkKGNyZWF0ZUlucHV0Rm9ybSgpKTtcbiAgICByZXR1cm4gbmV3SXRlbUJhclxufVxuXG5jb25zdCB0aXRsZUlucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBuZXdJdGVtSW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIG5ld0l0ZW1JbnB1dC5uYW1lID0gJ2l0ZW1UaXRsZSc7XG4gICAgbmV3SXRlbUlucHV0LmlkID0gJ2l0ZW1UaXRsZSc7XG4gICAgbmV3SXRlbUlucHV0LnBsYWNlaG9sZGVyID0gJ1RpdGxlJztcblxuICAgIHJldHVybiBuZXdJdGVtSW5wdXRcbn1cblxuY29uc3QgcHJvamVjdElucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1Byb2plY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbmV3UHJvamVjdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgbmV3UHJvamVjdElucHV0Lm5hbWUgPSAncHJvamVjdFRpdGxlJztcbiAgICBuZXdQcm9qZWN0SW5wdXQuaWQgPSAncHJvamVjdFRpdGxlJztcbiAgICBuZXdQcm9qZWN0SW5wdXQucGxhY2Vob2xkZXIgPSAnUHJvamVjdCc7XG4gICAgXG4gICAgcmV0dXJuIG5ld1Byb2plY3RJbnB1dFxufVxuXG5jb25zdCBkdWVEYXRlSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgZHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgIGR1ZURhdGUubmFtZSA9ICdkdWVEYXRlJztcbiAgICBkdWVEYXRlLmlkID0gJ2R1ZURhdGUnO1xuXG4gICAgcmV0dXJuIGR1ZURhdGVcbn1cblxuY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgZGVzY3JpcHRpb24ubmFtZSA9ICdpdGVtRGVzY3JpcHRpb24nO1xuICAgIGRlc2NyaXB0aW9uLmlkID0gJ2l0ZW1EZXNjcmlwdGlvbic7XG4gICAgZGVzY3JpcHRpb24uY29scyA9ICczMCc7XG4gICAgZGVzY3JpcHRpb24ucm93cyA9ICcxMCc7XG4gICAgZGVzY3JpcHRpb24ucGxhY2Vob2xkZXIgPSAnRGVzY3JpcHRpb24nO1xuXG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uXG59XG5cbmNvbnN0IGNyZWF0ZUFkZEJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkIEl0ZW0nO1xuXG4gICAgcmV0dXJuIGFkZEJ1dHRvblxufVxuXG5jb25zdCBjcmVhdGVDbGVhckJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCBjbGVhckJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNsZWFyQnV0dG9uLnRleHRDb250ZW50ID0gJ0NsZWFyJztcblxuICAgIHJldHVybiBjbGVhckJ1dHRvblxufVxuXG5jb25zdCBjcmVhdGVJbnB1dEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRGb3JtLmNsYXNzTGlzdC5hZGQoJ25ld0l0ZW1Gb3JtJyk7XG5cbiAgICBjb25zdCBuZXdJdGVtSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG5ld0l0ZW1IZWFkZXIudGV4dENvbnRlbnQgPSAnQWRkIE5ldyBJdGVtJ1xuXG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKG5ld0l0ZW1IZWFkZXIpO1xuXG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKHRpdGxlSW5wdXQoKSk7XG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKHByb2plY3RJbnB1dCgpKTtcbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoZHVlRGF0ZUlucHV0KCkpO1xuICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KCkpO1xuICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChjcmVhdGVBZGRCdXR0b24oKSk7XG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGNyZWF0ZUNsZWFyQnV0dG9uKCkpO1xuXG4gICAgcmV0dXJuIGlucHV0Rm9ybVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUlucHV0QmFyIiwiY29uc3QgY3JlYXRlU2lkZUJhciA9ICgpID0+IHtcbiAgICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2lkZUJhci5jbGFzc0xpc3QuYWRkKCdzaWRlQmFyJyk7XG5cbiAgICBjb25zdCBob21lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgaG9tZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdIb21lJztcbiAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRvZGF5QnV0dG9uLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICBjb25zdCB3ZWVrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgd2Vla0J1dHRvbi50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnXG5cbiAgICBzaWRlQmFyLmFwcGVuZENoaWxkKGhvbWVCdXR0b24pO1xuICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQodG9kYXlCdXR0b24pO1xuICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQod2Vla0J1dHRvbik7XG4gICAgc2lkZUJhci5hcHBlbmRDaGlsZChjcmVhdGVQcm9qZWN0QXJlYSgpKTtcblxuICAgIHJldHVybiBzaWRlQmFyXG59XG5cbmNvbnN0IGNyZWF0ZVByb2plY3RBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdEFyZWEuc2V0QXR0cmlidXRlKCdpZCcsJ3Byb2plY3RBcmVhJyk7XG4gICAgY29uc3QgcHJvamVjdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgcHJvamVjdEhlYWRpbmcudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuXG4gICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRpbmcpO1xuXG4gICAgcmV0dXJuIHByb2plY3RBcmVhXG59XG5cbi8vIGNvbnN0IHVwZGF0ZVByb2plY3RBcmVhID0gKHByb2pUaXRsZSkgPT4ge1xuLy8gICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RBcmVhJyk7XG5cbi8vICAgICBjb25zdCBuZXdQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4vLyAgICAgbmV3UHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2pUaXRsZTtcblxuLy8gICAgIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdXR0b24pO1xuLy8gICAgIHJldHVybiBwcm9qZWN0QXJlYVxuLy8gfVxuXG4vLyBleHBvcnQge2NyZWF0ZVNpZGVCYXIsIHVwZGF0ZVByb2plY3RBcmVhfTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2lkZUJhciIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemVXZWJzaXRlIGZyb20gXCIuL2luaXRXZWJzaXRlXCI7XG5cbmluaXRpYWxpemVXZWJzaXRlKCk7XG5cbmNvbnNvbGUubG9nKCdoZWxsbycpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9