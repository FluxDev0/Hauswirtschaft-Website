let score = 0;
let answered = false;

const placeholder = document.getElementById("placeholder");
const html = document.innerHTML;
const mnav = document.querySelector("nav.mnav #nav-indicator");

function showTab(tab) {
  if (tab === "home") {
    placeholder.innerHTML = `
      <div class="info glass" id="content">
        <h5>Eine Website über die Planetary Health Diet.</h5>
        <p>Klicke auf einen Abschnitt um mehr zu erfahren.</p>
        <h6>ohne KI.</h6>
      </div>
    `;
  }

  if (tab === "info") {
    placeholder.innerHTML = `
      <div class="info glass" id="content" styles="max-width: 800px;">
      <p>Die Planetary Health Diet ist ein Ernährungsstil welcher von der EAT-Lancet Kommission entwickelt wurde.
      Das Ziel ist eine nachhaltige Ernährung, die für ein gesundes Leben sorgt und für 10 Milliarden Menschen im Jahr 2050 ausreicht und dabei möglichst wenig die Umwelt belastet.
      </p>
      </div>
    `;
  }

  if (tab === "foods") {
    placeholder.innerHTML = `
      <div class="info glass" id="content">
      </div>
    `;
  }

  if (tab === "quiz") {
    answered = false;
    placeholder.innerHTML = `
      <div class="info glass" id="content">
      <h2>Quiz</h2>
      </div>
    `;
  }

  if (tab === "piechart") {
    placeholder.innerHTML = `
      <nav class="glass regnav">
        <div id="nav-indicator" styles="transform: translateX(0%);"></div>
        <button onclick="show_piechart(phd)" class="active">PHD</button>
        <button onclick="show_piechart(north_america)">Nordamerika</button>
        <button onclick="show_piechart(europe);">Europa</button>
      </nav>

      <div class="content glass" style="padding: 0px;">
        <canvas id="pieChart" width="300" height="300" class="piechart"> </canvas>
      </div>
    `;
    continents();
    show_piechart(phd);
  }

  if (tab === "barchart") {
    placeholder.innerHTML = `
      <nav class="glass regnav">
        <div id="nav-indicator" styles="transform: translateX(0%);"></div>
        <button onclick="show_barchart(phd)" class="active">PHD</button>
        <button onclick="show_barchart(north_america)">Nordamerika</button>
        <button onclick="show_barchart(europe);">Europa</button>
      </nav>

      <div class="content glass" id="barChartContainer"></div>
    `;
    continents();
    show_barchart(phd);
  }
}

function answer(correct) {
  if (!answered) {
    if (correct) score++;
    answered = true;
    document.getElementById("result").innerText = "Punkte: " + score;
  }
}

function continents() {
  document.querySelectorAll("nav.regnav button").forEach((box, index) => {
      box.addEventListener("click", function() {
        document.querySelectorAll("nav.regnav button").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        navindication("regnav", index);
      });
    });
};

function navindication(navclass, index) {
  const nav = document.querySelector("nav." + navclass + " #nav-indicator");
  if (!nav) {console.log(index); console.log("nav." + navclass + " #nav-indicator")};
  nav.style.transform = `translateX(calc(${index} * (100% + 8px)))`;
}

function show_piechart(data) {
  const canvas = document.getElementById("pieChart");
  const ctx = canvas.getContext("2d");
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let startAngle = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  data.forEach((item, index) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.arc(canvas.width/2, canvas.height/2, 100, startAngle, startAngle + sliceAngle);
    ctx.closePath();

    console.log(phd[0].color);
    console.log(index);
    ctx.fillStyle = phd[index].color;
    ctx.fill();

    startAngle += sliceAngle;
  });
}

function show_barchart(data) {
  const container = document.getElementById("barChartContainer");

  if (container.innerHTML !== "") {
    data.forEach(item => {
      const bar = document.getElementById(item.label);
      bar.style.height = (item.value * 1.3) + "px";
      bar.querySelector("#barvalue").textContent = item.value + "g";
      console.log("activated");
    });
  } else {
    data.forEach(item => {

      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = "0px";
      bar.style.backgroundColor = item.color;
      bar.id = item.label;

      const value = document.createElement("span");
      value.textContent = item.value + "g";
      value.id = "barvalue";
      bar.appendChild(value);

      const label = document.createElement("span");
      label.classList.add("label");
      label.textContent = item.label;
      label.id = "barlabel";
      bar.appendChild(label);

      container.appendChild(bar);
      setTimeout(function() {
        bar.style.height = (item.value * 1.3) + "px";
      }, 1);
    });
  };
}

document.querySelectorAll("nav.mnav button").forEach((box, index) => {
  box.addEventListener("click", function() {
    document.querySelectorAll("nav.mnav button").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    navindication("mnav", index);
    showTab(this.id);
  });
});

const phd = [
  { value: 300, color: "rgba(70, 184, 74, 0.8)", label: "Gemüse" },
  { value: 250, color: "rgba(255, 196, 0, 0.81)", label: "Milchprodukte" },
  { value: 232, color: "rgba(33, 150, 243, 0.8)", label: "Vollkornprodukte" },
  { value: 200, color: "rgba(244, 67, 54, 0.8)", label: "Obst" },
  { value: 75, color: "rgba(188, 30, 216, 0.8)", label: "Hülsenfrüchte" },
  { value: 50, color: "rgba(70, 184, 74, 0.8)", label: "Wurzelgemüse" },
  { value: 50, color: "rgba(255, 196, 0, 0.81)", label: "Nüsse & Samen" },
  { value: 40, color: "rgba(33, 150, 243, 0.8)", label: "Pflanzenöle" },
  { value: 31, color: "rgba(244, 67, 54, 0.8)", label: "Zucker" },
  { value: 29, color: "rgba(188, 30, 216, 0.8)", label: "Geflügel" },
  { value: 28, color: "rgba(70, 184, 74, 0.8)", label: "Fisch" },
  { value: 14, color: "rgba(255, 196, 0, 0.81)", label: "rotes Fleisch" },
  { value: 13, color: "rgba(33, 150, 243, 0.8)", label: "Eier" },
  { value: 7, color: "rgba(244, 67, 54, 0.8)", label: "Palmöl" },
  { value: 5, color: "rgba(188, 30, 216, 0.8)", label: "tierisches Fett" },
];

const north_america = [
  { value: 203, label: "Gemüse" },
  { value: 472, label: "Milchprodukte" },
  { value: 39, label: "Vollkornprodukte" },
  { value: 159, label: "Obst" },
  { value: 15, label: "Hülsenfrüchte" },
  { value: 102, label: "Wurzelgemüse" },
  { value: 23, label: "Nüsse & Samen" },
  { value: 52, label: "Pflanzenöle" },
  { value: 89, label: "Zucker" },
  { value: 99, label: "Geflügel" },
  { value: 26, label: "Fisch" },
  { value: 103, label: "rotes Fleisch" },
  { value: 31, label: "Eier" },
  { value: 1, label: "Palmöl" },
  { value: 10, label: "tierisches Fett" },
];

const europe = [
  { value: 235, label: "Gemüse" },
  { value: 489, label: "Milchprodukte" },
  { value: 82, label: "Vollkornprodukte" },
  { value: 164, label: "Obst" },
  { value: 11, label: "Hülsenfrüchte" },
  { value: 155, label: "Wurzelgemüse" },
  { value: 12, label: "Nüsse & Samen" },
  { value: 44, label: "Pflanzenöle" },
  { value: 69, label: "Zucker" },
  { value: 46, label: "Geflügel" },
  { value: 27, label: "Fisch" },
  { value: 83, label: "rotes Fleisch" },
  { value: 31, label: "Eier" },
  { value: 3, label: "Palmöl" },
  { value: 21, label: "tierisches Fett" },
];

// Startseite laden
showTab('home');