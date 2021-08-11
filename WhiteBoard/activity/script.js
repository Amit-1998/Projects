let canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    
    drawLinesFromDB();
});

// canvas drawing gets erased on window resize ???

// a context object which provides fun for 2d drawing
let ctx = canvas.getContext("2d");
// console.log(ctx);

// for demo only
// ctx.fillStyle = "yellow";
// ctx.fillRect(10,10,150,100);

let linesDB = [];
let redoLinesDB = [];
let isPenDown = false;
let line = [];

canvas.addEventListener("mousedown", function(e){
    if(redoLinesDB.length>0){
        redoLinesDB = [];
    }
    console.log("Inside mouse down");
    isPenDown = true;
    //  let {clientX,clientY} = e;
    let x = e.clientX;
    let y = e.clientY-100;
    ctx.beginPath();
    ctx.moveTo(x,y);

    let pointObject = {
        x: x,
        y: y,
        type: "md",
        lineWidth: ctx.lineWidth,
        strokeStyle: ctx.strokeStyle
    }
    line.push(pointObject);
});

canvas.addEventListener("mousemove", function(e){
    if(isPenDown){
        console.log("Inside mouse move");
        let x = e.clientX;
        let y = e.clientY-100;
        ctx.lineTo(x,y);
        ctx.stroke();

        let pointObject = {
            x: x,
            y: y,
            type: "mm"
        }
        line.push(pointObject);
    }
});

canvas.addEventListener("mouseup", function(e){
    console.log("mouse up");
     isPenDown = false;

     linesDB.push(line);
     line = []; 
     console.log(linesDB);
});