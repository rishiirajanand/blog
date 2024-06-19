import express from "express";
import Connection from "./database/db.js";
import dotenv from 'dotenv'
import Router from "./routes/route.js";
import cors from 'cors'
import bodyParser from "body-parser";
import path from 'path'

const app = express()



dotenv.config()
const PORT = 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', Router)

app.get('/', (req,res) => {
    app.use(express.static(path.join(path.resolve(), 'client', 'dist')))
    res.sendFile(path.join(path.resolve(), 'client', 'dist', 'index.html'))
})



app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
Connection(USERNAME, PASSWORD)
