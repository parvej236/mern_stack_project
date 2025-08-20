
const Chat = require("./models/chat.js");
const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main().then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

let chats = [
    {
        from: "Alice",
        to: "Bob",
        msg: "Hello Bob!",
        created_at: new Date()
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Hi Alice! How are you?",
        created_at: new Date()
    },
    {
        from: "Alice",
        to: "Bob",
        msg: "I'm good, thanks! And you?",
        created_at: new Date()
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Doing well, thanks for asking!",
        created_at: new Date()
    },
    {
        from: "Alice",
        to: "Bob",
        msg: "Great to hear! Let's catch up soon.",
        created_at: new Date()
    },
    {
        from: "Bob",
        to: "Alice",
        msg: "Absolutely! Looking forward to it.",
        created_at: new Date()
    }
];

Chat.insertMany(chats)
    .then(() => {
        console.log("Chats inserted successfully");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error inserting chats:", err);
        mongoose.connection.close();
    });