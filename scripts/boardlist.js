import { div_board, input_index, textarea_display } from "./binds.js"
import { N, M, clearBoard, resize, fillBoard } from "./board.js";
import { popup } from "./ui.js";

let boards = [];
let index;
const re = /(\d?\d \d?\d)\n((?:\d ?)+)\n/;
const re_g = new RegExp(re.source, "g");

function setIndex(i) {
    if (i < 0) i = 0;
    else if (i >= boards.length) i = boards.length - 1;
    index = i;
    input_index.value = index;
}

function displayBoard(i = 0) {
    const b = boards?.[i];
    setIndex(i);
    if (b == null)
        return popup("Out of bounds");
    const result = re.exec(b);
    resize(...result[1].split(" ").map(e => Number(e)));
    fillBoard(result[2].split(" "));
}

function addBoard() {
    let text = `${M} ${N}\n`;
    div_board.querySelectorAll("span.v").forEach(e => text += e.classList[0] + " ");
    text = text.trimEnd();
    setIndex(boards.push(text + "\n") - 1);
    textarea_display.value = textarea_display.value.replace(/^0 0$/m, text + "\n0 0");
}

function removeBoard() {
    if (boards.splice(index, 1).length == 0)
        popup("Empty");
    else
        clearBoard();
    textarea_display.value = boards.join("") + "0 0";
}

function readBoards() {
    let result;
    boards = [];
    while ((result = re_g.exec(textarea_display.value)) !== null)
        boards.push(result[0]);
    displayBoard(0);
}

export { boards, addBoard, removeBoard, readBoards, displayBoard }
