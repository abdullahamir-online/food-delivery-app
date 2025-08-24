// Function to display the alert box
function showAlert(message) {
    const alertBox = document.getElementById('alert-box');
    const alertMessage = document.getElementById('alert-message');

    alertMessage.textContent = message; // Set the alert message
    alertBox.classList.remove('hidden'); // Show the alert box
}

// Close alert box
document.getElementById('close-alert').addEventListener('click', () => {
    const alertBox = document.getElementById('alert-box');
    alertBox.classList.add('hidden'); // Hide the alert box
});
