// filename: ./controllers/controllers.js
import { getTasks, addTask, deleteTask, 
    completeTask, uncompleteTask, getTasksByName, 
    getTasksByPriority, getTasksByCompletion } from "../models/models.js";

export const home = async (req, res) => {
    let message = req.query.error || '';
    let showform = true;
    let tasks;
    try {
        tasks = await getTasks();
        
    } catch (error) {
        res.status(400).send("An error occured while fetching all the tasks.");
    }
   
    res.render("index", {
        tasks: tasks,
        postmessage: message,
        display: showform,
    });
}

export const postAddTask = async (req, res) => {
   
    const { 'task-name': name, 'description': description, 'task-priority': priority } = req.body;

    if (!name) {
        return res.json({message: "Name is required."})
    }

    const errorMessages = [
        { code: '23505', field: 'task_name', message: 'This task already exists.' },
        { code: '23503', field: 'task_priority', message: 'The specified priority does not exist.' },
        { code: '23502', field: 'task_name', message: 'Please provide a task name.' },
        { code: '23514', field: 'task_name', message: 'Task name must have at least 3 characters' },
        { code: '22001', field: 'value too long for type character varying(100)', message: 'Task name cannot exceed 100 characters' },
        { code: '22001', field: 'value too long for type character varying(500)', message: 'Description cannot exceed 500 characters' }
    ];

    try {
        const newTask = await addTask(name, description, priority);
        return res.status(201).json({ success: true, message: "Successfully added task!" });
    } catch (error) {
        console.log(error);
        for(let i = 0; i < errorMessages.length; i++){
            if(error.code == errorMessages[i].code && error.message.includes(errorMessages[i].field)){
                return res.status(400).json({ message: errorMessages[i].message, field: errorMessages[i].field });
            }
        }
    }
    return res.status(500).json({ success: false, message: "An unknown error occured." });
}

export const deleteTaskById = async (req, res) => {
    
    const taskId = req.params.id; 
    
    try {
        const result = await deleteTask(taskId);
        if (result) {
            res.json({message: "Task Deleted Successfully!"})
        } else {
            res.status(404).json({message: "Task not found."})
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send("An error occurred while deleting the task");
    }
};

export const completeTaskById = async (req, res) => {
    
    const taskId = req.params.id;
    
    try {
        const result = await completeTask(taskId); 
        if (result) {
            res.json({ message: "Task marked as completed!" });
        } else {
            res.status(404).json({ message: "Task not found." });
        }
    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).json({ message: "An error occurred while updating the task status." });
    }
};

export const uncompleteTaskById = async (req, res) => {
    
    const taskId = req.params.id;
    
    try {
        const result = await uncompleteTask(taskId); 
        if (result) {
            res.json({ message: "Task marked as uncompleted" });
        } else {
            res.status(404).json({ message: "Task not found." });
        }
    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).json({ message: "An error occurred while updating the task status." });
    }
};

export const searchTasksByName = async (req, res) => {
    
    const taskName = req.query.name 

    let tasks;
    try {
        tasks = await getTasksByName(taskName);  // Calls the model that searches by task name
    } catch (error) {
        res.status(400).send("An error occurred while fetching tasks.");
        return;
    }

    res.render("index", {
        tasks: tasks,
        postmessage: req.query.error || '',
        display: true,
    });
};

export const filterTasksByCompletion = async (req, res) => {
    
    const completionStatus = parseInt(req.params.id) === 1;

    console.log(completionStatus);
    let tasks;
    try {
        tasks = await getTasksByCompletion(completionStatus);
    
    } catch (error) {
        console.error("Error in filterTasksByCompletion:", error);
        res.status(400).send("An error occurred while fetching tasks.");
        return;
    }

    res.render("index", {
        tasks: tasks,
        postmessage: req.query.error || '',
        display: true,
    });
};


export const filterTasksByPriority = async (req, res) => {
   
    const priorityId = parseInt(req.params.id);

    let tasks;
    try {
        tasks = await getTasksByPriority(priorityId);
    } catch (error) {
        res.status(400).send("An error occurred while fetching tasks.");
        return;
    }

    res.render("index", {
        tasks: tasks,
        postmessage: req.query.error || '',
        display: true,
    });
};


/*
alright, fixed, let's add pagination:

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



// filename: ./routes/routes.js

import express from 'express';
const router = express.Router();
import { deleteTaskById, home, postAddTask, completeTaskById, 
    uncompleteTaskById, searchTasksByName, filterTasksByPriority, 
    filterTasksByCompletion } from "../controllers/controller.js"

router.get('/', home);

router.post('/tasks', postAddTask);

router.delete("/delete-task/:id", deleteTaskById);

router.patch("/complete-task/:id", completeTaskById);

router.patch("/uncomplete-task/:id", uncompleteTaskById);

router.get("/search", searchTasksByName);         

router.get("/filter/status/:id", filterTasksByCompletion);

router.get("/filter/priority/:id", filterTasksByPriority); 

export default router;
*/