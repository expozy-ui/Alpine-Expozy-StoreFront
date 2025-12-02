import { FormDataCollector } from './formDataCollector.js';

export class DataCollect {

    constructor(element) {

        this.element = this._getRealElement(element);
        this.formData = [];

        if (this.element == undefined) {
            throw new Error("DataCollect очаква html елемент ");
        }


        this.attributesData = this._collectAttributesData('data');
        this.attributesOptions = this._collectAttributesData('options');
        this.keyName = this._getKeyName();

        this.keyGet = this.element.getAttribute('keyGet') || this.keyName;


        if (this.element.getAttribute('apiData') == undefined) {
            if (this.element.closest("form") != undefined) {
                this.form = new FormDataCollector(this.element.closest("form"));
                this.formData = this.form.data;
            } else if (this.element.closest("tr") != undefined) {
                this.form = new FormDataCollector(this.element.closest("tr"));
                this.formData = this.form.data;
            }
        }

        this.combinedData = Object.assign(this.attributesData, this.formData);
        // this.formData = this._setFormData();
        this.pushurl = this._shouldPushUrl();
        this.cleanData = this._cleanData();

    }


    _cleanData() {
        const out = {};
        for (const key in this.combinedData) {
            const val = this.combinedData[key];

            if (
                val === null ||
                val === undefined ||
                val === '' ||
                (Array.isArray(val) && val.length === 0)
            ) {
                continue; // пропуска празните
            }

            out[key] = val;
        }
        return out;
    }

    _shouldPushUrl() {

        const fromOptions = this.attributesOptions?.pushurl === true;

        const fromExternal = this.keyName && data[this.keyName]?.pushurl === true;


        if (fromOptions || fromExternal) {

            if (!this.combinedData.page) {
                delete data.pageUrl.page;
            }
            this.combinedData = { ...data.pageUrl, ...this.combinedData };
            data.pageUrl = this.combinedData;
        }

        return fromOptions || fromExternal;
    }

    // _setFormData() {
    //     const formData = new FormData();

    //     for (let key in this.combinedData) {
    //         const value = this.combinedData[key];

    //         // 1️⃣ Масиви
    //         if (Array.isArray(value)) {

    //             // Масив с файлове
    //             if (value.length && value[0] instanceof File) {
    //                 for (const file of value) {
    //                     formData.append(key + '[]', file);
    //                 }
    //             }

    //             // Масив с други стойности (string, number)
    //             else {
    //                 for (const item of value) {
    //                     formData.append(key, item);
    //                 }
    //             }

    //             continue;
    //         }

    //         // 2️⃣ Единична стойност
    //         formData.append(key, value);
    //     }

    //     return formData;
    // }


    _getKeyName() {

        let keyName = this.element.getAttribute('keyName');
        if (keyName == undefined) {
            keyName = this.attributesOptions['keyName'] ? this.attributesOptions['keyName'] : '';
        }
        return keyName;
    }

    _collectAttributesData(prefix) {

        const dataAttrs = this.element.getAttributeNames().reduce((obj, name) => {
            if (name.startsWith(prefix + '-')) {
                let value = this.element.getAttribute(name);

                // Опитваме се да парснем стойността като JSON
                try {
                    value = JSON.parse(value);
                } catch (e) {
                    // Ако не е валиден JSON, оставяме оригиналната стойност
                }

                return { ...obj, [name.slice(name.indexOf('-') + 1)]: value };
            }
            return obj;
        }, {});

        return dataAttrs;
    };

    _getRealElement(element) {

        if (element.currentTarget !== null && element.currentTarget !== undefined) {

            if (element.target.tagName == 'SELECT') {
                return element.target.options[element.target.selectedIndex];
            } else {
                return element.currentTarget;
            }

        } else if (element.srcElement !== null && element.srcElement !== undefined) {
            return element.srcElement;
        } else {
            return element;
        }
    };

}