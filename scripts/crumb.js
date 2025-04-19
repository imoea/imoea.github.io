class Crumbs {
  constructor(json) {
    this.data = json;
    this.imgs = {};

    let html = "";

    html += `<input type="text" id="code">`;
    html += `<p id="clue" style="text-align:center;"></p>`;

    document.getElementById("crumbs").innerHTML = html;

    document.querySelector("#code")?.addEventListener('keypress', e => {
      if (e.keyCode == 13) {
        evaluate(e.currentTarget.value);
      }
    });
  }
}

function evaluate(code) {
  const input = document.getElementById("code");
  input.value = "";

  if (code in crumbs.data) {  // Answer is correct.
    input.placeholder = "Correct!";

    const crumb = crumbs.data[code];
    document.title = crumb.hint;
    if (crumb.img !== undefined) {  // Clue is an image.
      if (!(code in crumbs.imgs)) {
        crumbs.imgs[code] = new Image();
        crumbs.imgs[code].src = `/assets/crumb/${crumb.img}`;
      }
      document.getElementById("clue").innerHTML = `<img src="${crumbs.imgs[code].src}">`;
    } else if (crumb.txt !== undefined) {  // Clue is a list of strings.
      document.getElementById("clue").innerHTML = crumb.txt.join('<br>');
    }
  } else {  // Answer is wrong.
    input.placeholder = "Try again...";
  }
}

let crumbs;

Promise.all([fetch("/assets/crumb/crumbs.json")
  .then(function (obj) { return obj.json(); })])
  .then(function (json) { crumbs = new Crumbs(json[0]); });
