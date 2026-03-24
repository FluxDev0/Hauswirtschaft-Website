const indicator = document.getElementById("nav-indicator");
const content = document.getElementById("content");
const chartCard = document.getElementById("chart-card");
const canvas = document.getElementById("pieChart");
const ctx = canvas.getContext("2d");

const tabData = {
    home: { h: "Balance 2026", p: "Die Planet Health Diet ist dein biologisches Upgrade für ein gesundes Leben." },
    info: { h: "Wissenschaft", p: "Berechnet von der EAT-Lancet-Kommission für 10 Milliarden Menschen." },
    foods: { h: "Superfoods", p: "Fokus auf Nüsse, Hülsenfrüchte und massig buntes Gemüse." },
    quiz: { h: "Dein Check", p: "Bist du bereit für die Ernährung der Zukunft? Teste dich jetzt!" }
};

const regions = [
    { n: "Global Target", v: [300, 230, 250, 14], c: ["#10b981", "#3b82f6", "#ffffff", "#ef4444"] },
    { n: "Europe 2026", v: [240, 80, 400, 90], c: ["#10b981", "#3b82f6", "#ffffff", "#ef4444"] },
    { n: "North America", v: [180, 40, 450, 120], c: ["#10b981", "#3b82f6", "#ffffff", "#ef4444"] }
];

let regIdx = 0;

function showTab(name, idx) {
    // Schalter bewegen
    indicator.style.transform = `translateX(${idx * 100}%)`;
    
    // Buttons stylen
    document.querySelectorAll(".nav-item").forEach((b, i) => b.classList.toggle("active", i === idx));

    // Inhalt wechseln mit Zoom-Effekt
    content.style.transform = "scale(0.95)";
    content.style.opacity = "0";

    setTimeout(() => {
        content.innerHTML = `<h2>${tabData[name].h}</h2><p>${tabData[name].p}</p>`;
        content.style.transform = "scale(1)";
        content.style.opacity = "1";
    }, 200);
}

function moveRegion(dir) {
    regIdx = (regIdx + dir + regions.length) % regions.length;
    
    // Karte nach hinten drücken (Zoom-Effekt)
    chartCard.classList.add("push-effect");
    
    setTimeout(() => {
        const r = regions[regIdx];
        document.getElementById("region-title").innerText = r.n;
        drawChart(r.v, r.c);
        chartCard.classList.remove("push-effect");
    }, 300);
}

function drawChart(vals, cols) {
    ctx.clearRect(0, 0, 300, 300);
    let total = vals.reduce((a, b) => a + b, 0);
    let start = -Math.PI / 2;
    const labels = ["Gemüse", "Getreide", "Milch", "Fleisch"];

    vals.forEach((v, i) => {
        let slice = (v / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 110, start, start + slice);
        ctx.fillStyle = cols[i];
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();
        start += slice;
    });

    document.getElementById("legend").innerHTML = labels.map((l, i) => 
        `<div><span style="color:${cols[i]}">●</span> ${l}</div>`
    ).join("");
}

// Initialer Start beim Laden
window.onload = () => {
    showTab('home', 0);
    drawChart(regions[0].v, regions[0].c);
};

