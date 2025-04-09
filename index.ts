import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
const app: Express = express()
import cors from "cors"
import * as database from "./config/database"
import RouterV1 from "./api/v1/routes/index.router"
import bodyParser from "body-parser"


const port: number | string = process.env.PORT || 3000

dotenv.config()
database.connect();

// parse application/json
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

RouterV1(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})