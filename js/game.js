/**
 * game.js
 *
 * Computer Science 50
 * Final project
 *
 * Implements chimp counting game
 */

// number of cards
var NUM_CARDS = 6;

// current round number
var ROUND = 1;

// number of rounds
var NUM_ROUNDS = 3;

// minimum value on cards
var MIN = -99;

// maximum value on cards
var MAX = 99;

// time to look at cards
var INTERVAL = 1000;

// maximum number of seconds per round (actual max is 3, have 4 for equation)
var MAX_SECONDS = NUM_ROUNDS + 1;

// current card number (set to -100 since all are greater than that)
var CURRENT = MIN - 1;

// number of cards flipped (only count once game starts)
var FLIPPED = 0;

// once the window has loaded
$(window).load(function() {
    // hide the cards
    $(".card").hide();
    
    // wait until play button clicked
    $("#play").click(function()
    {
        // hide the message
        $("#message").hide();
        
        // hide the play button
        $("#play").hide();
        
        // set the number of seconds for this round
        NUM_SECONDS = MAX_SECONDS - ROUND;
        
        // assign a random value to cards
        assign_val();
        
        // populate the board with the cards
        populate();
        
        // hide the cards after right amount of seconds
        setTimeout(hide, NUM_SECONDS * INTERVAL);
        
        // show the timer also
        $("#timer").html(NUM_SECONDS);
        counter = setInterval(timer, INTERVAL);
        
        // game play
        play();
    }
    )
});

/** 
 * assigns values to cards
 */
function assign_val()
{
    // need to loop through all of the cards
    for (var card in CARDS)
    {
        // pick a random number between -99 and 99 and assign to that card
        CARDS[card].card_val = MIN + Math.floor(Math.random() * (MAX - MIN + 1));
    }
}

/**
 * reacts to a correct answer
 */
function correct()
{
    // check if it was the last card
    if (FLIPPED == NUM_CARDS)
    {
        // hide the cards and the timer
        $(".card").hide();
        $("#timer").html("<br>");
        $("#timer").css("color", "#FF4719");
        
        // if round 3, then done
        if (ROUND == NUM_ROUNDS)
        {
            // message that the user won
            $("#message").css("color", "#70C870");
            $("#message").html("You win!");
            $("#message").show();
            
            // show the play button (play again)
            $("#play").html("Play again");
            $("#play").show();
        
            // reset the current value, number of cards flipped, and round number
            CURRENT = MIN - 1;
            FLIPPED = 0;
            ROUND = 1;
            
            return;
        }
        
        // otherwise move on to the next round
        else
        {
            // message that the round completed
            $("#message").css("color", "#70C870");
            $("#message").html("Round " + ROUND + " passed!");
            $("#message").show();
            
            // show the play button (next round)
            $("#play").html("Next round");
            $("#play").show();
        
            // reset the current value and the number of cards flipped
            CURRENT = MIN - 1;
            FLIPPED = 0;
            
            // move on to the next round
            ROUND += 1;
            
            return;
        }
    }
    
    // otherwise, don't do anything
    return;
}

/**
 * flips cards back over (hide values)
 */
function hide()
{
    // need to loop through all of the cards
    for (var card in CARDS)
    {
        // hide the value on the card
        $("#" + CARDS[card].card_id).html("");
        
        // the value is not there, so the card is not flipped
        CARDS[card].flipped = false;
    }
}

/**
 * steps taken when a user loses
 */
function lose()
{
    // hide the cards and the timer
    $(".card").hide();
    $("#timer").html("<br>");
    $("#timer").css("color", "#FF4719");
    
    // message that the user lost
    $("#message").css("color", "#FF4719");
    $("#message").html("You lose :(");
    $("#message").show();

    // show the play button again with new text
    $("#play").html("Play again");
    $("#play").show();

    // reset the current value, the number of cards flipped, and the round number
    CURRENT = MIN - 1;
    FLIPPED = 0;
    ROUND = 1;
}

/**
 * implements actual game play
 */
function play()
{
    // if card clicked, flip it over
    $(".card").click(function()
    {
        var this_id = $(this).attr("id");
        show(this_id);
    })
}

/**
 * populates board with cards
 */
function populate()
{
    // need to loop through all of the cards
    for (var card in CARDS)
    {
        // put the value on the card
        $("#" + CARDS[card].card_id).html(CARDS[card].card_val);
        
        // the value is there, so the card is flipped
        CARDS[card].flipped = true;
    }
    
    // make sure that they are shown
    $(".card").show();
}

/**
 * shows values on cards
 */
function show(clicked_id)
{
    // loop through the cards to find the one that was clicked
    for (var card in CARDS)
    {
        // check if the ID is the same
        if (clicked_id == CARDS[card].card_id)
        {
            // only if the card is not flipped (value not shown)
            if (CARDS[card].flipped == false)
            {
                // one more card was flipped
                FLIPPED += 1;
                
                // show the value on the card
                $("#" + CARDS[card].card_id).html(CARDS[card].card_val);
                
                // the value is there, so the card is flipped
                CARDS[card].flipped = true;
                
                // check if it is correct or not
                if (CARDS[card].card_val >= CURRENT)
                {
                    // update the current value
                    CURRENT = CARDS[card].card_val
                    
                    // correct answer
                    correct();
                }
                else
                {
                    // wrong answer -- you lose
                    lose();
                }
                
            }
        }
    }
}

/**
 * shows the countdown timer
 */
function timer()
{
    // change value every 1 second
    NUM_SECONDS -= 1;
    
    // once done counting down
    if (NUM_SECONDS <= 0)
    {   
        // stop counting
        clearInterval(counter);
        
        // change the timer to say "go"
        $("#timer").css("color", "#70C870"); 
        $("#timer").html("GO!");  
        return; 
    }
    
    // otherwise, still counting down, so show the new # of seconds
    $("#timer").html(NUM_SECONDS);
}

