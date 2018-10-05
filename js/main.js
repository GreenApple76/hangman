$(document).ready(function () {
    var words = []; // store puzzle words retrieved from ajax request
    var puzzleWord; // use to store randomly selected puzzle word 
    var wrongGuesses = 0; // track number of times user guessed wrong letter
    var correctGuesses = 0; // track number of correctly guessed letters

    // handle event when user guesses a letter
    $(document).on('keyup', function (e) {
        var guessedLetter = e.key.toUpperCase();

        // only run when letter is in range of A - Z
        if (e.keyCode >= 65 && e.keyCode <= 90) { 
            // did user successfully guess letter
            if (puzzleWord.indexOf(guessedLetter) !== -1) {
                displayLetter(guessedLetter);
            } else {
                wrongGuesses++;
            }

            // did user successfully guess the puzzle
            isWinner();
        }
    });

    // retrieve list of puzzle words
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?sp=??????&max=10',
        type: 'GET',
        success: function(json) {
            // populate words array with retrieved words
            $.each(json, function () {
                words.push(this.word.toUpperCase());
            })
        },
        fail: function (jqXHR, textStatus, errorThrown) {
            console.log('error', textStatus, errorThrown);
        },
    }).done(chooseWord);

    function chooseWord() {
        var randomWord = Math.floor(Math.random()*10);
        console.log('rand', randomWord);
        puzzleWord = words[randomWord];
        console.log('puzzle word', puzzleWord);
    }

    function displayLetter (guessedLetter) {
        for(var i = 0; i < puzzleWord.length; i++) {
            if (puzzleWord[i] === guessedLetter) {
                $('.letter'+i).text(guessedLetter);
                correctGuesses++;
            }
        }
    }

    function isWinner () {
        if (puzzleWord.length === correctGuesses) {
            $('.status').text('You Won!');
        } else if (wrongGuesses === 6) { // user ran out of guesses
            $('.status').text('You Lose');
            // display correct answer to the puzzle
            for(var i = 0; i < puzzleWord.length; i++) {
                    $('.letter'+i).text(puzzleWord[i]);
            }
        }
    }
});