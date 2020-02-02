const rootNode = document.getElementById('root');

function locationHashChange() {
    if (location.hash === '#main') {
        mainPage();
        removePage(addPageWrapper);
    } else if (location.hash === '#addPage') {
        addPage();
        removePage(mainWrapper);
    } else if (location.hash === '#modifyPage'){
       
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

    addAttributes(attribute, className) {
        this.node.setAttribute(attribute, className);

    }

}

const addPageWrapper = new Tag('div', 'add-page');
rootNode.appendChild(addPageWrapper.getTage());
const mainWrapper = new Tag('div', 'main-wrapper');
rootNode.appendChild(mainWrapper.getTage());
const modifyWrapper = new Tag('div', 'modify-wrapper');
rootNode.appendChild(modifyWrapper.getTage());


// remove page

function removePage(item) {
    while (item.getTage().firstChild) {
        item.getTage().removeChild(item.getTage().firstChild)
    }

}

//main page

function mainPage() {
    location.hash = 'main';
    const buttonAdd = new Tag('button', 'buttonAdd');
    buttonAdd.addText('Add new');
    mainWrapper.getTage().appendChild(buttonAdd.getTage());

    buttonAdd.getTage().addEventListener('click', function () {
        location.hash = 'addPage';
    })

    let sets = new Tag('table', 'sets');
    mainWrapper.getTage().appendChild(sets.getTage());
    let tdName = new Tag('td', 'td');
    sets.getTage().appendChild(tdName.getTage());
    let tdTerm = new Tag('td', 'td');
    sets.getTage().appendChild(tdTerm.getTage());
    let tdDefinition = new Tag('td', 'td');
    sets.getTage().appendChild(tdDefinition.getTage());
    const tdChange = new Tag('td', 'td');
    sets.getTage().appendChild(tdChange.getTage());
    const tdDelete = new Tag('td', 'td');
    sets.getTage().appendChild(tdDelete.getTage());
    let buttonDelete;
    let buttonChange;


    for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        let name = new Tag('tr', key);
        name.addText(key);
        tdName.getTage().appendChild(name.getTage());

    }

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        let set = JSON.parse(localStorage.getItem(key));

        let outputTerm = new Tag('tr', key);
        outputTerm.addText(set.inputTerm);
        tdTerm.getTage().appendChild(outputTerm.getTage());

        let outputDefinition = new Tag('tr', key);
        outputDefinition.addText(set.inputDefinition);
        tdDefinition.getTage().appendChild(outputDefinition.getTage());

        const trChange = new Tag('tr', key);
        tdChange.getTage().appendChild(trChange.getTage());

        buttonChange = new Tag('button', key);
        buttonChange.addText('Modify set');
        trChange.getTage().appendChild(buttonChange.getTage());

        const trDelete = new Tag('tr', key);
        tdDelete.getTage().appendChild(trDelete.getTage());

        buttonDelete = new Tag('button', key);
        buttonDelete.getTage().classList.add('delete');
        buttonDelete.addText('Delete');
        trDelete.getTage().appendChild(buttonDelete.getTage());

    }


    sets.getTage().addEventListener('click', function (event) {
        let target = event.target;
        if(target.innerText == 'Delete'){
        for (let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }
            if (target.className === key) {
              localStorage.removeItem(key);
                 removePage(mainWrapper);
                 mainPage();
              
            }
        }
    } else if(target.innerText =='Modify set'){
      //modify page

       location.hash = 'modifyPage';
       let changeName = new Tag('input', 'changeName');
    
       let button = new Tag ('button', 'button');
       modifyWrapper.getTage().appendChild(button.getTage());
       console.log('modify');
       for (let key in localStorage) {
           if (!localStorage.hasOwnProperty(key)) {
               continue;
           }
           if (target.className === key) {
           changeName.addAttributes('placeholder', key);
           modifyWrapper.getTage().appendChild(changeName.getTage());
           console.log(localStorage[key]);
           }
       }
    }


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



