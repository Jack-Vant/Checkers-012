import { input_index, textarea_display, span_err } from "./binds.js"
import { readBoards, displayBoard } from "./boardlist.js";

let err_timer;
let err_ticks = 0;

function popup(msg) {
    err_ticks = 0;
    clearTimeout(err_timer);
    span_err.textContent = msg;
    span_err.style.display = "block";
    err_timer = setInterval(() => {
        if (err_ticks >= 3)
            return span_err.style.display = "none";
        err_ticks++;
        span_err.textContent += "."
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

function nudge(amt) {
    let i = Number(input_index.value) + amt;
    if (i < 0) i = 0;
    input_index.value = i;
    displayBoard(i);
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

export { popup, toggle, nudge, dragFile, dropFile }
