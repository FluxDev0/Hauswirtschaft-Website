let score = 0;
let answered = false;

function showTab(tab) {
  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
  document.getElementById("btn-" + tab).classList.add("active");

  const content = document.getElementById("content");

  if (tab === "home") {
    content.innerHTML = `
      <p>Die Planet Health Diet ist gut für dich und die Umwelt.</p>
      <p>Ziel: Nachhaltig und gesund essen.</p>
    `;
  }

  if (tab === "info") {
    content.innerHTML = `
      <h2>Was bedeutet das?</h2>
      <ul>
        <li>Weniger Fleisch</li>
        <li>Mehr Gemüse</li>
        <li>Weniger Zucker</li>
        <li>Nachhaltigkeit</li>
      </ul>
    `;
  }

  if (tab === "foods") {
    content.innerHTML = `
      <div class="grid">
        <div class="card good">Gemüse 👍</div>
        <div class="card good">Obst 👍</div>
        <div class="card good">Vollkorn 👍</div>
        <div class="card bad">Fleisch 👎</div>
        <div class="card bad">Zucker 👎</div>
      </div>
    `;
  }

  if (tab === "quiz") {
    answered = false;
    content.innerHTML = `
      <h2>Quiz</h2>
      <p>Ist viel Fleisch gut?</p>
      <button onclick="answer(false)">Ja</button>
      <button onclick="answer(true)">Nein</button>
      <p id="result"></p>
    `;
  }
}

function answer(correct) {
  if (!answered) {
    if (correct) score++;
    answered = true;
    document.getElementById("result").innerText = "Punkte: " + score;
  }
}

// Startseite laden
showTab('home');