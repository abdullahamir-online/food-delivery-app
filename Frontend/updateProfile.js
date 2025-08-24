const apiUrl = "http://localhost:5000/api/users/profile";

// Function to get the token from localStorage
function getAuthToken() {
    return localStorage.getItem("token");
}

// Fetch prefilled profile data
async function fetchProfileData() {
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
            populateProfileForm(profileData);
        } else {
            alert("Failed to fetch profile data. Please log in again.");
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
}







// Populate the form with fetched profile data
function populateProfileForm(data) {
    document.getElementById("first_name").value = data.first_name;
    document.getElementById("last_name").value = data.last_name;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;
    document.getElementById("location").value = data.location || "Not Provided Yet!";


    const dobInput = document.getElementById("dob");
    if (data.dob) {
        const date = new Date(data.dob); // Convert to Date object
        const formattedDate = date.toISOString().split("T")[0]; // Get YYYY-MM-DD
        dobInput.value = formattedDate;
    }
 

    document.getElementById("dob").value = dobInput.value;
}


// Update profile data
async function updateProfileData(event) {
    event.preventDefault();

    const updatedData = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        dob: document.getElementById("dob").value,
    };

    try {
        const token = getAuthToken();
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert("Profile updated successfully!");
        } else {
            alert("Failed to update profile. Please try again.");
        }
    } catch (error) {
        console.error("Error updating profile data:", error);
    }
}

// Add event listener to the form
document.getElementById("updateProfileForm").addEventListener("submit", updateProfileData);

// Fetch data on page load
fetchProfileData();
