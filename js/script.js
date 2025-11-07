let burger = document.querySelector(".burger > i");
let menu_opt = document.querySelector("#menu_pr"); // antes .navbar__menu

// Variable para saber si el menu esta abierto o cerrado
let isOpen = false;

// Definimos evento click sobre el botón del menú
burger.addEventListener("click", function(){

    burger.classList.toggle("fa-bars");
    burger.classList.toggle("fa-times");
    menu_opt.classList.toggle("menu-show");

});


let menuLinks = document.querySelectorAll("#menu_pr a");

// Cerrar menú al hacer click en cualquier opción
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    // Solo cerramos si está abierto
    if(menu_opt.classList.contains("menu-show")){
      menu_opt.classList.remove("menu-show");

      burger.classList.add("fa-bars");
      burger.classList.remove("fa-times");
    }
  });
});


//Navbar al scrollear
const header = document.querySelector("header");

window.addEventListener("scroll", function() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Abrir el modal correspondiente
document.querySelectorAll(".openModal").forEach(btn => {
  btn.addEventListener("click", () => {
    const selector = btn.dataset.target;     // Ej: #modal-7
    const modal = document.querySelector(selector);
    if (modal) {
      modal.classList.add("show-modal");
    }
  });
});

// Cerrar con X o botón aceptar
document.querySelectorAll(".modalWindow .close, .modalWindow .btn-accept").forEach(el => {
  el.addEventListener("click", () => {
    const modal = el.closest(".modalWindow");
    modal.classList.remove("show-modal");
  });
});

// Cerrar clic fuera del contenido
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modalWindow")) {
    event.target.classList.remove("show-modal");
  }
});

document.addEventListener("DOMContentLoaded", function () {
    // Seleccciona todos los inputs del formulario
    const inputs = document.querySelectorAll("input");

    // Bucle forEach y llamada a función con arrow function (ECMAScript 6)
    inputs.forEach((input) => {
        input.onchange = function () {
            console.log("Cambio en el input");
            console.log(input.value);

            if (input.type != "radio") {
                if (input.value == "") {
                    input.classList.remove("valid");
                    input.classList.add("error");
                } else {
                    input.classList.remove("error");
                    input.classList.add("valid");
                }
            }

            // Validación email
            if (input.type == "email") {
                let error_email = document.querySelector("#email_error");
                if (!input.value.includes("@")) {
                    input.classList.remove("valid");
                    input.classList.add("error");
                    error_email.classList.add("error");
                } else {
                    input.classList.remove("error");
                    input.classList.add("valid");
                    error_email.classList.remove("error");
                }
            }

            // Validacion si los campos tienen un valor y no tienen error habilitamos el boton
            const button = document.querySelector("#submit");
            const inputs = document.querySelectorAll("input");
            let valid = true;
            inputs.forEach((input) => {
                if (input.classList.contains("error") || input.value == "") {
                    valid = false;
                }
            });

            if (valid) {
                button.classList.remove("disabled");
            } else {
                button.classList.add("disabled");
            }
        };
        // Fin evento onchange
    });
    // Fin bucle forEach

    // Lógica fechas
    var currentDateTime = new Date();
    var year = currentDateTime.getFullYear();
    var month = currentDateTime.getMonth() + 1;
    var date = currentDateTime.getDate() + 1;

    if (date < 10) {
        date = "0" + date;
    }
    if (month < 10) {
        month = "0" + month;
    }

    var dateTomorrow = year + "-" + month + "-" + date;
    var checkinElem = document.querySelector("#checkin-date");
    var checkoutElem = document.querySelector("#checkout-date");

    checkinElem.setAttribute("min", dateTomorrow);

    checkinElem.onchange = function () {
        checkoutElem.setAttribute("min", this.value);
    };
});
