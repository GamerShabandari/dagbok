const inputSection = document.getElementById("inputSection");
const previewContainer = document.getElementById("previewContainer");

let myEntries = document.getElementById("myEntries");

const dagbokHeadline = document.getElementById("dagbokHeadline");
const dagbokText = document.getElementById("dagbokText");
const dagbokBtn = document.getElementById("dagbokBtn");

window.onload = renderPage();

dagbokBtn.addEventListener("click", function () {

    myDagbokSerialized = localStorage.getItem("myDagbok");

    if (myDagbokSerialized) {

        let myDagbokDeserialized = JSON.parse(localStorage.getItem("myDagbok"));

        let newDagbokEntry =

        {
            headline: dagbokHeadline.value,
            text: dagbokText.value,
            date: new Date()

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
            date: new Date()

        }

        myDagbok.push(newDagbokEntry);


        localStorage.setItem("myDagbok", JSON.stringify(myDagbok));

        renderPage();
    }

});

function renderPage() {

    dagbokHeadline.value = "";
    dagbokText.value = "";

    myDagbokSerialized = localStorage.getItem("myDagbok");

    if (myDagbokSerialized === null) {

        


    } else if (myDagbokSerialized != null) {

        myEntries.innerHTML = "";

        myDagbokDeserialized = JSON.parse(localStorage.getItem("myDagbok"));

        for (let i = 0; i < myDagbokDeserialized.length; i++) {
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

            newEntryHeadline.innerText = dagbokEntry.headline
            newEntryText.innerText = dagbokEntry.text;
            newEntryCDate.innerText = dagbokEntry.date;
            newEntryContainer.append(newEntryHeadline, newEntryText, newEntryCDate);
            myEntries.append(newEntryContainer);

        };

    };

};

myEntries.addEventListener("click", function (evt) {

    let chosenEntry = evt.target.parentElement.id;

    if (chosenEntry >= 0) {

        renderPreview(chosenEntry);

    }

});



function renderPreview(chosenEntryToPreview) {


    myDagbokDeserialized = JSON.parse(localStorage.getItem("myDagbok"));

    let thisEntry = myDagbokDeserialized[chosenEntryToPreview];

    let previewSection = document.createElement("div");
    previewSection.id = "previewSection";

    previewContainer.append(previewSection);

    let entryPreviewHeadline = document.createElement("input");
    entryPreviewHeadline.setAttribute("type", "text");
    entryPreviewHeadline.value = thisEntry.headline;
    entryPreview = document.createElement("textarea");
    entryPreview.value = thisEntry.text;
    let updateBtn = document.createElement("button");
    updateBtn.id = "updateBtn";
    updateBtn.innerText = "Update"

    previewSection.append(entryPreviewHeadline, entryPreview, updateBtn);

    gsap.from("#previewSection", { x: +1000, duration: 1, ease: "power2.in" });

    gsap.to("#inputSection", { x: -1000, duration: 1, ease: "power2.in" });



    updateBtn.addEventListener("click", function () {

        gsap.to("#previewSection", { x: +1000, duration: 1, ease: "power2.in" });

        gsap.to("#inputSection", { x: "auto", duration: 1, ease: "power2.in" });

        let updateDagbokEntry =

        {
            headline: entryPreviewHeadline.value,
            text: entryPreview.value,
            date: new Date()

        }

        myDagbokDeserialized.splice(chosenEntryToPreview, 1, updateDagbokEntry);

        localStorage.setItem("myDagbok", JSON.stringify(myDagbokDeserialized));

        setInterval(() => {

            previewSection.remove();

        }, 1000);

        renderPage();

    });
};




