import { getTasks, addTask, deleteTask } from "../models/models.js";

export const home = async (req, res) => {
    let message = req.query.error || '';
    let showform = true;
    let tasks;
    try {
        tasks = await getTasks();
        
    } catch (error) {
        res.status(400).send("An error occured while fetching all the tasks.");
    }
    console.log(tasks);
    res.render("index", {
        tasks: tasks,
        postmessage: message,
        display: showform,
    });
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await getTasks();
        console.log(tasks.rows);
        res.json(tasks);
    } catch (error) {
        res.status(500).send("An error occured while fetching tasks.");
    }
}

export const postAddTask = async (req, res) => {
    console.log(req.body);
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
    console.log("DELETE request received for task ID:", req.params.id)
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
    console.log()
}