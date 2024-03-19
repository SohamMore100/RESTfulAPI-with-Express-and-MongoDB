const mongoose = require('mongoose');
const Chat = require("./models/chat.js")

main()
.then(()=>{
    console.log("Connection Succesfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
    from:"neha",
    to:"Om",
    msg:"Hello World",
    created_at:new Date()
    },
    {
    from:"Johnny",
    to:"Mia",
    msg:"I'm a Doctor",
    created_at:new Date()
    },
    {
    from:"Ajay",
    to:"Anand",
    msg:"Bye Bye...",
    created_at:new Date()
    },
    {
    from:"modi",
    to:"Shah",
    msg:"We will won 2024 Election",
    created_at:new Date()
    },

];
Chat.insertMany(allChats);