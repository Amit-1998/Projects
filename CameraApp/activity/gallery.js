
let db;
let dbOpenRequest = indexedDB.open("Gallery", 1);

dbOpenRequest.onupgradeneeded = function(e){ // async function
     db = e.target.result;
     // table bna lo "MediaTable name ki"
     db.createObjectStore("MediaTable", { keyPath: "mid"}); // table will only be create when db is create first time
}

dbOpenRequest.onsuccess = function(e){
    db = e.target.result; 
    fetchMedia();
}

dbOpenRequest.onerror = function(e){
    alert("Inside on error !!");
}


function fetchMedia(){  // showmedia() vaala code
    let txnObject = db.transaction("MediaTable", "readonly");
    let mediaTable = txnObject.objectStore("MediaTable"); //to get complete table

    let cursorObject = mediaTable.openCursor(); // to iterate on all the values / tuples of mediaTable
    cursorObject.onsuccess = function(e){
         let cursor = cursorObject.result; // pehla tuple milega table ka
         if(cursor){
             let mediaObj = cursor.value; // mid: 1 ke samne value mein pada object milega 
             if(mediaObj.type == "photo"){
                 appendPhoto(mediaObj);
             }
             else{
                 appendVideo(mediaObj);
             }
             // aage tuples milte rahenge(means fir function(e) ko call lagti rahegi continue() se )
             cursor.continue();
         }
         
    };
}

function appendPhoto(mediaObj){
     let mediaDiv = document.createElement("div");
     mediaDiv.classList.add("media-div");

     mediaDiv.innerHTML = `<img class="media-img" src="${mediaObj.url}" alt="" >
     <div class="media-buttons">
           <div class="download-media">Download</div>
           <div class="delete-media">Delete</div>
     </div>`;

    mediaDiv.querySelector(".download-media").addEventListener("click", function(){
        downloadMedia(mediaObj,mediaDiv);
    });
    
    mediaDiv.querySelector(".delete-media").addEventListener("click", function(){
        deleteMedia(mediaObj,mediaDiv);
    });

    // mediaDiv.querySelector("img").src = mediaObj.url;
    
    document.querySelector(".gallery").append(mediaDiv);

}

function appendVideo(mediaObj){
    let mediaDiv = document.createElement("div");
    mediaDiv.classList.add("media-div");

    mediaDiv.innerHTML = `<video class= "media-video" controls autoplay loop></video>
    <div class="media-buttons">
          <div class="download-media">Download</div>
          <div class="delete-media">Delete</div>
    </div>`;

    mediaDiv.querySelector("video").src = URL.createObjectURL(mediaObj.url);
   // mediaDiv.querySelector("img").src = mediaObj.url;

   mediaDiv.querySelector(".download-media").addEventListener("click", function(){
       downloadMedia(mediaObj);
   });

   mediaDiv.querySelector(".delete-media").addEventListener("click", function(){
      deleteMedia(mediaObj,mediaDiv);
   });
   
   document.querySelector(".gallery").append(mediaDiv);

}

function downloadMedia(mediaObject){
    let aTag = document.createElement("a");
    if(mediaObject.type == "photo"){
         aTag.download = `${mediaObject.mid}.jpg`;
         aTag.href = mediaObject.url;
    }
    else{
        aTag.download = `${mediaObject.mid}.mp4`;
        aTag.href = URL.createObjectURL(mediaObject.url);
    }
   aTag.click();
}

function deleteMedia(mediaObject, mediaDiv){
     let mid = mediaObject.mid;
     let txnObject = db.transaction("MediaTable", "readwrite");
     let mediaTable = txnObject.objectStore("MediaTable");
     mediaTable.delete(mid);

     mediaDiv.remove();  // UI se remove

}



