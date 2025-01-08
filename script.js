//your JS code here. If required.
// Function to get a cookie by its name
function getCookie(name) {
  const decodedCookies = decodeURIComponent(document.cookie);
  const cookies = decodedCookies.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return '';
}

// Function to set a cookie with the provided name, value, and expiration date
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // Set expiration in days
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Apply user preferences from cookies
function applyPreferences() {
  const savedFontSize = getCookie('fontsize');
  const savedFontColor = getCookie('fontcolor');
  
  if (savedFontSize) {
    document.documentElement.style.setProperty('--fontsize', savedFontSize + 'px');
    document.getElementById('fontsize').value = savedFontSize;  // Update form field
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty('--fontcolor', savedFontColor);
    document.getElementById('fontcolor').value = savedFontColor;  // Update form field
  }
}

// Event listener for the form submission
document.getElementById('preferences-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent form from submitting normally
  
  const fontSize = document.getElementById('fontsize').value;
  const fontColor = document.getElementById('fontcolor').value;

  // Save the preferences in cookies
  setCookie('fontsize', fontSize, 30);  // Save for 30 days
  setCookie('fontcolor', fontColor, 30);  // Save for 30 days
  
  // Apply preferences immediately
  applyPreferences();
});

// Apply preferences when the page loads
window.onload = applyPreferences;
