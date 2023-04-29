let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
const express = require("express");
const bodyParser = require("body-parser");
const getDate = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    let day = getDate();
    res.render('list', {listTitle: day, subsequentItemsList: items});
});

app.get("/work", (req, res) => {
    res.render('list', {listTitle: "Work List", subsequentItemsList: workItems});
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.post("/", (req, res) => {
    let item = req.body.nextListItem;

    if (req.body.typeOfItem === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(3000, () => {
    console.log("The server is running on port 3000");
});
