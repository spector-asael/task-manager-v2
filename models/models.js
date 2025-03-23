import { query } from "../config/db.js";

export const getTasks = async (req, res) => {
    try {
        const result = await query("SELECT * FROM tasks");
        return result.rows;
    } catch ( error ) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};