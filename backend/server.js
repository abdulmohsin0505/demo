const express = require("express");
const app = express();

const cors = require("cors")
// const corsOptions = require("./config/corsOption")

const port = process.env.port || 3000

// cross origin resource sharing
app.use(cors({
    origin : ["https://demo-frontend-bay.vercel.app/","demo-ashy-phi.vercel.app"],
    methods : ["POST","GET"],
    credentials : true
}))
app.get("/",(req,res) => {
    res.json("Hello world")
})

app.listen(port, () => console.log("server running on 3000"));
