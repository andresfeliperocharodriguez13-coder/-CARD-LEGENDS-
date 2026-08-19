/* =========================
   LÓGICA DE SELECCIÓN DE CARTAS Y MAZO
========================= */

let mazoJugador = [];
const MAX_CARTAS_MAZO = 5;

document.addEventListener("DOMContentLoaded", () => {
    const gridCartas = document.getElementById("gridCartas");
    const slotMazoContainer = document.getElementById("slotMazoContainer");
    const btnConfirmarMazo = document.getElementById("btnConfirmarMazo");

    if (!gridCartas) return; // Si no estamos en la pantalla de cartas, salir

    // 1. Renderizar las 20 cartas en la interfaz
    function cargarCartasDisponibles() {
        gridCartas.innerHTML = "";
        listaCartas.forEach(carta => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("carta");
            cardDiv.dataset.id = carta.id;

            cardDiv.innerHTML = `
                <div class="carta-img-container">
                    <img src="${carta.img}" alt="${carta.nombre}" onerror="this.src='img/avatares/default.jpg'">
                </div>
                <div class="carta-info">
                    <div class="carta-nombre">${carta.nombre}</div>
                    <div class="carta-rol">${carta.rol}</div>
                    <div class="carta-stats">
                        <span>❤️ ${carta.vida}</span>
                        <span>⚔️ ${carta.ataque}</span>
                    </div>
                </div>
            `;

            // Evento click para seleccionar o deseleccionar carta
            cardDiv.addEventListener("click", () => gestionarSeleccionCarta(carta, cardDiv));
            gridCartas.appendChild(cardDiv);
        });
    }

    // 2. Gestionar lógica de selección / deselección (clic para añadir, clic de nuevo para quitar)
    function gestionarSeleccionCarta(carta, elementoDOM) {
        const index = mazoJugador.findIndex(c => c.id === carta.id);

        if (index !== -1) {
            // Si ya estaba seleccionada, la removemos del mazo
            mazoJugador.splice(index, 1);
            elementoDOM.classList.remove("seleccionado");
        } else {
            // Si no está seleccionada, verificamos que no pasemos el límite de 5
            if (mazoJugador.length < MAX_CARTAS_MAZO) {
                mazoJugador.push(carta);
                elementoDOM.classList.add("seleccionado");
            } else {
                alert("¡Ya has seleccionado las 5 cartas para tu mazo! Haz clic en una carta seleccionada para quitarla.");
            }
        }

        actualizarVisualMazo();
    }

    // 3. Actualizar la ranura visual del mazo inferior
    function actualizarVisualMazo() {
        slotMazoContainer.innerHTML = "";

        for (let i = 0; i < MAX_CARTAS_MAZO; i++) {
            const slot = document.createElement("div");
            
            if (mazoJugador[i]) {
                slot.classList.add("slot-lleno");
                slot.style.backgroundImage = `url('${mazoJugador[i].img}')`;
                slot.style.backgroundSize = "cover";
                slot.style.backgroundPosition = "center";
                slot.style.border = "2px solid #00bfff";
                slot.style.borderRadius = "8px";
            } else {
                slot.classList.add("slot-vacio");
                slot.textContent = `Slot ${i + 1}`;
            }

            slotMazoContainer.appendChild(slot);
        }

        // Habilitar o deshabilitar botón de confirmar
        if (mazoJugador.length === MAX_CARTAS_MAZO) {
            btnConfirmarMazo.removeAttribute("disabled");
        } else {
            btnConfirmarMazo.setAttribute("disabled", "true");
        }
    }

    // 4. Confirmar Mazo y pasar a la Batalla
    btnConfirmarMazo.addEventListener("click", () => {
        if (mazoJugador.length === MAX_CARTAS_MAZO) {
            localStorage.setItem("mazoJugador", JSON.stringify(mazoJugador));
            
            // Ocultar pantalla de cartas y mostrar pantalla de batalla
            document.getElementById("pantallaCartas").style.display = "none";
            document.getElementById("pantallaBatalla").style.display = "block";

            // Aquí dispararemos la inicialización de la batalla en el siguiente paso
            if (typeof iniciarBatalla === "function") {
                iniciarBatalla();
            }
        }
    });

    cargarCartasDisponibles();
    actualizarVisualMazo();
});