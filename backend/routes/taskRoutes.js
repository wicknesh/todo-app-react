import express from 'express';
const router = express.Router();
import taskModel from '../models/taskData.js';
import { mongoose } from 'mongoose';

router.get('/get-tasks/:uid', async (req, res) => {

    try {
        const tasks = await taskModel.findOne({ uid: req.params.uid });
        res.status(200).json(tasks);

    } catch (error) {
        res.status(404).send(error);
    }
})

router.put('/add-task', async (req, res) => {
    
    try {
        const { uid, tname, tdesc, tchecked, timportant } = req.body;
        const response = await taskModel.findOne({ uid })
        if(!response) {
            const newTask = new taskModel ({
                uid,
                task: [
                    {
                        tid: new mongoose.Types.ObjectId(),
                        tname,
                        tdesc,
                        tchecked,
                        timportant
                    }
                ]
            });

            await newTask.save();
            return res.status(200).json({ message: `Task added successfully`, tid: newTask.task[0].tid });
        } else {
            const newTask = {
                tid: new mongoose.Types.ObjectId(),
                tname,
                tdesc,
                tchecked,
                timportant
            };

            response.task.push(newTask);    
            await response.save();
            return res.status(200).json({ message: `Task added successfully`, tid: newTask.tid });
        }
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Error adding task" });
    }
})

router.delete('/delete-task', async (req, res) => {
    const {uid, tid} = req.body;

    try {
        const result = await taskModel.updateOne(
            { uid },
            { $pull: { task: { tid }}}
        );

        if ( result.modifiedCount > 0) {
            res.status(200).send({ message: `Task deleted successfully` });
        } else {
            res.status(404).send({ message: `Task not found` });
        }
    } catch (error) {
        res.status(500).send({ message: `Error deleting task ${error}`})
    }
})

router.put(`/task-status`, async (req, res) => {
    try {
        const { uid, tid } = req.body;
        const response = await taskModel.findOne({ uid, 'task.tid': tid });

        if(!response) {
            return res.status(404).json({ message: `Task not found` });
        }

        const task = response.task.find(t => t.tid.toString() === tid.toString());

        if(task) {
            task.tchecked = !task.tchecked;
            await response.save();
            return res.status(200).json({ message: `Task updated successfully` });
        } else {
            return res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: `Error updating task` });
    }
})

router.put(`/edit-task`, async (req, res) => {
    try {
        const { uid, tid, tname, tdesc, timportant } = req.body;

        const response = await taskModel.findOne({ uid, 'task.tid': tid });

        if(!response) {
            return res.status(404).json({ message: `Task not found` });
        }

        const task = response.task.find(t =>  t.tid.toString() === tid.toString());

        if(task) {
            task.tname = tname || task.tname;
            task.tdesc = tdesc || task.tdesc;
            task.timportant = timportant !== undefined ? timportant : task.timportant;

            await response.save();
            return res.status(200).json({ message: `Task updated successfully`});
        } else {
            return res.status(404).json({ message: `Task not found` });
        }
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Error updating task" });
    }
})

export default router;