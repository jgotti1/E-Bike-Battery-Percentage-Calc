// Approximate resting per-cell voltage -> state of charge for Li-ion (sorted ascending).
const CELL_CURVE = [
  [3.0, 0],
  [3.3, 5],
  [3.5, 10],
  [3.6, 20],
  [3.7, 30],
  [3.8, 45],
  [3.9, 60],
  [3.95, 70],
  [4.0, 78],
  [4.1, 90],
  [4.2, 100],
];

function cellVoltageToPercent(v) {
  const first = CELL_CURVE[0];
  const last = CELL_CURVE[CELL_CURVE.length - 1];
  if (v <= first[0]) return 0;
  if (v >= last[0]) return 100;

  for (let i = 1; i < CELL_CURVE.length; i++) {
    const [v1, p1] = CELL_CURVE[i];
    if (v <= v1) {
      const [v0, p0] = CELL_CURVE[i - 1];
      return p0 + ((v - v0) / (v1 - v0)) * (p1 - p0);
    }
  }
}

// Lectric bikes and battery cells in series. Verify against your battery label.
const BIKES = [
  { name: "Lectric XP4 750", cells: 13 },
  { name: "Lectric XP4 500", cells: 13 },
  { name: "Lectric XPress 750", cells: 13 },
  { name: "Lectric XPeak 2.0", cells: 13 },
  { name: "Lectric XPedition", cells: 13 },
  { name: "Lectric XP 3.0", cells: 13 },
  { name: "Lectric XP 2.0", cells: 13 },
  { name: "Lectric XP Trike", cells: 13 },
  { name: "Lectric XP 1.0", cells: 13 },
  { name: "Lectric ONE", cells: 13 },
  // Best guesses, not confirmed. Check the battery label.
  { name: "Lectric XP Lite 2.0", cells: 13 },
  { name: "Lectric XP Lite", cells: 10 },
];
const CUSTOM = "custom";

const bikeSelect = document.getElementById("bike");
const cellsGroup = document.getElementById("cellsGroup");
const cellsInput = document.getElementById("cells");

BIKES.forEach((b, i) => bikeSelect.add(new Option(b.name, i)));
bikeSelect.add(new Option("Other bike / battery", CUSTOM));

function syncBike() {
  const custom = bikeSelect.value === CUSTOM;
  cellsGroup.hidden = !custom;
  if (!custom) cellsInput.value = BIKES[bikeSelect.value].cells;
}
bikeSelect.addEventListener("change", syncBike);
syncBike();

function showResult(html) {
  const resultDiv = document.getElementById("result");
  resultDiv.hidden = false;
  resultDiv.innerHTML = html;
  resultDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.getElementById("batteryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const cells = parseInt(document.getElementById("cells").value, 10);
  const current = parseFloat(document.getElementById("currentVolts").value);

  if (!Number.isFinite(cells) || cells < 1 || !Number.isFinite(current) || current <= 0) {
    showResult('<span class="result-error">Enter a valid cell count and voltage.</span>');
    return;
  }

  const percent = Math.round(cellVoltageToPercent(current / cells));
  const perCell = (current / cells).toFixed(2);
  const color = percent >= 50 ? "var(--good)" : percent >= 20 ? "var(--warn)" : "var(--bad)";

  const fill = document.getElementById("bikeFill");
  fill.setAttribute("width", (58 * percent) / 100);
  fill.style.fill = color;

  showResult(`
    <div class="result-percent" style="color: ${color};">${percent}%</div>
    <div class="result-label">Battery remaining</div>
    <div class="gauge"><div class="gauge-fill" style="width: ${percent}%; background: ${color};"></div></div>
    <div class="result-meta">${perCell}V per cell</div>
  `);
});
