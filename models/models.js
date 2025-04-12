// filename: ./models/models.js
import { query } from "../config/db.js";

export const getTasks = async (req, res) => {
    try {
        const result = await query(`
            SELECT * FROM tasks
            INNER JOIN priority ON priority.priority_id = tasks.task_priority`);
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