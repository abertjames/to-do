import { createHeader } from "./header";
import { manageSideBar } from "./sideBar";
import { createDisplayArea } from "./display";
import { createInput } from "./input";
import { checkStorage } from "./storage";

//once i add log in information i should make another js script for making the header 



const initializeWebsite = () => {
    const container = document.getElementById('container');

    container.appendChild(createHeader());
    container.appendChild(manageSideBar.createSideBar());
    container.appendChild(createDisplayArea());
    container.appendChild(createInput.createInputBar());

    checkStorage();
}

export default initializeWebsite;