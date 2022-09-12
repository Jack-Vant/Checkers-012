import { button_play_stop, input_start, input_end, textarea_display, span_popup } from "./binds.js"
import { boards, readBoards, displayBoard } from "./boardlist.js";

let popup_timer;
let popup_ticks = 0;

function popup(msg) {
    popup_ticks = 0;
    clearTimeout(popup_timer);
    span_popup.textContent = msg;
    span_popup.style.display = "block";
    popup_timer = setInterval(() => {
        if (popup_ticks >= 3)
            return span_popup.style.display = "none";
        popup_ticks++;
        span_popup.textContent += "."
    }, 600);
}

const faces = 6;
function toggle(e) {
    const cssClass = e.target.classList[0]
    const c = Number(cssClass);
    if (isNaN(c))
        return;
    const i = (c + 1) % faces;
    e.target.classList.replace(cssClass, i);
}

let playing = false;
let speed = 1000;
let interval = 0;
let fIndex = 0;

function togglePlayback() {
    if (playing) {
        clearInterval(interval);
        playing = false;
        button_play_stop.textContent = "Play";
    } else {
        animate(Number(input_start.value), Number(input_end.value));
        button_play_stop.textContent = "Stop";
    }
}

function setSpeed(s) {
    speed = 1000 / s;
}

function animate(start = 0, end = -1) {
    if (start < 0 || start >= boards.length)
        start = 0;
    if (end < 0 || end > boards.length)
        end = boards.length;
    fIndex = start;
    playing = true;
    showAndStepF(end);
    if (playing)
        interval = window.setInterval(() => showAndStepF(end), speed);
}

function showAndStepF(end) {
    displayBoard(fIndex);
    fIndex++;
    if (fIndex >= end) {
        clearInterval(interval);
        playing = false;
        button_play_stop.textContent = "Play";
    }
}

function dragFile(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
}

function dropFile(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    if (data == null || data == "") {
        data = "0 0"
        for (const file of ev.dataTransfer.files)
            file.text().then(t => {
                textarea_display.value = textarea_display.value.replace("0 0", t);
                readBoards();
            });
    } else {
        textarea_display.value = textarea_display.value.replace("0 0", data);
        readBoards();
    }
}

export { popup, toggle, togglePlayback, setSpeed, dragFile, dropFile }
