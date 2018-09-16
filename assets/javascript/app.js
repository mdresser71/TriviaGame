$(document).ready(function () {

    var counter = 15;
    var correctGuesses = 0;
    var wrongGuesses = 0;
    var unansweredGuesses = 0;
    var selectedAnswer = 0;
    var questionCounter = 0;
    var clock;
    var questionsArray = [
        "According to Greek mythology who was the first woman on Earth?",
        "Which female Disney character risked her life to save her father?",
        "Which queen of Egypt was known for her beauty and the mother of King Tut?",
        "What woman was a prophet and a judge according to the bible?",
        "Who was the first licensed US Woman Pilot?",
        "Who was the first human being to travel into space?",
        "Who performed the supposed first successful human head transplant in 2017?",
        "What skydiver jumped 25000 feet without a parachute and landed safely?",
        "Who ruled the largest contiguous empire in world history?",
        "What is the capital of Kansas?"
    ];
    var answersArray = [
        ["Andromeda", "Aphrodite", "Pandora", "Spotify"],
        ["Elsa", "Ariel", "Mulan", "Beiber"],
        ["Nefertiti", "Sheba", "Cleopatra", "Ramses"],
        ["Deborah", "Felicia", "Betty", "Rosanne"],
        ["Bessie Coleman", "Janet Jackson", "Amelia Earhart", "Harriet Quimby"],
        ["Yuri Gagarin", "Buzz Aldrin", "John Glenn", "Amerigo Vespucci"],
        ["Dr. Sergio Canavero", "Dr. No", "Dr. Suess", "Dr. Gre"],
        ["Neo", "Tom Cruise", "Luke Aikins", "Garth Brooks"],
        ["King Tut", "Genghis Kahn", "King Richard the Lionheart", "Suleiman the Magnificent"],
        ["Witchita", "Topeka", "Overland Park", "Olathe"]
    ];
    var correctAnswers = ["Pandora", "Mulan", "Nefertiti", "Deborah", "Harriet Quimby", "Yuri Gagarin", "Dr. Sergio Canavero", "Luke Aikins", "Genghis Kahn", "Topeka"];

    function starGame() {
        $(".container").html("<p><button id='startBtn'>Click to Start the Trivia Game!</button></p>");
        $(".container").addClass("background2");
    }
    starGame();
    ///// Button Listener/////
    $("#startBtn").on("click", function () {
        questionPage();
        timer();
    });

    $("body").on("click", ".answer", function (event) {
        console.log(this);
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(clock);
            renderRight();
        }
        else {
            clearInterval(clock);
            renderWrong();
        }
    });

    $("body").on("click", "#restartBtn", function (event) {
        reset();
    });

    function noTime() {
        unansweredGuesses++;
        $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>" + counter + "</span></span></p>");
        $(".container").append("<p class='rightWrong'>The correct answer was " + correctAnswers[questionCounter] + "</p>");
        $(".container").append("<img class='noTimePic' src='assets/images/time.jpg'>");
        setTimeout(transitionTime, 3000);
    }
    /////right answer screen/////
    function renderRight() {
        correctGuesses++;
        $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>" + counter + "</span></p>");
        $(".container").append("<p class='rightWrong'>" + correctAnswers[questionCounter] + " was the right answer!!</p>");
        $(".container").append("<img class='rightPic' src='assets/images/right.png'>");
        //transitionTime();
        setTimeout(transitionTime, 3000);
    }
    /////wrong answer screen/////
    function renderWrong() {
        wrongGuesses++;
        $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>" + counter + "</span></p>");
        $(".container").append("<p class='rightWrong'>The correct answer was " + correctAnswers[questionCounter] + "</p>");
        $(".container").append("<img class='wrongPic' src='assets/images/wrong.png'>");
        //transitionTime();
        setTimeout(transitionTime, 3000);
    }
    /////questions/////
    function questionPage() {
        $(".container").removeClass("background2");
        $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>15</span></p>")
        $(".container").append("<p class='questionSize'> " + questionsArray[questionCounter] + "</p>");
        $(".container").append("<p class='answerSize answer'>" + answersArray[questionCounter][0] + "</p>");
        $(".container").append("<p class='answerSize answer'>" + answersArray[questionCounter][1] + "</p>");
        $(".container").append("<p class='answerSize answer'>" + answersArray[questionCounter][2] + "</p>");
        $(".container").append("<p class='answerSize answer'>" + answersArray[questionCounter][3] + "</p>");
    }
    /////slide timer/////
    function transitionTime() {
        if (questionCounter < 9) {
            questionCounter++;
            questionPage();
            counter = 15;
            timer();
        }
        else {
            results();
        }
    }
    /////Countdown Timer/////
    function timer() {
        clock = setInterval(decrement, 1000);
        function decrement() {
            if (counter > 0) {
                counter--;
            }
            if (counter === 5) {
                $(".timeLeft").addClass("fiveLeft")
            }
            if (counter === 0) {
                clearInterval(clock);
                noTime();
            }
            $(".timeLeft").html(counter);
        }
    }
    /////results page/////
    function results() {
        clearInterval(clock);
        $(".container").html("<p class='timer'>Time Left: <span class='timeLeft'>" + counter + "</span></p>");
        $(".container").append("<p class='resultsHead'>You finished the game!");
        $(".container").append("<p class='finishedSize'>Correct Answers: " + correctGuesses + "</p>");
        $(".container").append("<p class='finishedSize'>Wrong Answers: " + wrongGuesses + "</p>");
        $(".container").append("<p class='finishedSize'>Unanswered Questions: " + unansweredGuesses + "</p>");
        $(".container").append("<p class='restartBtn'><button id='restartBtn'>Click to Play Again!</button></p>");
    }
    /////resets everything/////
    function reset() {
        counter = 15;
        correctGuesses = 0;
        wrongGuesses = 0;
        unansweredGuesses = 0;
        questionCounter = 0;
        questionPage();
        timer();
    }

    // start the game on click
    // question appears and a timer starts
    // over the answers there is a hover effect
    // player chooses an answer
    // displays whether incorrect or correct
    // displays correct answer
    // if an answer is given or if the timer expires the next question appears
    // after all questions, display correct incorrect and unanswered
    // if hit start over button, goes automatically to the first question, does not reload ////
