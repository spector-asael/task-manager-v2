// filename: ./public/script.js

import { deleteTask, addTask, completeTask, uncompleteTask } from "./mainFunctions.js";

const addingTask = document.getElementById("task-form");

const deleteButtons = document.getElementsByClassName('delete');
const completeButtons = document.getElementsByClassName('complete');
const undoButtons = document.getElementsByClassName('undo');

addingTask.addEventListener("submit", addTask); 

for(let i = 0; i < deleteButtons.length; i++){
    
    deleteButtons[i].addEventListener("click", deleteTask);
}

for(let i = 0; i < completeButtons.length; i++){
   
    completeButtons[i].addEventListener("click", completeTask);
}

for(let i = 0; i < undoButtons.length; i++){
  
    undoButtons[i].addEventListener("click", uncompleteTask);
}

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("taskAdded") === "true") {
        document.getElementById("task-form").style.display = "flex";
        document.getElementById("success-message").style.display = "block";
        document.getElementById("success-message").innerText = "Task added successfully!";
        document.getElementById("add-task").innerText = "Hide";
        localStorage.removeItem("taskAdded"); 
    }
});

const addTaskButton = document.getElementById("add-task");
        const form = document.getElementById("task-form");

        addTaskButton.addEventListener("click", () => {
            if (form.style.display == "flex") {
                form.style.display = "none";
                addTaskButton.innerText = "Add task";
                console.log("Hi")
            } else {
            form.style.display = "flex";
            addTaskButton.innerText = "Hide"
            console.log("Hi2")
        }
});
