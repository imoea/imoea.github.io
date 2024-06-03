// comics //////////////////////////////////////////////////////////////////////

class Comics {
    constructor(json) {
        this.data = json;
        this.imgs = {};

        this.init();
    }

    init() {
        let html = "";
        Object.keys(this.data).forEach(month => {
            html += `<details><summary>${month}</summary><p>`;
            html += `<div id="${month}"></div>`;
            this.data[month].forEach(id => {
                const label = id.substring(8);
                html += `<button id="${id}" name="${month}" onclick="comics.select(id)">${label}</button>`;
            })
            html += `</p></details>`;
        });
        document.getElementById("comic").innerHTML = html;
    }

    select(id) {
        const ele = document.getElementById(id);
        const eles = document.getElementsByName(ele.name);
        eles.forEach(e => e.classList.remove("active"));
        ele.classList.add("active");

        if (!(id in this.imgs)) {
            this.imgs[id] = new Image();
            this.imgs[id].src = `/assets/comic/${id}.png`;
        }
        this.show(id);
    }

    show(id) {
        const month = id.substring(0, 7);
        document.getElementById(month).innerHTML = `<p><img src="${this.imgs[id].src}"></p>`;
    }
}

// variables ///////////////////////////////////////////////////////////////////

let comics;

Promise.all([fetch("/assets/comic/comics.json")
    .then(function (obj) { return obj.json(); })])
    .then(function (json) { comics = new Comics(json[0]); });
