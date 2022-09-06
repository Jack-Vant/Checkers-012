import { d, div_board, input_N, input_M } from "./binds.js"

let N, M;

function newBoard(n, m, arr = null) {
    resize(n, m);
    fillBoard(arr);
}

function clearBoard() {
    div_board.querySelectorAll("span")?.forEach(e => e.remove());
}

function resize(n, m) {
    N = n;
    input_N.value = N;
    M = m;
    input_M.value = M;
    div_board.style.width = `${m * 2}em`;
    div_board.className = (m % 2 == 0) ? "even" : "odd";
}

function addCell(face = "x") {
    const s = d.createElement("span");
    s.className = face;
    div_board.appendChild(s);
    return s;
}

function evenPad(i, h) {
    if (i % M)
        addCell();
    if ((i % M) == h)
        addCell();
}

function enableCell(c) {
    c.tabIndex = 0;
    c.classList.add("v");
}

function fillBoard(arr) {
    clearBoard();
    const spaces = N * M;
    const l = Math.ceil(spaces / 2);
    if (M % 2 == 0) {
        const half = (M / 2);
        for (let i = 1; i <= l; i++) {
            enableCell(addCell(arr?.[i - 1] ?? 0));
            evenPad(i, half);
        }
        if (N % 2 !== 0)
            div_board.lastChild.remove();
    } else {
        for (let i = 0; i < l; i++) {
            enableCell(addCell(arr?.[i] ?? 0));
            addCell();
        }
        if (N % 2 !== 0)
            div_board.lastChild.remove();
    }
}

export { N, M, newBoard, clearBoard, resize, fillBoard }
