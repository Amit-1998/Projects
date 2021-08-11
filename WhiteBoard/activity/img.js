let photoDiv = document.querySelector("#photo");
let photoUploadInput = document.querySelector("#photo-upload");
let downloadDiv = document.querySelector("#download");

photoDiv.addEventListener("click", function(){
     photoUploadInput.click();
});

photoUploadInput.addEventListener("change", function(event){
     console.log(event);
     let fileObj = event.target.files[0];
     console.log(fileObj);
     let filePath = URL.createObjectURL(fileObj); // convert fileObj into filePath
     //console.log(filePath);
     let img = document.createElement("img");
     img.setAttribute("src", filePath);
     // document.querySelector("body").append(img);
     img.classList.add("sticky-image");
     addSticky(img);

});

downloadDiv.addEventListener("click", function(){
     // download canvas element to an image
     let imagePath = canvas.toDataURL('image/png');
     console.log(imagePath);
     // <a href="" download="canvas.jpg"></a>
     let aTag = document.createElement("a");
     aTag.download = "canvas.jpg"; // on giving attribute download to an aTag it doesn't navigate instead download the image as name 'canvas.jpg'
     aTag.href = imagePath;
     aTag.click();
});