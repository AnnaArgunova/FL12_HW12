const rootNode = document.getElementById('root'),
 buttonAdd = document.createElement('button'),
 remove = document.createElement('button'),
 addPage = document.createElement('div');
addPage.className = 'add-page';
rootNode.appendChild(addPage);


//main page
function mainPage() {
    buttonAdd.innerText = 'Add new';
    buttonAdd.className = 'button';
    rootNode.appendChild(buttonAdd);
    remove.style.backgroundColor = 'green';
    remove.style.width = '50px';
    remove.style.height = '50px';
    rootNode.appendChild(remove);
}
mainPage();


//add page
const save = document.createElement('button'),
    inputName = document.createElement('input'),
    buttonTerms = document.createElement('button'),
    input = document.createElement('div')
    button = document.createElement('div'),
    cancel = document.createElement('button'),
    inputTerms = document.createElement('div'),
    inputTerm = document.createElement('input'),
    inputDefinition = document.createElement('input'),
    header = document.createElement('h2');

function addPages() {
    console.log('addPage');
    header.innerText = 'Add new set';
    addPage.appendChild(header);
    input.className = 'input-wrapper';
    addPage.appendChild(input);
    inputName.className = 'input name',
    inputName.setAttribute('name', 'name');
    inputName.setAttribute('placeholder', 'Name');
    input.appendChild(inputName);
    buttonTerms.className = 'button terms';
    buttonTerms.innerText = 'Add terms';
    input.appendChild(buttonTerms);

    buttonTerms.addEventListener('click', function () {
        if (inputName.value) {
            addPage.appendChild(inputTerms);
            inputTerms.className = 'input-wrapper';

            inputTerm.setAttribute('placeholder', 'Enter term');
            inputTerms.appendChild(inputTerm);

            inputDefinition.setAttribute('placeholder', 'Enter definition');
            inputTerms.appendChild(inputDefinition);
        }
    });

    button.className = 'button-wrapper';
    addPage.appendChild(button);
    save.className = 'button-save';
    save.innerText = 'Save changes';
    button.appendChild(save);
    cancel.className = 'button-cancel';
    cancel.innerText = 'Cancel';
    button.appendChild(cancel);

}

//remove
function removes() {
    console.log('remove');
}

function removeChildren(item) {
    while (item.firstChild) {
        addPage.removeChild(item.firstChild);
    }
}

function locationHashChanged() {
    if (location.hash === "#addPage") {
        addPages();
        removeChildren(mainPage);
        removeChildren(remove);

    } else if (location.hash === "#remove") {
        remove();

    } else if (location.hash === '#main') {
        mainPage();
        removeChildren(addPage);
    }
}


window.addEventListener('hashchange', locationHashChanged, false);

buttonAdd.addEventListener('click', function () {
    location.hash = 'addPage';
});

remove.addEventListener('click', function () {
    location.hash = 'remove';
   });

save.addEventListener('click', function () {
    location.hash = 'main';

    let sets = {
        inputTerm: inputTerm.value,
        inputDefinition: inputDefinition.value
    };
    localStorage.setItem(inputName.value, JSON.stringify(sets));
})