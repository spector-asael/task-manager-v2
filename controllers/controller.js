import { getTasks } from "../models/models.js";

export const home = (res, req) => {
    res.render("index");
}
export const getAllTasks = async (res, req) => {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).send("An error occured while fetching tasks.");
    }
}