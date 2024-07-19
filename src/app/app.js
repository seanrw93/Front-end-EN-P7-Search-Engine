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

// Dropdown menus
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

const ingredientsDropdown = new Dropdown('ingredients', uniqueIngredients);
const appliancesDropdown = new Dropdown('devices', uniqueAppliances);
const utensilsDropdown = new Dropdown('utensils', uniqueUtensils);

function displayDropdowns() {
    const dropdownsContainer = document.querySelector("#dropdowns");
    dropdownsContainer.insertAdjacentHTML("beforeend", ingredientsDropdown.renderDropdown());
    dropdownsContainer.insertAdjacentHTML("beforeend", appliancesDropdown.renderDropdown());
    dropdownsContainer.insertAdjacentHTML("beforeend", utensilsDropdown.renderDropdown());
}

// End Dropdown menus

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

const tagsArray = [];
console.log(tagsArray);

function filterByTags(recipes, tagsArray) {
    if (tagsArray.length === 0) {
        return recipes;
    }

    return recipes.filter((card) => {
        const ingredientTags = tagsArray.filter(tag => tag.btnClass === 'primary').map(tag => tag.tagText.toLowerCase());
        const applianceTags = tagsArray.filter(tag => tag.btnClass === 'success').map(tag => tag.tagText.toLowerCase());
        const utensilTags = tagsArray.filter(tag => tag.btnClass === 'danger').map(tag => tag.tagText.toLowerCase());

        const ingredientMatch = ingredientTags.every(tag =>
            card.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag)) ||
            card.description.toLowerCase().includes(tag)
        );
        const applianceMatch = applianceTags.every(tag =>
            card.appliance.toLowerCase().includes(tag) || 
            card.description.toLowerCase().includes(tag)
        );
        const utensilMatch = utensilTags.every(tag =>
            card.utensils.some(utensil => utensil.toLowerCase().includes(tag)) || 
            card.description.toLowerCase().includes(tag)
        );

        return ingredientMatch && applianceMatch && utensilMatch;
    });
}

function searchRecipes() {
    const searchValue = searchInput.value.toLowerCase();

    let filteredCards = recipes;

    if (searchValue) {
        filteredCards = filteredCards.filter((card) => {
            // Check for name match
            const nameWords = card.name.toLowerCase().split(" ");
            const nameMatch = nameWords.some(word => word.startsWith(searchValue));

            // Check for ingredient match
            const ingredientMatch = card.ingredients.some(ingredient => {
                const ingredientWords = ingredient.ingredient.toLowerCase().split(" ");
                return ingredientWords.some(word => word.startsWith(searchValue));
            });

            return nameMatch || ingredientMatch;
        });
    }

    filteredCards = filterByTags(filteredCards, tagsArray);

    const dropdownItems = document.querySelectorAll(".dropdown-item");
    if (filteredCards.length === 0) {
        dropdownItems.forEach((item) => {
            item.classList.add("disabled-item");
            searchInput.setAttribute("maxlength", searchInput.value.length);
        });
        alert("No recipes found. Please try again.");
    } else {
        dropdownItems.forEach((item) => {
            item.classList.remove("disabled-item");
            searchInput.removeAttribute("maxlength");
        });
    }

    displayCard(filteredCards);
}

function searchDropdownItems() {
    const searchInputs = document.querySelectorAll(".dropdown-search");

    searchInputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            let searchValue = e.target.value.toLowerCase().trim();
            const dropdownMenu = input.closest(".dropdown-menu");

            // Reset searchValue if dropdown menu is not visible
            if (!dropdownMenu.classList.contains("show")) {
                searchValue = "";
            }

            const dropdownItems = dropdownMenu.querySelectorAll(".dropdown-item");

            dropdownItems.forEach((item) => {
                const itemText = item.textContent.toLowerCase().trim();
                const col = item.closest(".col");

                if (searchValue === "" || itemText.startsWith(searchValue)) {
                    col.style.display = "block";
                } else {
                    col.style.display = "none";
                }
            });
        });
    });
}

function displayTags() {
    const dropDownItems = document.querySelectorAll(".dropdown-item");

    dropDownItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            const tagText = item.textContent;
            const dropdownMenu = item.closest(".dropdown-menu");
            item.classList.add("selected");

            let tag;

            if (dropdownMenu.id === "ingredients-dropdown") {
                tag = new Tag("ingredient", tagText);
            } else if (dropdownMenu.id === "devices-dropdown") {
                tag = new Tag("appliance", tagText);
            } else if (dropdownMenu.id === "utensils-dropdown") {
                tag = new Tag("utensil", tagText);
            }

            if (tag) {
                const tagContainer = document.querySelector("#tags-container");
                tagContainer.insertAdjacentHTML("beforeend", tag.renderTag());
                tagsArray.push(tag);
                
                // Add event listener to the new tag to delete it
                const newTagElement = tagContainer.lastElementChild;
                newTagElement.addEventListener("click", () => {
                    // Find the index of the tag in the tagsArray
                    const index = tagsArray.findIndex(t => t.tagText === tag.tagText && t.type === tag.type);
                    deleteTag(newTagElement, index, item);
                });
            }

            searchRecipes(); // Update the search results when a tag is added
        });
    });

    return tagsArray;
}

function deleteTag(tagElement, index, dropdownItem) {
    // Remove the selected class from the dropdown item
    dropdownItem.classList.remove("selected");

    // Remove the selected class from the  and tagsArray
    tagElement.remove();
    tagsArray.splice(index, 1);

    searchRecipes(); // Update the search results when a tag is deleted
}

async function init() {
    const cards = await getRecipes();

    displayDropdowns();
    displayCard(cards);
    displayTags();

    searchInput.addEventListener("input", searchRecipes);
    searchDropdownItems();
};

init();
