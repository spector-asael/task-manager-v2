// filename: ./public/script.js

import { deleteTask, addTask, completeTask, 
    uncompleteTask, searchTasksByName, filterTasksByStatus,
    filterTasksByPriority, resetFilters } from "./mainFunctions.js";

const addingTask = document.getElementById("task-form");

const deleteButtons = document.getElementsByClassName('delete');
const completeButtons = document.getElementsByClassName('complete');
const undoButtons = document.getElementsByClassName('undo');

const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-bar");

const statusButtons = document.querySelectorAll("[data-status]");
const priorityButtons = document.querySelectorAll("[data-priority]");

const resetFilterButton = document.getElementById("reset");

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
              
            } else {
            form.style.display = "flex";
            addTaskButton.innerText = "Hide"
           
        }
});


searchBtn.addEventListener("click", () => {
   
    console.log(searchInput);
        const name = searchInput.value.trim();
    console.log(name);
        if (name) {
            searchTasksByName(name);
        }
});

searchInput.addEventListener("keypress", function (event) {
   
    if (event.key === "Enter") {
      searchBtn.click();   
    }
});


statusButtons.forEach(button => {
    button.addEventListener("click", () => {
        const status = button.getAttribute("data-status");
        filterTasksByStatus(status);
    });
});

priorityButtons.forEach(button => {
    button.addEventListener("click", () => {
        const priority = button.getAttribute("data-priority");
        filterTasksByPriority(priority);
    });
});

resetFilterButton.addEventListener("click", resetFilters);

