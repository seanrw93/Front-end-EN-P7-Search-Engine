import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/main.scss';

import { recipes } from '../data/recipes.js';

import { RecipeCard } from './factories/recipe-card.js';
import { Dropdown } from './factories/dropdown-menu.js';
import { Tag } from './factories/tags.js';

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
            recipe.ingredients.forEach(ingredient => itemsSet.add(ingredient.ingredient.toLowerCase()));
        } else if (key === 'appliance') {
            itemsSet.add(recipe.appliance.toLowerCase());
        } else if (key === 'utensils') {
            recipe.utensils.forEach(utensil => itemsSet.add(utensil.toLowerCase()));
        }
    });

    const uniqueItemsArray = Array.from(itemsSet);

    return uniqueItemsArray.map(item => item.charAt(0).toUpperCase() + item.slice(1));
}

const uniqueIngredients = extractDropdownItems(recipes, 'ingredients');
const uniqueAppliances = extractDropdownItems(recipes, 'appliance');
const uniqueUtensils = extractDropdownItems(recipes, 'utensils');

const ingredientsDropdown = new Dropdown('ingredients', uniqueIngredients, 'primary');
const appliancesDropdown = new Dropdown('devices', uniqueAppliances, 'success');
const utensilsDropdown = new Dropdown('utensils', uniqueUtensils, 'danger');

function displayDropdowns() {
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
        const cardFactory = new RecipeCard(item);
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

function displayTags() {
        const dropDownItems = document.querySelectorAll(".dropdown-item");
        const tagsArray = [];
    
        dropDownItems.forEach((item) => {
            item.addEventListener("click", (e) => {
                const tagText = e.target.textContent;
                const dropdownMenu = item.closest(".dropdown-menu");
                let tag = null;

                if (dropdownMenu.classList.contains("bg-primary")) {
                    tag = new Tag("primary", tagText);
                } else if (dropdownMenu.classList.contains("bg-success")) {
                    tag = new Tag("success", tagText);
                } else if (dropdownMenu.classList.contains("bg-danger")) {
                    tag = new Tag("danger", tagText);
                }

                console.log(tag)
                if (tag) {
                    const tagContainer = document.querySelector("#tags-container");
                    tagContainer.insertAdjacentHTML("beforeend", tag.renderTag());
                    tagsArray.push(tag);
                }
            });
        });
    
        // return tagsArray
        console.log(tagsArray)
}


async function init() {
    const cards = await getRecipes();
    displayDropdowns();
    displayCard(cards);

    searchInput.addEventListener("input", searchRecipes);
    displayTags();

};

init();