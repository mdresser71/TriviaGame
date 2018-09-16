var panel = $('#quiz-area');
var countStartNumber = 15;


/// CLICK EVENTS ///

$(document).on('click', '#start-over', function(e) {
    game.reset();
});

$(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
});

$(document).on('click', '#start', function(e) {
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
});

/// QUESTIONS ///

var questions = [{
    question: "According to Greek mythology who was the first woman on Earth?",
    answers: ["Andromeda", "Aphrodite", "Pandora", "Spotify"],
    correctAnswer: "Pandora",

}, {
    question: "Which female Disney character risked her life to save her father?",
    answers: ["Elsa", "Ariel", "Mulan", "Beiber"],
    correctAnswer: "Mulan",
    
}, {
    question: "Which queen of Egypt was known for her beauty and the mother of King Tut?",
    answers: ["Nefertiti", "Sheba", "Cleopatra", "Ramses"],
    correctAnswer: "Nefertiti",
    
}, {
    question: "What woman was a prophet and a judge according to the bible?",
    answers: ["Deborah", "Felicia", "Betty", "Rosanne"],
    correctAnswer: "Deborah",
    
}, {
    question: "Who was the first licensed US Woman Pilot?",
    answers: ["Bessie Coleman", "Janet Jackson", "Amelia Earhart", "Harriet Quimby"],
    correctAnswer: "Harriet Quimby",
    
}, {
    question: "Who was the first human being to travel into space?",
    answers: ["Yuri Gagarin", "Buzz Aldrin", "John Glenn", "Amerigo Vespucci"],
    correctAnswer: "Yuri Gagarin",
   
}, {
    question: "Who performed the supposed first successful human head transplant in 2017?",
    answers: ["Dr. Sergio Canavero", "Dr. No", "Dr. Suess", "Dr. Grey"],
    correctAnswer: "Dr. Sergio Canavero",
    
}, {
    question: "What skydiver jumped 25000 feet without a parachute and landed safely in 2016?",
    answers: ["Neo", "Tom Cruise", "Luke Aikins", "Garth Brooks"],
    correctAnswer: "Luke Aikins",
    
}];

///GAME FUNCTIONS///

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function() {
        game.counter--;
        $('#counter-number').html(game.counter);

        if (game.counter === 0) {
            console.log('TIME UP');
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
        }
    },
    nextQuestion: function() {
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function() {
        clearInterval(timer);
        $('#counter-number').html(game.counter);

        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        panel.append('<img src="' + questions[this.currentQuestion].image + '"/>');

        if (game.currentQuestion === questions.length - 1) {
            setTiemout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function() {
        clearInterval(timer);

        panel.html('<h2>Complete! Here are your scores!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function () {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>NO! Wrong!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function(){
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>YES! Excellent!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};