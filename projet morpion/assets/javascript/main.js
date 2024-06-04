let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
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
    document.querySelector('#player').textContent = "score pour les croix = " + compteurplayer
    document.querySelector('#enemy').textContent = "score pour les cercles = " + compteurenemy
}

function vsfight(isCpu) {
   cpumode = isCpu
   resetGame()
}

function playCpu() {
        if (turn < 9 && !victory()) {
            let random = randomize(0, 8)
            while (document.querySelectorAll('.cell')[random].innerHTML != "") {
                random = randomize(0, 8)
            }
            document.querySelectorAll('.cell')[random].click()
        }
    
}


function play(cell, i, j) {
    const image = document.createElement('img')
    image.classList.add('symbol')
    if (turn % 2 == 0) {
        image.src = "./assets/images/circle.png"
        board[i][j] = "O"
        cell.appendChild(image)
        turn++
    }
    else {
        image.src = "./assets/images/cross.webp"
        board[i][j] = "X"
        cell.appendChild(image)
        turn++
        if (cpumode === true) {
            playCpu()
        }
        
    }
    victory()
}
affich()

function checkWin(letter) {
    for (let i = 0; i < 3; i++) {
        if (board[i].every(cell => cell === letter)) {
            if (board[i][0] == "O") {
                compteurenemy += 1
            }
            if (board[i][0] == "X") {
                compteurplayer++
            }
            return true;
        }
    }
    for (let i = 0; i < 3; i++) {
        if ([board[0][i], board[1][i], board[2][i]].every(cell => cell === letter)) {
            if (board[0][i] == "O") {
                compteurenemy++
            }
            if (board[0][i] == "X") {
                compteurplayer++
            }
            return true;
        }
    }
    if ([board[0][0], board[1][1], board[2][2]].every(cell => cell === letter)) {
        if (board[0][0] == "O") {
            compteurenemy++
        }
        if (board[0][0] == "X") {
            compteurplayer++
        }
        return true;
    }
    if ([board[0][2], board[1][1], board[2][0]].every(cell => cell === letter)) {
        if (board[0][2] == "O") {
            compteurenemy++
        }
        if (board[0][2] == "X") {
            compteurplayer++
        }
        return true;
    }
    return false;
}

function victory() {
    let letter = (turn % 2 === 0) ? "X" : "O";
    if (checkWin(letter)) {
        document.querySelector('#annonce').innerHTML = `Player ${letter} wins!`;
        delay()
    } else if (turn === 10) {
        document.querySelector('#annonce').innerHTML = "It's a draw!";
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
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    turn = 1;
    tablecontainer.innerHTML = "";
    document.querySelector('#annonce').textContent = ""
    affich();
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}