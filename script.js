const startBtn = document.getElementById("startBtn");
let qNum;  //just declare, not initialize
let timer;
let timeLeft;//just declare, not initialize
let score;
if (window.localStorage.getItem("highScores") === null) {
  window.localStorage.setItem("highScores", JSON.stringify({})); //we need an object, not an array
}
function getInitials() {
  document.getElementsByTagName(
    "main"
  )[0].innerHTML = `<h1> All Done! </h1><p>Your  Final Score is ${score}</p><input type="text" placeholder= "Enter Your Initials" id="initials"><button onclick="saveScore()">Save</button>`;
}
function goback() {
  window.location.href = "index.html";
}
function saveScore() {
  const initials = document.getElementById("initials").value;
  //const score = timeLeft;
  const hs = JSON.parse(window.localStorage.getItem('highScores'))
  //this code was for when I thought hs should be an array

  // hs.forEach(o =>{
  //   if (o[`${initials}`]< score){
  //     o[`${initials}`]=score
  //   }

  //BECAUSE IT'S AN OBJECT, NOT AN ARRAY, this is the replacement code for above
    if(hs[initials]){
      if(hs[initials] < score){
        hs[initials] = score;
      }
    }else{
      hs[initials] = score;
    }

    //the "stringification" needs to happen inside the localStorage.setItem()
    // so...

  //JSON.stringify(hs)
  //window.localStorage.setItem("highScores",hs);
  window.localStorage.setItem("highScores",JSON.stringify(hs));

  // })
  displayHighScores();
}
function displayHighScores(){
  const hs = JSON.parse(window.localStorage.getItem('highScores'))
  //Since hs is an object, not an array, we can't use .map
  //const hsLi= hs.map(o =>{`<li>${Object.keys(o)[0]} ${o[Object.keys(o)[0]]}</li>`})

  //instead, we get an array of all the keys to the object:
  const keys = Object.keys(hs);
  //and then map over THAT array to create the <li> for each
  //set of initials (that's the key itself) and score (that's hs[key])
  const hsLi = keys.map(key=>`<li>${key} : ${hs[key]}</li>`)
  document.getElementsByTagName(
    "main"
  )[0].innerHTML=`<h1>High Scores</h1><ul id="highScores"></ul><button onclick="goback()">Go Back</button><button onclick="clearScores()">Clear High Scores</button>`;

  console.log(document.getElementById('highScores'))
  document.getElementById("highScores").innerHTML += hsLi.join('')
}
function startGame() {
  //Here is where we initialize the variables that we declared at the top
  qNum = 0
  timeLeft = 75;
  score=0;

  timer = setInterval(() => {
    if (timeLeft === 0) {
      alert("Time is up!");
      clearInterval(timer);
      getInitials();
    }
    timeLeft--;
    document.getElementById("timer").innerHTML = `<p> Time Left: ${timeLeft}`;
  }, 1000);

  displayQuestion();
}
function displayQuestion() {
  let questionDiv = document.getElementById("quiz");
  let q = questions[qNum];
  const qText = q.Question;
  const qChoices = q.Choice;
  const qAnswer = q.Answer;

  const qChoicesMap = qChoices.map((choice) => {
    return `<button onclick="checkAnswer('${choice[0]}','${q.Answer}')">${choice}</button>`;
  });

  questionDiv.innerHTML = `<h2>${qText}</h2><br>`;
  qChoicesMap.forEach((choice) => {
    questionDiv.innerHTML += `<p> ${choice} </p><br>`;
  });
  qNum++;
  if (qNum === questions.length) {
    clearInterval(timer);
    getInitials();
  }
}
function checkAnswer(choice, answer) {
  let response;
  if (choice === answer) {
    response = "Correct!";
    score += 1;
  } else {
    response = "Wrong!";
  }
  document.getElementById("response").textContent = `${response}`;
  if (qNum < questions.length) {
    displayQuestion();
  }
}
const questions = [
  {
    Question: "Question: Boolean consists of _____.",
    Choice: ["A) Strings", "B) False", "C) True", "D) both B & C"],
    Answer: "D",
  },
  {
    Question: "Question: HTML stands for:_____",
    Choice: [
      "A) Highlighted Material Language",
      "B) HyperTally Markup Language",
      "C) HyperText Markup Language",
      "D) HyperText Marketing Language",
    ],
    Answer: "C",
  },
  {
    Question: "Question: JavaScript is just for the browser:_____",
    Choice: [
      "A) True",
      "B) false",
    ],
    Answer: "B",
  },
  {
    Question: "Question: _____allows you to define your own fuctions in Javascript.", 
    Choice: [
      "A) var",
      "B) function",
      "C) if/else",
      "D) none of the above",
    ],
    Answer: "B",
  },
  {
    Question:
      "Question: CSS is a language used for implementing the presentation of Web pages, including____",
    Choice: ["A) fonts", "B) layout", "C) colors", "D) all of the above"],
    Answer: "D",
  },
  {
    Question:
      "Question: This part of Javascript code indicates the_____ of a statement",
    Choice: ["A) beginning", "B) middle", "C) middle and end", "D) end"],
    Answer: "D",
  },
];
