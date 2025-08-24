document.addEventListener("DOMContentLoaded", () => {
  const restaurantsList = document.querySelector(".container");
  const restaurantsData = JSON.parse(localStorage.getItem("restaurantsData"));
  console.log(restaurantsData);

  if (restaurantsData && restaurantsData.length > 0) {
    restaurantsData.forEach((restaurant) => {
      const card = document.createElement("div");
      card.classList.add("restaurant-card");
      card.innerHTML = `
        <h3><strong>Name:</strong>${restaurant.Name}</h3>
        <p><strong>Email:</strong>${restaurant.Email}</p>
        <p><strong>Contact:</strong>${restaurant.ContactNumber}</p>
        <p><strong>Diet Followed:</strong>${restaurant.DietFollowed || "Not specified"}</p>
        <p><strong>Location:</strong> ${restaurant.Address}</p>
      `;
      restaurantsList.appendChild(card);
    });
  } else {
    restaurantsList.innerHTML = "<p>No restaurants found for this category.</p>";
  }
});
