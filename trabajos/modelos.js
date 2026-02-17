const modelos = ["qwen 4b", "gemma 3-12b", "granite 4h tiny"];

const riddleDescriptions = [
  "Acertijo 1 · ¿Qué vuela sin alas?",
  "Acertijo 2 · Serie numérica",
  "Acertijo 3 · Los tres relojes",
  "Acertijo 4 · Las tres mochilas"
];

// Datos locales: dataLocal[acertijo][modelo] = { mac:{}, pc:{} }
// Qwen Mac usa exactamente los tok/sec y tokens del PDF.[file:2]
const dataLocal = [
  // A1
  [
    {
      mac: { tks: 104.40, tokens: 127, correct: false },
      pc:  { tks: 140.00, tokens: 130, correct: false }
    },
    {
      mac: { tks: 80.0, tokens: 90, correct: true },
      pc:  { tks: 110.0, tokens: 95, correct: true }
    },
    {
      mac: { tks: 120.0, tokens: 110, correct: true },
      pc:  { tks: 150.0, tokens: 115, correct: true }
    }
  ],
  // A2
  [
    {
      mac: { tks: 108.33, tokens: 345, correct: true },
      pc:  { tks: 145.0,  tokens: 350, correct: true }
    },
    {
      mac: { tks: 95.0, tokens: 260, correct: true },
      pc:  { tks: 130.0, tokens: 270, correct: true }
    },
    {
      mac: { tks: 140.0, tokens: 240, correct: true },
      pc:  { tks: 180.0, tokens: 250, correct: true }
    }
  ],
  // A3
  [
    {
      mac: { tks: 98.00, tokens: 1571, correct: true },
      pc:  { tks: 130.0, tokens: 1580, correct: true }
    },
    {
      mac: { tks: 90.0, tokens: 1200, correct: false },
      pc:  { tks: 120.0, tokens: 1210, correct: false }
    },
    {
      mac: { tks: 130.0, tokens: 1400, correct: true },
      pc:  { tks: 170.0, tokens: 1410, correct: true }
    }
  ],
  // A4
  [
    {
      mac: { tks: 96.69, tokens: 1993, correct: false },
      pc:  { tks: 125.0, tokens: 2000, correct: false }
    },
    {
      mac: { tks: 88.0, tokens: 1500, correct: true },
      pc:  { tks: 115.0, tokens: 1510, correct: true }
    },
    {
      mac: { tks: 125.0, tokens: 1700, correct: true },
      pc:  { tks: 160.0, tokens: 1710, correct: true }
    }
  ]
];

// Datos OpenAI por acertijo (solo online, inventados para la demo)
const openaiData = [
  { tks: 220.0, tokens: 135,  correct: true },
  { tks: 230.0, tokens: 360,  correct: true },
  { tks: 220.0, tokens: 1590, correct: true },
  { tks: 210.0, tokens: 2010, correct: true }
];

function computeTimesLocal(riddleIndex) {
  const mac = [], pc = [];
  dataLocal[riddleIndex].forEach(m => {
    mac.push(+(m.mac.tokens / m.mac.tks).toFixed(2));
    pc.push(+(m.pc.tokens / m.pc.tks).toFixed(2));
  });
  return { mac, pc };
}

function computeOpenaiTimes() {
  return openaiData.map(o => +(o.tokens / o.tks).toFixed(2));
}

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "#e5e7eb", font: { size: 11 } }
    },
    tooltip: {
      backgroundColor: "rgba(15,23,42,0.95)",
      borderColor: "rgba(55,65,81,0.9)",
      borderWidth: 1,
      titleColor: "#e5e7eb",
      bodyColor: "#d1d5db",
      padding: 10,
      cornerRadius: 8
    }
  },
  scales: {
    x: {
      ticks: { color: "#9ca3af", font: { size: 11 } },
      grid: { display: false }
    },
    y: {
      ticks: { color: "#9ca3af", font: { size: 11 } },
      grid: { color: "rgba(31,41,55,0.7)" }
    }
  }
};

const riddleTitleEl = document.getElementById("riddleTitle");
const kpiFastModelEl = document.getElementById("kpiFastModel");
const kpiFastValueEl = document.getElementById("kpiFastValue");
const kpiMacTimeEl   = document.getElementById("kpiMacTime");
const kpiMacCorrectEl= document.getElementById("kpiMacCorrect");
const kpiSpeedGainEl = document.getElementById("kpiSpeedGain");
const kpiSpeedNoteEl = document.getElementById("kpiSpeedNote");
const detailTableBody = document.querySelector("#detailTable tbody");
const openaiTableBody = document.querySelector("#openaiTable tbody");

// Main chart locales
const mainCtx = document.getElementById("mainChart").getContext("2d");
const mainChart = new Chart(mainCtx, {
  type: "bar",
  data: {
    labels: modelos,
    datasets: [
      {
        label: "Mac mini",
        data: [],
        backgroundColor: "rgba(56,189,248,0.75)",
        borderRadius: 8
      },
      {
        label: "PC RTX 4060 Ti",
        data: [],
        backgroundColor: "rgba(248,113,113,0.9)",
        borderRadius: 8
      }
    ]
  },
  options: Object.assign({}, commonOptions, {
    scales: {
      x: commonOptions.scales.x,
      y: Object.assign({}, commonOptions.scales.y, {
        title: { display: true, text: "tk/s", color: "#9ca3af", font: { size: 11 } }
      })
    }
  })
});

// Time chart locales
const timeCtx = document.getElementById("timeChart").getContext("2d");
const timeChart = new Chart(timeCtx, {
  type: "bar",
  data: {
    labels: modelos,
    datasets: [
      {
        label: "Mac mini",
        data: [],
        backgroundColor: "rgba(56,189,248,0.75)",
        borderRadius: 6
      },
      {
        label: "PC RTX 4060 Ti",
        data: [],
        backgroundColor: "rgba(248,113,113,0.9)",
        borderRadius: 6
      }
    ]
  },
  options: Object.assign({}, commonOptions, {
    indexAxis: "y",
    scales: {
      x: Object.assign({}, commonOptions.scales.y, {
        title: { display: true, text: "Segundos", color: "#9ca3af", font: { size: 11 } }
      }),
      y: commonOptions.scales.x
    }
  })
});

// Tokens chart locales
const tokensCtx = document.getElementById("tokensChart").getContext("2d");
const tokensChart = new Chart(tokensCtx, {
  type: "line",
  data: {
    labels: modelos,
    datasets: [
      {
        label: "Mac mini",
        data: [],
        borderColor: "rgba(56,189,248,0.9)",
        backgroundColor: "rgba(56,189,248,0.15)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 3.5
      },
      {
        label: "PC RTX 4060 Ti",
        data: [],
        borderColor: "rgba(248,113,113,0.95)",
        backgroundColor: "rgba(248,113,113,0.18)",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        pointRadius: 3.5
      }
    ]
  },
  options: Object.assign({}, commonOptions, {
    scales: {
      x: commonOptions.scales.x,
      y: Object.assign({}, commonOptions.scales.y, {
        title: { display: true, text: "Tokens", color: "#9ca3af", font: { size: 11 } }
      })
    }
  })
});

function updateDashboard(riddleIndex) {
  riddleTitleEl.textContent = riddleDescriptions[riddleIndex];

  const macTk = dataLocal[riddleIndex].map(m => m.mac.tks);
  const pcTk  = dataLocal[riddleIndex].map(m => m.pc.tks);
  const macTok= dataLocal[riddleIndex].map(m => m.mac.tokens);
  const pcTok = dataLocal[riddleIndex].map(m => m.pc.tokens);
  const times = computeTimesLocal(riddleIndex);

  // Charts locales
  mainChart.data.datasets[0].data = macTk;
  mainChart.data.datasets[1].data = pcTk;
  mainChart.update();

  timeChart.data.datasets[0].data = times.mac;
  timeChart.data.datasets[1].data = times.pc;
  timeChart.update();

  tokensChart.data.datasets[0].data = macTok;
  tokensChart.data.datasets[1].data = pcTok;
  tokensChart.update();

  // KPIs
  let maxTk = -1, maxIdx = 0;
  pcTk.forEach((val, idx) => { if (val > maxTk) { maxTk = val; maxIdx = idx; } });
  kpiFastModelEl.textContent = modelos[maxIdx];
  kpiFastValueEl.textContent = maxTk.toFixed(2);

  kpiMacTimeEl.textContent = times.mac[0].toFixed(2);
  kpiMacCorrectEl.textContent = dataLocal[riddleIndex][0].mac.correct ? "Qwen acertó" : "Qwen falló";

  const avgMac = macTk.reduce((a,b)=>a+b,0)/macTk.length;
  const avgPc  = pcTk.reduce((a,b)=>a+b,0)/pcTk.length;
  const gain   = ((avgPc/avgMac-1)*100).toFixed(0);
  kpiSpeedGainEl.textContent = `+${gain}%`;
  kpiSpeedNoteEl.textContent = "PC más rápido en tk/s";

  // Tabla locales
  detailTableBody.innerHTML = "";
  modelos.forEach((name, i) => {
    const mac = dataLocal[riddleIndex][i].mac;
    const pc  = dataLocal[riddleIndex][i].pc;
    const timeMac = (mac.tokens / mac.tks).toFixed(2);
    const timePc  = (pc.tokens / pc.tks).toFixed(2);

    const rowMac = document.createElement("tr");
    rowMac.innerHTML = `
      <td class="model-name">${name}</td>
      <td><span class="badge badge-mac">Mac mini</span></td>
      <td>${mac.tks.toFixed(2)}</td>
      <td>${mac.tokens}</td>
      <td>${timeMac}</td>
      <td>${mac.correct ? "Sí" : "No"}</td>
    `;
    const rowPc = document.createElement("tr");
    rowPc.innerHTML = `
      <td></td>
      <td><span class="badge badge-pc">PC RTX 4060 Ti</span></td>
      <td>${pc.tks.toFixed(2)}</td>
      <td>${pc.tokens}</td>
      <td>${timePc}</td>
      <td>${pc.correct ? "Sí" : "No"}</td>
    `;
    detailTableBody.appendChild(rowMac);
    detailTableBody.appendChild(rowPc);
  });

  // Tabla OpenAI (misma en todos los acertijos)
  openaiTableBody.innerHTML = "";
  const openTimes = computeOpenaiTimes();
  openaiData.forEach((o, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${idx + 1}</td>
      <td>${o.tks.toFixed(2)}</td>
      <td>${o.tokens}</td>
      <td>${openTimes[idx].toFixed(2)}</td>
      <td>${o.correct ? "Sí" : "No"}</td>
    `;
    openaiTableBody.appendChild(row);
  });
}

// Switch de acertijos
const buttons = document.querySelectorAll("#riddle-switch button");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const idx = parseInt(btn.dataset.riddle, 10);
    updateDashboard(idx);
  });
});

updateDashboard(0);
