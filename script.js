const startButton = document.querySelector(".startButton")
const body = document.querySelector("body")
const start = document.querySelector(".start")
const howToPlay = document.querySelector(".howToPlay")
const game = document.querySelector(".game")
const startGameButton = document.querySelector(".startGame")
const gameContainer = document.querySelector(".game-container");
const nextButton = document.querySelector(".nextButton");
const popUp = document.querySelector(".popUp");
const information = document.querySelector(".information");
const timerCount = document.querySelector(".time");
const final = document.querySelector(".final");
const text = document.querySelector(".text");
const icon = document.querySelector(".icon");
const more = document.querySelector(".More");
const restart = document.querySelector(".restart");
const finalTitle = document.querySelector(".final-title")

let firstCard;
let firstCardValue;
let secondCard;
let secondCardValue
let flipping;

let time = 0;
let winCount
let startGame

//Items array
const items = [
    { value: 0 ,name: "reusable bag", image: "./img/bag.png" },
    { value: 1 ,name: "solar panels", image: "./img/solar.png" },
    { value: 2 ,name: "growing food", image: "./img/food.png" },
    { value: 3 ,name: "bicycle", image: "./img/bicycle.png" },
    { value: 4 ,name: "trees", image: "./img/trees.png" },
    { value: 5 ,name: "green policy", image: "./img/policy.png" },
    { value: 6 ,name: "electric car", image: "./img/charge.png" },
    { value: 7 ,name: "recycle bin", image: "./img/bin.png" },
    { value: 8 ,name: "park", image: "./img/park.png" }
  ];

const details = [
    { info: "Reusable bag can be used more often which reduce the use of plastic bags. The amount of disposed bags that end up in landfill or oceans also decrease."},
    { info: "It is a renewable energy source provides more than enough energy to meet the whole world's energy needs, and it won't run out anytime soon."},
    { info: "Growing own vegetables reduce carbon emissions. No plastic packaging is required when you harvest vegetables, which also reduces fossil fuel inputs."},
    { info: "Biking a mile is 3-5 times more energy-effient than walking, and for every 3 miles not driven, 2.6pounds of cardon dioxide is kept out of the atmosphere."},
    { info: "Trees improve both air and water quality by absorbing pollutants, intercepting particulates, releasing oxygen, reducing ozone levels and reducing soil erosion."},
    { info: "Green Policy is a company's statement about their commitment to sustainability and environmental management and it is a high priority for them."},
    { info: "Electric car produces zero tailpipe emissions, dramatically lowering smog and greenhouse gas emissions. Which means cleaner air and better health."},
    { info: "When we recycle, we extract less raw materials, which conserves many of our precious and finite natural resources. Protecting our resources!"},
    { info: "Park preserve natural resources and promote quality of life for the people around it. It uses native plants and geographic features while also enjoyable."}
]

//Pick random objects from the items array
const generateRandom = (size = 2) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let cardValues = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist
    size = (size * 3) / 2;
    //Random object selection
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      //once selected remove the object from temp array
      tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 2) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * 3; i++) {
      gameContainer.innerHTML += `
       <div class="card-container" data-card-value="${cardValues[i].value}">
          <div class="card-before">
          <img src="./img/back.png" class="card-logo"/>
          </div>
          <div class="card-after">
          <img src="${cardValues[i].image}" class="card-image"/></div>
       </div>
       `;
    }
  
    //Cards
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        if(flipping == false){
          flipping = true
          //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
        if (!card.classList.contains("matched")) {
          //flip the cliked card
          card.classList.add("flipped");
          //if it is the firstcard (!firstCard since firstCard is initially false)
          if (!firstCard) {
            //so current card will become firstCard
            firstCard = card;
            //current cards value becomes firstCardValue
            firstCardValue = card.getAttribute("data-card-value");
          } else {
            //secondCard and value
            secondCard = card;
            let secondCardValue = card.getAttribute("data-card-value");
            if (firstCardValue == secondCardValue) {
              //if both cards match add matched class so these cards would beignored next time
              firstCard.classList.add("matched");
              secondCard.classList.add("matched");
              startGame = false
              let delay = setTimeout(() => {
                Show()
                firstCard = false;
              }, 400);
              //set firstCard to false since next card would be first now
            } else {
              //if the cards dont match
              //flip the cards back to normal
              let [tempFirst, tempSecond] = [firstCard, secondCard];
              firstCard = false;
              secondCard = false;
              let delay = setTimeout(() => {
                tempFirst.classList.remove("flipped");
                tempSecond.classList.remove("flipped");
              }, 500);
            }
          }
        }
        let delay = setTimeout(() => {
          flipping = false
        }, 400);
        }
      });
    });
    opening()
  };

function opening(){
  let Opendelay = setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add("flipped"); 
    })
  }, 200);
  let Closedelay = setTimeout(() => {
    closing()
  }, 2000);
}

function closing(){
  cards.forEach((card) => {
    card.classList.remove("flipped");
  })
  let delay = setTimeout(() => {
    startGame = true
    flipping = false
    firstCard = null
    secondCard = null
  }, 500);
}

function Show() {
    let current = firstCardValue;
    console.log(current)
    information.innerHTML =`
    <img src="${items[current].image}">
    <h1>${items[current].name}</h1>
    <p>${details[current].info}</p>`
    popUp.classList.remove("hide")
}

function updateCountDown(){
  console.log(startGame)
    if(startGame == true){
        if(time == 0){
            startGame = false
            final.classList.remove("hide")
            final.style.backgroundColor = "#E0F0C0"
            icon.style.color = "#2A2C5C"
            more.style.backgroundColor = "#60A478"
            more.style.color = "white"
            finalTitle.innerHTML = `
            <img class="title-final" src="./img/end.png">`
            icon.innerHTML = `
              <img src="./img/timeout.png">
              <p>Timeout</p>`
            restart.innerHTML =`
              <img src="./img/black.png">
              <p>RESTART</p>`
            restart.style.color = "black"
            return
        }
        time--;
        timerCount.innerHTML = `${time}s`;
    }
}
setInterval(updateCountDown, 1000)

startButton.addEventListener("click", () => {
    start.classList.add("hide")
    howToPlay.classList.remove("hide")
    body.style.backgroundColor = "#E7F7F5"
})

startGameButton.addEventListener("click", () => {
    howToPlay.classList.add("hide")
    game.classList.remove("hide")
    body.style.backgroundColor = "#E0F0C0"
    winCount = 0
    time = 60
    initializer();
})

nextButton.addEventListener("click", () => {
    popUp.classList.add("hide")
    //winCount increment as user found a correct match
    winCount += 1;
    startGame = true
    //check if winCount ==half of cardValues
    if (winCount == 6) {
      startGame = false
        final.classList.remove("hide")
        body.style.backgroundColor = "#60A478"
        final.style.backgroundColor = "#60A478"
        icon.innerHTML = `
        <img src="./img/awesome.png">
        <p>Awesome</p>`;
    }
    if(winCount == 3){
      flipping = false
        initializer();
    }
})

restart.addEventListener("click", () => {
  final.classList.add("hide")
  time = 60
  winCount = 0;
  timerCount.innerHTML = `${time}s`;
  startGame = true
  body.style.backgroundColor = "#E0F0C0"
  initializer();
})


    //Initialize values and func calls
const initializer = () => {
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};