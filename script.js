let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;
let flag = false;

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
    count = 0;
    flag = false;
}

boxes.forEach((box) =>{
    box.addEventListener("click" , () =>{
        if(turnO){
            box.innerText = "O";
            box.style.color = 'blue';
            turnO = false;
        }else{
            box.innerText = "X";
            box.style.color = '#902D41';
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enabledBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is ${winner} !!`; 
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const displayDraw = () => {
    msg.innerText = `OOPs, it's a Draw !!`; 
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const checkWinner = () => {
       for(let pattern of winPatterns){
          let pos1Val = boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;

          if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
                flag = true;
            }
          }
       } 
       count = count + 1;
       if(flag === false && count === 9){
        displayDraw();
       }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);