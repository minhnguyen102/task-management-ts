import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
const app: Express = express()
import * as database from "./config/database"
import Task from "./api/v1/models/task.model"

const port: number | string = process.env.PORT || 3000

dotenv.config()
database.connect();

app.get('/tasks', async (req: Request, res: Response) => {
    const tasks = await Task.find({
        deleted : false
    })
    console.log(tasks);
    res.json(tasks)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})