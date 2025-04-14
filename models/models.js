
// filename: ./models/models.js
import { query } from "../config/db.js";

export const getTasks = async (req, res) => {
    try {
        const result = await query(`
            SELECT * FROM tasks
            INNER JOIN priority ON priority.priority_id = tasks.task_priority
            ORDER BY tasks.task_id DESC`);
        return result.rows;
    } catch ( error ) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const addTask = async (taskName, taskDescription, priority) => {
    try {
        const result = await query(
            "INSERT INTO tasks (task_name, task_priority, task_description) VALUES ($1, $2, $3) RETURNING *", 
            [taskName, priority, taskDescription]
            
        );
        return result.rows[0]
    } catch (error) {
        console.log("error adding task.", error)
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    const result = await query(`
        DELETE FROM tasks 
        WHERE task_id = $1
        RETURNING *;
    `, [taskId]); 

    return result.rows[0]; 
};

export const completeTask = async (taskId) => {

    const result = await query(`
        UPDATE tasks 
        SET completion_status = TRUE 
        WHERE task_id = $1 
        RETURNING *;
        `, [taskId])
    
    return result.rows[0];
};
export const uncompleteTask = async (taskId) => {

    const result = await query(`
        UPDATE tasks 
        SET completion_status = FALSE 
        WHERE task_id = $1 
        RETURNING *;
        `, [taskId])
    
    return result.rows[0];
};

export const getTasksByName = async (searchTerm) => {
    try {
        const result = await query(`
            SELECT * FROM tasks 
            INNER JOIN priority ON priority.priority_id = tasks.task_priority
            WHERE LOWER(task_name) LIKE LOWER($1)
            ORDER BY tasks.task_id;
        `, [`%${searchTerm}%`]);

        return result.rows;
    } catch (error) {
        console.error("Error searching tasks by name:", error);
        throw error;
    }
};

export const getTasksByCompletion = async (isComplete) => {
    try {
        const result = await query(`
            SELECT * FROM tasks
            INNER JOIN priority ON priority.priority_id = tasks.task_priority
            WHERE completion_status = $1
            ORDER BY tasks.task_id ;
        `, [isComplete]);

        return result.rows;
    } catch (error) {
        console.error("Error fetching tasks by completion status:", error);
        throw error;
    }
};

export const getTasksByPriority = async (priority) => {
    try {
        const result = await query(`
            SELECT * FROM tasks
            INNER JOIN priority ON priority.priority_id = tasks.task_priority
            WHERE task_priority = $1
            ORDER BY tasks.task_id;
        `, [priority]);

        return result.rows;
    } catch (error) {
        console.error("Error fetching tasks by priority:", error);
        throw error;
    }
};
