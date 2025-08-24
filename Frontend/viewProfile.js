const apiUrl = "http://localhost:5000/api/users/profile";

// Function to get the token from localStorage
function getAuthToken() {
    return localStorage.getItem("token");
}

// Fetch and display profile data
async function fetchAndDisplayProfileData() {
    try {
        const token = getAuthToken();
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const profileData = await response.json();
            displayProfileData(profileData);
        } else {
            alert("Failed to fetch profile data. Please log in again.");
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
}

// Display profile data on the page
function displayProfileData(data) {
    const profileDetails = document.getElementById("profileDetails");
    profileDetails.innerHTML = `
        <p><strong>First Name:</strong> ${data.first_name}</p>
        <p><strong>Last Name:</strong> ${data.last_name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Location:</strong> ${data.location || "Not Provided Yet!"}  </p>
        <p><strong>Date of Birth:</strong> ${data.dob}</p>
        <button id="editProfileBtn">Edit Profile</button>
    `;

    // Add event listener to the "Edit Profile" button
    document.getElementById("editProfileBtn").addEventListener("click", () => {
        window.location.href = "updateProfile.html";
    });
}

// Fetch data on page load
fetchAndDisplayProfileData();
