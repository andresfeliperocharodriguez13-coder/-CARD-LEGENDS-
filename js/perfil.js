let avatarSeleccionado = null;

let nombreJugador = "";


const avatares =
    document.querySelectorAll(".avatar");


const inputNombre =
    document.getElementById("nombreJugador");


const botonCrear =
    document.getElementById("crearPerfil");


const mensaje =
    document.getElementById("mensajePerfil");



/* =========================
   ELEGIR AVATAR
========================= */

avatares.forEach(function(avatar) {

    avatar.addEventListener("click", function() {

        avatares.forEach(function(item) {

            item.classList.remove("seleccionado");

        });


        avatar.classList.add("seleccionado");


        avatarSeleccionado =
            avatar.dataset.avatar;


        mensaje.textContent =
            "Avatar seleccionado";

    });

});



/* =========================
   CREAR PERFIL
========================= */

botonCrear.addEventListener("click", function() {

    nombreJugador =
        inputNombre.value.trim();


    if (nombreJugador === "") {

        mensaje.textContent =
            "Escribe tu nombre.";

        return;

    }


    if (avatarSeleccionado === null) {

        mensaje.textContent =
            "Selecciona un avatar.";

        return;

    }


    /* Guardamos los datos */

    localStorage.setItem(
        "nombreJugador",
        nombreJugador
    );


    localStorage.setItem(
        "avatarJugador",
        avatarSeleccionado
    );


    mensaje.textContent =
        "¡Perfil creado!";


    console.log(
        "Jugador:",
        nombreJugador
    );


    console.log(
        "Avatar:",
        avatarSeleccionado
    );


    /* Por ahora solamente mostramos el mensaje */

});

// Al validar y guardar el perfil exitosamente:
document.getElementById("crearPerfil").addEventListener("click", function() {
    // ... tus validaciones previas de nombre y avatar ...
    
    // Ocultar perfil y mostrar cartas
    document.getElementById("pantallaPerfil").style.display = "none";
    document.getElementById("pantallaCartas").style.display = "block";
});