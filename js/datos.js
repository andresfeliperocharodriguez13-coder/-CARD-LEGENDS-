/* =========================
   BASE DE DATOS DE CARTAS (20 CAMPEONES)
========================= */
const listaCartas = [
    { id: 1, nombre: "Aatrox", rol: "Luchador", vida: 650, ataque: 85, img: "img/cartas/aatrox.jpg", hab1: "Golpe Segador", hab2: "El Darkin", ulti: "Destello Umbrío" },
    { id: 2, nombre: "Ahri", rol: "Mago", vida: 500, ataque: 90, img: "img/cartas/ahri.jpg", hab1: "Orbe del Engaño", hab2: "Fuego Zorro", ulti: "Impulso Espiritual" },
    { id: 3, nombre: "Akali", rol: "Asesino", vida: 530, ataque: 95, img: "img/cartas/akali.jpg", hab1: "Ráfaga de Cinco Filos", hab2: "Manto Crepuscular", ulti: " Ejecución Perfecta" },
    { id: 4, nombre: "Ashe", rol: "Tirador", vida: 480, ataque: 92, img: "img/cartas/ashe.jpg", hab1: "Tiro Escarchado", hab2: "Concentración", ulti: "Flecha de Cristal" },
    { id: 5, nombre: "Caitlyn", rol: "Tirador", vida: 470, ataque: 94, img: "img/cartas/caitlyn.jpg", hab1: "Disponibilidad de Red", hab2: "Trampa para Yordles", ulti: "As Bajo la Mira" },
    { id: 6, nombre: "Darius", rol: "Luchador", vida: 680, ataque: 88, img: "img/cartas/darius.jpg", hab1: "Diezmar", hab2: "Golpe Incapacitante", ulti: "Guillotina Noxiana" },
    { id: 7, nombre: "Ekko", rol: "Asesino", vida: 550, ataque: 87, img: "img/cartas/ekko.jpg", hab1: "Resonancia", hab2: "Salto Temporal", ulti: "Fisura Temporal" },
    { id: 8, nombre: "Ezreal", rol: "Tirador", vida: 490, ataque: 91, img: "img/cartas/ezreal.jpg", hab1: "Disparos Místicos", hab2: "Flujo Esencial", ulti: "Descarga Cerrada" },
    { id: 9, nombre: "Garen", rol: "Luchador", vida: 700, ataque: 80, img: "img/cartas/garen.jpg", hab1: "Golpe Decisivo", hab2: "Coraje", ulti: "Justicia Demaciana" },
    { id: 10, nombre: "Jinx", rol: "Tirador", vida: 460, ataque: 96, img: "img/cartas/jinx.jpg", hab1: "¡Cambio de Armas!", hab2: "¡Zap!", ulti: "Super Mega Cohete" },
    { id: 11, nombre: "Lux", rol: "Mago", vida: 490, ataque: 93, img: "img/cartas/lux.jpg", hab1: "Illuminación", hab2: "Singularidad Luminosa", ulti: "Chispa Final" },
    { id: 12, nombre: "Master Yi", rol: "Asesino", vida: 520, ataque: 98, img: "img/cartas/masteryi.jpg", hab1: "Golpe Alfa", hab2: "Meditación", ulti: "Imnortal" },
    { id: 13, nombre: "Mordekaiser", rol: "Luchador", vida: 720, ataque: 86, img: "img/cartas/mordekaiser.jpg", hab1: "Oblivion", hab2: "Indestructible", ulti: "Reino de la Muerte" },
    { id: 14, nombre: "Morgana", rol: "Mago", vida: 510, ataque: 82, img: "img/cartas/morgana.jpg", hab1: "Tierra Maldita", hab2: "Escudo Negro", ulti: "Grilletes del Alma" },
    { id: 15, nombre: "Sett", rol: "Luchador", vida: 750, ataque: 84, img: "img/cartas/sett.jpg", hab1: "nudillos", hab2: "Hay Maker", ulti: "El Show ha Terminado" },
    { id: 16, nombre: "Thresh", rol: "Tanque", vida: 630, ataque: 75, img: "img/cartas/thresh.jpg", hab1: "Sentencia", hab2: "Cautiverio Oscuro", ulti: "La Caja" },
    { id: 17, nombre: "Viego", rol: "Asesino", vida: 540, ataque: 92, img: "img/cartas/viego.jpg", hab1: "Hoja del Rey", hab2: "Espectro", ulti: "Dominación Soberana" },
    { id: 18, nombre: "Yasuo", rol: "Luchador", vida: 560, ataque: 95, img: "img/cartas/yasuo.jpg", hab1: "Tempestad de Acero", hab2: "Muro de Viento", ulti: "Ultima Hora" },
    { id: 19, nombre: "Yone", rol: "Luchador", vida: 570, ataque: 94, img: "img/cartas/yone.jpg", hab1: "Acero Mortal", hab2: "Alma Sellada", ulti: "Destino Sellado" },
    { id: 20, nombre: "Zed", rol: "Asesino", vida: 510, ataque: 99, img: "img/cartas/zed.jpg", hab1: "Shuriken Cortante", hab2: "Sombra Viva", ulti: "Marca de la Muerte" }
];