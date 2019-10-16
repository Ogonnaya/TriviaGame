$(document).ready(function() {
  var triviaQuestions = [
    {
      question: "What is the only U.S. State that only borders one other?",
      choice: [
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
      choice: ["503", "103", "53" /* Correct answer */, "108"],
      answer: 2
    },
    {
      question: "What's the oldest continuously inhabited city in the world?",
      choice: [
        "Istanbul, Turkey",
        "Athens, Greece",
        "Jerusalem",
        "Damascus, Syria" /* Correct answer */
      ],
      answer: 3
    },
    {
      question: "What is the only U.S. State with a Spanish motto?",
      choice: [
        "Idaho",
        "California",
        "Montana" /* Correct answer */,
        "Arizona"
      ],
      answer: 2
    },
    {
      question: "Which of these is a perfect number?",
      choice: ["1", "6" /* Correct answer */, "7", "21"],
      answer: 1
    },
    {
      question:
        "What is the maximum number of words that a single dog can understand?",
      choice: ["60", "90", "120", "200"],
      answer: 3
    },
    {
      question:
        "What comic book character did Michael Jackson want to play so much that he considered buying Marvel Comics in the 1990s?",
      choice: [
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
      choice: ["Red", "Black", "Turquoise", "Purple"],
      answer: 2
    },
    {
      question: "What was the original name of the band Led Zepplin?",
      choice: [
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
      choice: ["Tigger" /* Correct answer */, "Pooh", "Piglet", "Eeyore"],
      answer: 0
    }
  ];

  var correctAnswers = 0; // Total number of correct answers will be shown at the end of the game
  var wrongAnswers = 0; // Total number of wrong answers will be shown at the end of the game or when timer runs out
  var timer = 89; // Total amount of time the player has to answer all the questions
  var intervalId;
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
    runTimer();
    for (var i = 0; i < triviaQuestions.length; i++) {
      holder.push(triviaQuestions[i]);
    }
  });

  // ********** TIMER **********

  // Start timer
  function runTimer() {
    if (!running) {
      intervalId = setInterval(countdown, 1000);
      running = true;
    }
  }
  // Countdown
  function countdown() {
    $("#timer").html(timer);
    timer--;

    // When the player runs out of time
    if (timer === -1) {
      stop();
      $("#choices").html(
        "<p>Time is up! The correct answer is: " +
          pick.choice[pick.answer] +
          "</p>"
      );
      nextQuestion();
    }
  }

  // Stop timer
  function stop() {
    running = false;
    clearInterval(intervalId);
  }

  // ********** QUESTION FUNCTIONS **********
  // Show randomly picked question
  function showQuestion() {
    index = Math.floor(Math.random() * triviaQuestions.length);
    pick = triviaQuestions[index];

    // Loop through and display possible answers
    $("#questions").html(pick.question);
    for (var i = 0; i < pick.choice.length; i++) {
      var userChoice = $("<div>");
      userChoice.addClass("btn btn-outline-dark btn-lg");
      userChoice.html(pick.choice[i]);

      // Assign array position to check answer
      userChoice.attr("data-guessvalue", i);
      $("#choices").append(userChoice);
    }

    // When the player selects an answer
    $(".btn").on("click", function() {
      //grab array position from userGuess
      userGuess = parseInt($(this).attr("data-guessvalue"));

      // Show if the answer is correct or wrong
      if (userGuess === pick.answer) {
        correctAnswers++;
        userGuess = "";
        $("#choices").html("<p>Correct!</p>");
        nextQuestion();
      } else {
        wrongAnswers++;
        userGuess = "";
        $("#choices").html(
          "<p>Wrong! The correct answer is: " +
            pick.choice[pick.answer] +
            "</p>"
        );
        nextQuestion();
      }
    });
  }
  // After the player selects correct/wrong answer - show next random question
  function nextQuestion() {
    newArray.push(pick);
    triviaQuestions.splice(index, 1);

    // Move on to next question after a set amount of time
    setTimeout(function() {
      $("#choices").empty();

      // If all questions have been answered, show results
      if (wrongAnswers + correctAnswers === qCount) {
        stop();
        $("#timer").html("90");
        $("#questions").empty();
        $("#questions").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#choices").append("<h4> Correct: " + correctAnswers + "</h4>");
        $("#choices").append("<h4> Incorrect: " + wrongAnswers + "</h4>");
        $("#choices").append(playAgain);

        correctAnswers = 0;
        wrongAnswers = 0;
      } else {
        runTimer();
        showQuestion();
      }
    }, 3000);
  }

  var playAgain = $("<button>Play Again >>>" + "</button>");
  playAgain.addClass("btn btn-outline-dark btn-lg");

  // If player wants to play again
  playAgain.on("click", function() {
    timer = 89;
    $("#choices").empty();
    $("#questions").empty();
    for (var i = 0; i < holder.length; i++) {
      triviaQuestions.push(holder[i]);
    }
    runTimer();
    showQuestion();
  });
});
