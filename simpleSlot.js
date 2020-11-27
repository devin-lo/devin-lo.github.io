// may need to make a constants.js to store the default values in

var reels = [];
reels[0] = ["m","r","s","c","k","p","r","s","c","k","p","m","s","c","k","m","r","s"];
reels[1] = ["c","m","s","r","c","p","m","k","c","p","m","c","k","r","p","c","m","s"];
reels[2] = ["m","p","s","k","p","r","c","m","p","r","c","m","p","r","c","m","p","s"];
var wallet = 75;
var reelPositions = [];
var slotRng = 0;
var myRng;

window.onload = function()
{
    for (var i = 0; i < 3; i++) {
        reelPositions[i] = 18 * Math.random();
        slotRng = slotRng + reelPositions[i];
    }
    var result = setBoard();
    printBoard(result);
    $("#wallet").text(wallet.toString());
    $("#log").text("Click the buttons to place a bet!");
}

/*
    function spinReels()
    Seeds a new PRNG based on the previous values of the slot machine
    Then, using the PRNG, gets three random numbers [0,18) that represent
    the positions that each reel is on.
*/
function spinReels() {
    myRng = new Math.seedrandom(slotRng.toString());
    slotRng = 0;
    for (var i = 0; i < 3; i++) {
        reelPositions[i] = 18 * myRng();
        slotRng = slotRng + reelPositions[i];
    }
}

function setBoard() {
    var result = [[],[],[]];
    for (var i = 0; i < 3; i++) {
        var midPos = Math.trunc(reelPositions[i]);
        var topPos;
        var botPos;
        if (midPos === 0) {
            topPos = 17;
        }
        else {
            topPos = midPos - 1;
        }
        if (midPos === 17) {
            botPos = 0;
        }
        else {
            botPos = midPos + 1;
        }
        result[0][i] = reels[i][topPos];
        result[1][i] = reels[i][midPos];
        result[2][i] = reels[i][botPos];
    }
    return result;
}

function printBoard(result) {
    var outBox = "";
    for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 3; k++) {
            outBox = outBox + result[j][k];
            if (k < 2) {
                outBox = outBox + " ";
            }
        }
        if (j < 2) {
            outBox = outBox + "<br />";
        }
    }
    $("#slotWindow").html(outBox);
}

/*
    function reverse(s)
    Pre-condition: A string s is received.
    Post-condition: Returns the reverse of this string.
*/
function wager(bet) {
    $("#log").text("Bet amount: " + bet);
    wallet = wallet - bet;
    spinReels();
    // note: playing for 2 coins allows for wins on 3 horizontal lines
    // and playing for 3 coins allows for wins on 2 diagonals too
    // the code needs to be scaled to these cases.
    var result = setBoard();
    printBoard(result);
    
    if (result[1][0] === result[1][1] && result[1][1] === result[1][2]) {
        $("#log").html($("#log").html() + "<br />Win on middle row! Value: " + result[1][0]);
        evaluateWin(result[1][0]);
    }
    if (bet > 1) {
        if (result[0][0] === result[0][1] && result[0][1] === result[0][2]) {
            $("#log").html($("#log").html() + "<br />Win on top row! Value: " + result[0][0]);
            evaluateWin(result[0][0]);
        }
        if (result[2][0] === result[2][1] && result[2][1] === result[2][2]) {
            $("#log").html($("#log").html() + "<br />Win on bottom row! Value: " + result[2][0]);
            evaluateWin(result[2][0]);
        }
        if (bet === 3) {
            if (result[0][0] === result[1][1] && result[1][1] === result[2][2]) {
                $("#log").html($("#log").html() + "<br />Win on \\ diagonal! Value: " + result[0][0]);
                evaluateWin(result[0][0]);
            }
            if (result[2][0] === result[1][1] && result[1][1] === result[0][2]) {
                $("#log").html($("#log").html() + "<br />Win on / diagonal! Value: " + result[2][0]);
                evaluateWin(result[2][0]);
            }
        }
    }
    $("#wallet").text(wallet.toString());
    checkButtons();
    if (wallet <= 0) {
        endGame();
    }
}

function checkButtons() {
    if (wallet < 3) {
        $("#w3").prop('disabled',true);
    }
    if (wallet < 2) {
        $("#w2").prop('disabled',true);
    }
}

function evaluateWin(rv) {
    var winAmt = 0;
    switch (rv) {
        case "s":
            winAmt = 300;
            break;
        case "k":
            winAmt = 100;
            break;
        case "r":
        case "p":
        case "m":
            winAmt = 15;
            break;
        default:
            winAmt = 8;
    }
    wallet = wallet + winAmt;
    $("#log").html($("#log").html() + "<br />Payout: " + winAmt);
}

function endGame() {
    console.log("Game over!");
    $("#log").html($("#log").html() + "<br />Game over!");
    for (var i = 0; i < 3; i++) {
        $(".wager").prop('disabled',true);
    }
    document.getElementById("newGame").style.visibility = "visible";
}
