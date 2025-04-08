import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
const app: Express = express()
import * as database from "./config/database"
import RouterV1 from "./api/v1/routes/index.router"


const port: number | string = process.env.PORT || 3000

dotenv.config()
database.connect();

RouterV1(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})