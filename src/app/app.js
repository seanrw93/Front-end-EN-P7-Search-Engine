import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/main.scss';

import { recipes } from '../data/recipes.js';
import { Recipes } from './recipe-card.js';

async function getRecipes(id) {
    try {
        const data = { recipes };
        if (id) {
            const card = data.recipes.filter((card) => card.id === id);
            if (!card) {
                throw new Error("Card not found");
            }
            return card;
        } else {
            return data.recipes;
        }
    } catch (e) {
        console.log("Failed to fetch card data: ", e);
        return null;
    }
}

function displayCard(card) {
    const recipeRow = document.querySelector("#recipe-row");
    recipeRow.innerHTML = ''; 

    card.forEach(item => {
        const cardFactory = new Recipes(item);
        const cardDOM = cardFactory.renderCard();
        recipeRow.insertAdjacentHTML("beforeend", cardDOM);
    });
}

const searchInput = document.querySelector("#search-recipe");

function searchRecipes() {
    const searchValue = searchInput.value.toLowerCase();
    if (searchValue.length >= 3) {
        const filteredCards = recipes.filter((card) => {
            // Split the name into words and check if any word starts with the search value
            const nameWords = card.name.toLowerCase().split(" ");
            const nameMatch = nameWords.some(word => word.startsWith(searchValue));

            // Split the ingredients into words and check if any word starts with the search value
            const ingredientMatch = card.ingredients.some(ingredient => {
                const ingredientWords = ingredient.ingredient.toLowerCase().split(" ");
                return ingredientWords.some(word => word.startsWith(searchValue));
            });

            return nameMatch || ingredientMatch;
        });
        displayCard(filteredCards);
    } else {
        displayCard(recipes);
    }
}


async function init() {
    const cards = await getRecipes();
    displayCard(cards);

    searchInput.addEventListener("input", searchRecipes);
};

init();