const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');

require("dotenv").config();
require("./db/mongo");
app.use(express.json());
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

const userRoutes = require('./routes/users.route');
const taskRoutes = require('./routes/tasks.route');
const renderRoutes = require('./routes/render.route');

app.use(userRoutes);
app.use(taskRoutes);
app.use(renderRoutes);


app.listen(process.env.PORT, ()=>{
    console.log(`App server is listening to port: ${process.env.PORT}`);
});