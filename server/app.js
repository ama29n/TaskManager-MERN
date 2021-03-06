const express = require('express');
const app = express();
const route = require('./Routes/route');
const connect = require('./DB/connect');
require("dotenv").config();

// Body Parser
app.use(express.json());

// Middleware
app.use("/app", route);


// Default routing for bad requests
app.use("*", (req, res) => {
    res.status(400).send("Wrong Request");
})

const port = 3001;

const connectToDbAndStartServer = async () => {
    try {
        const result = await connect(process.env.MONGO_URI);

        console.log("Connected to database.")

        app.listen(port, ()=> {
            console.log(`Server is listening on port ${port}.`);
        })
    }
    catch (err) {
        console.log(err);
    }
}

connectToDbAndStartServer(); 



