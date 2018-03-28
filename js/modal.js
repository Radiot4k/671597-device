var linksList = document.querySelectorAll(".write-us, .modal-write-us, .open-map, .modal-map, .modal-overlay");
var openMapLink = linksList.item(0);
var writeUsLink = linksList.item(1);
var writeUsPopap = linksList.item(2); 
var mapPopap = linksList.item(3);
var overlay = linksList.item(4);
var writeUsElementsList = writeUsPopap.querySelectorAll(".write-us-form, [name='name'], [name='e-mail'], [name='text'], .modal-close");
var form = writeUsElementsList.item(0);
var inputName = writeUsElementsList.item(1);
var inputEmail = writeUsElementsList.item(2);
var textarea = writeUsElementsList.item(3);
var closeWriteUsPopap = writeUsElementsList.item(4);
var closeMap = mapPopap.querySelector(".modal-close");

var isStorageSupport = true;
var storName = "";

try {
    storName = localStorage.getItem("name");
    storEmail = localStorage.getItem("email");
} catch (err) {
    isStorageSupport = false;
}

writeUsLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    writeUsPopap.classList.add("modal-show");
    overlay.classList.add("overlay-show");
    if (storName) {
        inputName.value = storName;
        if (storEmail) {
            inputEmail.value = storEmail;
            textarea.focus();
        }
        else {
            inputEmail.focus();
        }
    }
    else {
        inputName.focus();
    }
});

closeWriteUsPopap.addEventListener("click", function(evt) {
    evt.preventDefault();
    writeUsPopap.classList.remove("modal-show");
    overlay.classList.remove("overlay-show");
    if (writeUsPopap.classList.contains("modal-error")) {
        writeUsPopap.classList.remove("modal-error");
    }
});

form.addEventListener("submit", function(evt) {
    if (!inputName.value || !inputEmail.value || !textarea.value) {
        evt.preventDefault();
        writeUsPopap.classList.remove("modal-error");
        writeUsPopap.offsetWidth = writeUsPopap.offsetWidth;
        writeUsPopap.classList.add("modal-error");
    }   else {
        if(isStorageSupport) {
            localStorage.setItem("name", inputName.value);
            localStorage.setItem("email", inputEmail.value);
        }
    }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        if (writeUsPopap.classList.contains("modal-show")) {
            writeUsPopap.classList.remove("modal-show");
        }
        if (writeUsPopap.classList.contains("modal-error")) {
            writeUsPopap.classList.remove("modal-error");
        }
        overlay.classList.remove("overlay-show");
    }
});

openMapLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    mapPopap.classList.add("modal-show");
    overlay.classList.add("overlay-show");
});

closeMap.addEventListener("click", function(evt) {
    evt.preventDefault();
    mapPopap.classList.remove("modal-show");
    overlay.classList.remove("overlay-show");
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        if (mapPopap.classList.contains("modal-show")) {
            mapPopap.classList.remove("modal-show");
        }
        overlay.classList.remove("overlay-show");
    }
});