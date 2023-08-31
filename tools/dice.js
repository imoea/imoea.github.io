let pool;

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

pool = new Pool();
