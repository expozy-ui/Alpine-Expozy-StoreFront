

export class FormDataCollector {
    /**
     * @param {HTMLFormElement} form 
     */
    constructor(form) {
        // if (!(form instanceof HTMLFormElement)) {
        //     throw new Error("FormDataCollector очаква HTMLFormElement");
        // }
        this.form = form;

        let collectData = this.collect();
        this.data = collectData.data;
        this.rawData = collectData.rawData;
    }


    /**
     * Обхожда всички полета в тази форма и връща:
     *  - data: ключ-стойност само за включените полета
     *  - details: пълна информация и флаг included за всяко
     */
    collect() {
        const data = {};
        const rawData = [];
        const elements = this.form.querySelectorAll('input, select, textarea');

        elements.forEach(el => {

            const name = el.name;
            if (!name) return;            // пропускаме без име

            const type = el.type;
            let value = el.value;
            let included = false;          // флаг дали полето „отговаря на условията“
            let checked = el.checked;


            switch (type) {

                case 'radio':
                    if (el.checked) {
                        included = true;
                    }
                    break;

                case 'file':

                    if (el.files.length > 0) {
                        value = el.multiple ? Array.from(el.files) : el.files[0];
                        included = true;
                    }
                    break;


                case 'checkbox':

                    if (name.endsWith('[]')) {
                        if (el.checked) {
                            included = true;
                        }
                    } else {
                        value = el.checked ? 1 : 0;
                        included = true;
                    }
                    break;


                default:
                    if (el.value !== 'empty') {
                        included = true;
                    } else {
                        // ако е empty → чистим от pageUrl заради pushUrl
                        this._removeFromPageUrl(name);
                    }


            }


            // добавяме в масива с детайли
            rawData.push({ name, type, value, included, checked });
            if (included) {
                if (type === 'file') {

                    if (name.endsWith('[]')) {
                        if (!data[name]) data[name] = [];

                        if (Array.isArray(value)) {
                            data[name].push(...value); // 🔑 ключовото
                        } else {
                            data[name].push(value);
                        }

                    } else {
                        data[name] = value;
                    }

                } else if (name.endsWith('[]')) {

                    if (!data[name]) data[name] = [];
                    data[name].push(value);

                } else {
                    data[name] = value;
                }
            }
        });
        return { data, rawData };
    }


    _removeFromPageUrl(name) {

        if (!data.pageUrl || !data.pageUrl[name]) return;

        // ако е масивен параметър
        if (name.endsWith('[]')) {
            delete data.pageUrl[name];
        } else {
            delete data.pageUrl[name];
        }
    }
}


