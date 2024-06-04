let board = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
]
let cell
let turn = 1
let compteurplayer = 0
let compteurenemy = 0
let cpumode = false

let tablecontainer = document.querySelector("#affich")
function affich() {
    board.forEach((row, i) => {
        let element = document.createElement("div")
        element.classList.add("row")
        tablecontainer.appendChild(element)
        row.forEach((cell, j) => {
            let ma = document.createElement("div")
            ma.classList.add("cell")
            element.appendChild(ma)
            ma.addEventListener("click", () => {
                play(ma, i, j)
            }, { once: true })
        });

    });
    document.querySelector('#player').textContent = "score pour les rouges = " + compteurplayer
    document.querySelector('#enemy').textContent = "score pour les jaunes = " + compteurenemy
}
affich()

function applyGravity() {
    for (let col = 0; col < board[0].length; col++) {
        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][col] !== "") {
                break;
            }
            if (row < board.length - 1 && board[row + 1][col] === "") {
                board[row + 1][col] = board[row][col];
                board[row][col] = "";
            }
        }
    }
}

function vsfight(isCpu) {
    cpumode = isCpu
    resetGame()
}

function playCpu() {
    if (!victory()) {
        let random = randomize(0, 6)
        while (document.querySelectorAll('.cell')[random].innerHTML != "") {
            random = randomize(0, 6)
        }
        document.querySelectorAll('.cell')[random].click()
    }
}

function play(cell, i, j) {

    if (turn % 2 == 0) {
        cell.style.backgroundColor = 'yellow';
        board[i][j] = "yellow"

        turn++
    }
    else {
        cell.style.backgroundColor = 'red';
        board[i][j] = "red"

        turn++
        if (cpumode === true) {
            playCpu()
        }
    }
    applyGravity();
    victory()
}

function checkWin(letter) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j + 3] && board[i][j] !== "") {
                if (board[i][j] == board[i][j + 1] && board[i][j + 1] == board[i][j + 2] && board[i][j + 2] == board[i][j + 3]) {
                    if (board[i][j] == "red") {
                        compteurplayer++
                    } else {
                        compteurenemy++

                    }
                    return true
                }
            }
            if (board[i + 3] && board[i][j] !== "") {
                if (board[i][j] == board[i + 1][j] && board[i + 1][j] == board[i + 2][j] && board[i + 2][j] == board[i + 3][j]) {
                    if (board[i][j] == "red") {
                        compteurplayer++
                    } else {
                        compteurenemy++

                    }
                    return true
                }
            }
            if (board[i + 3] && board[i + 3][j + 3] && board[i][j] !== "") {
                if (board[i][j] == board[i + 1][j + 1] && board[i + 1][j + 1] == board[i + 2][j + 2] && board[i + 2][j + 2] == board[i + 3][j + 3]) {
                    if (board[i][j] == "red") {
                        compteurplayer++
                    } else {
                        compteurenemy++

                    }
                    return true
                }
            }
            if (board[i + 3] && board[i + 3][j - 3] && board[i][j] !== "") {
                if (board[i][j] == board[i + 1][j - 1] && board[i + 1][j - 1] == board[i + 2][j - 2]) {
                    if (board[i][j] == "red") {
                        compteurplayer++
                    } else {
                        compteurenemy++

                    }
                    return true
                }
            }

        }

    }
}

function victory() {
    let letter = (turn % 2 === 0) ? "red" : "yellow";
    if (checkWin(letter)) {
        document.querySelector('#annonce').innerHTML = `Player ${letter} wins!`;
        delay()
    }
}

function delay() {
    setTimeout(function () {
        resetGame()
    }, 2000);
}

function resetGame() {
    board = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ]
    turn = 1;
    tablecontainer.innerHTML = "";
    document.querySelector('#annonce').textContent = ""
    affich();
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}