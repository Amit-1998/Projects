let sticky = document.querySelector("#sticky");

sticky.addEventListener("click", function(e){
    addSticky();
});

function addSticky(imageElement){  // imageElement hamesha nhi aayega image pass karne par hi aayega otherwise undefined aayega
      
    let stickyDiv = document.createElement("div");
    stickyDiv.classList.add("sticky");
    stickyDiv.innerHTML = `<div class="sticky-header">
        <div class="minimize"></div>
        <div class="close"></div>
        </div>`;
    
    // apply on some condition
    // <div class="sticky-content" contenteditable="true"></div>

    let minimize = stickyDiv.querySelector(".minimize");
    let close = stickyDiv.querySelector(".close");
    // let stickyContent = stickyDiv.querySelector(".sticky-content");
    let stickyHeader = stickyDiv.querySelector(".sticky-header");
    let stickyContent;

    if(imageElement){
        let stickyImageDiv = document.createElement("div");
        stickyImageDiv.classList.add("sticky-image-div");
        stickyDiv.append(stickyImageDiv);
        stickyImageDiv.append(imageElement);
        stickyContent = stickyImageDiv;
    }
    else{
        // <div class="sticky-content" contenteditable="true"></div>
        let stickyContentDiv = document.createElement("div");
        stickyContentDiv.classList.add("sticky-content");
        stickyContentDiv.setAttribute("contenteditable",true);
        stickyDiv.append(stickyContentDiv);
        stickyContent = stickyContentDiv;
    }

    minimize.addEventListener("click", function(){
        stickyContent.style.display == "none" ? stickyContent.style.display="block" : stickyContent.style.display="none";
    });

    close.addEventListener("click", function(){
        stickyDiv.remove();
    });

    let stickyHold = false;
    let initialX;  // jha par sticky hold hua hai
    let initialY;  // jha par sticky hold hua hai

    stickyHeader.addEventListener("mousedown", function(e){
         stickyHold = true;
         initialX = e.clentX;
         initialY = e.clientY;
    });

    stickyHeader.addEventListener("mousemove", function(e){
         if(stickyHold){
            let finalX = e.clientX;
            let finalY = e.clientY;
   
            let dx = finalX - initialX;
            let dy = finalY - initialY;
   
            let {top,left} = stickyDiv.getBoundingClientRect();  
            // sticky => top + dy
            // sticky => left + dx
            stickyDiv.style.top = top + dy + "px"; // only for set the items
            stickyDiv.style.left = left+ dx + "px";
   
            initialX = finalX;
            initialY = finalY;
         }
         
    });
    
    stickyHeader.addEventListener("mouseup", function(e){
         stickyHold = false;
    });

    document.body.append(stickyDiv);

    // <!-- Static UI of sticky-Note( Shortcut => .sticky>(.sticky-header>.minimize+.close)+.sticky-content)  -->
    // <div class="sticky">
    //     <div class="sticky-header">
    //         <div class="minimize"></div>
    //         <div class="close"></div>
    //     </div>
    //     <div class="sticky-content" contenteditable="true"></div>
    // </div>

}