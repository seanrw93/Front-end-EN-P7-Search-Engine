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

    renderCard() {
        const ingredientsList = this.ingredients.map(ingredient => {
            return (
                `<li class="text-muted small recipe__ingredient">${ingredient.ingredient} : ${ingredient.quantity} ${ingredient.unit}</li>`
            );
        }).join('');

        return (`
            <div class="col" id="card-col-${this.id}">
                <div id="recipe-card-${this.id}" class="card p-0 recipe__card">
                    <div style="background-color: grey; height: 200px;"></div>
                    <div class="card-body bg-secondary-subtle">
                    <div class="row justify-content-between">
                        <h5 class="card-title">{${this.title}}</h5>
                        <p class="card-text"><span class="oi oi-clock"></span> ${this.time} min</p>
                    </div>
                    <div class="row">
                        <div class="col">
                            <ul class="list-unstyled px-0">
                                ${ingredientsList}
                            </ul>
                        </div>
                        <div class="col">
                            <p class="small">${this.description}</p>
                        </div>
                    </div>
                    </div>
                </div> 
            </div>
        `);
    }
}