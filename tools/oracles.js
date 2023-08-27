let oracle_data, oracle_dice;

Promise.all([fetch("/tools/assets/oracles.json").then(function (obj) {
    return obj.json();
})]).then(init_oracles);

function init_oracles(then) {
    oracle_data = then[0];
    oracle_dice = {};
}

function ask_oracle(table) {
    let x;
    switch (table) {
        case "success":
            x = (document.getElementById("success_").checked) ? 10 : 6;
            change_dice("perk", x);
            change_dice("problem", x);
            break;
        case "yes/no":
            x = (document.getElementById("yes_no_").checked) ? 6 : 4;
            change_dice("but", x);
            break;
    }

    const answer = roll_table(table);
    document.getElementById(table).innerHTML = `<h4>${answer.join(" ")}</h4>`;
}

function change_dice(table, x) {
    oracle_dice[table] = x;
}

function roll_table(table) {
    const x = (table in oracle_dice) ? oracle_dice[table] : oracle_data[table].length;
    const roll = Math.min(Math.floor(Math.random() * x), oracle_data[table].length - 1);
    const results = oracle_data[table][roll];
    let answer = [];
    if (typeof (results) === "object") {
        results.forEach(result => {
            if (result in oracle_data) { answer = answer.concat(roll_table(result)); }
            else { answer.push(result); }
        });
    } else {
        answer.push(results);
    }
    return answer;
}
