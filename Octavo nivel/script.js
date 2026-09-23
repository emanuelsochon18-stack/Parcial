const SUPABASE_URL = "https://nkzqvqcvzgcfvztgqrny.supabase.co";
const SUPABASE_KEY = "sb_publishable_C_0DnQejam5xSb_7XB5k7w_1C0BzvLx";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function verificarNivelCompletado() {

    const usuarioGuardado = localStorage.getItem("usuarioActual");

    if (!usuarioGuardado) {
        window.location.replace("../login.html");
        return false;
    }

    const usuario = JSON.parse(usuarioGuardado);

    const { data: resultado, error: resultadoError } =
        await supabaseClient
            .from("resultados")
            .select("completado")
            .eq("usuario_id", usuario.id)
            .eq("nivel", 8)
            .maybeSingle();

    if (resultadoError) {
        console.error("Error al comprobar nivel:", resultadoError);
        return false;
    }

    if (resultado && resultado.completado === true) {
        alert("🔒 Este nivel ya está completado.");
        window.location.replace("../index.html");
        return false;
    }

    return true;
}
// ==========================================
// CONFIGURACIÓN
// ==========================================

const NUMERO_NIVEL = 8;          // cámbialo si este nivel va en otra posición
const PUNTOS_POR_PREGUNTA = 10;


// ==========================================
// PREGUNTAS
// (el campo "dificultad" solo sirve para ordenarlas)
// ==========================================

const preguntas = [

    // ======================================
    // FÁCIL
    // ======================================
    {
        dificultad: "Fácil",
        pregunta: "¿Cómo están conectados los resistores de este circuito?",
        imagen: "img/serie_100.png",
        respuesta: "En serie",
        incorrectas: ["En paralelo", "Mixto", "En cortocircuito"],
        explicacion: "Van uno a continuación del otro, en una sola línea."
    },

    {
        dificultad: "Fácil",
        pregunta: "¿Cómo están conectados los resistores de este circuito?",
        imagen: "img/paralelo_100.png",
        respuesta: "En paralelo",
        incorrectas: ["En serie", "Mixto", "En cortocircuito"],
        explicacion: "Cada resistor está en su propia rama y los extremos de todos están unidos a los mismos dos puntos."
    },

    {
        dificultad: "Fácil",
        pregunta: "¿Cómo se calcula la resistencia total de resistores conectados en serie?",
        imagen: "img/serie_100.png",
        respuesta: "Sumando todas las resistencias",
        incorrectas: [
            "Restando la mayor de la menor",
            "Multiplicando todas las resistencias",
            "Sacando el promedio de las resistencias"
        ],
        explicacion: "R total = R1 + R2 + R3 + ..."
    },

    {
        dificultad: "Fácil",
        pregunta: "Tres resistores de 10 Ω, 30 Ω y 50 Ω están conectados en serie, como en la imagen. ¿Cuál es la resistencia total?",
        imagen: "img/seriesuma.png",
        respuesta: "90 Ω",
        incorrectas: ["80 Ω", "100 Ω", "900 Ω"],
        explicacion: "En serie se suman: 10 + 30 + 50 = 90 Ω."
    },

    {
        dificultad: "Fácil",
        pregunta: "¿Cuántos ohmios son 1 kΩ?",
        imagen: "img/r.png",
        respuesta: "1000 Ω",
        incorrectas: ["100 Ω", "10 Ω", "1 000 000 Ω"],
        explicacion: "El prefijo k (kilo) significa mil: 1 kΩ = 1000 Ω."
    },


    // ======================================
    // MEDIO
    // ======================================

    {
        dificultad: "Medio",
        pregunta: "Dos resistores de 100 Ω están conectados en paralelo, como en la imagen. ¿Cuál es la resistencia total?",
        imagen: "img/reparalelo_100.png",
        respuesta: "50 Ω",
        incorrectas: ["200 Ω", "100 Ω", "25 Ω"],
        explicacion: "Dos resistores iguales en paralelo dan la mitad: 100 / 2 = 50 Ω."
    },

    {
        dificultad: "Medio",
        pregunta: "Tres resistores en serie suman 90 Ω en total. Dos de ellos valen 10 Ω y 30 Ω. ¿Cuánto vale el tercero?",
        imagen: "img/rfaltante.png",
        respuesta: "50 Ω",
        incorrectas: ["40 Ω", "60 Ω", "70 Ω"],
        explicacion: "10 + 30 = 40 Ω. Al total le restas eso: 90 − 40 = 50 Ω."
    },

    {
        dificultad: "Medio",
        pregunta: "¿Cuál de estas combinaciones de resistores en serie da exactamente 150 Ω?",
        imagen: "img/r2.png",
        respuesta: "20 Ω + 50 Ω + 80 Ω",
        incorrectas: [
            "20 Ω + 40 Ω + 80 Ω",
            "30 Ω + 50 Ω + 80 Ω",
            "10 Ω + 40 Ω + 80 Ω"
        ],
        explicacion: "20 + 50 + 80 = 150 Ω. Las otras dan 140 Ω, 160 Ω y 130 Ω."
    },

    {
        dificultad: "Medio",
        pregunta: "Un resistor de 1 kΩ y otro de 500 Ω están conectados en serie. ¿Cuál es la resistencia total?",
        imagen: "img/serie_100.png",
        respuesta: "1500 Ω",
        incorrectas: ["501 Ω", "1050 Ω", "15 000 Ω"],
        explicacion: "Primero pasa todo a la misma unidad: 1 kΩ = 1000 Ω. Entonces 1000 + 500 = 1500 Ω (1,5 kΩ)."
    },

    // ======================================
    // DIFÍCIL
    // ======================================

    {
        dificultad: "Difícil",
        pregunta: "Tres resistores iguales de 90 Ω están conectados en paralelo. ¿Cuál es la resistencia total?",
        imagen: "img/paralelo_100.png",
        respuesta: "30 Ω",
        incorrectas: ["270 Ω", "90 Ω", "45 Ω"],
        explicacion: "Con resistores iguales en paralelo se divide entre la cantidad: 90 / 3 = 30 Ω."
    },

    {
        dificultad: "Difícil",
        pregunta: "Un resistor de 60 Ω y otro de 30 Ω están conectados en paralelo. ¿Cuál es la resistencia total?",
        imagen: "img/reparalelo_100.png",
        respuesta: "20 Ω",
        incorrectas: ["90 Ω", "45 Ω", "10 Ω"],
        explicacion: "Producto entre suma: (60 × 30) / (60 + 30) = 1800 / 90 = 20 Ω."
    },

    {
        dificultad: "Difícil",
        pregunta: "Un resistor de 2,2 kΩ y otro de 4,7 kΩ están conectados en serie. ¿Cuál es la resistencia total?",
        imagen: "img/serie_100.png",
        respuesta: "6,9 kΩ",
        incorrectas: ["6,7 kΩ", "10,34 kΩ", "69 kΩ"],
        explicacion: "Si las dos están en kΩ se suman directamente: 2,2 + 4,7 = 6,9 kΩ (6900 Ω)."
    },

    {
        dificultad: "Difícil",
        pregunta: "Un resistor de 100 Ω está en serie con otros dos de 100 Ω que están en paralelo entre sí, como en la imagen. ¿Cuál es la resistencia total?",
        imagen: "img/mixto.png",
        respuesta: "150 Ω",
        incorrectas: ["300 Ω", "200 Ω", "33 Ω"],
        explicacion: "Los dos en paralelo dan 50 Ω. En serie con el otro de 100 Ω: 100 + 50 = 150 Ω."
    },

];
// ==========================================
// VARIABLES DEL JUEGO
// ==========================================

let puntos = 0;

let preguntaActual = 0;

let listaPreguntas = [];


// ==========================================
// MEZCLAR (Fisher-Yates, no modifica el original)
// ==========================================

function mezclar(array) {

    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];

    }

    return copia;

}


// ==========================================
// ORDENAR POR DIFICULTAD
// (Fácil → Medio → Difícil, mezclando dentro de cada grupo)
// ==========================================

function prepararPreguntas() {

    const orden = ["Fácil", "Medio", "Difícil"];

    let resultado = [];

    orden.forEach(nivel => {

        const grupo = preguntas.filter(
            pregunta => pregunta.dificultad === nivel
        );

        resultado.push(...mezclar(grupo));

    });

    return resultado;

}


// ==========================================
// INICIAR NIVEL
// ==========================================
verificarNivelCompletado().then(puedeJugar => {

    if (puedeJugar) {
        iniciarNivel();
    }

});

function iniciarNivel() {

    puntos = 0;
    preguntaActual = 0;

    listaPreguntas = prepararPreguntas();  // ✅ ordena Fácil→Medio→Difícil y mezcla

    document.getElementById("puntos").textContent = puntos;
    document.getElementById("numeroPregunta").textContent = 1;

    crearPregunta();
}


// ==========================================
// CREAR PREGUNTA
// ==========================================

function crearPregunta() {

    document.getElementById("siguiente").style.display = "none";

    document.getElementById("mensaje").textContent =
        "Selecciona la respuesta correcta";


    // Comprobar si terminó el nivel

    if (preguntaActual >= listaPreguntas.length) {

        nivelCompletado();

        return;

    }


    const pregunta = listaPreguntas[preguntaActual];


    // Cabecera (solo el número de la pregunta)

    document.getElementById("numeroPregunta").textContent =
        preguntaActual + 1;

    document.getElementById("textoPregunta").textContent =
        pregunta.pregunta;


    // Texto del botón en la última pregunta

    document.getElementById("siguiente").textContent =
        (preguntaActual === listaPreguntas.length - 1)
            ? "Ver resultado →"
            : "Siguiente →";


    // Imagen de referencia

    document.getElementById("imagenPregunta").src =
        pregunta.imagen;


    // Respuestas mezcladas

    const respuestas = mezclar([
        pregunta.respuesta,
        ...pregunta.incorrectas
    ]);

    const contenedor = document.getElementById("respuestas");

    contenedor.innerHTML = "";

    respuestas.forEach(texto => {

        const boton = document.createElement("button");

        boton.classList.add("respuesta");

        boton.textContent = texto;

        boton.addEventListener("click", function () {

            comprobarRespuesta(boton, texto);

        });

        contenedor.appendChild(boton);

    });

}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarRespuesta(boton, textoElegido) {

    const pregunta = listaPreguntas[preguntaActual];

    const botones = document.querySelectorAll(".respuesta");


    // Desactivar botones

    botones.forEach(b => {

        b.disabled = true;

        b.style.pointerEvents = "none";

    });


    // CORRECTA

    if (textoElegido === pregunta.respuesta) {

        boton.classList.add("correcta");

        puntos += PUNTOS_POR_PREGUNTA;

        document.getElementById("puntos").textContent = puntos;

        document.getElementById("mensaje").textContent =
            "✅ ¡Correcto! " + pregunta.explicacion;

    }

    // INCORRECTA

    else {

        boton.classList.add("incorrecta");

        document.getElementById("mensaje").textContent =
            "❌ Incorrecto. La respuesta era: " +
            pregunta.respuesta + ". " +
            pregunta.explicacion;

        botones.forEach(b => {

            if (b.textContent === pregunta.respuesta) {

                b.classList.add("correcta");

            }

        });

    }


    document.getElementById("siguiente").style.display =
        "inline-block";

}


// ==========================================
// SIGUIENTE PREGUNTA
// ==========================================

function siguientePregunta() {

    preguntaActual++;

    crearPregunta();

}


// ==========================================
// NIVEL COMPLETADO
// ==========================================


async function nivelCompletado() {

    const punteoNivel = (puntos / 130) * 10;

    const usuarioGuardado = localStorage.getItem("usuarioActual");

    if (!usuarioGuardado) {
        console.error("No hay una sesión activa");
        return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    const { error: resultadoError } =
        await supabaseClient
            .from("resultados")
            .upsert({
                usuario_id: usuario.id,
                nivel: 8,
                punteo: punteoNivel,
                completado: true
            }, {
                onConflict: "usuario_id,nivel"
            });

    if (resultadoError) {
        console.error("Error al guardar resultado:", resultadoError);
        return;
    }

    document.querySelector("h2").textContent =
        "🎉 ¡Nivel 8 completado!";

    document.querySelector(".componente").style.display =
        "none";

    document.getElementById("respuestas").style.display =
        "none";

    document.getElementById("siguiente").style.display =
        "none";

    document.getElementById("mensaje").innerHTML =
        "Has identificado todos los componentes.<br><br>" +
        "⭐ Puntuación del nivel: <strong>" +
        punteoNivel.toFixed(2) +
        " / 10</strong><br><br>" +
        "💾 Resultado guardado correctamente";
}