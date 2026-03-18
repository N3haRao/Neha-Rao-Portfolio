const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Dark mode toggle with localStorage persistence
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

// Load saved theme preference — default to dark if none saved
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "light") {
    toggleSwitch.checked = true;
  }
} else {
  // Default: dark mode
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
}

// Set footer copyright year
let myDate = document.querySelector("#datee");
if (myDate) {
  const yes = new Date().getFullYear();
  myDate.innerHTML = yes;
}

// Copy citation to clipboard function
function copyCitation(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = 'Copied! <i class="fas fa-check"></i>';
    buttonElement.style.backgroundColor = '#28a745';
    buttonElement.style.borderColor = '#28a745';
    buttonElement.style.color = '#ffffff';
    
    setTimeout(() => {
      buttonElement.innerHTML = originalText;
      buttonElement.style.backgroundColor = '';
      buttonElement.style.borderColor = '';
      buttonElement.style.color = '';
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

// Experience details accordion toggle
function toggleDetails(button) {
  // Toggle active class on the button (for the rotation animation)
  button.classList.toggle('active');
  
  // Find the exact details container for this card
  // It's the sibling div inside the project-bio container
  const details = button.closest('.project-bio').querySelector('.experience-details');
  
  // Toggle the active class on the details container (for the max-height/opacity animation)
  if (details) {
    details.classList.toggle('active');
  }
}
