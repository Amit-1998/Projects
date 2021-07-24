// class Node{
//     constructor(row, col, dist){
//         this.row = row;
//         this.col = col;
//         this.dist = dist;
//     }
// }

// let start_x = document.querySelector("#st-rowNo");
// let start_y = document.querySelector("#st-colNo");

// let end_x = document.querySelector("#en-rowNo");
// let end_y = document.querySelector("#en-colNo");

let Node = {
    row : 0,
    col : 0,
    dist : 0
}

function Queue(){
    this.elements = [];
}

Queue.prototype.enqueue = function (e) {
    this.elements.push(e);
 };

 // remove an element from the front of the queue
Queue.prototype.dequeue = function () {
    return this.elements.shift();
};

// check if the queue is empty
Queue.prototype.isEmpty = function () {
    return this.elements.length == 0;
};

// get the element at the front of the queue
Queue.prototype.peek = function () {
    return !this.isEmpty() ? this.elements[0] : undefined;
};

Queue.prototype.length = function() {
    return this.elements.length;
}

// let q = new Queue();
// q.enqueue(Node);
// console.log(q);

