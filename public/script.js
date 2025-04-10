import { deleteTask, addTask, test } from "./functions.js";

const addingTask = document.getElementById("task-form");

const deleteButtons = document.getElementsByClassName('delete');
const completeButtons = document.getElementsByClassName('complete');
const undoButtons = document.getElementsByClassName('undo');

addingTask.addEventListener("submit", addTask); 

for(let i = 0; i < deleteButtons.length; i++){
    
    deleteButtons[i].addEventListener("click", deleteTask);
}

for(let i = 0; i < completeButtons.length; i++){
   
    deleteButtons[i].addEventListener("click", deleteTask);
}

for(let i = 0; i < undoButtons.length; i++){
  
    deleteButtons[i].addEventListener("click", deleteTask);
}
