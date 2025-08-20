const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
 
main().then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.get("/chats", async (req, res) => {
    const chats = await Chat.find();
    res.render("index.ejs",{chats})
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg
    });

    newChat.save().then(() => {
        console.log("Chat saved successfully");
        res.redirect("/chats");
    }).catch((err) => {
        console.error("Error saving chat:", err);
    });
}); 

app.get("/chat/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//update route
app.put("/chat/:id", async (req, res) => {
    let {id} = req.params;
    let { msg } = req.body;
    console.log("new msg:", msg);
    let updateChat = await Chat.findByIdAndUpdate(
        id,
        { msg: msg },
        { runValidators: true, new: true }
    );
    console.log("chat updated successfully");
    res.redirect("/chats");
});

// delete route
app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    console.log("chat deleted successfully");
    res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.send("root is working!Please got to /chats");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});