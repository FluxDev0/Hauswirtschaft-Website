let score = 0;
let answered = false;

const placeholder = document.getElementById("placeholder");
const html = document.innerHTML;

function showTab(tab) {
  if (tab === "home") {
    placeholder.innerHTML = `
      <div class="info glass" id="content">
      <p>Die Planet Health Diet ist gut für dich und die Umwelt.</p>
      <p>Ziel: Nachhaltig und gesund essen.</p>
      </div>
    `;
  }

  if (tab === "info") {
    placeholder.innerHTML = `
      <div class="info glass" id="content">
      <h2>Was bedeutet das?</h2>
      <ul>
        <li>Weniger Fleisch</li>
        <li>Mehr Gemüse</li>
        <li>Weniger Zucker</li>
        <li>Nachhaltigkeit</li>
      </ul>
      </div>
    `;
  }

  if (tab === "foods") {
    placeholder.innerHTML = `
      <div class="info glass" id="content">
      <div class="grid">
        <div class="card good">Gemüse 👍</div>
        <div class="card good">Obst 👍</div>
        <div class="card good">Vollkorn 👍</div>
        <div class="card bad">Fleisch 👎</div>
        <div class="card bad">Zucker 👎</div>
      </div>
      </div>
    `;
  }

  if (tab === "quiz") {
    answered = false;
    placeholder.innerHTML = `
      <div class="info glass" id="content">
      <h2>Quiz</h2>
      <p>Ist viel Fleisch gut?</p>
      <button class="glass" onclick="answer(false)">Ja</button>
      <button class="glass" onclick="answer(true)">Nein</button>
      <p id="result"></p>
      </div>
    `;
  }

  if (tab === "piechart") {
    placeholder.innerHTML = `
      <div id="piechart_div">
      <nav>
        <button onclick="show_piechart(phd)" class="glass continent">PHD</button>
        <button onclick="show_piechart(north_america)" class="glass continent">Nordamerika</button>
        <button onclick="show_piechart(europe)" class="glass continent">Europa</button>
      </nav>

      <div class="content glass" style="padding: 0px;">
        <canvas id="pieChart" width="300" height="300" class="piechart"> </canvas>
      </div>
    </div>
    `;
    show_piechart(phd);
    document.querySelectorAll(".continent").forEach(box => {
      box.addEventListener("click", function() {
        document.querySelectorAll(".continent").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }
}

function switch_active(tab, nav_name) {
  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(nav_name + "-" + tab).classList.add("active");
}

function answer(correct) {
  if (!answered) {
    if (correct) score++;
    answered = true;
    document.getElementById("result").innerText = "Punkte: " + score;
  }
}



function show_piechart(data) {
  const canvas = document.getElementById("pieChart");
  const ctx = canvas.getContext("2d");
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let startAngle = 0;

  data.forEach(item => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.arc(canvas.width/2, canvas.height/2, 100, startAngle, startAngle + sliceAngle);
    ctx.closePath();

    ctx.fillStyle = item.color;
    ctx.fill();

    startAngle += sliceAngle;
  });
}

document.querySelectorAll(".mnav").forEach(box => {
  box.addEventListener("click", function() {
    document.querySelectorAll(".mnav").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
  });
});

const phd = [
  { value: 300, color: "#4CAF50", label: "Gemüse" },
  { value: 250, color: "#FF9800", label: "Milchprodukte" },
  { value: 232, color: "#2196F3", label: "Vollkornprodukte" },
  { value: 200, color: "#F44336", label: "Obst" },
  { value: 75, color: "#9C27B0", label: "Hülsenfrüchte" },
  { value: 50, color: "#3fda21", label: "Wurzelgemüse" },
  { value: 50, color: "#f436d4", label: "Nüsse & Samen" },
  { value: 40, color: "#F44336", label: "Pflanzenöle" },
  { value: 31, color: "#f4e736", label: "Zucker" },
  { value: 29, color: "#36f4eb", label: "Geflügel" },
  { value: 28, color: "#000000", label: "Fisch" },
  { value: 14, color: "#F44336", label: "rotes Fleisch" },
  { value: 13, color: "#245f09", label: "Eier" },
  { value: 7, color: "#3cf436", label: "Palmöl" },
  { value: 5, color: "#ec3d2d", label: "tierisches Fett" },
];

const north_america = [
  { value: 203, color: "#4CAF50", label: "Gemüse" },
  { value: 472, color: "#FF9800", label: "Milchprodukte" },
  { value: 39, color: "#2196F3", label: "Vollkornprodukte" },
  { value: 159, color: "#F44336", label: "Obst" },
  { value: 15, color: "#9C27B0", label: "Hülsenfrüchte" },
  { value: 102, color: "#3fda21", label: "Wurzelgemüse" },
  { value: 23, color: "#f436d4", label: "Nüsse & Samen" },
  { value: 52, color: "#F44336", label: "Pflanzenöle" },
  { value: 89, color: "#f4e736", label: "Zucker" },
  { value: 99, color: "#36f4eb", label: "Geflügel" },
  { value: 26, color: "#000000", label: "Fisch" },
  { value: 103, color: "#F44336", label: "rotes Fleisch" },
  { value: 31, color: "#245f09", label: "Eier" },
  { value: 1, color: "#3cf436", label: "Palmöl" },
  { value: 10, color: "#ec3d2d", label: "tierisches Fett" },
];

const europe = [
  { value: 235, color: "#4CAF50", label: "Gemüse" },
  { value: 489, color: "#FF9800", label: "Milchprodukte" },
  { value: 82, color: "#2196F3", label: "Vollkornprodukte" },
  { value: 164, color: "#F44336", label: "Obst" },
  { value: 11, color: "#9C27B0", label: "Hülsenfrüchte" },
  { value: 155, color: "#3fda21", label: "Wurzelgemüse" },
  { value: 12, color: "#f436d4", label: "Nüsse & Samen" },
  { value: 44, color: "#F44336", label: "Pflanzenöle" },
  { value: 69, color: "#f4e736", label: "Zucker" },
  { value: 46, color: "#36f4eb", label: "Geflügel" },
  { value: 27, color: "#000000", label: "Fisch" },
  { value: 83, color: "#F44336", label: "rotes Fleisch" },
  { value: 31, color: "#245f09", label: "Eier" },
  { value: 3, color: "#3cf436", label: "Palmöl" },
  { value: 21, color: "#ec3d2d", label: "tierisches Fett" },
];

// Startseite laden
showTab('home');