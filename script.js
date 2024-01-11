const options= {
    aroma: "Pleasing smell",
    pepper: "Salt's partner",
    halt: "put a stop to",
    jump: "Rise suddenly",
    shuffle: "Mix cards up",
    combine: "Add; Mix",
    chaos: "Total disorder",
    labyrinth: "Maze",
    disturb: "Interrupt; upset",
    shift: "Move; Period of word",
    machine: "Device or appliance",
    Angry: "Furious;Enraged",
    Delicious:"Savory;Appetizing",
    Fair: "Just;Impartial;Unbiased",
    Quiet:"Tranquil;Peaceful;Calm",
    Ugly:"Horrible;Unpleasant",
    True:"Accurate;Right",
    Mischievous:"Prankish;Waggish",
    Destroy:"Ruin;Demolish",
    Enjoy:"Appreciate;Delight In",
    Hungry: "Starving",
    cold: "chilly;chilled; wintry",
    honest:" honorable; fair; sincere",
    mean:"unfriendly; unpleasant;bad-tempered",
    positive:"optimistic;cheerful",
    quote:"repeat;recite",
    valid:"authorized;legitimate",
    weak:"frail; infirm",
    youth:"minor; youngster",
    zone:" area; region",
}; 
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "";
 randomHint ="";
 let winCount = 0;
 lossCount = 0;
 const generateRandomValue = (array) => Math.floor(Math. random() * array.length);
//block all the buttons

 const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");


    stopGame();
 };
 startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
 });
 // stop game 
 const stopGame = () => {
    controls.classList.remove("hide");
 };
 // generate word function 
 const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML=`<div id="wordHint">
    <span>Hint: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach(values=>{
        displayItem += '<span class ="inputSpaces">_</span>';

    });

    //display each element as span 
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += '<div id = "chanceCount">Chances Left : ${lossCount} </div>';

 };

 // initial function 
 const init =  () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    
    // for creating letter buttons 
    for(let i = 65; i<91;i++) {
        let button = document.createElement("button");
        button.classList.add("letters");

        //number to ASCII 
        button.innerText = String.fromCharCode(i);
        //character button on click 
        button.addEventListener("click", () => {
          message.innerText = 'Correct Letter';  
          message.style.color = "#008000";
          let charArray = randomWord.toLocaleUpperCase().split("");
          let inputSpace = document.getElementsByClassName("inputSpaces");
          // if array contains clicked value replace the matched dash with letter
          if(charArray.includes(button.innerText)){
            charArray.forEach((char,index)=> {
                //if character in an array is same as clicked button
                if(char == button.innerText ) {
                    button.classList.add("correct");
                    // replace dash with letter 
                    inputSpace[index].innerText = char;
                    // increment letter
                    winCount += 1;
                    // if win count equals word length 
                    if(winCount == charArray.length) {
                        resultText.innerHTML = " You Won";
                        startBtn.innerText = "Restart";
                        // block all buttons 
                        blocker();
                    }
                }
            });
          }
          else {
           // lose count 
            button.classList.add("inncorrect");
            lossCount-= 1;
            document.getElementById("chanceCount").innerText = 'chances Left:$(lossCount)';
            message.innerText = 'Incorrect Letter';
            message.style.color = "#ff0000";
            if(lossCount == 0) {
                word.innerHTML = 'The word was: <span>${randomWord}</span>';
                resultText.innerHTML = "Game Over";
                blocker();
            }
          }
          // display clicked buttons 
          button.disabled = true;
        });

        //append generated buttons to the letter container
        letterContainer.appendChild(button);
    }

 };
 window.onload = () => {
    init();

 };
