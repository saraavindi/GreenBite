// --- DOM Elements ---
let bodySelect = document.getElementById("body-select");
let equipSelect = document.getElementById("equip-select");
let planOutput = document.querySelector(".plan-output");

// --- Map body part display names ---
let bodyNames = {
  full: "Full Body",
  upper: "Upper Body",
  lower: "Lower Body",
  core: "Core",
  arms: "Arms",
  legs: "Legs"
};

// --- Equipment options ---
let equipmentOptions = ["Bodyweight", "Dumbbells", "Kettlebell", "Resistance Bands"];

// --- Load exercises from workout.json ---
let exercises = {};

fetch("workout.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    exercises = data;
  })
  .catch(function(error) {
    console.log("Error loading JSON:", error);
  });

// --- Populate Equipment Dropdown ---
function populateEquipment() {
  equipSelect.innerHTML = '<option value="" disabled selected>Select Equipment</option>';
  equipmentOptions.forEach(function(equip) {
    let option = document.createElement("option");
    option.value = equip;
    option.textContent = equip;
    equipSelect.appendChild(option);
  });
  equipSelect.disabled = false;
}

// --- Clear previous plan ---
function clearPlan() {
  planOutput.innerHTML = "";
}

// --- Generate Workout Plan ---
function generateWorkout() {
  let body = bodySelect.value;
  let equip = equipSelect.value;

  if (!body || !equip || !exercises[body]) return;

  planOutput.style.display = "flex";
  clearPlan();

  let displayBody = bodyNames[body] || body;
  let title = document.createElement("h3");
  title.className = "playfair-title center";
  title.textContent = "Your Workout Plan for " + displayBody + " using " + equip;
  planOutput.appendChild(title);

  let exercisesList = exercises[body][equip];
  exercisesList.forEach(function(ex) {
    let card = document.createElement("div");
    card.className = "exercise";
    card.innerHTML = "<span>" + ex.name + "</span><span>" + ex.reps + "</span>";
    planOutput.appendChild(card);
  });
}

// Event Listeners 
bodySelect.addEventListener("change", function() {
  populateEquipment();
  clearPlan();
});

equipSelect.addEventListener("change", generateWorkout);

//imer functionality
let timerInput = document.getElementById("timer-minutes");
let timerDisplay = document.getElementById("timer-display");
let startBtn = document.getElementById("start-timer");
let pauseBtn = document.getElementById("pause-timer");
let resetBtn = document.getElementById("reset-timer");

let timer = null;
let timeLeft = timerInput.value * 60;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
}

startBtn.addEventListener("click", function() {
  clearInterval(timer);
  timeLeft = timerInput.value * 60;
  timer = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timer);
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
});

pauseBtn.addEventListener("click", function() {
  clearInterval(timer);
});

resetBtn.addEventListener("click", function() {
  clearInterval(timer);
  timeLeft = timerInput.value * 60;
  updateDisplay();
});

updateDisplay();

// Music 
let musicImg = document.getElementById("music-img");
let musicAudio = document.getElementById("workout-music");

musicImg.addEventListener("click", function() {
  if (musicAudio.paused) {
    musicAudio.play();
  } else {
    musicAudio.pause();
  }
});

//Hamburger Menu 
let hamburger = document.getElementById("hamburger");
let navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", function() {
  navMenu.classList.toggle("open");
});
