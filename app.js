const API_KEY = '174ac491cc824c5ab1a98ddedfccb2f3'; // Remplacez par votre clé API Spoonacular
const BASE_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

async function getRecipes() {
    const ingredients = document.getElementById('ingredients').value;
    const recipesContainer = document.getElementById('recipes');
    
    // Effacer les résultats précédents
    recipesContainer.innerHTML = '<div class="loading">Recherche en cours...</div>';

    try {
        const response = await fetch(
            `${BASE_URL}?apiKey=${API_KEY}&ingredients=${ingredients}&number=6`
        );
        const recipes = await response.json();

        // Afficher les recettes
        recipesContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = `
                <div class="recipe-card">
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <p>Ingrédients utilisés : ${recipe.usedIngredients.map(ing => ing.name).join(', ')}</p>
                    <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">Voir la recette</a>
                </div>
            `;
            recipesContainer.innerHTML += recipeCard;
        });
    } catch (error) {
        recipesContainer.innerHTML = '<div class="error">Erreur : Aucune recette trouvée</div>';
    }
}