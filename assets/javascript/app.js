window.onload = function () {

    var trivia = {

        wins: 0,
        losses: 0,
        time: 10,
        round0: [{
            question: "In what year was Pearl Harbor attacked?",
            a: "1942",
            b: "1940",
            c: "1939",
            d: "1941",
            answer: "d",
        }, {
            question: "What is the title of the 1925 autobiographical book by Adolf Hitler?",
            a: "Mein Kampf",
            b: "Nazi Fremdschämen",
            c: "ein Kalenderjahr",
            d: "Mein Adolf",
            answer: "a",
        }, {
            question: "What year did WWII end?",
            a: "1945",
            b: "1946",
            c: "1948",
            d: "1941",
            answer: "a",
        }],
        round1: [{
            question: "What two countries were already involved in a military conflict before the beginning of World War II?",
            a: "Germany and France",
            b: "Japan and China",
            c: "Germany and Poland",
            d: "Japan and India",
            answer: "b",
        }, {
            question: "What was the longest battle of World War II?",
            a: "Battle of Midway",
            b: "Battle of the Bulge",
            c: "Battle of the Atlantic",
            d: "Battle of the River Plate",
            answer: "c",
        }, {
            question: "In which battle did the Axis powers lose about a quarter of their total troops on the Eastern Front?",
            a: "Battle of Kursk",
            b: "Battle of Stalingrad",
            c: "Battle of Jutland",
            d: "Battle of Leningrad",
            answer: "b",
        }],
        round2: [{
            question: "what was the name of the B-29 bomber that dropped the first atomic bomb on Hiroshima?",
            a: "Enola Gay",
            b: "Fat Man",
            c: "Little Boy",
            d: "Rosa Parks",
            answer: "a",
        }, {
            question: "What country lost the most lives in World War II?",
            a: "Soviet Union",
            b: "Germany",
            c: "France",
            d: "United States",
            answer: "a",
        }, {
            question: "What research and development project produced the first nuclear weapons during World War II?",
            a: "Philadelphia Project",
            b: "Manhattan Project",
            c: "Oppenheimer Project",
            d: "Alan Parsons Project",
            answer: "b",
        }],
        round3: [{
            question: "What was the first Nazi concentration camp?",
            a: "Auschwitz",
            b: "Chelmno",
            c: "Dachau",
            d: "Ravensbruck",
            answer: "c",
        }, {
            question: "What was the code name for the Battle of Normandy?",
            a: "Operation Omaha",
            b: "Operation Panther",
            c: "Operation Overlord",
            d: "Operation Piledriver",
            answer: "c",
        }, {
            question: "What was the largest battleship of World War II?",
            a: "Yamato",
            b: "Bismarck",
            c: "Missouri",
            d: "Kongo",
            answer: "a",
        }],
        round4: [{
            question: "What Axis leader was imprisoned on July 24, 1943?",
            a: "Francisco Franco",
            b: "Adolf Hitler",
            c: "Emperor Hirohito",
            d: "Benito Mussolini",
            answer: "d",
        }, {
            question: "How many people were killed by nuclear weapons during World War II?",
            a: "37,000",
            b: "254,000",
            c: "63,000",
            d: "129,000",
            answer: "d",
        }, {
            question: "How many Jews were Kileed during the Holocaust?",
            a: "6 Million",
            b: "600,000",
            c: "1.2 Million",
            d: "12 Million",
            answer: "a",
        }],
        count() {
            if (trivia.time >= 0) {
                $(".countDown").text(trivia.time);
                trivia.time = trivia.time - 1;
            } else {
                clearInterval(this.countDown);
                grade(false);
            }
        },

        clearCount() {
            clearInterval(countingDown);
            trivia.time = 10;
            isCountingDown = false;
        },

        countDown() {
            countingDown = setInterval(trivia.count, 1000);
            isCountingDown = true;
        }
    }
    var isCountingDown = false;
    var rounds = [trivia.round0, trivia.round1, trivia.round2, trivia.round3, trivia.round4,];
    var roundCount = 0;
    var answer = "#a";
    var answerA = $("#a");
    var answerB = $("#b");
    var answerC = $("#c");
    var answerD = $("#d");
    var questionDisplay = $("#question");

    function emptyThis() {
        $(".countDown").empty();
        questionDisplay.empty();
        answerA.empty();
        answerB.empty();
        answerC.empty();
        answerD.empty();
    }

    function setNewRound() {
        var x = Math.floor(Math.random() * rounds[roundCount].length);
        currentQuestion = rounds[roundCount][x];
        answer = currentQuestion.answer;
        roundCount++;
        console.log(roundCount);
    }

    function fillQuiz() {
        
        emptyThis();

        questionDisplay.text(currentQuestion.question);

        firstAnswer = setTimeout(function () {
            answerA.text(`A: ${currentQuestion.a}`);
        }, 1000);

        secondAnswer = setTimeout(function () {
            answerB.text(`B: ${currentQuestion.b}`);
        }, 1000 * 2);

        thirdAnswer = setTimeout(function () {
            answerC.text(`C: ${currentQuestion.c}`);
        }, 1000 * 3);

        fourthAnswer = setTimeout(function () {
            answerD.text(`D: ${currentQuestion.d}`);
            $("p").on("click", function () {
                grade($(this));
            })
        }, 1000 * 4);

        timer = setTimeout(function () {
            trivia.countDown();
        }, 1000 * 6)
    }

    function grade(guess) {
        //clear everything
        $("p").off();
        $(".countDown").empty();
        if (isCountingDown) {
            trivia.clearCount();
        }
        
        clear();

        if (guess) {
            if (guess.attr('id') === answer) {
                questionDisplay.text("CORRECT");
                trivia.wins = trivia.wins + 1;
                guess.addClass("correctAnswer");
            } else {
                questionDisplay.text("INCORRECT");
                $(`#${answer}`).addClass("correctAnswer");
                guess.addClass("inCorrect");
                trivia.losses = trivia.losses +1;
            }

            setTimeout(function () {
                $(`#${answer}`).removeClass("correctAnswer");
                guess.removeClass("inCorrect");
                clear();
                isItDone();
            }, 1000 * 4);

        } else {
            questionDisplay.text("OUT OF TIME");
            trivia.losses = trivia.losses + 1;
            $(`#${answer}`).addClass("correctAnswer");

            setTimeout(function () {
                $(`#${answer}`).removeClass("correctAnswer");
                clear();
                isItDone();
            }, 1000 * 4);
        }
    }

    function isItDone() {
        if (roundCount === rounds.length) {
            score();
        } else {
            play();
        }
    }

    function play() {
        setNewRound();
        fillQuiz();
    }

    function clear() {
        clearTimeout(firstAnswer);
        clearTimeout(secondAnswer);
        clearTimeout(thirdAnswer);
        clearTimeout(fourthAnswer);
        clearTimeout(timer);
    }

    function score() {

        emptyThis();

        var percent = (trivia.wins/rounds.length) * 100;
        questionDisplay.text(`SCORE: ${percent}%`);
        answerA.text(`CORRECT: ${trivia.wins}`);
        answerB.text(`INCORRECT: ${trivia.losses}`);
        answerD.text("Play again?");
        answerD.addClass("text-center");
        answerD.on("click", function(){
            reset();
        })
    }

    function reset() {
        $("p").removeClass("text-center");
        trivia.wins = 0;
        trivia.losses = 0;
        roundCount = 0;
        play();
    }

    $("button").on("click", function() {
        
        $(".ww2").empty();
        $("#quiz").removeClass("hide");
        play();
        $("button").empty();
    })


    
}