const apiKey = "1c8be5cd248d477db2b5bbe7392d43ea";

// 🥘 Step 1: Search recipes
async function fetchRecipes(query) {
const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&apiKey=${apiKey}`;
const res = await fetch(searchUrl);
const data = await res.json();
return data.results || [];
}

// 📋 Step 2: Fetch recipe details (ingredients, time, source)
async function fetchRecipeDetails(id) {
const detailUrl = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`;
const res = await fetch(detailUrl);
const data = await res.json();
return data;
}

// 🎯 Step 3: Display full recipes
async function searchAndDisplayRecipes() {
const query = document.getElementById("searchInput").value.trim();
const container = document.getElementById("recipeCards");
if (!query) return;

container.innerHTML = "<p>Loading recipes...</p>";

const recipes = await fetchRecipes(query);
if (recipes.length === 0) {
container.innerHTML = "<p>No recipes found. Try something else!</p>";
return;
}

container.innerHTML = "";

for (const recipe of recipes) {
const details = await fetchRecipeDetails(recipe.id);
const ingredientsList = details.extendedIngredients
.slice(0, 5)
.map(ing => `<li>${ing.original}</li>`)
.join("");

container.innerHTML += `
<div class="card">
<img src="${details.image}" alt="${details.title}" />
<h3>${details.title}</h3>
<p><strong>Ready in:</strong> ${details.readyInMinutes} mins</p>
<p><strong>Ingredients:</strong></p>
<ul>${ingredientsList}</ul>
<a href="${details.sourceUrl}" target="_blank">View Full Recipe</a>
</div>
`;
}
}

// 🌙 Toggle dark theme
function toggleTheme() {
document.body.classList.toggle("dark");
}

document.addEventListener("DOMContentLoaded", () => {
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
document.body.classList.toggle("dark");
const isDark = document.body.classList.contains("dark");
toggleBtn.textContent = isDark ? "🌞" : "🌙";
});
});


// 💌 Contact form handler
function setupFormHandler() {
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
e.preventDefault();
alert("Thank you for your message! I'll get back to you soon. 😊");
form.reset();
});
}

const discoverRecipes = [
{
title: "Chocolate Pancakes",
image: "pancakes.jpg"
},
{
title: "Fruit Smoothie Bowl",
image: "bowl.jpg"
},
{
title: "Mango Lassi",
image: "mango_lassi.jpg"
},
{
title: "Schezwan Noodles",
image: "noodles.jpg"
},
{
title: "Chole Bhature",
image: "chole bhature.jpg"
}
];


const slider = document.getElementById("recipeSlider");
discoverRecipes.forEach(recipe => {
const card = document.createElement("div");
card.className = "recipe-card";
card.innerHTML = `
<img src="${recipe.image}" alt="${recipe.title}">
<h3>${recipe.title}</h3>
`;
slider.appendChild(card);
});

function slideLeft() {
document.getElementById("recipeSlider").scrollBy({
left: -300,
behavior: 'smooth'
});
}

function slideRight() {
document.getElementById("recipeSlider").scrollBy({
left: 300,
behavior: 'smooth'
});
}
// script.js
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  