let mazoCPU = [];
let cartasActivasJugador = [];
let cartasActivasCPU = [];
let turnoJugador = true;
let indiceLuchaActual = 0; // Índice de la carta que está peleando actualmente

function iniciarBatalla() {
    const mazoJugador = JSON.parse(localStorage.getItem("mazoJugador"));
    
    // CPU elige 5 cartas aleatorias
    mazoCPU = [];
    for(let i = 0; i < 5; i++) {
        let cartaRandom = listaCartas[Math.floor(Math.random() * listaCartas.length)];
        mazoCPU.push({
            ...cartaRandom, 
            vidaActual: cartaRandom.vida, 
            vidaMax: cartaRandom.vida,
            cdUlti: 0 
        });
    }

    cartasActivasJugador = mazoJugador.map(c => ({
        ...c, 
        vidaActual: c.vida, 
        vidaMax: c.vida,
        cdUlti: 0
    }));

    indiceLuchaActual = 0;
    turnoJugador = true;
    renderizarBatalla();
    actualizarLog("¡La batalla en La Grieta ha comenzado! Es tu turno.");
}

function renderizarBatalla() {
    const pantalla = document.getElementById("pantallaBatalla");
    
    pantalla.innerHTML = `
        <h2 class="titulo-batalla">Combate por Líneas - La Grieta del Invocador</h2>
        <div class="area-combate">
            <div class="columna-jugador">
                <div class="columna-titulo">Tu Mazo</div>
                <div id="jugador-zone" style="display:flex; flex-direction:column; gap:10px;"></div>
            </div>
            <div class="columna-cpu">
                <div class="columna-titulo">Mazo de la CPU</div>
                <div id="cpu-zone" style="display:flex; flex-direction:column; gap:10px;"></div>
            </div>
        </div>
        <div id="log-batalla">Cargando estado del combate...</div>
    `;

    const zoneJ = document.getElementById("jugador-zone");
    const zoneC = document.getElementById("cpu-zone");

    // Renderizar cartas del jugador
    cartasActivasJugador.forEach((c, idx) => {
        let porcentajeVida = Math.max(0, (c.vidaActual / c.vidaMax) * 100);
        let esActiva = (idx === indiceLuchaActual && c.vidaActual > 0);
        let derrotada = c.vidaActual <= 0;

        zoneJ.innerHTML += `
            <div class="carta-combate ${esActiva ? 'activa' : ''} ${derrotada ? 'derrotada' : ''}" id="carta-jug-${idx}">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${c.img}" alt="${c.nombre}">
                    <div style="text-align:left; flex:1;">
                        <strong>${c.nombre}</strong><br>
                        <small style="color:#c8aa6e;">❤️ ${c.vidaActual} / ${c.vidaMax}</small>
                    </div>
                </div>
                <div class="barra-vida-container">
                    <div class="vida-actual" style="width: ${porcentajeVida}%"></div>
                </div>
                ${esActiva ? `
                    <div class="botones-habilidades">
                        <button class="btn-hab" ${!turnoJugador ? 'disabled' : ''} onclick="atacar(${idx}, 'basico')">Básico</button>
                        <button class="btn-hab" ${!turnoJugador ? 'disabled' : ''} onclick="atacar(${idx}, 'hab1')">${c.hab1}</button>
                        <button class="btn-hab" ${!turnoJugador ? 'disabled' : ''} onclick="atacar(${idx}, 'ulti')">ULTI (${c.cdUlti > 0 ? c.cdUlti : 'Lista'})</button>
                    </div>
                ` : ''}
            </div>
        `;
    });

    // Renderizar cartas de la CPU
    cartasActivasCPU.forEach((c, idx) => {
        let porcentajeVida = Math.max(0, (c.vidaActual / c.vidaMax) * 100);
        let esActiva = (idx === indiceLuchaActual && c.vidaActual > 0);
        let derrotada = c.vidaActual <= 0;

        zoneC.innerHTML += `
            <div class="carta-combate ${esActiva ? 'activa' : ''} ${derrotada ? 'derrotada' : ''}" id="carta-cpu-${idx}">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${c.img}" alt="${c.nombre}">
                    <div style="text-align:left; flex:1;">
                        <strong>${c.nombre}</strong><br>
                        <small style="color:#c8aa6e;">❤️ ${c.vidaActual} / ${c.vidaMax}</small>
                    </div>
                </div>
                <div class="barra-vida-container">
                    <div class="vida-actual" style="width: ${porcentajeVida}%; background: #e74c3c;"></div>
                </div>
            </div>
        `;
    });
}

// Lógica de ataque del Jugador
function atacar(index, tipo) {
    if (!turnoJugador) return;

    let cartaJugador = cartasActivasJugador[index];
    let cartaCPU = mazoCPU[indiceLuchaActual];

    let danio = 0;
    if (tipo === 'basico') {
        danio = Math.floor(cartaJugador.ataque * 0.8);
        actualizarLog(`¡${cartaJugador.nombre} usó ataque básico causando ${danio} de daño!`);
    } else if (tipo === 'hab1') {
        danio = cartaJugador.ataque * 1.2;
        actualizarLog(`¡${cartaJugador.nombre} usó su habilidad y causó ${danio} de daño!`);
    } else if (tipo === 'ulti') {
        if (cartaJugador.cdUlti > 0) {
            actualizarLog(`¡La definitiva está en enfriamiento! Faltan ${cartaJugador.cdUlti} turnos.`);
            return;
        }
        danio = cartaJugador.ataque * 2.0;
        cartaJugador.cdUlti = 3; // Pone enfriamiento de 3 turnos
        actualizarLog(`¡⚡ ${cartaJugador.nombre} lanzó su ULTIMATE causando ${danio} de daño masivo!`);
    }

    // Reducir enfriamientos de ulti del jugador si están activos
    cartasActivasJugador.forEach(c => { if(c.cdUlti > 0) c.cdUlti--; });

    cartaCPU.vidaActual = Math.max(0, cartaCPU.vidaActual - danio);
    aplicarEfectoDanio('cpu', indiceLuchaActual);
    renderizarBatalla();

    // Comprobar si la carta de la CPU fue derrotada
    if (cartaCPU.vidaActual <= 0) {
        actualizarLog(`¡La carta enemiga ${cartaCPU.nombre} ha caído!`);
        setTimeout(() => avanzarSiguienteLinea(), 1500);
        return;
    }

    // Pasar turno a la CPU
    turnoJugador = false;
    setTimeout(() => turnoDeLaCPU(), 1500);
}

// Turno de ataque automático de la CPU
function turnoDeLaCPU() {
    let cartaJugador = cartasActivasJugador[indiceLuchaActual];
    let cartaCPU = mazoCPU[indiceLuchaActual];

    if (cartaJugador.vidaActual <= 0 || cartaCPU.vidaActual <= 0) return;

    let tiposAtaque = ['basico', 'hab1'];
    let eleccion = tiposAtaque[Math.floor(Math.random() * tiposAtaque.length)];
    let danio = eleccion === 'basico' ? Math.floor(cartaCPU.ataque * 0.8) : Math.floor(cartaCPU.ataque * 1.1);

    actualizarLog(`🤖 La CPU (${cartaCPU.nombre}) contraataca y te causa ${danio} de daño.`);
    
    cartaJugador.vidaActual = Math.max(0, cartaJugador.vidaActual - danio);
    aplicarEfectoDanio('jugador', indiceLuchaActual);
    renderizarBatalla();

    if (cartaJugador.vidaActual <= 0) {
        actualizarLog(`❌ Tu campeón ${cartaJugador.nombre} ha sido derrotado.`);
        setTimeout(() => avanzarSiguienteLinea(), 1500);
        return;
    }

    turnoJugador = true;
    actualizarLog(`Es tu turno de nuevo. ¡Elige tu acción!`);
    renderizarBatalla();
}

// Avanzar a la siguiente línea/carta
function avanzarSiguienteLinea() {
    indiceLuchaActual++;

    // Condición de victoria o derrota final (cuando se acaban las 5 cartas)
    if (indiceLuchaActual >= 5) {
        verificarGanadorFinal();
        return;
    }

    turnoJugador = true;
    actualizarLog(`Avanzando a la siguiente línea del mapa... ¡Línea ${indiceLuchaActual + 1} iniciada!`);
    renderizarBatalla();
}

// Verificar si todas las cartas de un bando murieron
function verificarGanadorFinal() {
    let vidasJugadorTotal = cartasActivasJugador.reduce((acc, c) => acc + c.vidaActual, 0);
    let vidasCPUTotal = mazoCPU.reduce((acc, c) => acc + c.vidaActual, 0);

    const pantalla = document.getElementById("pantallaBatalla");
    if (vidasJugadorTotal >= vidasCPUTotal) {
        pantalla.innerHTML = `
            <div style="text-align:center; margin-top:100px;">
                <h1 style="color:#2ecc71; font-size:48px;">¡VICTORIA ÉPICA!</h1>
                <p style="color:#f0e6d2; font-size:20px; margin-top:15px;">Has superado todas las líneas y derrotado a la CPU.</p>
                <button class="btn-hab" style="margin-top:20px; padding:12px 25px; font-size:16px;" onclick="location.reload()">Jugar de Nuevo</button>
            </div>
        `;
    } else {
        pantalla.innerHTML = `<div><h1 style="color:#e74c3c;">DERROTA</h1><button onclick="location.reload()">Reintentar</button></div>`;
    }
}

function aplicarEfectoDanio(banco, index) {
    setTimeout(() => {
        const elemento = document.getElementById(`carta-${banco}-${index}`);
        if (elemento) {
            elemento.classList.add("recibiendo-danio");
            setTimeout(() => elemento.classList.remove("recibiendo-danio"), 400);
        }
    }, 100);
}

function actualizarLog(texto) {
    const log = document.getElementById("log-batalla");
    if (log) log.textContent = texto;
}