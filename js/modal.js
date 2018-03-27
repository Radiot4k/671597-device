var writeUsLink = document.querySelector(".write-us");            // Ссылка "Напишите нам"
var writeUsPopap = document.querySelector(".modal-write-us");     // Модальное окно формы отправки сообщения
var close = writeUsPopap.querySelector(".modal-close");           // Кнопка закрыть Модальное окно формы отправки сообщения
var form = writeUsPopap.querySelector(".write-us-form");          // Форма отправки сообщения
var inputName = writeUsPopap.querySelector("[name='name']");      // Поле ввода "Имя Фамилия"
var inputEmail = writeUsPopap.querySelector("[name='e-mail']");   // Поле ввода "E-mail"
var textarea = writeUsPopap.querySelector("[name='text']");       // Поле ввода текстового сообщения
var openMapLink = document.querySelector(".open-map");            // Ссылка на большую карту
var mapPopap = document.querySelector(".modal-map");              // Модальное окно карты
var closeMap = mapPopap.querySelector(".modal-close");            // Кнопка закрыть модальное окно карты
var overlay = document.querySelector(".modal-overlay");           // overlay
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

close.addEventListener("click", function(evt) {
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