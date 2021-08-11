// express => express is a framework based on nodeJS
// nodemon => dev dependency => dependency which is only used during development not in production code
            //   yaani ki jab bhi ham app.js mein kuch changes karenge na to nodemon apne aap 
            //   dekh lega ki app.js mein kuch changes hai to hamara server restart ho jayega apne aap, hamko kuch changes nhi karne padenge usme
            //  means server ko band chalu vaale kaam se bach jayenge ham
//socket.io => socket implemented

// yha se BackEnd samjho
const express = require("express");
const { Server } = require("socket.io"); // socket.io se Server ka object le liya

const app = express(); // server is created !!!
const http = require("http");
const server = http.createServer(app);

const io = new Server(server);

//app.use(express.json()); // abhi ke liye nhi pta is line ka meaning just used for console the request object

app.use(express.static("public"));

// Usecase of userList ?? to show online List and the names 
let userList = []; // Server maintains the names of all the clients connected to them

// connection event is attached on io
io.on("connection", function(socket){ // jab bhi socket connect hoga to ye function chal jayega
     console.log(socket.id + " connected !!!"); 
     // ye waala socket frontend vaale socket dono same hote hai
    //  console.log(socket); 
    socket.on("userconnected", function(username){
         let userObject = { id : socket.id , username : username };
         userList.push(userObject);
         console.log(userList);
         
         // for self
         socket.emit("online-list", userList);
        
         // broadcast a message to all other clients except sender
         socket.broadcast.emit("join", userObject); // socket's special function => apne vaale socket ko chod kar sabhi sockets par message bhejega
         
     })
    
    socket.on("chat", function(chatObj){
        socket.broadcast.emit("chatLeft", chatObj);
    })

    // tab close se apna aap isko call lag jayegi,diconnect ke liye koi emit nhi hota
    socket.on("disconnect", function(){
         let leftUserObj;
         let remainingUsers = userList.filter(function(userObj){
              if(userObj.id == socket.id){
                   leftUserObj = userObj;
                   return false;
              }
              return true;
         })
         userList = remainingUsers;
         socket.broadcast.emit("leave", leftUserObj);
    })
})

// get method ki request on path/
// app.get("/home" , function(request, response){ // callback funct mein 2 objects pass hote hai jo app hi hame deta hai 
//     // request => ye aage se aati hai request
//     // response => ye object hai jisme ham data bhej sakte hai, jha se request aayi thi vha par
//     console.log(request); // incoming meassage => Http request ka object 
//     response.send("Welcome to home Page !!");
// })


// ab hame btana hoga ki server ko kha par live hona hai
server.listen(5500, function(){   // 5500 is the local machine ka host i.e tcp port joki khali hota hai similarly 4000
     console.log("Server started at port 5500 !!!"); // on localhost:5500 we got message cannot GET/
}) 

