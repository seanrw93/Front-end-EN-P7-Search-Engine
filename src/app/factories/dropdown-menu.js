export class Dropdown {
    constructor(type, items, bgClass) {
        if (!type || !items || !bgClass) {
            throw new Error('Data is undefined');
        }

        this.type = type;
        this.items = items;
        this.bgClass = bgClass;
    }
    
    renderDropdown() {
        const itemsList = this.items.map(item => {
            return (`
                <div class="col">
                    <a class="dropdown-item text-light px-0" href="#" role="menuitem">${item}</a>
                </div>
            `);
        }).join('');

        return (`
            <div class="btn-group">
                <button class="btn btn-${this.bgClass} dropdown-toggle text-light py-3" type="button" id="dropdownMenu-${this.type}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    ${this.type.charAt(0).toUpperCase() + this.type.slice(1)}
                </button>

                <div class="dropdown-menu bg-${this.bgClass} custom-dropdown-dimensions custom-scrollbar p-2" id="dropdownMenu-${this.type}" aria-labelledby="dropdownMenu-${this.type}" role="menu">
                    <div class="container">
                        <div class="row row-cols-1">
                            <div class="col">
                                <div class="search-input">
                                    <input class="form-control fw-bold custom-input" type="search" placeholder="Search ${this.type}" aria-label="Search">
                                </div>
                            </div>
                        </div>
            
                        <div id="${this.type}-list" class="row row-cols-2 row-cols-md-3 justify-content-between">
                            ${itemsList}
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
}