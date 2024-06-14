import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/main.scss';

import { recipes } from '../data/recipes.js';
import { Recipes } from './recipe-card.js';
import { Dropdown } from './dropdown-menu.js';

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


//Dropdown menus

function extractDropdownItems(recipes, key) {
    const itemsSet = new Set();

    recipes.forEach(recipe => {
        if (key === 'ingredients') {
            recipe.ingredients.forEach(ingredient => itemsSet.add(ingredient.ingredient));
        } else if (key === 'appliance') {
            itemsSet.add(recipe.appliance);
        } else if (key === 'utensils') {
            recipe.utensils.forEach(utensil => itemsSet.add(utensil));
        }
    });

    return Array.from(itemsSet);
}

const uniqueIngredients = extractDropdownItems(recipes, 'ingredients');
const uniqueAppliances = extractDropdownItems(recipes, 'appliance');
const uniqueUtensils = extractDropdownItems(recipes, 'ustensils');

const ingredientsDropdown = new Dropdown('ingredients', uniqueIngredients, 'primary');
const appliancesDropdown = new Dropdown('Devices', uniqueAppliances, 'success');
const utensilsDropdown = new Dropdown('utensils', uniqueUtensils, 'danger');

function renderDropdowns() {
    const dropdownsContainer = document.querySelector("#dropdowns");
    dropdownsContainer.insertAdjacentHTML("beforeend", ingredientsDropdown.renderDropdown());
    dropdownsContainer.insertAdjacentHTML("beforeend", appliancesDropdown.renderDropdown());
    dropdownsContainer.insertAdjacentHTML("beforeend", utensilsDropdown.renderDropdown());
}

//End Dropdown menus

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

function test() {
        //TEST
        const dropDownItems = document.querySelectorAll(".dropdown-item");
        const tagsArray = [];
    
        dropDownItems.forEach((item) => {
            item.addEventListener("click", (e) => {
                const tagText = e.target.textContent;
                tagsArray.push(tagText);
            });
        });
    
        console.log(tagsArray);
        //END TEST
}


async function init() {
    const cards = await getRecipes();
    renderDropdowns();
    displayCard(cards);

    searchInput.addEventListener("input", searchRecipes);
    test();

};

init();