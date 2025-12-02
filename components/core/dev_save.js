

const devSaveButton = document.getElementById("dev_save");
if (devSaveButton !== null) {

    devSaveButton.onclick = async function () {
        Page.get();
        await alpineTemplatesGen();
        await classGen();
        await Page.saveCss();
    };
}

async function processTemplates(container, templates) {
    return new Promise(resolve => { // Връщаме обещание, което ще бъде резолвнато след като завършим обработката
        templates.forEach(async function (template) {
            if (!template.classList.contains("dontSelect")) {


                var templateContent = template.content;
                var div = document.createElement("div");
                div.appendChild(templateContent.cloneNode(true));

                var nestedTemplates = div.querySelectorAll("template");
                if (nestedTemplates.length > 0) {
                    await processTemplates(div, nestedTemplates); // Изчакваме вложените шаблони да бъдат обработени
                }

                container.appendChild(div);
            }
        });

        resolve(); // Резолваме обещанието, когато завършим обработката
    });
}

async function alpineTemplatesGen() {
    var templates = document.querySelectorAll("template");

    var container = document.getElementById("templatesDiv");
    container.innerHTML = '';

    await processTemplates(container, templates); // Изчакваме обработката на шаблоните да завърши
}

async function classGen() {

    var elementsWithAttribute = document.querySelectorAll('[\\:class]');

    elementsWithAttribute.forEach(function (element) {

        var attributeValue = element.getAttribute(':class');
        var replacedValue = attributeValue.replace(/['"]/g, ' ');

        replacedValue = document.getElementById('templatesDiv').classList.value + ' ' + replacedValue
        document.getElementById('templatesDiv').setAttribute('class', replacedValue);

    });
    await new Promise(resolve => setTimeout(resolve, 1000));

}
