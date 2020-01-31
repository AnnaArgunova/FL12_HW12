const rootNode = document.getElementById('root');

function locationHashChange() {
    if (location.hash === '#main') {
        mainPage();
        removePage(addPageWrapper);
    } else if (location.hash === '#addPage') {
        addPage();
        removePage(mainWrapper);
    }
}


window.addEventListener('hashchange', locationHashChange, false);
class Tag {
    constructor(tag, className) {
        this.tag = tag;
        this.className = className;
        this.node = document.createElement(this.tag);
    }

    getTage() {

        this.node.className = this.className;
        return this.node;
    }

    addText(text) {
        this.node.innerText = text;

    }

    addAttributes(attribute, value) {
        this.node.setAttribute(attribute, value);

    }

}

let addPageWrapper = new Tag('div', 'add-page');
rootNode.appendChild(addPageWrapper.getTage());
const mainWrapper = new Tag('div', 'main-wrapper');
rootNode.appendChild(mainWrapper.getTage());


// remove page

function removePage(item) {
    while (item.getTage().firstChild) {
        item.getTage().removeChild(item.getTage().firstChild)
    }
   
}

//main page

function mainPage() {
    location.hash = 'main';
    let buttonAdd = new Tag('button', 'buttonAdd');
    buttonAdd.addText('Add new');
    mainWrapper.getTage().appendChild(buttonAdd.getTage());

    buttonAdd.getTage().addEventListener('click', function () {
        location.hash = 'addPage';
    })

}
mainPage();

//add page
function addPage() {
    const inputName = new Tag('input', 'input');
    inputName.addAttributes('placeholder', 'Name');
    addPageWrapper.getTage().appendChild(inputName.getTage());
    const buttonAddTerms = new Tag('button', 'button');
    buttonAddTerms.addText('Add terms');
    addPageWrapper.getTage().appendChild(buttonAddTerms.getTage());
    const buttonWraper = new Tag('div', 'button-wrapper');
    addPageWrapper.getTage().appendChild(buttonWraper.getTage());
    const buttonSave = new Tag('button', 'button');
    buttonSave.addText('Save');
    buttonWraper.getTage().appendChild(buttonSave.getTage());
    const buttonCancel = new Tag('button', 'button');
    buttonCancel.addText('Cancel');
    buttonWraper.getTage().appendChild(buttonCancel.getTage());
    let inputTerm = new Tag('input', 'input');
    inputTerm.addAttributes('placeholder', 'Enter term');
    let inputDefinition = new Tag('input', 'input');
            inputDefinition.addAttributes('placeholder', 'Enter definition');

    buttonAddTerms.getTage().addEventListener('click', function () {
        if (inputName.getTage().value) {
            let inputWrapper = new Tag('div', 'input-wraper');
            addPageWrapper.getTage().appendChild(inputWrapper.getTage());
            inputWrapper.getTage().appendChild(inputTerm.getTage());
             inputWrapper.getTage().appendChild(inputDefinition.getTage());
        }

    })

    buttonSave.getTage().addEventListener('click', function () {
        
        let sets = {
            inputTerm: inputTerm.getTage().value,
            inputDefinition: inputDefinition.getTage().value
        };
        localStorage.setItem(inputName.getTage().value, JSON.stringify(sets));
        location.hash = 'main';
    })

}
