let pen = document.querySelector("#pen");
let eraser = document.querySelector("#eraser");

let penOptions = pen.querySelector(".tool-options");
let eraserOptions = eraser.querySelector(".tool-options");

let penSize = penOptions.querySelector("#pensize");
let eraserSize = eraserOptions.querySelector("#erasersize");
let penColors = penOptions.querySelectorAll(".pen-colors div");

let currentPenSize = 1;
let currentPenColor = "black";
let currentEraserSize = 1;

penSize.addEventListener("change", function(){
     // handle pen size
    let penSizeValue = penSize.value;
    // console.log(penSizeValue);
    // pensize set hoga
    currentPenSize = penSizeValue;
    ctx.lineWidth = currentPenSize;
});

eraserSize.addEventListener("click", function(){
    let eraserSizeValue = eraserSize.value;
    currentEraserSize = eraserSizeValue;
    ctx.lineWidth = currentEraserSize;
});

for(let i=0; i<penColors.length; i++){
    penColors[i].addEventListener("click", function(e){
        let penColor = e.target.className;
        currentPenColor = penColor;
        ctx.strokeStyle = currentPenColor; // for lines
    });
}

pen.addEventListener("click", function(){
    if(pen.classList.contains("active-tool")){
        // pen already active hai
        // pen tool options honge
        if(penOptions.classList.contains("hide")){
            penOptions.classList.remove("hide"); // remove hide class from penOptions
            penOptions.style.display="block";
        }
        else{
            penOptions.classList.add("hide");
            penOptions.style.display="none";
        }
    }
    else{
       // pen is not active
       // make pen active
       eraser.classList.remove("active-tool");
       eraser.classList.add("fade");
       //aisa ho sakta hai ki eraser ke options pehle se khul rakhe ho
       eraserOptions.classList.add("hide");
       eraserOptions.style.display = "none";

       pen.classList.remove("fade");
       pen.classList.add("active-tool");
       
       ctx.lineWidth = currentPenSize;
       ctx.strokeStyle = currentPenColor;
    }
});

eraser.addEventListener("click", function(){
    if(eraser.classList.contains("active-tool")){
        // eraser already active
        if(eraserOptions.classList.contains("hide")){
            eraserOptions.classList.remove("hide"); // remove hide class from penOptions
            eraserOptions.style.display = "block"; 
        }
        else{
            eraserOptions.classList.add("hide");
            eraserOptions.style.display = "none";
        }
    }
    else{
        // eraser not active
        pen.classList.remove("active-tool");
        pen.classList.add("fade");
        penOptions.classList.add("hide");
        penOptions.style.display = "none";

        eraser.classList.add("active-tool");
        eraser.classList.remove("fade");
           
        ctx.strokeStyle = "white";
        ctx.lineWidth = currentEraserSize;
    }
});