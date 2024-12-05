const checkbox = document.querySelector('#divStyle');
const textFields = document.querySelectorAll('.textfield');
const removeButton = document.getElementById('removeKnapp');
const colorInput = document.getElementsByName('color')[0];
const addButton = document.querySelector('[name="addButton"]');
const divBox = document.getElementsByTagName('div')[1];


// Lägger in 'placeholder' direkt efter 'divBox' i dess förälder
const placeholder = document.createElement('div');
divBox.parentNode.insertBefore(placeholder, divBox.nextSibling);

//en kul liten funktion + boolean för att toggla knapparna, lite som en lamp-switch!
let isRemoveButtonActive = true;

function toggleButtons() {
    if (isRemoveButtonActive) {
        //stäng av removeButton och slå på addButton
        removeButton.disabled = true;
        addButton.disabled = false;
    } else {
        //stäng av addButton och slå på removeButton
        removeButton.disabled = false;
        addButton.disabled = true;
    }

    //flippa bool staten
    isRemoveButtonActive = !isRemoveButtonActive;
}

// Funktion som hanterar textinmatning från textfält
function handleTextInput(event) {
    // Loggar vilket element som skickade eventet
    console.log("Event avsändare:", event.target);

    // Hämtar 'name'-attributet från det textfält som utlöste eventet
    const inputName = event.target.name;
    console.log("Name-attribut:", inputName);

    // Om 'name'-attributet är 'content' och 'divBox' har en förälder:
    if (inputName === 'content' && divBox.parentElement) {
        // Uppdatera innehållet i 'divBox' med textfältets värde
        divBox.innerHTML = event.target.value;
    }
}

// Lägger till en 'input'-händelselyssnare för varje textfält
textFields.forEach(input => {
    input.addEventListener('input', handleTextInput);
});

// Lägger till en 'change'-händelselyssnare på checkboxen
checkbox.addEventListener('change', function () {
    // Hämtar och trimma (tar bort tomrum) från färginmatningens värde
    const colorValue = colorInput.value.trim();
    // Om det finns en färg och 'divBox' har en förälder:
    if (colorValue && divBox.parentElement) {
        // Ändra bakgrundsfärgen på 'divBox'
        divBox.style.backgroundColor = colorValue;
        console.log(`Bakgrundsfärg ändrad till: ${colorValue}`);
    }
});

// Lägger till en 'click'-händelselyssnare för 'removeButton'
removeButton.addEventListener('click', function () {
    // Om 'divBox' har en förälder:
    if (divBox.parentElement) {
        // Logga att 'Remove'-knappen klickades och ta bort 'divBox'
        console.log("Remove-knappen klickades. Div-elementet tas bort.");
        divBox.remove();
        toggleButtons();
    }
});


// Lägger till en 'click'-händelselyssnare för 'addButton'
addButton.addEventListener('click', function () {
    // Om 'divBox' inte har en förälder (dvs. det är borttaget):
    if (!divBox.parentElement) {
        // Logga att 'Add'-knappen klickades och lägg till 'divBox' igen
        console.log("Add-knappen klickades. Div-elementet läggs till igen.");
        placeholder.parentNode.insertBefore(divBox, placeholder.nextSibling);
        toggleButtons();
    }
});
