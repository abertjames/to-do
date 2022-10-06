import { signIn, signOutUser } from "./storage";

const createHeader = () => {
    const headerBar = document.createElement('div');
    headerBar.classList.add('header');
    headerBar.id = 'headerBar'

    const webHeader = document.createElement('h1');
    webHeader.textContent = "Daily Do's"

    headerBar.appendChild(webHeader);
    
    return headerBar
}

const createSignInButton = () => {
    const headerBar = document.getElementById('headerBar');
    if (!!document.getElementById('signOutButton')){
        headerBar.removeChild(document.getElementById('signOutButton'))
    }
    const signInButton = document.createElement('button');
    signInButton.classList.add('signInButton');
    signInButton.textContent = 'Sign In';
    signInButton.id = 'signInButton';
    signInButton.onclick = signIn;
    headerBar.appendChild(signInButton);
}

const createSignOutButton = () => {
    const headerBar = document.getElementById('headerBar');
    if (!!document.getElementById('signInButton')){
        headerBar.removeChild(document.getElementById('signInButton'))
    }
    const signOutButton = document.createElement('button');
    signOutButton.classList.add('signOutButton');
    signOutButton.textContent = 'Sign out';
    signOutButton.id = 'signOutButton';
    signOutButton.onclick = signOutUser;
    headerBar.appendChild(signOutButton);
}

export {createHeader, createSignInButton, createSignOutButton}