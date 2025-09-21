// until page being loaded
window.onload = function() {
  
  // Get the form element
  let form = document.getElementById("contactForm");

  // When the form is submitted
  form.onsubmit = function(e) {
    e.preventDefault(); // stop the page from reloading

    // Get input values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    // Check if all fields are filled
    if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Simple email validation
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Success message
    alert("Thank you, " + name + "! Your message has been sent.");

    // Clear the form
    form.reset();
  };
};
// --- Hamburger Menu ---
let hamburgerButton = document.getElementById("hamburger");
let navigationMenu = document.getElementById("navMenu");

function toggleMenu() {
  navigationMenu.classList.toggle("open");
}

hamburgerButton.addEventListener("click", toggleMenu);