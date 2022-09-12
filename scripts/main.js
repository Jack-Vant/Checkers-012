import { d, div_board, input_N, input_M, input_index, button_play_stop, dropzone } from "./binds.js";
import { newBoard } from "./board.js";
import { addBoard, removeBoard, readBoards, displayBoard } from "./boardlist.js";
import { toggle, togglePlayback, setSpeed, dragFile, dropFile } from "./ui.js";

div_board.addEventListener("click", toggle);

div_board.addEventListener("mouseover", (e) => { if (e.target.classList.contains("v")) { e.target.focus(); } });
div_board.addEventListener("mouseout", (e) => { e.target.blur(); });

d.getElementById("create").addEventListener("click", () => newBoard(Number(input_N.value), Number(input_M.value)));

input_index.addEventListener("change", (e) => displayBoard(e.target.value));
d.getElementById("prev").addEventListener("click", () => displayBoard(Number(input_index.value) - 1));
d.getElementById("next").addEventListener("click", () => displayBoard(Number(input_index.value) + 1));

button_play_stop.addEventListener("click", togglePlayback);
d.getElementById("speed").addEventListener("change", (e) => setSpeed(Number(e.target.value)));

d.getElementById("add").addEventListener("click", addBoard);
d.getElementById("remove").addEventListener("click", removeBoard);

dropzone.addEventListener("dragover", dragFile);
dropzone.addEventListener("drop", dropFile);
d.addEventListener("dragenter", () => dropzone.style.borderColor = "lime");

d.getElementById("sync").addEventListener("click", readBoards);

newBoard(3, 3);
