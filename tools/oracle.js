let oracle;

Promise.all([fetch("/tools/assets/oracle.json")
    .then(function (obj) { return obj.json(); })])
    .then(function (json) { oracle = new Oracle(json); });

class Oracle {
    constructor(json) {
        this.data = json[0]
        this.dice = {};
    }

    ask(table) {
        document.getElementById("answer").innerHTML = this.roll_table(table).join(" ").trim()
            .replace(/\n/g, "<br>").replace(/(faction|npc|thread|threat)/gi, "<b>$&</b>");
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
            if (document.getElementById("chaos_low").classList.contains("selected")) {
                result = Math.min(result, this.roll_dice(x));
            } else if (document.getElementById("chaos_high").classList.contains("selected")) {
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
            ele.classList.toggle("selected");
        } else {
            eles.forEach(e => { e.classList.remove("selected"); });
            ele.classList.add("selected");
        }

        if (id.startsWith("d")) {
            this.change_dice(ele.name, Number(id.substring(1)));
        }

        if (id in this.data) {
            this.ask(id);
        }
    }
}
