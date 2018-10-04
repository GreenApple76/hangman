$(document).ready(function () {
    var words = []; // store puzzle words retrieved from ajax request
    
    // retrieve list of puzzle words
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?sp=?????&max=10',
        type: 'GET',
        success: function(json) {
            // populate words array with retrieved words
            $.each(json, function() {
                words.push(this.word);
            })
        },
        complete: playGame 
    });

    function playGame() {
        var randomWord = Math.floor(Math.random*10);
        var puzzleWord = words[randomWord];

    }
});