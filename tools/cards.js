var data, deck, decks;
Promise.all([fetch('/tools/assets/cards.json').then(function (obj) {
    return obj.json();
})]).then(init_decks);

function init_decks(then) {
    data = then[0];
    decks = {
        "standard": new StandardDeck(0, 52),
        "jokers": new StandardDeck(0, 54),
        "tarot": new TarotDeck(0, 78),
        "major": new TarotDeck(0, 22),
        "minor": new TarotDeck(22, 78),
        "cups": new TarotDeck(22, 36),
        "pentacles": new TarotDeck(36, 50),
        "swords": new TarotDeck(50, 64),
        "wands": new TarotDeck(64, 78)
    };
    deck = { "standard": decks.standard, "tarot": decks.tarot };
}

class StandardDeck {
    constructor(start, end) {
        this.deck = data.standard.cards;
        this.arr = cut_deck(start, end);  // array of indices
        this.drawn = -1;
        this.pos = 0;

        this.shuffle();
    }

    copy() {
        let text = new Array();
        this.arr.forEach(i => text.push(this.deck[i]));
        text = text.join(", ");
        document.getElementById("standard").innerHTML = text;
        navigator.clipboard.writeText(text);
    };

    draw() {
        if (this.drawn < this.arr.length - 1) {
            this.drawn += 1;
            this.pos = this.drawn;
            this.show();
        }
    }

    next() {
        if (this.pos < this.drawn) {
            this.pos += 1;
            this.show();
        }
    }

    prev() {
        if (this.pos > 0) {
            this.pos -= 1;
            this.show();
        }
    }

    show() {
        const i = this.arr[this.pos];
        document.getElementById("standard").innerHTML = `<h2>${this.deck[i]}</h2>`;
    }

    shuffle() {
        shuffle_arr(this.arr);
        this.drawn = -1;
        this.pos = 0;
        document.getElementById("standard").innerHTML = "";
    }
}

class TarotDeck {
    constructor(start, end) {
        this.deck = data.tarot.cards;
        this.meanings = data.tarot.meanings;
        this.arr = cut_deck(start, end);  // array of indices
        this.flip = arrange_deck(end - start);  // array of orientations
        this.drawn = -1;
        this.pos = 0;

        this.shuffle();
    }

    draw() {
        if (this.drawn < this.arr.length - 1) {
            this.drawn += 1;
            this.pos = this.drawn;

            const i = this.arr[this.pos];
            if (typeof (this.deck[i]) === 'string') {
                const name = this.deck[i];
                this.deck[i] = new Image();
                this.deck[i].src = data["tarot"].asset_dir + name + ".png";
            }
            this.show();
        }
    }

    next() {
        if (this.pos < this.drawn) {
            this.pos += 1;
            this.show();
        }
    }

    prev() {
        if (this.pos > 0) {
            this.pos -= 1;
            this.show();
        }
    }

    rotate() {
        if (this.drawn !== -1) {
            this.flip[this.pos] = (this.flip[this.pos] + 1) % 2;
            this.show();
        }
    }

    show() {
        const i = this.arr[this.pos];
        const j = this.flip[this.pos];
        document.getElementById("tarot").src = this.deck[i].src;
        if (j === 1) {
            document.getElementById("tarot").classList.add('flip');
        } else {
            document.getElementById("tarot").classList.remove('flip');
        }
        document.getElementById("meaning").innerHTML = this.meanings[i][j];
    }

    shuffle() {
        shuffle_arr(this.arr);
        flip_arr(this.flip);
        this.drawn = -1;
        this.pos = 0;
        document.getElementById("tarot").src = "";
        document.getElementById("meaning").innerHTML = "";
    }
}

function arrange_deck(length) {
    let arr = new Array();
    for (let i = 0; i < length; i++) {
        arr.push(0);
    }
    return arr;
}

function change_deck(type, value) {
    deck[type] = decks[value];
    if (deck[type].drawn !== -1) {
        deck[type].show();
    } else {
        if (type === "standard") {
            document.getElementById(type).innerHTML = ""
        } else {
            document.getElementById(type).src = "";
            document.getElementById("meaning").innerHTML = "";
        }
    }
}

function cut_deck(start, end) {
    let arr = new Array();
    for (let i = start; i < end; i++) {
        arr.push(i);
    }
    return arr;
}

function flip_arr(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 2);
    }
}

function shuffle_arr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
}
