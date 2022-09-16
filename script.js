const startButton = document.querySelector(".startButton")
const body = document.querySelector("body")
const start = document.querySelector(".start")
const howToPlay = document.querySelector(".howToPlay")
const game = document.querySelector(".game")
const startGameButton = document.querySelector(".startGame")
const gameContainer = document.querySelector(".game-container");
const closeButton = document.querySelector(".close");
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

const pop = []

//Items array
const items = [
    { value: 0 ,name: "Eco-Bag", image: "./img/bag.png" },
    { value: 1 ,name: "Solar Panels", image: "./img/solar.png" },
    { value: 2 ,name: "Food Garden", image: "./img/food.png" },
    { value: 3 ,name: "Bicycle", image: "./img/bicycle.png" },
    { value: 4 ,name: "Trees", image: "./img/trees.png" },
    { value: 5 ,name: "Green Policy", image: "./img/policy.png" },
    { value: 6 ,name: "Electric Car Charging Station", image: "./img/charge.png" },
    { value: 7 ,name: "Recycling Bin", image: "./img/bin.png" },
    { value: 8 ,name: "Park", image: "./img/park.png" }
  ];

const details = [
    { info: "Ecobags eliminate the need for single-use plastic bags and recycle materials that would be for waste."},
    { info: "Renewable energy minimises the impacts of carbon pollution by creating cleaner and cheaper forms of air, electricity and water."},
    { info: "Food gardens help to reduce carbon emission, builds community resilience and food security relying less on mass produced foods, and increases support for local ecosystems."},
    { info: "Cycling largely reduces carbon emissions. Just cycling once a week saves up to 3.2kg of CO2 - equivalent to emissions from driving a car for 10km!"},
    { info: "Trees improve air and water quality, lower temperature levels, relieves stress on stormwater drainage systems and reduces carbon emissions."},
    { info: "Green policies ensure that governments and businesses are responsible for authorising and adhering to laws addressing climate challenge with appropriate funding and programs."},
    { info: "Electric vehicles and chargers help to improve air quality with minimal carbon emissions during production and usage."},
    { info: "Recycling reduces the amount of waste produced, prevents pollution and saves energy by conserving and reusing resources"},
    { info: "Parks and plants help to reduce carbon emission, regulate temperature levels, relieve pressure on ageing stormwater systems and contribute to open green spaces."}
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
        if (!card.classList.contains("matched") && !card.classList.contains("flipped")) {
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
              winCount += 1
              firstCard = false;
              secondCard = false;
              pop.push(firstCardValue);
              if(winCount == 3 || winCount == 6){
                let delay = setTimeout(() => {
                  startGame = false
                  Show()
                }, 500);
              }
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
    let current1 = pop[0];
    let current2 = pop[1];
    let current3 = pop[2];
    console.log(current1)
    information.innerHTML =`
    <div class="detail">
    <img src="${items[current1].image}">
    <p>${details[current1].info}</p>
    </div>
    <hr>
    <div class="detail">
    <img src="${items[current2].image}">
    <p>${details[current2].info}</p>
    </div>
    <hr>
    <div class="detail">
    <img src="${items[current3].image}">
    <p>${details[current3].info}</p>
    </div>`
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
              more.innerHTML = `
              <p class="Moretext">Find out how
              <br> we do</p>
              <img src="./img/arrow.png" class="arrowHead">`
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

closeButton.addEventListener("click", () => {
    popUp.classList.add("hide")
    startGame = true
    for(let i = 0; i < 3; i++){
      pop.pop()
    }
    console.log(pop)
    //check if winCount ==half of cardValues
    if (winCount == 6) {
      startGame = false
        final.classList.remove("hide")
        body.style.backgroundColor = "#60A478"
        final.style.backgroundColor = "#60A478"
        icon.innerHTML = `
        <img src="./img/awesome.png">
        <p>Awesome!</p>`;
        more.innerHTML = `
        <p class="Moretext">Find out how
        <br> we do</p>
        <img src="./img/arrow-green.png" class="arrowHead">`
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
    matrixGenerator(cardValues);
};