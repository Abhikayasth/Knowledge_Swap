const express = require('express');
const app = express()
const port = 5000;
const mongoose = require("mongoose");
const {mongoUrl} = require("./keys")
const bcrypt = require('bcrypt')
const cors = require("cors");

app.use(cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

require('./modules/model')
require('./modules/Post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", ()=>{
    console.log("Successfully connected to mongo...");
})

mongoose.connection.on("error", ()=>{
    console.log("not connected to mongo...");
})

app.listen(port, () => {
    console.log("Server is running on port " + port)
})