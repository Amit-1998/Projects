let outputContainer = document.querySelector(".OutputArea");
let db = [];

function makeMatrix() {

   let tableDiv = `<div class="matrix">`;
   for (let i = 0; i < 20; i++) {  // 400 cells
      tableDiv += `<div class="row">`;
      for (let j = 0; j < 20; j++) {
         tableDiv += `<div class="cell" contenteditable="true" rowid = "${i}" colid="${j}">(${i},${j})</div>`;
      }
      tableDiv += `</div>`;
   }
   tableDiv += `</div>`;
   outputContainer.innerHTML = tableDiv;
}

function initDB(){
   
   for(let i=0; i<20; i++){
      let row = [];
      for(let j=0; j<20; j++){
          let idx = i*20 + j;
          let usCellKadiv = allCells[idx];

          let cellObject = {
             rowNo : i,
             colNo : j,
             weight : "",
             visited : false,
             srcTohere : [usCellKadiv]
          }
         row.push(cellObject);
      }
      db.push(row);
   }   
   // console.log(db);
}

makeMatrix();
let allCells = document.querySelectorAll(".cell"); // 400 cells
initDB();



