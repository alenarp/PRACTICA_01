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
