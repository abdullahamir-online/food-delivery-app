const dietPlans = [
  {
    title: "Gaining Diet Plan",
    description: "High-calorie meals to increase muscle mass in a healthy way.",
    features: ["High Protein", "Calorie Dense", "Healthy Fats"],
    category: "Gain",
  },
  {
    title: "Weight Loss Diet Plan",
    description: "Low-calorie meals to help you lose weight while staying full longer.",
    features: ["Low Calorie", "High in Fiber", "Balanced Macronutrients"],
    category: "Loss",
  },
  {
    title: "Maintaining Diet Plan",
    description: "Balanced meals to maintain your current weight and stay healthy.",
    features: ["Balanced Meals", "Moderate Calories", "All-in-one Nutrition"],
    category: "Moderate",
  },
];


 

const grid = document.querySelector(".grid");

dietPlans.forEach((plan) => {
  const card = document.createElement("div");
  card.classList.add("box");
  card.innerHTML = `
    <h3>${plan.title}</h3>
    <p>${plan.description}</p>
    <ul>
      ${plan.features.map((feature) => `<li>${feature}</li>`).join("")}
    </ul>
    <button class="btn" onclick="fetchRestaurants('${plan.category}')">View Restaurants</button>
  `;
  grid.appendChild(card);
});

function getAuthToken() {
  return localStorage.getItem("token");
}

async function fetchRestaurants(category) {
  console.log('fetchCalled');
  try {
    const response = await fetch("http://localhost:5000/api/restaurants/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAuthToken()}`,
        "Category": category,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch restaurants");

    const restaurants = await response.json();
    console.log(restaurants);
    localStorage.setItem("restaurantsData", JSON.stringify(restaurants)); // Save data temporarily
    window.location.href = "showRestaurants.html";
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
}
