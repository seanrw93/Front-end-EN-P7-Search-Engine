export class Tag {
    constructor(tagType, tagText) {
        if (!tagType || !tagText) {
            throw new Error('Data is undefined');
        }

        switch (tagType) {
            case 'ingredient':
                this.btnClass = 'primary';
                break;
            case 'appliance':
                this.btnClass = 'success';
                break;
            case 'utensil':
                this.btnClass = 'danger';
                break;
            default:
                this.btnClass = 'primary';
        }
        this.tagText = tagText;
        this.tagType = tagType

    }

    renderTag() {
        return (`
            <a href="#" type="button" class="btn btn-${this.btnClass} tag mb-2">
                <span class="small tag-text">${this.tagText}</span>
                <span class="badge">
                    <i class="fa-regular fa-circle-xmark"></i>
                </span>
            </a>
        `);
    }
}