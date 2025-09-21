// form and result elements
let form = document.getElementById("calc-form");
let results = document.getElementById("results");


// Result display elements
let bmrEl = document.getElementById("bmr");
let tdeeEl = document.getElementById("tdee");
let carbG = document.getElementById("carb-g");
let proteinG = document.getElementById("protein-g");
let fatG = document.getElementById("fat-g");

let carbBar = document.getElementById("carb-bar");
let proteinBar = document.getElementById("protein-bar");
let fatBar = document.getElementById("fat-bar");

//  calculate BMR
function calcBMR(gender, weight, height, age) {
  
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// format numbers
function format(num) {
  return Math.round(num).toLocaleString();
}

// Checking if exists 
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page from refreshing

    // Getting input values
    let age = parseInt(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;
    let height = parseInt(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let activity = parseFloat(document.getElementById("activity").value);

    // checking if the values are fixed
    if (!age || !height || !weight) {
      alert("Please fill all fields");
      return;
    }

    // Calculate BMR and TDEE
    let bmr = calcBMR(gender, weight, height, age);
    let tdee = bmr * activity;

    // Macronutrient calculation
    let carbs = (tdee * 0.50) / 4;   // 50% of calories, 4 kcal per gram
    let protein = (tdee * 0.20) / 4; // 20% of calories
    let fat = (tdee * 0.30) / 9;     // 30% of calories, 9 kcal per gram

    // Show the results
    bmrEl.textContent = format(bmr) + " kcal";
    tdeeEl.textContent = format(tdee) + " kcal";
    carbG.textContent = format(carbs) + " g";
    proteinG.textContent = format(protein) + " g";
    fatG.textContent = format(fat) + " g";

    // Progress bars
    carbBar.style.width = "50%";
    proteinBar.style.width = "20%";
    fatBar.style.width = "30%";

    // Show results section
    results.classList.remove("hidden");
  });
}
// --- Hamburger Menu ---
let hamburgerButton = document.getElementById("hamburger");
let navigationMenu = document.getElementById("navMenu");

function toggleMenu() {
  navigationMenu.classList.toggle("open");
}

hamburgerButton.addEventListener("click", toggleMenu);
