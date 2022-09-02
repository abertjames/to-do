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
class Item {
    constructor(
        itemTitle = "unknown",
        itemProject = "unknown",
        itemDueDate = "unknown",
        itemDescription = "unknown"
    ){
        this.itemTitle = itemTitle
        this.itemProject = itemProject
        this.itemDueDate = itemDueDate
        this.itemDescription = itemDescription
    }
}

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
    // addButton.type = 'submit';
    addButton.addEventListener('click', () => {
        createItemFromInput();
    })
    return addButton
}

const createItemFromInput = (e) => {
    // e.preventDefault();

    // const itemTitle = document.getElementById('itemTitle').value;
    // const projectTitle = document.getElementById('projectTitle').value.toLowerCase();
    // const dueDate = document.getElementById('dueDate').value;
    // const itemDescription = document.getElementById('itemDescription').value;

    console.log('hello')

    // return new Item(itemTitle, projectTitle, dueDate, itemDescription)
}

const createClearButton = () => {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', () => {
        console.log('hello')
    })

    return clearButton
}

const createInputForm = () => {
    const inputForm = document.createElement('div');
    inputForm.classList.add('newItemForm');
    // inputForm.onSubmit = createItemFromInput(event);
    // inputForm.onSubmit = console.log('hello');


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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7O0FDN0JmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQc0M7QUFDQTtBQUNJO0FBQ0w7OztBQUdyQzs7OztBQUlBO0FBQ0E7OztBQUdBLDBCQUEwQixxREFBWTtBQUN0QywwQkFBMEIsb0RBQWE7QUFDdkMsMEJBQTBCLG9EQUFpQjtBQUMzQywwQkFBMEIsa0RBQWM7O0FBRXhDOztBQUVBLGlFQUFlLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7QUNyQmhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7QUN0S2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7O0FBRVgsaUVBQWU7Ozs7OztVQzFDZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjhDOztBQUU5Qyx3REFBaUIsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zcmMvaGVhZGVyLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2luaXRXZWJzaXRlLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL2lucHV0LmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL3NpZGVCYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcmVhdGVEaXNwbGF5QXJlYSA9ICgpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpc3BsYXlBcmVhLnNldEF0dHJpYnV0ZSgnaWQnLCAnZGlzcGxheUFyZWEnKTtcblxuICAgIHJldHVybiBkaXNwbGF5QXJlYVxufVxuXG4vLyBjb25zdCB1cGRhdGVEaXNwbGF5QXJlYSA9IChuZXdQcm9qZWN0KSA9PiB7XG4vLyAgICAgY29uc3QgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheUFyZWEnKTtcblxuLy8gICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgICAgcHJvamVjdFRpbGUuY2xhc3NMaXN0LmFkZCgncHJvamVjdFRpbGUnKTtcblxuLy8gICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuLy8gICAgIC8vIHByb2plY3RIZWFkZXIudGV4dENvbnRlbnQgPSBuZXdQcm9qZWN0LlxuXG4vLyAgICAgcHJvamVjdFRpbGUuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRlcik7XG4vLyAgICAgZGlzcGxheUFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdFRpbGUpO1xuXG4vLyAgICAgcmV0dXJuIGRpc3BsYXlBcmVhXG4vLyB9XG5cbi8vIGNvbnN0IGNyZWF0ZVByb2plY3RUaWxlID0gKCkgPT4ge1xuLy8gICAgIGNvbnN0IHByb2plY3RUaWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgICAgcHJvamVjdFRpbGUuc2V0QXR0cmlidXRlKCdpZCcsICdwcm9qZWN0VGlsZScpO1xuICAgIFxuLy8gICAgIHJldHVybiBwcm9qZWN0VGlsZVxuLy8gfVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXNwbGF5QXJlYSIsImNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXJCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBoZWFkZXJCYXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJyk7XG5cbiAgICBoZWFkZXJCYXIudGV4dENvbnRlbnQgPSBcIlRvLURvXCJcbiAgICBcbiAgICByZXR1cm4gaGVhZGVyQmFyXG59XG5cbmV4cG9ydCB7Y3JlYXRlSGVhZGVyfSIsImltcG9ydCB7Y3JlYXRlSGVhZGVyfSBmcm9tIFwiLi9oZWFkZXJcIjtcbmltcG9ydCBjcmVhdGVTaWRlQmFyIGZyb20gXCIuL3NpZGVCYXJcIjtcbmltcG9ydCBjcmVhdGVEaXNwbGF5QXJlYSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5pbXBvcnQgY3JlYXRlSW5wdXRCYXIgZnJvbSBcIi4vaW5wdXRcIjtcblxuXG4vL29uY2UgaSBhZGQgbG9nIGluIGluZm9ybWF0aW9uIGkgc2hvdWxkIG1ha2UgYW5vdGhlciBqcyBzY3JpcHQgZm9yIG1ha2luZyB0aGUgaGVhZGVyIFxuXG5cblxuY29uc3QgaW5pdGlhbGl6ZVdlYnNpdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuXG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSGVhZGVyKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVTaWRlQmFyKCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVEaXNwbGF5QXJlYSgpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRCYXIoKSk7XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdGlhbGl6ZVdlYnNpdGU7IiwiY2xhc3MgSXRlbSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGl0ZW1UaXRsZSA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtUHJvamVjdCA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtRHVlRGF0ZSA9IFwidW5rbm93blwiLFxuICAgICAgICBpdGVtRGVzY3JpcHRpb24gPSBcInVua25vd25cIlxuICAgICl7XG4gICAgICAgIHRoaXMuaXRlbVRpdGxlID0gaXRlbVRpdGxlXG4gICAgICAgIHRoaXMuaXRlbVByb2plY3QgPSBpdGVtUHJvamVjdFxuICAgICAgICB0aGlzLml0ZW1EdWVEYXRlID0gaXRlbUR1ZURhdGVcbiAgICAgICAgdGhpcy5pdGVtRGVzY3JpcHRpb24gPSBpdGVtRGVzY3JpcHRpb25cbiAgICB9XG59XG5cbi8vIGNsYXNzIFByb2plY3Qge1xuLy8gICAgIGNvbnN0cnVjdG9yKCl7XG4vLyAgICAgICAgIHRoaXMuaXRtZXMgPSBbXTtcbi8vICAgICB9XG4vLyAgICAgYWRkSXRlbShuZXdJdGVtKSB7XG4vLyAgICAgICAgIGlmICghdGhpcy5pc0luUHJvamVjdChuZXdJdGVtKSkge1xuLy8gICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3SXRlbSlcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbiAgXG4vLyAgICAgcmVtb3ZlSXRlbShpdGVtVGl0bGUpIHtcbi8vICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLml0ZW1UaXRsZSAhPT0gaXRlbVRpdGxlKVxuLy8gICAgIH1cbiAgXG4vLyAgICAgZ2V0SXRlbShpdGVtVGl0bGUpIHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pdGVtVGl0bGUgPT09IGl0ZW1UaXRsZSlcbi8vICAgICB9XG4gIFxuLy8gICAgIGlzSW5Qcm9qZWN0KG5ld0l0ZW0pIHtcbi8vICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuc29tZSgoaXRlbSkgPT4gaXRlbS5pdGVtVGl0bGUgPT09IG5ld0l0ZW0uaXRlbVRpdGxlKVxuLy8gICAgIH1cbi8vIH1cblxuLy8gY2xhc3MgcHJvamVjdExpYnJhcnkge1xuLy8gICAgIGNvbnN0cnVjdG9yKCkge1xuLy8gICAgICAgICB0aGlzLnByb2plY3RzID0gW11cbi8vICAgICB9XG4gIFxuLy8gICAgIGFkZFByb2plY3QobmV3UHJvamVjdCkge1xuLy8gICAgICAgICBpZiAoIXRoaXMuaXNJblByb2plY3RMaWJyYXJ5KG5ld1Byb2plY3QpKSB7XG4vLyAgICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZXQpXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4gIFxuLy8gICAgIHJlbW92ZVByb2plY3QocHJvamVjdFRpdGxlKSB7XG4vLyAgICAgICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4gcHJvamVjdC5wcm9qZWN0VGl0bGUgIT09IHByb2plY3RUaXRsZSlcbi8vICAgICB9XG4gIFxuLy8gICAgIGdldFByb2plY3QocHJvamVjdFRpdGxlKSB7XG4vLyAgICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QucHJvamVjdFRpdGxlID09PSBwcm9qZWN0VGl0bGUpXG4vLyAgICAgfVxuICBcbi8vICAgICBpc0luUHJvamVjdExpYnJhcnkobmV3UHJvamVjdCkge1xuLy8gICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5zb21lKChwcm9qZWN0KSA9PiBwcm9qZWN0LnByb2plY3RUaXRsZSA9PT0gbmV3UHJvamVjdC5wcm9qZWN0VGl0bGUpXG4vLyAgICAgfVxuLy8gfVxuXG4vLyBjb25zdCBwcm9qZWN0TGlicmFyeSA9IG5ldyBwcm9qZWN0TGlicmFyeSgpXG5cbmNvbnN0IGNyZWF0ZUlucHV0QmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld0l0ZW1CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBuZXdJdGVtQmFyLmNsYXNzTGlzdC5hZGQoJ25ld0l0ZW1CYXInKTtcblxuICAgIG5ld0l0ZW1CYXIuYXBwZW5kQ2hpbGQoY3JlYXRlSW5wdXRGb3JtKCkpO1xuICAgIHJldHVybiBuZXdJdGVtQmFyXG59XG5cbmNvbnN0IHRpdGxlSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3SXRlbUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIG5ld0l0ZW1JbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgbmV3SXRlbUlucHV0Lm5hbWUgPSAnaXRlbVRpdGxlJztcbiAgICBuZXdJdGVtSW5wdXQuaWQgPSAnaXRlbVRpdGxlJztcbiAgICBuZXdJdGVtSW5wdXQucGxhY2Vob2xkZXIgPSAnVGl0bGUnO1xuXG4gICAgcmV0dXJuIG5ld0l0ZW1JbnB1dFxufVxuXG5jb25zdCBwcm9qZWN0SW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3UHJvamVjdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBuZXdQcm9qZWN0SW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBuZXdQcm9qZWN0SW5wdXQubmFtZSA9ICdwcm9qZWN0VGl0bGUnO1xuICAgIG5ld1Byb2plY3RJbnB1dC5pZCA9ICdwcm9qZWN0VGl0bGUnO1xuICAgIG5ld1Byb2plY3RJbnB1dC5wbGFjZWhvbGRlciA9ICdQcm9qZWN0JztcbiAgICBcbiAgICByZXR1cm4gbmV3UHJvamVjdElucHV0XG59XG5cbmNvbnN0IGR1ZURhdGVJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBkdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgZHVlRGF0ZS5uYW1lID0gJ2R1ZURhdGUnO1xuICAgIGR1ZURhdGUuaWQgPSAnZHVlRGF0ZSc7XG5cbiAgICByZXR1cm4gZHVlRGF0ZVxufVxuXG5jb25zdCBkZXNjcmlwdGlvbklucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICBkZXNjcmlwdGlvbi5uYW1lID0gJ2l0ZW1EZXNjcmlwdGlvbic7XG4gICAgZGVzY3JpcHRpb24uaWQgPSAnaXRlbURlc2NyaXB0aW9uJztcbiAgICBkZXNjcmlwdGlvbi5jb2xzID0gJzMwJztcbiAgICBkZXNjcmlwdGlvbi5yb3dzID0gJzEwJztcbiAgICBkZXNjcmlwdGlvbi5wbGFjZWhvbGRlciA9ICdEZXNjcmlwdGlvbic7XG5cbiAgICByZXR1cm4gZGVzY3JpcHRpb25cbn1cblxuY29uc3QgY3JlYXRlQWRkQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGFkZEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgSXRlbSc7XG4gICAgLy8gYWRkQnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICBhZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZUl0ZW1Gcm9tSW5wdXQoKTtcbiAgICB9KVxuICAgIHJldHVybiBhZGRCdXR0b25cbn1cblxuY29uc3QgY3JlYXRlSXRlbUZyb21JbnB1dCA9IChlKSA9PiB7XG4gICAgLy8gZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gY29uc3QgaXRlbVRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2l0ZW1UaXRsZScpLnZhbHVlO1xuICAgIC8vIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0VGl0bGUnKS52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIC8vIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVlRGF0ZScpLnZhbHVlO1xuICAgIC8vIGNvbnN0IGl0ZW1EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtRGVzY3JpcHRpb24nKS52YWx1ZTtcblxuICAgIGNvbnNvbGUubG9nKCdoZWxsbycpXG5cbiAgICAvLyByZXR1cm4gbmV3IEl0ZW0oaXRlbVRpdGxlLCBwcm9qZWN0VGl0bGUsIGR1ZURhdGUsIGl0ZW1EZXNjcmlwdGlvbilcbn1cblxuY29uc3QgY3JlYXRlQ2xlYXJCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3QgY2xlYXJCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjbGVhckJ1dHRvbi50ZXh0Q29udGVudCA9ICdDbGVhcic7XG4gICAgY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoZWxsbycpXG4gICAgfSlcblxuICAgIHJldHVybiBjbGVhckJ1dHRvblxufVxuXG5jb25zdCBjcmVhdGVJbnB1dEZvcm0gPSAoKSA9PiB7XG4gICAgY29uc3QgaW5wdXRGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5wdXRGb3JtLmNsYXNzTGlzdC5hZGQoJ25ld0l0ZW1Gb3JtJyk7XG4gICAgLy8gaW5wdXRGb3JtLm9uU3VibWl0ID0gY3JlYXRlSXRlbUZyb21JbnB1dChldmVudCk7XG4gICAgLy8gaW5wdXRGb3JtLm9uU3VibWl0ID0gY29uc29sZS5sb2coJ2hlbGxvJyk7XG5cblxuICAgIGNvbnN0IG5ld0l0ZW1IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbmV3SXRlbUhlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgTmV3IEl0ZW0nXG5cbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQobmV3SXRlbUhlYWRlcik7XG5cbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQodGl0bGVJbnB1dCgpKTtcbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQocHJvamVjdElucHV0KCkpO1xuICAgIGlucHV0Rm9ybS5hcHBlbmRDaGlsZChkdWVEYXRlSW5wdXQoKSk7XG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uSW5wdXQoKSk7XG4gICAgaW5wdXRGb3JtLmFwcGVuZENoaWxkKGNyZWF0ZUFkZEJ1dHRvbigpKTtcbiAgICBpbnB1dEZvcm0uYXBwZW5kQ2hpbGQoY3JlYXRlQ2xlYXJCdXR0b24oKSk7XG4gICAgcmV0dXJuIGlucHV0Rm9ybVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUlucHV0QmFyIiwiY29uc3QgY3JlYXRlU2lkZUJhciA9ICgpID0+IHtcbiAgICBjb25zdCBzaWRlQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2lkZUJhci5jbGFzc0xpc3QuYWRkKCdzaWRlQmFyJyk7XG5cbiAgICBjb25zdCBob21lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgaG9tZUJ1dHRvbi50ZXh0Q29udGVudCA9ICdIb21lJztcbiAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHRvZGF5QnV0dG9uLnRleHRDb250ZW50ID0gJ1RvZGF5JztcbiAgICBjb25zdCB3ZWVrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgd2Vla0J1dHRvbi50ZXh0Q29udGVudCA9ICdUaGlzIFdlZWsnXG5cbiAgICBzaWRlQmFyLmFwcGVuZENoaWxkKGhvbWVCdXR0b24pO1xuICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQodG9kYXlCdXR0b24pO1xuICAgIHNpZGVCYXIuYXBwZW5kQ2hpbGQod2Vla0J1dHRvbik7XG4gICAgc2lkZUJhci5hcHBlbmRDaGlsZChjcmVhdGVQcm9qZWN0QXJlYSgpKTtcblxuICAgIHJldHVybiBzaWRlQmFyXG59XG5cbmNvbnN0IGNyZWF0ZVByb2plY3RBcmVhID0gKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvamVjdEFyZWEuc2V0QXR0cmlidXRlKCdpZCcsJ3Byb2plY3RBcmVhJyk7XG4gICAgY29uc3QgcHJvamVjdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgcHJvamVjdEhlYWRpbmcudGV4dENvbnRlbnQgPSAnUHJvamVjdHMnO1xuXG4gICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRpbmcpO1xuXG4gICAgcmV0dXJuIHByb2plY3RBcmVhXG59XG5cbi8vIGNvbnN0IHVwZGF0ZVByb2plY3RBcmVhID0gKHByb2pUaXRsZSkgPT4ge1xuLy8gICAgIGNvbnN0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RBcmVhJyk7XG5cbi8vICAgICBjb25zdCBuZXdQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4vLyAgICAgbmV3UHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2pUaXRsZTtcblxuLy8gICAgIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdXR0b24pO1xuLy8gICAgIHJldHVybiBwcm9qZWN0QXJlYVxuLy8gfVxuXG4vLyBleHBvcnQge2NyZWF0ZVNpZGVCYXIsIHVwZGF0ZVByb2plY3RBcmVhfTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU2lkZUJhciIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGluaXRpYWxpemVXZWJzaXRlIGZyb20gXCIuL2luaXRXZWJzaXRlXCI7XG5cbmluaXRpYWxpemVXZWJzaXRlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9