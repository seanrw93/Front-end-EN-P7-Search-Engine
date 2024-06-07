import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/main.scss';

import { recipes } from '../data/recipes.js';
import { Recipes } from './recipe-card.js';

console.log('Hello World from Webpacker')

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

async function displayCard(card) {
    const recipeRow = document.querySelector("#recipe-row");
    recipeRow.innerHTML = ''; 

    card.forEach(item => {
        const cardFactory = new Recipes(item);
        const cardDOM = cardFactory.renderCard(); // Append mediaDOM to the container
        recipeRow.insertAdjacentHTML("afterbegin", cardDOM); // Append container to the media section
    });
}

async function init() {
    const card = await getRecipes();
    displayCard(card);
};

init();