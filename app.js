const API_KEY = '174ac491cc824c5ab1a98ddedfccb2f3';
const BASE_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

async function getRecipes() {
    const ingredients = document.getElementById('ingredients').value;
    const recipesContainer = document.getElementById('recipes');
    
    recipesContainer.innerHTML = '<div class="loading">Searching...</div>';

    try {
        const response = await fetch(
            `${BASE_URL}?apiKey=${API_KEY}&ingredients=${ingredients}&number=6`
        );
        const recipes = await response.json();

        if (recipes.length === 0) {
            recipesContainer.innerHTML = '<div class="error">No recipes found for these ingredients.</div>';
            return;
        }

        recipesContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = `
                <div class="recipe-card">
                    <img src="${recipe.image}" alt="Photo of the recipes ${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>Ingredients used : ${recipe.usedIngredients.map(ing => ing.name).join(', ')}</p>
                    <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">The recipes</a>
                </div>
            `;
            recipesContainer.innerHTML += recipeCard;
        });
    } catch (error) {
        console.error(error);
        recipesContainer.innerHTML = '<div class="error">Error : Unable to retrieve recipes. Please try again later.</div>';
    }
}
