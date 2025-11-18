
export default class DateHelper {
    static addIcon(input) {
        if (input.parentNode.classList.contains("date-wrapper")) return input;

        const wrapper = document.createElement("div");
        wrapper.className = "date-wrapper relative w-full inline-block";

        // създаваме иконите
        const span = document.createElement("span");
        span.className = "absolute inset-y-0 right-0 flex items-center !pr-3 text-gray-500";
        span.innerHTML = `
        <i class="fa fa-calendar-alt calendar-icon"></i>
        <i class="fa fa-times !hidden clear-icon cursor-pointer"></i>
    `;

        // местим input вътре (не нов, а същия елемент!)
        input.classList.add("!pr-6");
        input.parentNode.replaceChild(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(span);

        return input; // връщаме същия input, а не копие
    }

    // === Общи помощни методи ===
    static toggleIcons(instance, dateStr) {
        const wrapper = instance._input.closest(".date-wrapper");
        const calendarIcon = wrapper.querySelector(".calendar-icon");
        const clearIcon = wrapper.querySelector(".clear-icon");

        if (dateStr) {
            calendarIcon.classList.add("!hidden");
            clearIcon.classList.remove("!hidden");
        } else {
            calendarIcon.classList.remove("!hidden");
            clearIcon.classList.add("!hidden");
        }
    }

    static attachClearHandler(input, instance, extraClearFn) {
        const wrapper = input.closest(".date-wrapper");
        const clearIcon = wrapper.querySelector(".clear-icon");

        clearIcon.addEventListener("click", () => {
            instance.clear();
            DateHelper.toggleIcons(instance, "");
            if (typeof extraClearFn === "function") extraClearFn();
        });
    }

    static async initPicker(root, defaults, options, extraClearFn) {
        await Helpers.loadFile(`${ADMINURL}/assets/global/plugins/flatpicker/flatpicker.css`)
        await Helpers.loadFile(`${ADMINURL}/assets/global/plugins/flatpicker/flatpicker.js`)

        const settings = { ...defaults, ...options };


        const inputEl = root.querySelector("input[type='text']");
        if (!inputEl) return null;

        inputEl.classList.add(defaults.mode + '_calendar');

        const input = DateHelper.addIcon(inputEl);
        const instance = flatpickr(input, settings);



        DateHelper.attachClearHandler(input, instance, extraClearFn);

        // if (data.table != undefined) {
        //     data.table._initFilters();
        // }

        return instance;
    }

    // === Конкретни режими ===
    static date(options = {}) {
        return {
            instance: null,
            async init() {
                const defaults = {
                    dateFormat: "Y-m-d",
                    onChange: (selectedDates, dateStr, instance) => {
                        DateHelper.toggleIcons(instance, dateStr);
                    },
                };
                this.instance = await DateHelper.initPicker(this.$root, defaults, options);
            }
        };
    }

    static dateRange(options = {}) {
        return {
            instance: null,
            async init() {
                const self = this;
                const defaults = {
                    dateFormat: "Y-m-d",
                    mode: "range",
                    locale: { rangeSeparator: " : " },
                    onChange: (selectedDates, dateStr, instance) => {
                        DateHelper.toggleIcons(instance, dateStr);
                        const inputs = this.$root.querySelectorAll("input");
                        const start = inputs[0] || null;
                        const end = inputs[1] || null;

                        if (selectedDates.length === 2) {
                            // ъпдейтваме стойностите САМО ако имаме и начало, и край
                            if (start) start.value = instance.formatDate(selectedDates[0], "Y-m-d");
                            if (end) end.value = instance.formatDate(selectedDates[1], "Y-m-d");
                        } else {
                            // ако е избрана само една дата -> не пипаме стойностите
                            // ако искаш при clear да чисти, остави това
                            if (selectedDates.length === 0) {
                                if (start) start.value = "";
                                if (end) end.value = "";
                            }
                        }
                    },
                };

                this.instance = await DateHelper.initPicker(
                    this.$root,
                    defaults,
                    options,
                    () => {
                        // clear първия и втория input при X
                        const inputs = this.$root.querySelectorAll("input");
                        const start = inputs[0] || null;
                        const end = inputs[1] || null;

                        if (start) start.value = "";
                        if (end) end.value = "";
                    }
                );
            }
        };
    }

    static dateTime(options = {}) {
        return {
            instance: null,
            async init() {
                const defaults = {
                    enableTime: true,
                    dateFormat: "Y-m-d H:i",
                    onChange: (selectedDates, dateStr, instance) => {
                        DateHelper.toggleIcons(instance, dateStr);
                    }
                };
                this.instance = await DateHelper.initPicker(this.$root, defaults, options);
            }
        };
    }

    static time(options = {}) {
        return {
            instance: null,
            async init() {
                const defaults = {
                    enableTime: true,     // включва часовник
                    noCalendar: true,     // скрива календара
                    dateFormat: "H:i",    // само час:минути
                    time_24hr: true,      // 24-часов формат
                    onChange: (selectedDates, dateStr, instance) => {
                        DateHelper.toggleIcons(instance, dateStr);
                    }
                };
                this.instance = await DateHelper.initPicker(this.$root, defaults, options);
            }
        };
    }

    static button(options = {}) {
        return {
            instance: null,
            async init() {
                const defaults = {
                    dateFormat: "Y-m-d",
                    onChange: (selectedDates, dateStr, instance) => {
                        // актуализира текста на бутона
                        if (this.$refs.hiddenInput) {
                            this.$refs.hiddenInput.value = dateStr;
                        }
                    }
                };

                await Helpers.loadFile(`${ADMINURL}/assets/global/plugins/flatpicker/flatpicker.css`);
                await Helpers.loadFile(`${ADMINURL}/assets/global/plugins/flatpicker/flatpicker.js`);

                // Връзваме flatpickr директно към скрития input
                this.instance = flatpickr(this.$refs.hiddenInput, {
                    ...defaults,
                    ...options,
                    positionElement: this.$refs.btn
                });

                // Бутонът отваря календара
                this.$refs.btn.addEventListener("click", () => {
                    this.instance.open();
                });
            }
        };
    }

    // === Script & CSS loader-и ===
    static async loadScript(src) {
        if (document.querySelector(`script[src="${src}"]`)) return;
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
    }

    static async loadCSS(href) {
        if (document.querySelector(`link[href="${href}"]`)) return;
        const l = document.createElement('link');
        l.rel = "stylesheet";
        l.href = href;
        document.head.appendChild(l);
    }
}


/* ========================== EXAMPLES =============================

        <!-- Single Date -->
        <div x-data="DateHelper.date()">
            <input type="text" name="date" class="form-control !bg-white !text-[#333]" placeholder="Избери дата">
        </div>


        <!-- Date Range -->
        <div x-data="DateHelper.dateRange()">
            <input type="hidden" name="date_start">
            <input type="hidden" name="date_end">
            <input type="text" placeholder="Избери период" class="form-control !bg-white !text-[#333]">
        </div>



        <!-- Date & Time -->
        <div x-data="DateHelper.dateTime()">
            <input type="text" name="datetime" class="form-control !bg-white !text-[#333]" placeholder="Дата и час">
        </div>

          <!-- Date & Time -->
        <div x-data="DateHelper.time()">
            <input type="text" name="datetime" class="form-control !bg-white !text-[#333]" placeholder="Дата и час">
        </div>

*/
