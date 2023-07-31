var dice = {};

function roll_dice(string) {
    if (string === undefined) {
        string = "";
        const n = Number(document.getElementById("dice_n").value);
        const x = Number(document.getElementById("dice_x").value);
        const m = Number(document.getElementById("dice_m").value);
        if (n > 1) { string += `${n}`; }
        string += `d${(x == 0) ? "F" : x}`;  // 0 = fate die
        if (m > 0) { string += `+${m}`; }
        else if (m < 0) { string += `${m}`; }
        if (!(string in dice)) {
            dice[string] = new Dice(n, x, m, string);
            document.getElementById("dice_history").innerHTML += `
            <button value="${string}" onclick="roll_dice(value)">${string}</button>`;
        }
    }
    dice[string].roll();
}

class Dice {
    constructor(n, x, m, string) {
        this.n = n;  // number of dice
        this.x = x;  // number of sides; 0 = fate die
        this.m = m;  // roll modifier
        this.string = string;
    }

    roll() {
        const rolls = [];
        let text = `${this.string} = `;
        for (let i = 0; i < this.n; i++) {
            if (this.x == 0) {
                // fate die: -1, 0, 1
                rolls.push(Math.floor(Math.random() * 3) - 1);
            } else {
                // normal X-sided die: 1 ... X
                rolls.push(Math.floor(Math.random() * this.x) + 1)
            }
        }
        text += `${(this.n == 1) ? rolls[0] : "(" + rolls.join(", ") + ")"}`;
        let result = rolls.reduce((a, b) => a + b, 0);
        if (this.m != 0) {
            text += `${(this.m > 0) ? "+" : ""}${this.m}`;
            result += this.m;
        }
        if (this.n > 1 || this.m != 0) {
            text += ` = ${result}`;
        }
        document.getElementById("dice_result").innerHTML = text;
    }
}
