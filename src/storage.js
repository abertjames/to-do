import { projectLibrary, Project, Item } from "./input"
import { manageDisplayArea, clearDisplayArea } from "./display";
import { manageSideBar } from "./sideBar";
import { createSignInButton, createSignOutButton } from "./header"

// cloud storage 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc ,setDoc, getDocs, deleteDoc, collection, query, where, addDoc, } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl9nxGSznyla5O4pKjdjP2bLEyNmr5240",
  authDomain: "daily-do-9731e.firebaseapp.com",
  projectId: "daily-do-9731e",
  storageBucket: "daily-do-9731e.appspot.com",
  messagingSenderId: "1093409243975",
  appId: "1:1093409243975:web:585abf377d5e62de920262",
  measurementId: "G-XWJCSBV0MB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
console.log(auth);
const firestore = getFirestore(firebaseApp);

const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
};

const signOutUser = () => {
    signOut(auth);
}

onAuthStateChanged( (auth), user => {
    if (user != null){
        _regenerateFromDB();
        createSignOutButton();
        // console.log(auth.currentUser.uid)
        // console.log('logged in!')
    } else {
        if (_storageAvailable('localStorage')) {
            _retrieveLocal();
            manageDisplayArea.regenerateDisplayArea(projectLibrary);
            manageSideBar.regenerateProjectArea(projectLibrary);
            createSignInButton();
        } else {
              ///////////////////////////////////////////////////////
            // Too bad, no localStorage for us
        }
        // console.log('no user')
    }
});

const _regenerateFromDB = async () => {
    projectLibrary.projects = [];
    const querySnapshot = await getDocs(collection(firestore, auth.currentUser.uid));
    querySnapshot.forEach((doc) => {
        if (projectLibrary.isInProjectLibrary(doc.data().projectTitle)){
            projectLibrary.getProject(doc.data().projectTitle).addItem(_docToItem(doc))

        } else if (!projectLibrary.isInProjectLibrary(doc.data().projectTitle)){
            const newProject = new Project(doc.data().projectTitle);
            newProject.addItem(_docToItem(doc));
            projectLibrary.addProject(newProject);
        }
        clearDisplayArea();
        manageSideBar.regenerateProjectArea(projectLibrary);
        manageDisplayArea.regenerateDisplayArea(projectLibrary);
    })
}

const _getItemRef = async (item) => {
    // console.log(item.ID)
    const itemQuery = await query(
        collection(firestore, `${auth.currentUser.uid}`),
        where('ID', '==', `${item.ID}`)
    );
    const querySnapshot = await getDocs(itemQuery);
    const itemPath = `${querySnapshot.docs[0].ref.path}`;
    const itemRef = await doc(firestore, itemPath);

    return itemRef
}

const updateItemDoc = async (item, newData) => {
    const itemRef = await _getItemRef(item)
    const updatedItem = await setDoc(itemRef, newData, {merge: true});
}

const uploadNewItem = async (item) => {
    const docData = _itemToDoc(item);
    const newDoc = await addDoc(collection(firestore,`${auth.currentUser.uid}`), docData)
}

const deleteItem = async (item) => {
    const itemRef = await _getItemRef(item)
    await deleteDoc(itemRef);
}

const deleteProject = async (project) => {
    const projectQuery = await query(
        collection(firestore, `${auth.currentUser.uid}`),
        where('projectTitle', '==', `${project.title}`)
    );
    const projectQuerySnapshot = await getDocs(projectQuery);
    const projectItems = projectQuerySnapshot.docs.forEach( async (item) => {        
        const itemRef = await _getItemRef(item.data())
        await deleteDoc(itemRef);
    });
}

const _itemToDoc = (item) => {
    return {
        title: item.title,
        projectTitle: item.projectTitle,
        itemDueDate: item.itemDueDate,
        itemDescription: item.itemDescription,
        itemCompletion: item.itemCompletion,
        ID: item.ID,
    }
}

const _docToItem = (doc) => {
    return new Item(
        doc.data().title,
        doc.data().projectTitle,
        doc.data().itemDueDate,
        doc.data().itemDescription,
        doc.data().itemCompletion,
        doc.data().ID,
    )
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// local storage 

const saveLocal = () => {
    localStorage.setItem('projectLibrary', JSON.stringify(projectLibrary.projects));
}

const _retrieveLocal = () => {

    const projects = JSON.parse(localStorage.getItem('projectLibrary'))
    if (projects) {
        projectLibrary.projects = projects.map((project) => _reconstructProject(project));
    } else {
      projectLibrary.projects = []
    }

    console.log(projectLibrary)
} 

const _reconstructProject = (project) => {
    const newProject = new Project(project.title);
    newProject.items = project.items.map((item) => _reconstructItem(item))
    return newProject
}

const _reconstructItem = (item) => {
    return new Item (item.title, item.projectTitle, item.itemDueDate, item.itemDescription, item.itemCompletion, item.ID)
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

export {saveLocal, signIn, signOutUser, auth, updateItemDoc, deleteItem, deleteProject, uploadNewItem}