const rootNode = document.getElementById('root'),
    mainWrapper = tag({
        tag: 'div',
        class: 'main-wrapper',
        parent: rootNode
    }),
    addWrapper = tag({
        tag: 'div',
        class: 'add-wrapper',
        parent: rootNode
    }),
    modifyWrapper = tag({
        tag: 'div',
        class: 'modify-wrapper',
        parent: rootNode
    });

let sets = {};

//tag constructor
function tag(param) {
    let node;
    if (param.tag) {
        node = document.createElement(param.tag);
    }
    if (param.class) {
        node.className = param.class;
    }
    if (param.placeholder) {
        node.setAttribute('placeholder', param.placeholder);
    }
    if (param.innerText) {
        node.innerText = param.innerText;
    }
    if (param.parent) {
        param.parent.appendChild(node);
    }
    return node;
}


function removePage(item) {
    while (item.firstChild) {
        item.removeChild(item.firstChild);
    }
}

function locationHashChange() {
    if (location.hash === '#addPage') {
        addPage();
        removePage(mainWrapper);
    } else if (location.hash === '#modifyPage') {

        removePage(mainWrapper);
    } else {
        mainPage();
        removePage(addWrapper);
        removePage(modifyWrapper);
    }
}

window.addEventListener('hashchange', locationHashChange, false);

// main page
function mainPage() {
    location.hash = 'mainPage';

    const buttonAdd = tag({
        tag: 'button',
        innerText: 'Add new',
        class: 'button-add',
        parent: mainWrapper
    });

    tag({
        tag: 'h1',
        innerText: 'LIST OF SETS',
        parent: mainWrapper
    });

    const setsDisplay = tag({
        tag: 'div',
        parent: mainWrapper
    });

    let keys = Object.keys(localStorage);
    for (let key of keys) {
        sets = {
            term: localStorage[key],
            definition: localStorage[key]
        }

        sets = JSON.parse(localStorage.getItem(key));

        const setWrapper = tag({
            tag: 'div',
            class: 'set-wrapper',
            parent: setsDisplay
        });
        tag({
            tag: 'p',
            innerText: key,
            parent: setWrapper
        });
        tag({
            tag: 'p',
            innerText: sets.term,
            parent: setWrapper
        });
        tag({
            tag: 'p',
            innerText: sets.definition,
            parent: setWrapper
        });
        const buttonDelete = tag({
            tag: 'button',
            class: 'delete',
            innerText: 'Delete',
            parent: setWrapper
        });
        const buttonModify = tag({
            tag: 'button',
            innerText: 'Modify set',
            parent: setWrapper
        });

        buttonDelete.addEventListener('click', function () {
            localStorage.removeItem(key);
            removePage(setWrapper);

        });

        buttonModify.addEventListener('click', function () {
            // modify page
            location.hash = 'modifyPage';
            tag({
                tag: 'h1',
                innerText: 'MODIFY SET',
                parent: modifyWrapper
            });

            tag({
                tag: 'h2',
                innerText: 'Name: ' + key,
                parent: modifyWrapper
            });

            const term = tag({
                tag: 'input',
                placeholder: 'Term',
                parent: modifyWrapper
            });
            const definition = tag({
                tag: 'input',
                placeholder: 'Definition',
                parent: modifyWrapper
            });
            const buttonSave = tag({
                tag: 'button',
                innerText: 'Save',
                parent: modifyWrapper
            });

            buttonSave.addEventListener('click', function () {
                if (term.value && definition.value) {
                    sets.term = term.value;
                    sets.definition = definition.value;
                    localStorage.setItem(key, JSON.stringify(sets));
                    location.hash = 'mainPage';
                }
            })
            tag({
                tag: 'button',
                innerText: 'Cancel',
                parent: modifyWrapper
            }).addEventListener('click', function () {
                location.hash = 'mainPage';
            })
        })

    }

    buttonAdd.addEventListener('click', function () {
        location.hash = 'addPage';

    })
}

mainPage();

//add page
function addPage() {
    tag({
        tag: 'h1',
        innerText: ' ADD SET',
        parent: addWrapper
    });
    const name = tag({
        tag: 'input',
        placeholder: 'Name',
        parent: addWrapper
    });
    const buttonAddTerms = tag({
        tag: 'button',
        innerText: 'Add Term',
        parent: addWrapper
    });
    const buttonSave = tag({
        tag: 'button',
        innerText: 'Save',
        parent: addWrapper
    });
    const buttonCancel = tag({
        tag: 'button',
        innerText: 'Cancel',
        parent: addWrapper
    });

    buttonAddTerms.addEventListener('click', function () {
        if (name.value) {
            const term = tag({
                tag: 'input',
                placeholder: 'Term',
                parent: addWrapper
            });
            const definition = tag({
                tag: 'input',
                placeholder: 'Definition',
                parent: addWrapper
            });

            buttonSave.addEventListener('click', function () {

                let sets = {
                    term: term.value,
                    definition: definition.value
                };
                localStorage.setItem(name.value, JSON.stringify(sets));
                location.hash = 'mainPage';
            })
        }
    }, {
        once: true
    })

    buttonCancel.addEventListener('click', function () {
        location.hash = 'mainPage';
    })


}