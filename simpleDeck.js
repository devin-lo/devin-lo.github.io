// credit: http://www.mathcs.emory.edu/~cheung/Courses/170/Syllabus/10/cards.html
// https://medium.com/@blakeeh723/how-to-build-a-card-game-with-object-oriented-programming-c43cd2cadb3a

class Card {
    static SPADE = 4;
    static HEART = 3;
    static CLUB = 2;
    static DIAMOND = 1;

    // https://www.w3schools.com/js/js_class_static.asp
    static Suit = ["*","d","c","h","s"];
    static Rank = ["*","*","2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    static SuitPrint = ["*","♦","♣","♥","♠"];

    #cardSuit;
    #cardRank;

    constructor(suit, rank) {
        this.#cardSuit = suit;
        if (rank == 1) {
            rank = 14;
        }
        this.#cardRank = rank;
    }

    suit() {
        return this.#cardSuit;
    }

    suitStr() {
        return this.Suit[this.#cardSuit];
    }

    rank() {
        return this.#cardRank;
    }

    rankStr() {
        return this.Rank[this.#cardRank];
    }

    toString() {
        return (Card.Rank[this.#cardRank] + Card.Suit[this.#cardSuit]);
    }

    forView() {
        return (Card.Rank[this.#cardRank] + Card.SuitPrint[this.#cardSuit]);
    }
}

// http://www.mathcs.emory.edu/~cheung/Courses/170/Syllabus/10/deck-of-cards.html
// adapted from https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
class Deck {
    static NCARDS = 52;
    #deckOfCards = [];
    #currentCard;

    constructor() {
        for (var s = Card.DIAMOND; s <= Card.SPADE; s++) {
            for (var r = 1; r <= 13; r++) {
                var card = new Card(s,r);
                this.#deckOfCards.push(card);
            }
        }

        this.#currentCard = 0;
    }

    // use Knuth shuffle algorithm: https://rosettacode.org/wiki/Knuth_shuffle
    shuffle() {
        for (var i = 51; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i+1));
            var temp = this.#deckOfCards[i];
            this.#deckOfCards[i] = this.#deckOfCards[j];
            this.#deckOfCards[j] = temp;
        }
    }

    slice(s, e) {
        return this.#deckOfCards.slice(s,e);
    }

    deal() {
        if (this.#currentCard < this.NCARDS) {
            var dealOut = this.#deckOfCards[this.#currentCard];
            this.#currentCard++;
            return(dealOut);
        }
    }

    toString() {
        var d = "";
        var k = 0;
        // let it print out on 4 lines
        for (var s = 0; s < 4; s++) {
            for (var r = 0; r < 13; r++) {
                d = d + (this.#deckOfCards[k].toString() + " ");
                k++;
            }
            d = d + "<br />";
        }
        return d;
    }

    forView() {
        var d = "";
        var k = 0;
        // let it print out on 4 lines
        for (var s = 0; s < 4; s++) {
            for (var r = 0; r < 13; r++) {
                d = d + (this.#deckOfCards[k].forView() + " ");
                k++;
            }
            d = d + "<br />";
        }
        return d;
    }
}

// http://www.mathcs.emory.edu/~cheung/Courses/170/Syllabus/10/pokerPlay.html
// represent each player's hand as Card[]

function testDeck() {
    var deck = new Deck();
    deck.shuffle();
    var writeIt = document.getElementById("gameArea");
    writeIt.innerHTML = deck.forView();
}