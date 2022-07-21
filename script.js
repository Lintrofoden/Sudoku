let numSelected = null;

let board = []

let solution = []

// let board = [
//     "--74916-5",
//     "2---6-3-9",
//     "-----7-1-",
//     "-586----4",
//     "--3----9-",
//     "--62--187",
//     "9-4-7---2",
//     "67-83----",
//     "81--45---"
// ]

// let solution = [
//     "387491625",
//     "241568379",
//     "569327418",
//     "758619234",
//     "123784596",
//     "496253187",
//     "934176852",
//     "675832941",
//     "812945763"
// ]


window.onload = function() {
    createBoard();
    setGame();
}

function setGame(){
    for(let i = 1; i < 10; i++){
        let number = document.createElement("div");
        number.id = i;
        number.innerHTML = i;
        number.classList.add("number");
        number.addEventListener("click", selectNumber);
        document.getElementById("digits").appendChild(number);
    }

    for(let r = 0; r <= 8; r++){
        for(let c = 0; c <= 8; c++){
            let cell = document.createElement("div");
            cell.id = r + "-" + c;
            cell.classList.add("cell");
            cell.addEventListener("click", setCell);
            if(board[r][c] != "-")
            {
                cell.innerText = board[r][c];
                cell.classList.add("filled-cell");
            }
            if(r == 2 || r == 5){
                cell.classList.add("hor-line");
            }
            if(c == 2 || c == 5){
                cell.classList.add("ver-line");
            }
            document.getElementById("board").appendChild(cell);
        }
    }
}

function selectNumber(){
    if(numSelected != null){
        numSelected.classList.remove("selected-number");
    }
    numSelected = this;
    this.classList.add("selected-number");
}

function setCell(){
    if(!this.classList.contains("filled-cell") && numSelected != null)
    {
        //вставляем значение в ячейку
        this.innerHTML = numSelected.innerHTML;
        // получаем id яейки (позицию в board)
        let indexs = this.id.split("-")
        // берем ряд 
        let row = board[indexs[0]];
        // берем первую часть ряда
        let firstPart = row.slice(0, indexs[1]);
        // берем вторую часть ряда
        let secondPart = row.slice(++indexs[1]);
        // меняем тот кусок ряда
        board[indexs[0]] = firstPart + numSelected.innerHTML + secondPart;
    }
}

function check(){
    for(let i = 0; i <= 9; i++)
    {
        if(board[i] != solution[i])
        {
            document.getElementById("answer").innerHTML = "Неверно решено";
            return;
        }
        document.getElementById("answer").innerHTML = "Верно решено";
    }
}

function createBoard(){
    // создание базовой доски
    let k = "123456789";
    let g = 0;
    for(let i = 0; i <= 8; i++)
    {
        let v = "";
        for(let z = 0; z <= 8; z++)
        {
            v = v + k[g];
            g++;
            if(g >= 9){
                g = 0;
            }
        }
        switch (g){
            case 6:
                g = 1;
                break;
            case 7:
                g = 2;
                break;
            case 8:
                g = 3;
                break;
            default:
                g = g + 3;
        }
        solution.push(v);
    }
    // перемешиваем
    mixBoard(solution);
    solution = rotateBoard(solution);
    mixBoard(solution);
    solution = rotateBoard(solution);
    mixBoard(solution);
    
    for(let l = 0; l <= 8; l++){
        board.push(solution[l]);
    }
    cellsDeletion(board);
    console.log(solution);
}

function mixBoard(board){
    for(let i = 0; i <= 20; i++){
        let firstRow = Math.floor(Math.random() * 9);
        let secondRow = Math.floor(Math.random() * 9);
        while(firstRow == secondRow || Math.floor(firstRow/3) != Math.floor(secondRow/3)){
            firstRow = Math.floor(Math.random() * 9);
            secondRow = Math.floor(Math.random() * 9);
        }
        [board[firstRow], board[secondRow]] = [board[secondRow], board[firstRow]];
    }
}

function rotateBoard(board){
    helpBoard = [];
    for(let i = 0; i <= 8; i++){
        let k = "";
        for(let j = 0; j <= 8; j++){
            k = k + board[j][i];
        }
        helpBoard.push(k);
    }
    return helpBoard;
}

function cellsDeletion(table){
    quantity = []
    let k = 0;
    for(let i = 0; i <= 8; i++){
        quantity.push(randomInteger(4, 6));
        k = k + quantity[i];
    }
    for(let i = 0; i <= 8; i++){
        let k = quantity[i];
        while(k > 0){
            let r = Math.floor(Math.random() * 9);
            let firstPart = table[i].slice(0, r);
            let secondPart = table[i].slice(++r);
            let a = firstPart + "-" + secondPart;
            table[i] = a;
            --k;
        }
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min + 1);
    return Math.round(rand);
}