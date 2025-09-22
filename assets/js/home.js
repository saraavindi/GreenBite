// --- Hamburger Menu ---
let hamburgerButton = document.getElementById("hamburger");
let navigationMenu = document.getElementById("navMenu");

function toggleMenu() {
  navigationMenu.classList.toggle("open");
}

hamburgerButton.addEventListener("click", toggleMenu);


// --- Rotating Slogans ---
let slogans = [
  "Healthy Living Starts Here",
  "Fuel Your Body, Mind, and Soul",
  "Eat Clean. Train Hard. Stay Mindful.",
  "Small Steps, Big Changes",
  "Your Wellness Journey with GreenBite"
];

let sloganIndex = 0;
let sloganText = document.getElementById("slogan");

function changeSlogan() {
  sloganIndex = (sloganIndex + 1) % slogans.length;
  sloganText.textContent = slogans[sloganIndex];
}

setInterval(changeSlogan, 3000);


// --- Tip of the Day ---
let tips = [
  "Drink at least 8 glasses of water daily.",
  "Take a 10-minute walk after meals to improve digestion.",
  "Replace sugary drinks with herbal teas.",
  "Stretch for 5 minutes every morning.",
  "Practice mindful eating – chew slowly and enjoy your food."
];

let todayDate = new Date().getDate();
let dailyTipText = tips[todayDate % tips.length];
let dailyTipElement = document.getElementById("dailyTip");

dailyTipElement.textContent = dailyTipText;


// --- Newsletter Form ---
let newsletterForm = document.getElementById("newsletterForm");
let emailBox = document.getElementById("newsletterEmail");
let messageBox = document.getElementById("newsletterMsg");

function handleNewsletterSubmit(event) {
  event.preventDefault();

  let emailText = emailBox.value.trim();

  if (emailText === "" || emailText.indexOf("@") === -1) {
    messageBox.textContent = "Please enter a valid email.";
    messageBox.style.color = "red";
  } else {
    localStorage.setItem("newsletterEmail", emailText);
    messageBox.textContent = "Thank you for subscribing!";
    messageBox.style.color = "green";
    emailBox.value = "";
  }
}

newsletterForm.addEventListener("submit", handleNewsletterSubmit);



