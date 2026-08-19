/* =========================
   LÓGICA DE SELECCIÓN DE CARTAS AUTOMÁTICA
========================= */

let mazoJugador = [];
const MAX_CARTAS_MAZO = 5;

document.addEventListener("DOMContentLoaded", () => {
    const gridCartas = document.getElementById("gridCartas");
    const slotMazoContainer = document.getElementById("slotMazoContainer");

    if (typeof listaCartas === "undefined") {
        window.listaCartas = [
            { id: 1, nombre: "Thresh", rol: "TANQUE", vida: 630, ataque: 75 },
            { id: 2, nombre: "Viego", rol: "ASESINO", vida: 540, ataque: 92 },
            { id: 3, nombre: "Yasuo", rol: "LUCHADOR", vida: 560, ataque: 95 },
            { id: 4, nombre: "Yone", rol: "LUCHADOR", vida: 570, ataque: 94 },
            { id: 5, nombre: "Zed", rol: "ASESINO", vida: 510, ataque: 99 },
            { id: 6, nombre: "Ahri", rol: "MAGO", vida: 500, ataque: 88 },
            { id: 7, nombre: "Darius", rol: "COLOSO", vida: 650, ataque: 90 },
            { id: 8, nombre: "Lux", rol: "MAGO", vida: 490, ataque: 93 },
            { id: 9, nombre: "Jinx", rol: "TIRADOR", vida: 520, ataque: 98 },
            { id: 10, nombre: "Lee Sin", rol: "LUCHADOR", vida: 580, ataque: 86 },
            { id: 11, nombre: "Caitlyn", rol: "TIRADOR", vida: 510, ataque: 82 },
            { id: 12, nombre: "Garen", rol: "COLOSO", vida: 660, ataque: 84 },
            { id: 13, nombre: "Akali", rol: "ASESINO", vida: 500, ataque: 96 },
            { id: 14, nombre: "Katarina", rol: "ASESINO", vida: 510, ataque: 95 },
            { id: 15, nombre: "Jhin", rol: "TIRADOR", vida: 585, ataque: 91 },
            { id: 16, nombre: "Ezreal", rol: "TIRADOR", vida: 530, ataque: 87 },
            { id: 17, nombre: "Sett", rol: "LUCHADOR", vida: 640, ataque: 89 },
            { id: 18, nombre: "Sylas", rol: "MAGO", vida: 575, ataque: 85 },
            { id: 19, nombre: "Pyke", rol: "ASESINO", vida: 600, ataque: 80 },
            { id: 20, nombre: "Kayn", rol: "ASESINO", vida: 550, ataque: 92 }
        ];
    }

    if (!gridCartas) return;

    function cargarCartasDisponibles() {
        gridCartas.innerHTML = "";
        listaCartas.forEach(carta => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("carta");
            cardDiv.dataset.id = carta.id;
            cardDiv.style.cursor = "pointer";
            cardDiv.style.background = "#0d1726";
            cardDiv.style.border = "2px solid #3a4a60";
            cardDiv.style.borderRadius = "8px";
            cardDiv.style.overflow = "hidden";
            cardDiv.style.transition = "all 0.2s ease";

            cardDiv.innerHTML = `
                <div class="carta-img-container" style="height: 90px; background: #1a2638; display:flex; align-items:center; justify-content:center; color:#c8aa6e; font-size:20px; font-weight:bold;">
                    ${carta.nombre.substring(0, 2).toUpperCase()}
                </div>
                <div class="carta-info" style="padding: 8px; text-align: center;">
                    <div class="carta-nombre" style="font-weight:bold; color:#f0e6d2; font-size: 13px;">${carta.nombre}</div>
                    <div class="carta-rol" style="font-size:10px; color:#c8aa6e; margin-bottom: 4px;">${carta.rol}</div>
                    <div class="carta-stats" style="display:flex; justify-content:space-around; font-size:11px; color:#a09b8c;">
                        <span>❤️ ${carta.vida}</span>
                        <span>⚔️ ${carta.ataque}</span>
                    </div>
                </div>
            `;

            cardDiv.addEventListener("click", () => {
                const index = mazoJugador.findIndex(c => c.id === carta.id);

                if (index !== -1) {
                    mazoJugador.splice(index, 1);
                    cardDiv.style.borderColor = "#3a4a60";
                    cardDiv.style.boxShadow = "none";
                } else {
                    if (mazoJugador.length < MAX_CARTAS_MAZO) {
                        mazoJugador.push(carta);
                        cardDiv.style.borderColor = "#00bfff";
                        cardDiv.style.boxShadow = "0 0 12px rgba(0, 191, 255, 0.4)";
                    }
                }
                
                actualizarVisualMazo();

                // 🚀 DISPARADOR AUTOMÁTICO: Si llega a 5 cartas, arranca la batalla solo
                if (mazoJugador.length === MAX_CARTAS_MAZO) {
                    localStorage.setItem("mazoJugador", JSON.stringify(mazoJugador));
                    
                    const pantallaCartas = document.getElementById("pantallaCartas");
                    const pantallaBatalla = document.getElementById("pantallaBatalla");
                    
                    if (pantallaCartas) pantallaCartas.style.display = "none";
                    if (pantallaBatalla) pantallaBatalla.style.display = "block";
                    
                    if (typeof iniciarBatalla === "function") {
                        iniciarBatalla();
                    }
                }
            });

            gridCartas.appendChild(cardDiv);
        });
    }

    function actualizarVisualMazo() {
        if (!slotMazoContainer) return;
        slotMazoContainer.innerHTML = "";
        
        const tituloMazo = document.querySelector(".seccion-mazo h3");
        if(tituloMazo) {
            tituloMazo.textContent = `TU MAZO DE BATALLA (${mazoJugador.length}/${MAX_CARTAS_MAZO}) - ¡Elige 5 para iniciar!`;
        }

        for (let i = 0; i < MAX_CARTAS_MAZO; i++) {
            const slot = document.createElement("div");
            slot.style.width = "70px";
            slot.style.height = "90px";
            slot.style.borderRadius = "6px";
            slot.style.display = "flex";
            slot.style.alignItems = "center";
            slot.style.justifyContent = "center";
            slot.style.fontSize = "11px";
            slot.style.textAlign = "center";
            slot.style.fontWeight = "bold";

            if (mazoJugador[i]) {
                slot.style.background = "#1e2c40";
                slot.style.border = "2px solid #00bfff";
                slot.style.color = "#f0e6d2";
                slot.textContent = mazoJugador[i].nombre;
            } else {
                slot.style.background = "#09101a";
                slot.style.border = "2px dashed #3a4a60";
                slot.style.color = "#556680";
                slot.textContent = `Slot ${i + 1}`;
            }

            slotMazoContainer.appendChild(slot);
        }
    }

    cargarCartasDisponibles();
    actualizarVisualMazo();
});