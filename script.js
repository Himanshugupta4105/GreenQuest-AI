/*
  GREENQUEST AI
  Frontend-only application.
  Files required: index.html, style.css, script.js

  Ollama:
  - Default URL: http://localhost:11434/api/generate
  - Default model: llama3.2
  Change OLLAMA_MODEL below if you use another model.
*/

const OLLAMA_URL = "http://localhost:11434/api/generate";
const OLLAMA_MODEL = "llama3.2";

const state = {
  time: "15 minutes",
  mood: "Relaxing",
  place: "Park",
  currentQuest: null
};

const $ = (selector) => document.querySelector(selector);

function setupChoiceGroup(id, stateKey) {
  document.querySelectorAll(`#${id} .choice`).forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(`#${id} .choice`)
        .forEach(item => item.classList.remove("active"));

      button.classList.add("active");
      state[stateKey] = button.dataset.value;
    });
  });
}

setupChoiceGroup("timeChoices", "time");
setupChoiceGroup("moodChoices", "mood");
setupChoiceGroup("placeChoices", "place");

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    element.classList.remove("show");
  }, 3000);
}

function setStatus(message, warning = false) {
  $("#status").innerHTML = `<i></i> ${message}`;
  $("#status").style.color = warning ? "#c9b675" : "";
}

function createPrompt() {
  return `
You are GreenQuest AI, an outdoor quest designer.

Your purpose is to get people OFF their screens and into the real world.

Create one safe, fun, realistic outdoor quest using:
Time available: ${state.time}
Mood: ${state.mood}
Place: ${state.place}

Return ONLY valid JSON in exactly this format:
{
  "title": "short creative title",
  "intro": "one short encouraging sentence",
  "tasks": [
    "short task 1",
    "short task 2",
    "short task 3",
    "short task 4",
    "short task 5"
  ],
  "tip": "one short safety or nature-respect tip"
}

Rules:
- Exactly 5 tasks.
- Tasks must be possible in the chosen time.
- No paid equipment.
- No dangerous activities.
- Do not disturb animals or damage plants.
- Keep tasks short and practical.
- Do not mention AI, phones, apps, websites or technology in the quest.
- JSON only.
`;
}

async function generateWithOllama() {
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: createPrompt(),
      stream: false,
      format: "json",
      options: {
        temperature: 0.8
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}`);
  }

  const data = await response.json();

  if (!data.response) {
    throw new Error("No response from Ollama");
  }

  const quest = JSON.parse(data.response);

  if (
    typeof quest.title !== "string" ||
    typeof quest.intro !== "string" ||
    !Array.isArray(quest.tasks) ||
    quest.tasks.length < 5 ||
    typeof quest.tip !== "string"
  ) {
    throw new Error("Ollama returned invalid quest data");
  }

  return {
    title: quest.title,
    intro: quest.intro,
    tasks: quest.tasks.slice(0, 5),
    tip: quest.tip
  };
}

/*
  Offline fallback.
  This means the project remains usable even when Ollama is not running.
*/
const fallbackQuests = [
  {
    title: "Five Senses Walk",
    intro: "Slow down and discover details you normally walk past.",
    tasks: [
      "Walk slowly for five minutes and notice three different shades of green.",
      "Pause and identify three different sounds around you.",
      "Find one interesting natural texture without picking or damaging anything.",
      "Look at the sky and notice its shapes, colors, or movement.",
      "Sit quietly for two minutes and notice how the place feels."
    ],
    tip: "Stay on safe paths and leave plants, animals, and natural objects where you find them."
  },
  {
    title: "Tiny Nature Detective",
    intro: "Turn an ordinary outdoor space into a small discovery mission.",
    tasks: [
      "Find a small natural detail you have never noticed before.",
      "Spot two different kinds of leaves, plants, or trees.",
      "Find a place where sunlight and shade meet.",
      "Listen for one sound you had not noticed before.",
      "Choose your favorite discovery and remember why it stood out."
    ],
    tip: "Observe wildlife from a respectful distance and never feed or disturb it."
  },
  {
    title: "Neighborhood Explorer",
    intro: "Make a familiar route feel completely new.",
    tasks: [
      "Walk a safe route you do not usually take.",
      "Notice three interesting trees, buildings, or public spaces.",
      "Find one place where people and nature share the same space.",
      "Stop somewhere safe and take ten slow breaths.",
      "Return by another safe route and name one thing you discovered."
    ],
    tip: "Use safe public areas and follow pedestrian and traffic rules."
  },
  {
    title: "Green Treasure Hunt",
    intro: "Find small pieces of nature without taking anything home.",
    tasks: [
      "Find three different shades of green.",
      "Find something smooth and something rough.",
      "Spot a natural object smaller than your hand.",
      "Listen for the quietest sound you can hear.",
      "Find a peaceful place and spend two minutes observing it."
    ],
    tip: "Look without picking, breaking, or moving natural objects."
  }
];

function getFallbackQuest() {
  const selected =
    fallbackQuests[Math.floor(Math.random() * fallbackQuests.length)];

  return { ...selected };
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderQuest(quest, isAI) {
  state.currentQuest = quest;

  const tasks = quest.tasks.slice(0, 5).map((task, index) => `
    <label class="mission">
      <input type="checkbox" data-task="${index}">
      <span>${escapeHTML(task)}</span>
    </label>
  `).join("");

  $("#result").innerHTML = `
    <div class="generated">
      <div class="quest-heading">
        <div>
          <div class="eyebrow">YOUR OUTDOOR QUEST</div>
          <h3>${escapeHTML(quest.title)}</h3>
        </div>
        <span class="badge">${isAI ? "● LOCAL AI" : "● OFFLINE MODE"}</span>
      </div>

      <p class="intro">${escapeHTML(quest.intro)}</p>

      <div class="missions">
        ${tasks}
      </div>

      <div class="quest-bottom">
        <span class="duration">⏱ ${escapeHTML(state.time)}</span>
        <button class="complete" id="completeBtn" disabled>
          Complete quest
        </button>
      </div>

      <p class="tip">🌿 ${escapeHTML(quest.tip)}</p>
    </div>
  `;

  document.querySelectorAll("[data-task]").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      checkbox.closest(".mission")
        .classList.toggle("done", checkbox.checked);

      const allComplete = [...document.querySelectorAll("[data-task]")]
        .every(item => item.checked);

      $("#completeBtn").disabled = !allComplete;
    });
  });

  $("#completeBtn").addEventListener("click", completeQuest);
}

async function generateQuest() {
  const button = $("#generateBtn");

  button.disabled = true;
  button.innerHTML = "<span>⏳</span> Creating your quest...";

  try {
    setStatus("Connecting to Ollama...");
    const quest = await generateWithOllama();

    setStatus("Ollama · Local AI");
    renderQuest(quest, true);

    toast("Local AI created your quest. Now go outside 🌿");
  } catch (error) {
    console.warn("Ollama unavailable:", error);

    setStatus("Offline fallback", true);

    const quest = getFallbackQuest();
    renderQuest(quest, false);

    toast("Ollama wasn't detected — offline mode is active.");
  } finally {
    button.disabled = false;
    button.innerHTML = "<span>✨</span> Generate my quest";
  }
}

function parseMinutes(value) {
  if (value.includes("15")) return 15;
  if (value.includes("30")) return 30;
  if (value.includes("1 hour")) return 60;
  if (value.includes("2 hours")) return 120;
  return 15;
}

function readStats() {
  try {
    return JSON.parse(
      localStorage.getItem("greenquestStats") ||
      '{"completed":0,"minutes":0,"streak":0,"lastDate":""}'
    );
  } catch {
    return { completed: 0, minutes: 0, streak: 0, lastDate: "" };
  }
}

function writeStats(stats) {
  localStorage.setItem("greenquestStats", JSON.stringify(stats));
}

function updateStats() {
  const stats = readStats();

  $("#completed").textContent = stats.completed;
  $("#minutes").textContent = stats.minutes;
  $("#streak").textContent = stats.streak;
}

function completeQuest() {
  const stats = readStats();
  const today = new Date().toISOString().slice(0, 10);

  if (stats.lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayKey = yesterday.toISOString().slice(0, 10);

    stats.streak =
      stats.lastDate === yesterdayKey
        ? stats.streak + 1
        : 1;
  }

  stats.completed += 1;
  stats.minutes += parseMinutes(state.time);
  stats.lastDate = today;

  writeStats(stats);
  updateStats();

  $("#completeBtn").disabled = true;
  $("#completeBtn").textContent = "✓ Quest completed";

  toast("Quest complete! You touched grass 🌱");
}

function randomizePreferences() {
  const groups = [
    {
      id: "timeChoices",
      key: "time",
      values: ["15 minutes", "30 minutes", "1 hour", "2 hours"]
    },
    {
      id: "moodChoices",
      key: "mood",
      values: ["Relaxing", "Adventurous", "Energetic", "Curious"]
    },
    {
      id: "placeChoices",
      key: "place",
      values: ["Park", "Garden", "Neighborhood", "Any safe outdoor place"]
    }
  ];

  groups.forEach(group => {
    const value =
      group.values[Math.floor(Math.random() * group.values.length)];

    state[group.key] = value;

    document.querySelectorAll(`#${group.id} .choice`).forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.value === value
      );
    });
  });
}

$("#generateBtn").addEventListener("click", generateQuest);

$("#surpriseBtn").addEventListener("click", () => {
  randomizePreferences();
  document.querySelector("#create").scrollIntoView({ behavior: "smooth" });
  setTimeout(generateQuest, 450);
});

updateStats();
