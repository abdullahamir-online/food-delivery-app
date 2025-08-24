const apiUrl = "http://localhost:5000/api/users/profile";

// Function to get the token from localStorage
function getAuthToken() {
    return localStorage.getItem("token");
}

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
            if(profileData.location){
                return true;
            }else{
                return false;
            }
             
        } else {
            alert("Failed to fetch profile data. Please log in again.");
            return false;
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
}