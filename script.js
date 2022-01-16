const inputSection = document.getElementById("inputSection");
const aside = document.getElementById("aside");

let myEntries = document.getElementById("myEntries");

const dagbokHeadline = document.getElementById("dagbokHeadline");
const dagbokText = document.getElementById("dagbokText");
const dagbokBtn = document.getElementById("dagbokBtn");

window.onload = renderPage();

// knapp som lägger till nytt inlägg på sidan och i localstorage

dagbokBtn.addEventListener("click", function () {

    myDagbokSerialized = localStorage.getItem("myDagbok");

    if (myDagbokSerialized) {

        let myDagbokDeserialized = JSON.parse(localStorage.getItem("myDagbok"));

       

        let newDagbokEntry =

        {
            headline: dagbokHeadline.value,
            text: dagbokText.value,
            date: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()

        }

        myDagbokDeserialized.push(newDagbokEntry);


        localStorage.setItem("myDagbok", JSON.stringify(myDagbokDeserialized));

        renderPage();

    } else {

        let myDagbok = [];


        let newDagbokEntry =

        {
            headline: dagbokHeadline.value,
            text: dagbokText.value,
            date: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()

        }

        myDagbok.push(newDagbokEntry);


        localStorage.setItem("myDagbok", JSON.stringify(myDagbok));

        renderPage();
    }

});


// funktion som läser av array i localstorage och renderar sidan med alla inlägg

function renderPage() {

    dagbokHeadline.value = "";
    dagbokText.value = "";

    myDagbokSerialized = localStorage.getItem("myDagbok");

    if (myDagbokSerialized === null) {


    } else if (myDagbokSerialized != null) {

        myEntries.innerHTML = "";

        myDagbokDeserialized = JSON.parse(localStorage.getItem("myDagbok"));

        for (var i = myDagbokDeserialized.length - 1; i >= 0; i--) {
            let dagbokEntry = myDagbokDeserialized[i];

            let newEntryContainer = document.createElement("div")
            newEntryContainer.setAttribute("class", "entryContainer")
            newEntryContainer.id = [i];

            let newEntryHeadline = document.createElement("h1")
            newEntryHeadline.classList = "headlineStyle";
            let newEntryText = document.createElement("p")
            newEntryText.classList = "textStyle"
            let newEntryCDate = document.createElement("h3")
            newEntryCDate.classList = "dateStyle"

            let entryDeleteBtn = document.createElement("button");
            entryDeleteBtn.classList = "deleteBtn";
            entryDeleteBtn.innerText = "X";

            
            let editBtnIcon = document.createElement("img");
            editBtnIcon.src = "./img/edit.png";
            editBtnIcon.width = "30"
            editBtnIcon.alt = "edit icon";
            editBtnIcon.classList = "editBtn";
            

            newEntryHeadline.innerText = dagbokEntry.headline
            newEntryText.innerText = dagbokEntry.text;
            newEntryCDate.innerText = dagbokEntry.date;
            newEntryContainer.append(newEntryHeadline, newEntryText, newEntryCDate, editBtnIcon, entryDeleteBtn);
            myEntries.append(newEntryContainer);

        };

    };

};

// avgör om användaren vill radera eller redigera ett tidigare inlägg 

myEntries.addEventListener("click", function (evt) {

    let usersClickTarget = evt.target.classList.value;

    if (usersClickTarget === "editBtn") {

        let toChange = evt.target.parentElement.id;

        renderPreview(toChange);

    } else if (usersClickTarget === "deleteBtn" ) {

        let toDelete = evt.target.parentElement.id;

        myDagbokDeserialized = JSON.parse(localStorage.getItem("myDagbok"));

        myDagbokDeserialized.splice(toDelete,1)

        localStorage.setItem("myDagbok", JSON.stringify(myDagbokDeserialized));

        renderPage();
        
    }

});


// om användaren valt att redigera ett inlägg så kommer vi hit och sparar sedan ändringarna i localstorage och uppdaterar sidan

function renderPreview(chosenEntryToPreview) {


    myDagbokDeserialized = JSON.parse(localStorage.getItem("myDagbok"));

    let thisEntry = myDagbokDeserialized[chosenEntryToPreview];

    let previewContainer = document.createElement("div");
    previewContainer.id = "previewContainer";

    let previewSection = document.createElement("div");
    previewSection.id = "previewSection";

    aside.append(previewContainer)
    previewContainer.append(previewSection);

    let entryPreviewHeadline = document.createElement("input");
    entryPreviewHeadline.setAttribute("type", "text");
    entryPreviewHeadline.value = thisEntry.headline;
    entryPreview = document.createElement("textarea");
    entryPreview.value = thisEntry.text;
    let updateBtn = document.createElement("button");
    updateBtn.id = "updateBtn";
    updateBtn.innerText = "Spara ändringar"

    previewSection.append(entryPreviewHeadline, entryPreview, updateBtn);

    gsap.from("#previewSection", { x: +2000, duration: 1, ease: "power2.in" });


    updateBtn.addEventListener("click", function () {
  

        gsap.to("#previewContainer", { x: +2000, duration: 1, ease: "power2.in" });

        let updateDagbokEntry =

        {
            headline: entryPreviewHeadline.value,
            text: entryPreview.value,
            date: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString()

        }

        myDagbokDeserialized.splice(chosenEntryToPreview, 1);

        myDagbokDeserialized.push(updateDagbokEntry);

        localStorage.setItem("myDagbok", JSON.stringify(myDagbokDeserialized));

        setInterval(() => {

            previewContainer.remove();

        }, 1000);

        renderPage();

    });
};