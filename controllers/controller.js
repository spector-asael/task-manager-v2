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
        { code: '22001', field: 'task_name', message: 'Task name cannot exceed 100 characters' },
        { code: '22001', field: 'task_description', message: 'Description cannot exceed 500 characters' }
    ];

    try {
        const newTask = await addTask(name, description, priority);
    } catch (error) {
        console.log(error);
        for(let i = 0; i < errorMessages.length; i++){
            if(error.code == errorMessages[i].code && error.message.includes(errorMessages[i].field)){
                return res.status(400).json({ message: errorMessages[i].message, field: errorMessages[i].field });
            }
        }
    }
    res.status(201).json({ success: true, message: "Successfully added task!" });
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
    const taskName = req.query.taskName || '';

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