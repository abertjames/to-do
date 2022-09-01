import {createHeader} from "./header";
import createSideBar from "./sideBar";
import createDisplayArea from "./display";
import createInputBar from "./input";


//once i add log in information i should make another js script for making the header 



const initializeWebsite = () => {
    const container = document.getElementById('container');


    container.appendChild(createHeader());
    container.appendChild(createSideBar());
    container.appendChild(createDisplayArea());
    container.appendChild(createInputBar());

}

export default initializeWebsite;