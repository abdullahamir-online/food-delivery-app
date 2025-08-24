 

document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
        //alert('Unauthorized access! Please log in.');
        window.location.href = 'login.html';
        return;
    }
    
    

    // Decode the token
    const decoded = jwt_decode(token);

    console.log('User data:', decoded);

    // Extract username from email
    const email = decoded.email;
    const username = email.split('@')[0];
    const message = `Welcome, ${username.toUpperCase()}\nYou are Logged In with Email: ${decoded.email}`;
    //alert(message);
     

    try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        const profile = await response.json();
        console.log(profile);
        // Populate the profile fields
        document.querySelector('#user-name').textContent = `${profile.first_name} ${profile.last_name}`;
        document.querySelector('#user-email').textContent = profile.email;
        document.getElementById('user-info-ribbon').style.display = "block";
        //document.querySelector('.profile-phone').textContent = profile.phone || 'N/A';
        // document.querySelector('.profile-bio').textContent = profile.bio || 'No bio available.';
        // document.querySelector('.profile-profession').textContent = profile.profession || 'Not specified';
        // document.querySelector('.profile-experience').textContent = profile.experience || 'No experience provided';
        // document.querySelector('.profile-education').textContent = profile.education || 'No education details';
        // document.querySelector('.profile-skills').textContent = profile.skills || 'No skills added';
        // document.querySelector('.profile-picture').src = convertToDirectLink(profile.profile_picture) || 'https://via.placeholder.com/150';
    } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to load profile. Please try again.');
    }
 
        
    ////


    let profileBtnn = document.querySelector("#profile-btn");
    profileBtnn.addEventListener('click' , ()=>{
        window.location.href = 'viewProfile.html';
    });
    


   
});




 
 

    
