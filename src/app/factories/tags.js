export class Tag {
    constructor(btnClass, tagText) {
        if (!btnClass || !tagText) {
            throw new Error('Data is undefined');
        }

        this.btnClass = btnClass;
        this.tagText = tagText;

    }

    renderTag() {
        return (`
            <a href="#" type="button" class="btn btn-${this.btnClass} filter-btn mb-2">
                <span class="small tag-text">${this.tagText}</span>
                <span class="badge">
                    <i class="fa-regular fa-circle-xmark"></i>
                </span>
            </a>
        `);
    }
}