import { signIn, signOutUser } from "./storage";

const createHeader = () => {
    const headerBar = document.createElement('div');
    headerBar.classList.add('header');

    const webHeader = document.createElement('h1');
    webHeader.textContent = "Daily Do's"

    const signInButton = document.createElement('button');
    signInButton.classList.add('signInButton');
    signInButton.textContent = 'Sign In'
    signInButton.onclick = signIn;

    const signOutButton = document.createElement('button');
    signOutButton.textContent = 'sign out';
    signOutButton.onclick = signOutUser;

    headerBar.appendChild(webHeader);
    headerBar.appendChild(signInButton);
    headerBar.appendChild(signOutButton);    

    // headerBar.textContent = "To-Do";
    
    return headerBar
}

export {createHeader}