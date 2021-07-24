// xOfstartPoint
// yOfstartPoint
// xOfendPoint
// yOfendPoint

// srcCellKaDiv
// destCellKaDiv
// allCells
// db
let steps = 0;

function BFS(srcCellKaDiv,destCellKaDiv,db){
    
    let srcrowNo = srcCellKaDiv.getAttribute("rowid");
    let srccolNo = srcCellKaDiv.getAttribute("colid");
    
    let dstrowNo = destCellKaDiv.getAttribute("rowid");
    let dstcolNo = destCellKaDiv.getAttribute("colid");

    let srcNode = {
        row : srcrowNo,
        col : srccolNo,
        dist : 0,
        stepCount : 0,
        shortestPathSoFarDivs : db[srcrowNo][srccolNo].srcTohere
    }
   
    let q = new Queue();
    db[srcNode.row][srcNode.col].visited = true;
    // srcNode.shortestPathSoFarDivs.push(srcCellKaDiv);
    q.enqueue(srcNode);
    // console.log(q);
    while(!q.isEmpty()){
       let remNode = q.dequeue();
       // work on removed Node
       let idxInallCellForRemNode = Number(remNode.row) * 20 + Number(remNode.col);
       let removedNodeKaDiv = allCells[idxInallCellForRemNode];
    //    if(removedNodeKaDiv.classList.contains(".start") || removedNodeKaDiv.classList.contains(".end")){
    //       return; 
    //    }
       
       
       if(remNode.row == dstrowNo && remNode.col == dstcolNo){ 
          let ActualShortestPath = db[dstrowNo][dstcolNo].srcTohere;
          console.log(ActualShortestPath);
          for(let i=ActualShortestPath.length-1; i>=0; i--){
            //   if(i==ActualShortestPath.length-1 || i==0){
            //       continue;
            //   }
              let pathdiv = ActualShortestPath[i];
            //   console.log("********pathdiv*****");
            //   console.log(pathdiv);
            if(pathdiv.classList.contains("move-added")){
                pathdiv.classList.remove("move-added");
            }
            
              pathdiv.classList.add("shortPath");
          }
          return;
       }
       else{
           // explore neighbours of current cell
           for(let i=-1; i<=1; i++){
               for(let j=-1; j<=1; j++){
                   let RfornextCell = Number(remNode.row) + i;
                   let CfornextCell = Number(remNode.col) + j;

                   let idxInallCells = RfornextCell * 20 + CfornextCell;
                   let nextMoveKaDiv = allCells[idxInallCells];
                   let spsf = db[Number(remNode.row)][Number(remNode.col)].srcTohere.slice(0);
                //    let spsf = remNode.shortestPathSoFarDivs;

                   if(isValidCell(nextMoveKaDiv,RfornextCell,CfornextCell)){
                       db[RfornextCell][CfornextCell].visited = true;
                       console.log(nextMoveKaDiv);
                       spsf.push(nextMoveKaDiv);
                    //    db[RfornextCell][CfornextCell].srcTohere.push(spsf);
                    //    let upshift = db[RfornextCell][CfornextCell].srcTohere.shift();
                    //    db[RfornextCell][CfornextCell].srcTohere.push(upshift);

                       let nextMoveNode = {
                          row : RfornextCell,
                          col : CfornextCell,
                          dist : 0,
                          stepCount : 0,
                          shortestPathSoFarDivs : spsf
                       }
                       
                    //    db[RfornextCell][CfornextCell].srcTohere = [];
                    db[RfornextCell][CfornextCell].srcTohere = nextMoveNode.shortestPathSoFarDivs;
                  //   db[Number(remNode.row)][Number(remNode.col)].srcTohere.pop();
                       
                       if(!nextMoveKaDiv.classList.contains("end"))
                         { nextMoveKaDiv.classList.add("move-added"); } 
                      
                       q.enqueue(nextMoveNode);
                   }
                  //  else
                  //     console.log("not valid cell");
               }
           }
       }
    }
}

function isValidCell(currentPosCellDiv,RfornextCell,CfornextCell){
   if(RfornextCell>=0 && RfornextCell<20 && CfornextCell>=0 && CfornextCell<20 && !currentPosCellDiv.classList.contains("obstacle") && db[RfornextCell][CfornextCell].weight!=-1 && db[RfornextCell][CfornextCell].visited==false ){
       return true;
   }
   return false;
}