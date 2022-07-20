let numSelected = null;


let board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

let solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

console.log(solution);

window.onload = function() {
    setGame()
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