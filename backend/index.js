
const express = require("express")
const db = require("./Config/database")
const routes = require("./Routes/routes")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require('express-fileupload');


const app = express();
app.use(fileUpload());
require("dotenv").config();
const port = process.env.PORT

db.databaseConnection()
app.use(cookieParser())
app.use(express.json());

app.use(cors({
    origin:"https://task-agent-distribute-csv-data-mana.vercel.app",
    credentials:true
}))

app.use(routes)



app.get("/",(req,res)=>{
    res.send(`<h1>Hii Everyone Machine Test this side</h1>`)
})

app.listen(port,()=>{
    console.log("App is running")
})
