// $(document).ready(function () {
var triviaQuestions = [
  {
    question: "What is the only U.S. State that only borders one other?",
    choices: [
      "Rhode Island",
      "Maine" /* Correct answer */,
      "Washington",
      "Florida"
    ],
    answer: 1
    // photo: "assets/images/main.gif"
  },
  {
    question:
      "Name the number that is three more than one-fifth of one-tenth of one-half of 5,000.",
    choices: ["503", "103", "53" /* Correct answer */, "108"],
    answer: 2
  },
  {
    question: "What's the oldest continuously inhabited city in the world?",
    choices: [
      "Istanbul, Turkey",
      "Athens, Greece",
      "Jerusalem",
      "Damascus, Syria" /* Correct answer */
    ],
    answer: 3
  },
  {
    question: "What is the only U.S. State with a Spanish motto?",
    choices: ["Idaho", "California", "Montana" /* Correct answer */, "Arizona"],
    answer: 3
  },
  {
    question: "Which of these is a perfect number?",
    choices: ["1", "6" /* Correct answer */, "7", "21"],
    answer: 2
  },
  {
    question:
      "What is the maximum number of words that a single dog can understand?",
    choices: ["60", "90", "120", "200"],
    answer: 3
  },
  {
    question:
      "What comic book character did Michael Jackson want to play so much that he considered buying Marvel Comics in the 1990s?",
    choices: [
      "Spider-Man" /* Correct answer*/,
      "Wolverine",
      "The Hulk",
      "Professor X"
    ],
    answer: 0
  },
  {
    question:
      "What color are the not-so-golden McDonald’s arches at the McDonald’s in Sedona, Arizona?",
    choices: ["Red", "Black", "Turquoise", "Purple"],
    answer: 2
  },
  {
    question: "What was the original name of the band Led Zepplin",
    choices: [
      "The Rain",
      "Kara's Flowers",
      "The New Yardbirds" /* Correct answer*/,
      "Wicked Lester"
    ],
    answer: 2
  },
  {
    question:
      "Which original Winnie the Pooh voice actor attempted to create an artificial heart?",
    choices: ["Tigger" /* Correct answer */, "Pooh", "Piglet", "Eeyore"],
    answer: 0
  }
];

// console.log(triviaQuestions[1].choices[3]);

var correctAnswers = 0; // Total number of correct answers will be shown at the end of the game
var wrongAnswers = 0; // Total number of wrong answers will be shown at the end of the game or when timer runs out
var timer = 89; // Total amount of time the player has to answer all the questions
var intervalID;
var userGuess = "";
var running = false;
var qCount = triviaQuestions.length;
var pick;
var index;
var newArray = [];
var holder = [];

// At the begining of the game...
// Show timer at maximum seconds remaining
// Show instructions
// Show start button

// ********** START GAME **********

// When player clicks start...
$("#start").on("click", function() {
  $("#start").hide();
  showQuestion();
  startTimer();
  for (var i = 0; i < triviaQuestions.length; i++) {
    holder.push(triviaQuestions[i]);
  }
});

// ********** TIMER **********

// Start timer
function startTimer() {
  if (!running) {
    intervalId = setInterval(countdown, 1000);
    running = true;
  }
}
// Countdown
function countdown() {
  $("#timer").html(timer);
  timer--;

  // Stop game when countdown reaches 0
  if (timer === -1) {
    stop();
  }
}

// Stop timer
function stop() {
  running = false;
  clearInterval(intervalId);
}

// ********** QUESTION FUNCTIONS **********

// Show random question
function showQuestion() {
  index = Math.floor(Math.random() * triviaQuestions.length);
  pick = triviaQuestions[index];

  //iterate through answer array and display
  $("#questions").html(pick.question);
  for (var i = 0; i < pick.choices.length; i++) {
    var userChoice = $("<div>");
    userChoice.addClass("btn btn-outline-dark btn-lg");
    userChoice.html(pick.choices[i]);
    //assign array position to it so can check answer
    userChoice.attr("data-guessvalue", i);
    $("#choices").append(userChoice);
    //		}
  }
}
