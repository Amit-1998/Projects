let videoElement = document.querySelector("video");
let recordButton = document.querySelector(".inner-record");
let recordingState = false;
let capturePhoto = document.querySelector(".inner-capture");
let filters = document.querySelectorAll(".filter");
let filterSelected = "none";
let zoomIn = document.querySelector(".zoomIn");
let zoomOut = document.querySelector(".zoomOut");
let galleryBtn = document.querySelector(".gallery-btn"); 

galleryBtn.addEventListener("click", function(){
    window.location.assign("gallery.html"); // gallery.html par hmari location kar dega from current position ( usi same tab ko relocate) not on new tab
});

let minZoom = 1;
let maxZoom = 3.1;
let currentZoom = 1;

// let constraint = { video: true };

// //for opening prompt to ask for access
// // navigator.mediaDevices.getUserMedia => ask permission for access your webcam
// navigator.mediaDevices.getUserMedia(constraint).then(function(mediaStream) {
//     // console.log(mediaStream); gives us mediaStream naam ka oject which have some functions
//     videoElement.srcObject = mediaStream; // a MediaStream from a camera is assigned to a created <video> element.
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
let mediaRecorder;

(async function(){
    let constraint = { video: true };
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraint);   
    videoElement.srcObject = mediaStream;    
    mediaRecorder = new MediaRecorder(mediaStream); // call constructor & pass mediaStream Object into that
    
    mediaRecorder.onstart = function(){
       console.log("Inside on start");
    } 

    mediaRecorder.ondataavailable = function(e){
      console.log("Inside on data available");
      console.log(e); // want this data to be download as a video
      
      let videoObject = new Blob( [e.data] , {type:"video/mp4"});  // create new blob( file object) in which we change e.data ka type to "video/mp4"
      // console.log(videoObject);
      // videoObject/imageObject => URL
      // aTag
      
       //   let videoURL = URL.createObjectURL(videoObject);
       //   let aTag = document.createElement("a");   
       //   aTag.download = `Video${Date.now()}.mp4`;
       //   aTag.href = videoURL;
       //   aTag.click();
        
       // add video object to db
       addMedia(videoObject, "video");


   }

    mediaRecorder.onstop = function(){
      console.log("Inside on stop");
      
    }

    recordButton.addEventListener("click", recordMedia);

    capturePhoto.addEventListener("click", photoCapture);

})();

for(let i=0; i<filters.length; i++){
    filters[i].addEventListener("click", function(e){
        // console.log(e.target.style.backgroundColor);

        let currentFilterSelected = e.target.style.backgroundColor;
        if(currentFilterSelected == ""){
             if(document.querySelector(".filter-div")){
                 document.querySelector(".filter-div").remove();
                 filterSelected = "none";
                 return;
             }
        }

        console.log(currentFilterSelected);
        if(filterSelected == currentFilterSelected){
            return;
        }

        let filterDiv = document.createElement("div");
        filterDiv.classList.add("filter-div");
        filterDiv.style.backgroundColor = currentFilterSelected;
        
        if(filterSelected == "none"){
            document.body.append(filterDiv);
        }
        else{
             document.querySelector(".filter-div").remove();
             document.body.append(filterDiv);
        }
        filterSelected = currentFilterSelected;
    });
}

zoomIn.addEventListener("click", function(){
       if(currentZoom + 0.1 > maxZoom){
           return;
       }
       currentZoom = currentZoom + 0.1;
       videoElement.style.transform = `scale(${currentZoom})`;
});

zoomOut.addEventListener("click", function(){
    if(currentZoom - 0.1 < minZoom){
        return;
    }
    currentZoom = currentZoom - 0.1;
    videoElement.style.transform = `scale(${currentZoom})`;
});


function photoCapture(){
         
         capturePhoto.classList.add("animate-capture");
         setTimeout( function(){ capturePhoto.classList.remove("animate-capture"); },1000); // 1000ms is 1s i.e after 1s it removes class name "animate-capture"

         // canvas
         let canvas = document.createElement("canvas");
         // canvas.width = videoElement.width;
         // canvas.height = videoElement.height;
  
         canvas.width = 640; // video width
         canvas.height = 480; // video height given manually default dimensions of coming video Element
 
         let ctx = canvas.getContext("2d");
         // capture photo with ZoomIn 
         if(currentZoom !=1){
             ctx.translate(canvas.width/2, canvas.height/2);
             ctx.scale(currentZoom,currentZoom);
             ctx.translate(-canvas.width/2,-canvas.height/2);
         }

         ctx.drawImage(videoElement,0,0); // canvas se offset dx,dy

         // photo bhi filter ke saath save honi chahiye
         if(filterSelected!="none"){
             ctx.fillStyle = filterSelected;
             ctx.fillRect(0 , 0, canvas.width , canvas.height);
         } 


         // download canvas as an Image
        //  let aTag = document.createElement("a");   
        //  aTag.download = `Image${Date.now()}.jpg`;
        //  aTag.href = canvas.toDataURL("image/jpg");
        //  aTag.click();

        // save image to DB
        let canvasURL = canvas.toDataURL("image/jpg");
        addMedia(canvasURL, "photo"); // here we pass "photo" as type
        

}

function recordMedia(){
    if(recordingState){
          // already recording is going on
          // stop the recording
         mediaRecorder.stop();
         recordingState = false;
         recordButton.classList.remove("animate-record");
    }
    else{
        // start the recording
       mediaRecorder.start();
       recordingState = true;
       recordButton.classList.add("animate-record");
    }
}

function addMedia(mediaURL, mediaType){
    // db mein media add hojaega
    let txnObject = db.transaction("MediaTable", "readwrite"); // start transaction on mediaTable //create a transaction on a database
    // "Gallery" is a DB name and "readwrite" is kind of access
    let mediaTable = txnObject.objectStore("MediaTable");   // this will get access to mediaTable           
    mediaTable.add( {mid: Date.now(), type: mediaType, url: mediaURL} ); // it will add this object in mediaTable or mediaStore

    // txn fail bhi ho sakti hai, when? => when we pass duplicate mid
    txnObject.onerror = function(e){
         console.log("txn failed");
         console.log(e);
    }

}