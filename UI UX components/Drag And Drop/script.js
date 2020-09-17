const full = document.querySelector(".full");
const emptyBoxes = document.querySelectorAll(".empty-boxes");

// Full Listeners
full.addEventListener("dragstart", dragStart);
full.addEventListener("dragend", dragEnd);

// Loop through emptyBoxes

for (const box of emptyBoxes) {
    box.addEventListener("dragover", dragOver);
    box.addEventListener("dragenter", dragEnter);
    box.addEventListener("dragleave", dragLeave);
    box.addEventListener("drop", dragDrop);
}


// Drag Functions
function dragStart() {
    // this refers to 'full' class and we add 'hold' class to it
    this.className += " hold";
    // We use setTimeout so that image gets invisible with a delay.
    setTimeout(() => (this.className = "invisible"), 1);
}
function dragEnd() {
    // Change class back to just `full'
    this.className = "full";
}

function dragOver(ev) {
    ev.preventDefault();
}
function dragEnter(ev) {
    ev.preventDefault();
    this.className += " hovered";
}
function dragLeave() {
    this.className = "empty-boxes";
}
function dragDrop() {
    this.className = "empty-boxes";
    // Append a Node object which is the div class in this case to the 'empty-boxes' class
    this.append(full);
}