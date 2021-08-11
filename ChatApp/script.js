let chatInput = document.querySelector(".chat-input");
let chatWindow = document.querySelector(".chat-window");

let username = prompt("Enter Your Name");

chatInput.addEventListener("keypress", function(e){
     if(e.key == "Enter" && chatInput.value){
         
         let chatDiv = document.createElement("div");
         chatDiv.classList.add("chat");
         chatDiv.classList.add("right");
         chatDiv.innerText = username+ " : " +chatInput.value;

         chatWindow.append(chatDiv); //append mein ham String bhi pass kar sakte hai
         chatInput.value = "";
     }
});