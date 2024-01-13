const express = require("express");
const app = express();

const cors = require("cors")
const corsOptions = require("./config/corsOption")

const port = 3000

// cross origin resource sharing
app.use(cors(corsOptions))
app.get("/",(req,res) => {
    res.send("Hello world")
})

app.listen(port, () => console.log("server running on 3000"));