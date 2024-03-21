// cards ///////////////////////////////////////////////////////////////////////

class Decks {
    constructor(json) {
        this.data = json;
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
        document.getElementById("tarot").innerHTML = `<p>${this.meanings[i][j]}</p><img src="${this.deck[i].src}" class="${(j === 1) ? "flip" : ""}">`;
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

// dice ////////////////////////////////////////////////////////////////////////

class Dice {
    constructor(n, x, m, string) {
        this.n = n;  // number of dice
        this.x = x;  // number of sides; 0 = fate die
        this.m = m;  // roll modifier
        this.string = string;
    }

    roll() {
        const rolls = [];
        for (let i = 0; i < this.n; i++) {
            if (this.x == 0) {
                // fate die: -1, 0, 1
                rolls.push(Math.floor(Math.random() * 3) - 1);
            } else {
                // normal X-sided die: 1 ... X
                rolls.push(Math.floor(Math.random() * this.x) + 1)
            }
        }
        let result = rolls.reduce((a, b) => a + b, 0);
        let text = `${this.string} = ${"(" + rolls.join(",") + ")"}`;
        if (this.m != 0) {
            result += this.m;
            text += `${(this.m > 0) ? "+" : ""}${this.m}`;
        }
        text += `<h1>${result}</h1>`;
        document.getElementById("dice_result").innerHTML = text;
    }
}

class Pool {
    constructor() {
        this.pool = {};
    }

    roll(string) {
        if (string === undefined) {
            string = "";
            const n = Number(document.getElementById("dice_n").value);
            const x = Number(document.getElementById("dice_x").value);
            const m = Number(document.getElementById("dice_m").value);
            if (n > 1) { string += `${n}`; }
            string += `d${(x == 0) ? "F" : x}`;  // 0 = fate die
            if (m > 0) { string += `+${m}`; }
            else if (m < 0) { string += `${m}`; }
            if (!(string in this.pool)) {
                this.pool[string] = new Dice(n, x, m, string);
                document.getElementById("dice_history").innerHTML += `<button value="${string}" onclick="pool.roll(value)">${string}</button>`;
            }
        }
        this.pool[string].roll();
    }
}

// oracle //////////////////////////////////////////////////////////////////////

class Oracle {
    constructor(json) {
        this.data = json;
        this.dice = {};
    }

    ask(table) {
        const text = this.roll_table(table).join(" ").replace(/ \n /g, "\n");
        document.getElementById("answer").innerHTML = `<h4>${text.replace(/\n/g, "<br><br>")}</h4>`;
        navigator.clipboard.writeText(text);
    }

    change_dice(table, x) {
        this.dice[table] = x;
    }

    roll_dice(x) {
        return Math.floor(Math.random() * x);
    }

    roll_table(table) {
        const x = (table in this.dice) ? this.dice[table] : this.data[table].length;
        let result = Math.min(this.roll_dice(x), this.data[table].length - 1);
        if (["how_much", "scene", "set_the_scene", "yes_no"].includes(table)) {
            if (document.getElementById("chaos_low").classList.contains("active")) {
                result = Math.min(result, this.roll_dice(x));
            } else if (document.getElementById("chaos_high").classList.contains("active")) {
                result = Math.max(result, this.roll_dice(x));
            }
        }
        const results = this.data[table][result];
        let answer = [];
        if (results && typeof (results) === "object") {
            results.forEach(result => {
                if (result in this.data) {
                    answer = answer.concat(this.roll_table(result));
                } else if (result) {
                    answer.push(result);
                }
            });
        } else {
            answer.push(results);
        }
        return answer;
    }

    select(id) {
        const ele = document.getElementById(id);
        const eles = document.getElementsByName(ele.name);
        if (eles.length == 1) {
            ele.classList.toggle("active");
        } else {
            eles.forEach(e => { e.classList.remove("active"); });
            ele.classList.add("active");
        }

        if (id.startsWith("d")) {
            this.change_dice(ele.name, Number(id.substring(1)));
        }

        if (id in this.data) {
            this.ask(id);
        }
    }
}

// time ////////////////////////////////////////////////////////////////////////

class Time {
    constructor() {
        this.t = 0;
    }

    reset() {
        this.t = 0;
        this.update();
    }

    tick(dt) {
        this.t = Math.max(this.t + dt, 0);
        this.update();
    }

    update() {
        const s = this.t % 60;
        const m = Math.floor(this.t / 60) % 60;
        const h = Math.floor(this.t / 3600) % 24;
        const d = Math.floor(this.t / 86400);

        let text = `Day ${d}`;
        text += `<h1>${(h > 12) ? h - 12 : ((h === 0) ? 12 : h)}:`;
        text += `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
        text += ` ${(h > 11) ? "PM" : "AM"}</h1>`;

        document.getElementById("time").innerHTML = text;
    }
}

// tabs ////////////////////////////////////////////////////////////////////////

function open_tab(event, group, id) {
    document.getElementsByName(group).forEach(e => { e.style.display = "none"; });
    document.querySelectorAll(`button.${group}_tab`).forEach(e => { e.classList.remove("active"); });
    document.getElementById(id).style.display = "block";
    event.currentTarget.classList.add("active");
}

// variables ///////////////////////////////////////////////////////////////////

let decks, oracle, pool, time;

Promise.all([fetch("/ttrpg/assets/cards.json")
    .then(function (obj) { return obj.json(); })])
    .then(function (json) { decks = new Decks(json[0]); });

Promise.all([fetch("/ttrpg/assets/oracle.json")
    .then(function (obj) { return obj.json(); })])
    .then(function (json) { oracle = new Oracle(json[0]); });

pool = new Pool();
time = new Time();
