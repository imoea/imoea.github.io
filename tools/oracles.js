let oracle_data, oracle_dice;

Promise.all([fetch("/tools/assets/oracles.json").then(function (obj) {
    return obj.json();
})]).then(init_oracles);

function init_oracles(then) {
    oracle_data = then[0];
    oracle_dice = {};
}

function ask_oracle(table) {
    document.getElementById("answer").innerHTML = roll_table(table).join(" ").trim()
        .replace(/\n/g, "<br>").replace(/(faction|npc|pc|thread|threat)/gi, "<b>$&</b>");
}

function change_dice(table, x) {
    oracle_dice[table] = x;
}

function roll_table(table) {
    const x = (table in oracle_dice) ? oracle_dice[table] : oracle_data[table].length;
    const roll = Math.min(Math.floor(Math.random() * x), oracle_data[table].length - 1);
    const results = oracle_data[table][roll];
    let answer = [];
    if (results && typeof (results) === "object") {
        results.forEach(result => {
            if (result in oracle_data) {
                answer = answer.concat(roll_table(result));
            } else if (result) {
                answer.push(result);
            }
        });
    } else {
        answer.push(results);
    }
    return answer;
}

function select(id) {
    const ele = document.getElementById(id);
    const eles = document.getElementsByName(ele.name);
    if (eles.length == 1) {
        ele.classList.toggle("selected");
    } else {
        eles.forEach(e => { e.classList.remove("selected"); });
        ele.classList.add("selected");
    }

    if (id.startsWith("d")) {
        change_dice(ele.name, Number(id.substring(1)));
    }

    if (id in oracle_data) {
        ask_oracle(id);
    }
}
