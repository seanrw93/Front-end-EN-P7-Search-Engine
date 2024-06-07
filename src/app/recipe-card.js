export class Recipes {
    constructor(data) {
        if (!data) {
            throw new Error('Data is undefined');
        }

        const { id, name, ingredients, time, description, appliance, ustensils } = data;
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.ustensils = ustensils;
    }

    truncateString(str, num) {
        if (str.split(" ").length <= num) {
            return str;
        } else {
            return str.split(" ").slice(0, num).join(" ") + "...";
        }
    }

    singularUnit(quantity, unit) {
        if (quantity === 1) {
            return unit.slice(0, -1);
        } else {
            return unit;
        }
    }

    convertUnit(unit) {
        switch (unit.toLowerCase()) {
            case "grams":
                return "g";
            case "liters":
            case "liter":
                return "l";
            case "tablespoons":
            case "tablespoon":
                return "tbsps";
            case "teaspoons":
            case "teaspoon":
                return "tsps";
            default:
                return unit;
        }
    }
    

    renderCard() {
        const ingredientsList = this.ingredients.map(ingredient => {
            return (`
                <li class="extra-small recipe__ingredient">
                    <span class="font-weight-bold">${ingredient.ingredient}${ingredient.quantity ? ":" : ""}</span>
                    ${ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit ? this.singularUnit(ingredient.quantity, this.convertUnit(ingredient.unit)) : ""}` : ""}
                </li>
                `
            );
        }).join('');

        return (`
            <div class="col mb-3 mb-md-4 mb-lg-5 rounded-lg" id="card-col-${this.id}">
                <div id="recipe-card-${this.id}" class="card recipe__card rounded-lg">
                    <img src="./assets/images/grey-background.svg" class="card-img-top" alt="Recipe image">
                    <div class="card-body bg-secondary">
                        <div class="row d-flex justify-content-between align-items-center flex-nowrap mx-0 mb-3">
                            <h5 class="card-title h6 mb-0">${this.name}</h5>
                            <p class="card-text text-nowrap font-weight-bold"><span class="fa far fa-clock"></span> ${this.time} min</p>
                        </div>
                        <div class="row">
                            <div class="col">
                                <ul class="list-unstyled px-0">
                                    ${ingredientsList}
                                </ul>
                            </div>
                            <div class="col">
                                <p class="extra-small text-justify">${this.truncateString(this.description, 40)}</p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        `);
    }
}