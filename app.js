const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const path = require("path");
const app = express();
const PORT = 3000;

app.use("/", router);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose
    .connect("mongodb://localhost/link")
    .then((error, db) => {
        console.log("O db foi executado com sucesso");
    })
    .catch((error) => {
        console.log(error);
    });

// const link = new linkModel({
//     title: "facebook",
//     description: "Descrição1",
//     url: "./",
//     views: 0
// })

// link.save().then(sucess => console.log(sucess)).catch(error => console.log(error))

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
