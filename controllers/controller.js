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
    /*
    res.render("view-tasks", {
        title: "Tasks",
        tasks: tasks,
        postmessage: message,
        display: showform, 
        Priority: "Priority: All"
    })
        */
    res.render("index", {
        tasks: tasks,
        postmessage: message,
        display: showform,
    });
}

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).send("An error occured while fetching tasks.");
    }
}

export const postAddTask = async (req, res) => {
    const { 'task-name': name, 'description': description, 'task-priority': priority } = req.body;

    if (!name) {
        
        return res.redirect('/?error=Name is required');
    }

    try {
        const newTask = await addTask(name, description, priority);
    } catch (error) {
        if (error.code == "23505") {
            return res.redirect('/?error=This task already exists.');
        }
        if (error.code === "23503") {
            return res.redirect('/?error=The specified priority does not exist.');
        }
        if (error.code === "23502") {
            return res.redirect('/?error=Please provide a task name.');
        }
        if (error.code === "23514" ) {
            return res.redirect('/?error=Task name must have at least 3 characters');
        }
        if (error.code === "22001" && error.message.includes('task_name')) {
            return res.redirect('/?error=Task name cannot exceed 100 characters')
        }
        if (error.code === "22001"){
            return res.redirect('/?error=Description cannot exceed 500 characters');
        }
        console.log(error);
        return res.status(500).send("An error occurred during task creation.");
    }

    res.redirect('/');
}

export const deleteTaskById = async (req, res) => {
    console.log("DELETE request received for task ID:", req.params.id)
    const taskId = req.params.id; 
    console.log("hi")
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

