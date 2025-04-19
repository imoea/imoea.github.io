class Comics {
  constructor(json) {
    // Initialise the comics page.

    this.data = json;
    this.imgs = {};

    let html = "";

    // List all the months that have comics.
    Object.entries(this.data).forEach(([month, dates]) => {

      // Include the number of comics for that month.
      html += `<details><summary>${month} (${dates.length.toString().padStart(2, " ")})</summary><p>`;
      html += `<div id="${month}"></div>`;

      // List all the days that have comics.
      dates.forEach(date => {
        const day = date.substring(8);
        html += `<button id="${date}">${day}</button>`;
      })

      html += `</p></details>`;
    });

    document.getElementById("comic").innerHTML = html;

    // Attach functions to all clickables.
    document.querySelectorAll("summary").forEach(summary => {
      summary.addEventListener('click', closeOpenedDetails);
    });
    document.querySelectorAll("button").forEach(button => {
      button.addEventListener('click', activateButton);
    });
  }
}

function activateButton() {

  // Deactivate all buttons except this one.
  document.querySelectorAll("button").forEach(button => {
    button.classList.remove("active");
  });
  this.classList.add("active");

  // Retrieve the image from its source.
  if (!(this.id in comics.imgs)) {
    comics.imgs[this.id] = new Image();
    comics.imgs[this.id].src = `/assets/comic/${this.id}.png`;
  }

  // Display the image.
  const month = this.id.substring(0, 7);
  document.getElementById(month).innerHTML = `<p><img src="${comics.imgs[this.id].src}"></p>`;
}

function closeOpenedDetails() {

  // Hide all other details except this one.
  document.querySelectorAll("summary").forEach(summary => {
    let detail = summary.parentNode;
    if (detail != this.parentNode) {
      detail.removeAttribute("open");
    }
  });

  // Remove the images too.
  document.querySelectorAll("details > div").forEach(div => {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  });

}

let comics;

Promise.all([fetch("/assets/comic/comics.json")
  .then(function (obj) { return obj.json(); })])
  .then(function (json) { comics = new Comics(json[0]); });
