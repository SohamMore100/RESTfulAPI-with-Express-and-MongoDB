const express = require("express");
const app = express();
const port = 4040;
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
const methodOverride = require('method-override');

main().then(()=>{
    console.log("Connection Succesfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.use(express.urlencoded({extended: true}))

// // override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

// INDEX ROUTE
app.get("/chats",async (req,res) =>{
    let chats = await Chat.find()
    console.log(chats)
    res.render("index.ejs",{chats});
});

// NEW ROUTE
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
});

// CREATE ROUTE
app.post("/chats",(req,res)=>{
    let { from,to ,msg}= req.body
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date(),
    })
    newChat
        .save().then((res)=>{
            console.log("New chat was saved")
        })
        .catch(err => console.log(err));
    res.redirect("/chats");
});

// EDIT ROUTE
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params
    let chat = await Chat.findById(id)
    res.render("edit.ejs",{chat})
})

// UPDATE ROUTE
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params
    let {msg: newMsg} = req.body
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg},{runValidators: true,new: true})
    res.redirect("/chats")
})

// DESTROY ROUTE
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params
    let deletedChat = await Chat.findByIdAndDelete(id)
    console.log(deletedChat)
    res.redirect("/chats")
})   

app.get("/",(req,res) =>{
    res.send("Serving is working......");
})

app.listen(port,() => {
    console.log(`listening to Port :${port}`);
})