let decks;

Promise.all([fetch("/tools/assets/cards.json")
    .then(function (obj) { return obj.json(); })])
    .then(function (json) { decks = new Decks(json); });

class Decks {
    constructor(json) {
        this.data = json[0];
        this.selection = {
            "standard": new StandardDeck(this.data, 0, 52),
            "jokers": new StandardDeck(this.data, 0, 54),
            "clubs": new StandardDeck(this.data, 0, 13),
            "diamonds": new StandardDeck(this.data, 13, 26),
            "hearts": new StandardDeck(this.data, 26, 39),
            "spades": new StandardDeck(this.data, 39, 52),
            "tarot": new TarotDeck(this.data, 0, 78),
            "major": new TarotDeck(this.data, 0, 22),
            "minor": new TarotDeck(this.data, 22, 78),
            "cups": new TarotDeck(this.data, 22, 36),
            "pentacles": new TarotDeck(this.data, 36, 50),
            "swords": new TarotDeck(this.data, 50, 64),
            "wands": new TarotDeck(this.data, 64, 78)
        };
        this.selected = {
            "standard": this.selection.standard,
            "tarot": this.selection.tarot
        };
    }
}

class StandardDeck {
    constructor(data, start, end) {
        this.deck = data.standard.cards;
        this.arr = cut_deck(start, end);  // array of indices
        this.drawn = -1;
        this.pos = 0;

        this.shuffle();
    }

    copy() {
        let text = new Array();
        this.arr.forEach(i => text.push(this.deck[i]));
        text = text.join(" ");
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
        document.getElementById("standard").innerHTML = `<h1>${this.deck[i]}</h1>`;
    }

    shuffle() {
        shuffle_arr(this.arr);
        this.drawn = -1;
        this.pos = 0;
        document.getElementById("standard").innerHTML = "";
    }
}

class TarotDeck {
    constructor(data, start, end) {
        this.data = data
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
            if (typeof (this.deck[i]) === "string") {
                const name = this.deck[i];
                this.deck[i] = new Image();
                this.deck[i].src = this.data.tarot.asset_dir + name + ".png";
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
        document.getElementById("tarot").innerHTML = `<img src="${this.deck[i].src}" class="${(j === 1) ? "flip" : ""}"><br>${this.meanings[i][j]}`;
    }

    shuffle() {
        shuffle_arr(this.arr);
        flip_arr(this.flip);
        this.drawn = -1;
        this.pos = 0;
        document.getElementById("tarot").innerHTML = "";
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
    decks.selected[type] = decks.selection[value];
    if (decks.selected[type].drawn !== -1) {
        decks.selected[type].show();
    } else {
        document.getElementById(type).innerHTML = "";
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
