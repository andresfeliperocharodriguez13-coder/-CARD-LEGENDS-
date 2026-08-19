/* =========================
   LÓGICA DE BATALLA Y COMBATE
========================= */

let mazoCPU = [];
let cartasActivasJugador = [];
let cartasActivasCPU = [];
let turnoJugador = true;
let indiceLuchaActual = 0; // Índice de la carta que está peleando actualmente

function iniciarBatalla() {
    const mazoJugador = JSON.parse(localStorage.getItem("mazoJugador"));
    
    if (!mazoJugador) {
        alert("No se encontró ningún mazo. Volviendo a la selección...");
        location.reload();
        return;
    }
    
    // CPU elige 5 cartas aleatorias del pool disponible
    const pool = window.listaCartas || [];
    mazoCPU = [];
    for(let i = 0; i < 5; i++) {
        let cartaRandom = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : { nombre: "Minion", vida: 400, ataque: 50, hab1: "Golpe", img: "" };
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

    // Sincronizar el mazo activo de la CPU para que renderice correctamente
    cartasActivasCPU = mazoCPU.map(c => ({
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
    if (!pantalla) return;
    
    pantalla.innerHTML = `
        <h2 class="titulo-batalla">Combate por Líneas - La Grieta del Invocador</h2>
        <div class="area-combate" style="display:flex; justify-content:space-around; margin-top:20px;">
            <div class="columna-jugador" style="flex:1; text-align:center;">
                <div class="columna-titulo" style="font-weight:bold; margin-bottom:10px;">Tu Mazo</div>
                <div id="jugador-zone" style="display:flex; flex-direction:column; gap:10px; align-items:center;"></div>
            </div>
            <div class="columna-cpu" style="flex:1; text-align:center;">
                <div class="columna-titulo" style="font-weight:bold; margin-bottom:10px;">Mazo de la CPU</div>
                <div id="cpu-zone" style="display:flex; flex-direction:column; gap:10px; align-items:center;"></div>
            </div>
        </div>
        <div id="log-batalla" style="text-align:center; margin-top:20px; font-weight:bold; color:#c8aa6e;">Cargando estado del combate...</div>
    `;

    const zoneJ = document.getElementById("jugador-zone");
    const zoneC = document.getElementById("cpu-zone");

    // Renderizar cartas del jugador
    cartasActivasJugador.forEach((c, idx) => {
        let porcentajeVida = Math.max(0, (c.vidaActual / c.vidaMax) * 100);
        let esActiva = (idx === indiceLuchaActual && c.vidaActual > 0);
        let derrotada = c.vidaActual <= 0;

        zoneJ.innerHTML += `
            <div class="carta-combate ${esActiva ? 'activa' : ''} ${derrotada ? 'derrotada' : ''}" id="carta-jug-${idx}" style="background:#1e2c40; border:2px solid ${esActiva ? '#00bfff' : '#3a4a60'}; padding:10px; border-radius:6px; width:220px; opacity:${derrotada ? '0.5' : '1'};">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="text-align:left; flex:1;">
                        <strong>${c.nombre}</strong><br>
                        <small style="color:#c8aa6e;">❤️ ${c.vidaActual} / ${c.vidaMax}</small>
                    </div>
                </div>
                <div class="barra-vida-container" style="background:#09101a; height:8px; border-radius:4px; margin-top:8px; overflow:hidden;">
                    <div class="vida-actual" style="width: ${porcentajeVida}%; background:#2ecc71; height:100%;"></div>
                </div>
                ${esActiva ? `
                    <div class="botones-habilidades" style="display:flex; gap:5px; margin-top:10px; justify-content:center;">
                        <button class="btn-hab" ${!turnoJugador ? 'disabled' : ''} onclick="atacar(${idx}, 'basico')">Básico</button>
                        <button class="btn-hab" ${!turnoJugador ? 'disabled' : ''} onclick="atacar(${idx}, 'hab1')">${c.hab1 || 'Habilidad'}</button>
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
            <div class="carta-combate ${esActiva ? 'activa' : ''} ${derrotada ? 'derrotada' : ''}" id="carta-cpu-${idx}" style="background:#2c1e1e; border:2px solid ${esActiva ? '#ff4d4d' : '#603a3a'}; padding:10px; border-radius:6px; width:220px; opacity:${derrotada ? '0.5' : '1'};">
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="text-align:left; flex:1;">
                        <strong>${c.nombre}</strong><br>
                        <small style="color:#c8aa6e;">❤️ ${c.vidaActual} / ${c.vidaMax}</small>
                    </div>
                </div>
                <div class="barra-vida-container" style="background:#09101a; height:8px; border-radius:4px; margin-top:8px; overflow:hidden;">
                    <div class="vida-actual" style="width: ${porcentajeVida}%; background: #e74c3c; height:100%;"></div>
                </div>
            </div>
        `;
    });
}

// Lógica de ataque del Jugador
function atacar(index, tipo) {
    if (!turnoJugador) return;

    let cartaJugador = cartasActivasJugador[index];
    let cartaCPU = cartasActivasCPU[indiceLuchaActual];

    let danio = 0;
    if (tipo === 'basico') {
        danio = Math.floor(cartaJugador.ataque * 0.8);
        actualizarLog(`¡${cartaJugador.nombre} usó ataque básico causando ${danio} de daño!`);
    } else if (tipo === 'hab1') {
        danio = Math.floor(cartaJugador.ataque * 1.2);
        actualizarLog(`¡${cartaJugador.nombre} usó su habilidad y causó ${danio} de daño!`);
    } else if (tipo === 'ulti') {
        if (cartaJugador.cdUlti > 0) {
            actualizarLog(`¡La definitiva está en enfriamiento! Faltan ${cartaJugador.cdUlti} turnos.`);
            return;
        }
        danio = Math.floor(cartaJugador.ataque * 2.0);
        cartaJugador.cdUlti = 3; 
        actualizarLog(`¡⚡ ${cartaJugador.nombre} lanzó su ULTIMATE causando ${danio} de daño masivo!`);
    }

    cartasActivasJugador.forEach(c => { if(c.cdUlti > 0) c.cdUlti--; });

    cartaCPU.vidaActual = Math.max(0, cartaCPU.vidaActual - danio);
    aplicarEfectoDanio('cpu', indiceLuchaActual);
    renderizarBatalla();

    if (cartaCPU.vidaActual <= 0) {
        actualizarLog(`¡La carta enemiga ${cartaCPU.nombre} ha caído!`);
        setTimeout(() => avanzarSiguienteLinea(), 1500);
        return;
    }

    turnoJugador = false;
    setTimeout(() => turnoDeLaCPU(), 1500);
}

// Turno de ataque automático de la CPU
function turnoDeLaCPU() {
    let cartaJugador = cartasActivasJugador[indiceLuchaActual];
    let cartaCPU = cartasActivasCPU[indiceLuchaActual];

    if (!cartaJugador || !cartaCPU || cartaJugador.vidaActual <= 0 || cartaCPU.vidaActual <= 0) return;

    let tiposAtaque = ['basico', 'hab1'];
    let eleccion = tiposAtaque[Math.floor(Math.random() * tiposAtaque.length)];
    let danio = eleccion === 'basico' ? Math.floor(cartaCPU.ataque * 0.8) : Math.floor(cartaCPU.ataque * 1.1);

    actualizarLog(`🤖 La CPU (${cartaCPU.nombre}) contraataca y te causa ${danio} de daño.`);
    
    cartaJugador.vidaActual = Math.max(0, cartaJugador.vidaActual - danio);
    aplicarEfectoDanio('jug', indiceLuchaActual);
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
    let vidasCPUTotal = cartasActivasCPU.reduce((acc, c) => acc + c.vidaActual, 0);

    const pantalla = document.getElementById("pantallaBatalla");
    if (!pantalla) return;

    if (vidasJugadorTotal >= vidasCPUTotal) {
        pantalla.innerHTML = `
            <div style="text-align:center; margin-top:100px;">
                <h1 style="color:#2ecc71; font-size:48px;">¡VICTORIA ÉPICA!</h1>
                <p style="color:#f0e6d2; font-size:20px; margin-top:15px;">Has superado todas las líneas y derrotado a la CPU.</p>
                <button class="btn-hab" style="margin-top:20px; padding:12px 25px; font-size:16px; cursor:pointer;" onclick="location.reload()">Jugar de Nuevo</button>
            </div>
        `;
    } else {
        pantalla.innerHTML = `
            <div style="text-align:center; margin-top:100px;">
                <h1 style="color:#e74c3c; font-size:48px;">DERROTA</h1>
                <p style="color:#f0e6d2; font-size:20px; margin-top:15px;">Tu mazo no pudo con la fuerza del enemigo.</p>
                <button class="btn-hab" style="margin-top:20px; padding:12px 25px; font-size:16px; cursor:pointer;" onclick="location.reload()">Reintentar</button>
            </div>
        `;
    }
}

function aplicarEfectoDanio(banco, index) {
    setTimeout(() => {
        const elemento = document.getElementById(`carta-${banco}-${index}`);
        if (elemento) {
            elemento.style.transform = "scale(0.95)";
            elemento.style.filter = "brightness(1.5)";
            setTimeout(() => {
                elemento.style.transform = "scale(1)";
                elemento.style.filter = "brightness(1)";
            }, 300);
        }
    }, 100);
}

function actualizarLog(texto) {
    const log = document.getElementById("log-batalla");
    if (log) log.textContent = texto;
}