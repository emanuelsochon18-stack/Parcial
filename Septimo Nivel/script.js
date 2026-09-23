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
            .eq("nivel", 7)
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

const NUMERO_NIVEL = 7;          // cámbialo si este nivel va en otra posición
const PUNTOS_POR_PREGUNTA = 10;


// ==========================================
// PREGUNTAS
// ==========================================

const preguntas = [

    // ======================================
    // FÁCIL
    // ======================================

    {
        dificultad: "Fácil",
        pregunta: "¿Cómo están conectados los focos de este circuito?",
        imagen: "img/focos en serie.png",
        respuesta: "En serie",
        incorrectas: ["En paralelo", "Mixto", "En cortocircuito"],
        explicacion: "En serie los componentes van uno tras otro, formando un solo camino para la corriente."
    },

    {
        dificultad: "Fácil",
        pregunta: "¿Cómo están conectados los focos de este circuito?",
        imagen: "img/focos en paralelo.png",
        respuesta: "En paralelo",
        incorrectas: ["En serie", "Mixto", "En cortocircuito"],
        explicacion: "En paralelo cada componente tiene su propia rama, conectada a los mismos dos puntos de la batería."
    },

    {
        dificultad: "Fácil",
        pregunta: "En un circuito en serie, ¿por cuántos caminos puede circular la corriente?",
        imagen: "img/serie.png",
        respuesta: "Por un solo camino",
        incorrectas: [
            "Por dos caminos",
            "Por uno por cada componente",
            "Por ninguno, la corriente se queda quieta"
        ],
        explicacion: "Como los componentes están uno después de otro, la corriente solo tiene un camino."
    },

    {
        dificultad: "Fácil",
        pregunta: "En un circuito en paralelo, si un foco se funde o se quita, ¿qué pasa con los demás?",
        imagen: "img/foco quemado paralelo.png",
        respuesta: "Siguen encendidos",
        incorrectas: [
            "Se apagan todos",
            "Brillan con menos intensidad",
            "Se funden también"
        ],
        explicacion: "Cada foco está en su propia rama, así que los demás siguen recibiendo corriente."
    },

    {
        dificultad: "Fácil",
        pregunta: "¿Cuál es la pata larga de un LED?",
        imagen: "../Quinto Nivel/img/led.png",
        respuesta: "El ánodo (+)",
        incorrectas: [
            "El cátodo (−)",
            "La tierra (GND)",
            "No hay diferencia entre las patas"
        ],
        explicacion: "La pata larga es el ánodo (+) y va hacia el positivo. La corta es el cátodo (−)."
    },


    // ======================================
    // MEDIO
    // ======================================

    // NUEVA
    {
        dificultad: "Medio",
        pregunta: "¿Cómo puedes reconocer un circuito en paralelo en un diagrama?",
        imagen: "img/paralelo.png",
        respuesta: "El camino de la corriente se divide en varias ramas",
        incorrectas: [
            "Todos los componentes están en una sola línea, uno tras otro",
            "Tiene un solo foco",
            "No lleva batería"
        ],
        explicacion: "En paralelo hay puntos donde el camino se separa en ramas y luego se vuelve a unir."
    },

    // NUEVA
    {
        dificultad: "Medio",
        pregunta: "¿Por qué no enciende el LED de este circuito?",
        imagen: "img/lederror.png",
        respuesta: "Está conectado con la polaridad invertida",
        incorrectas: [
            "Porque necesita dos baterías",
            "Porque los LED solo funcionan con corriente alterna",
            "Porque está demasiado cerca de la batería"
        ],
        explicacion: "El LED solo conduce en un sentido: el ánodo (+) va al positivo de la batería y el cátodo (−) al negativo."
    },

    {
        dificultad: "Medio",
        pregunta: "Una batería de 9 V alimenta dos focos idénticos conectados en serie. ¿Cuántos voltios recibe cada foco?",
        imagen: "img/2focoserie.png",
        respuesta: "4,5 V",
        incorrectas: ["9 V", "18 V", "3 V"],
        explicacion: "En serie el voltaje se reparte. Como son iguales: 9 V / 2 = 4,5 V cada uno."
    },

    {
        dificultad: "Medio",
        pregunta: "Una batería de 9 V alimenta dos focos idénticos conectados en paralelo. ¿Cuántos voltios recibe cada foco?",
        imagen: "img/2focoparalelo.png",
        respuesta: "9 V",
        incorrectas: ["4,5 V", "18 V", "0 V"],
        explicacion: "En paralelo todas las ramas reciben el mismo voltaje de la batería: 9 V."
    },

    // NUEVA
    {
        dificultad: "Medio",
        pregunta: "Una batería de 9 V alimenta tres focos idénticos conectados en serie. ¿Cuántos voltios recibe cada foco?",
        imagen: "img/3focoserie.png",
        respuesta: "3 V",
        incorrectas: ["9 V", "4,5 V", "27 V"],
        explicacion: "En serie el voltaje se reparte entre los focos: 9 V / 3 = 3 V cada uno."
    },


    // ======================================
    // DIFÍCIL
    // ======================================

    // NUEVA
    {
        dificultad: "Difícil",
        pregunta: "¿Qué voltaje mínimo necesita la fuente para encender tres LED de 2 V conectados en serie?",
        imagen: "img/ledserie.png",
        respuesta: "6 V",
        incorrectas: ["2 V", "3 V", "4 V"],
        explicacion: "En serie los voltajes se suman: 2 + 2 + 2 = 6 V."
    },

    // NUEVA
    {
        dificultad: "Difícil",
        pregunta: "¿Qué voltaje mínimo necesita la fuente para encender tres LED de 2 V conectados en paralelo?",
        imagen: "img/ledparalelo.png",
        respuesta: "2 V",
        incorrectas: ["6 V", "3 V", "0,67 V"],
        explicacion: "En paralelo cada LED recibe el voltaje completo de la fuente, así que no se suman: basta con 2 V."
    },

    // NUEVA
    {
        dificultad: "Difícil",
        pregunta: "Una batería de 6 V alimenta una rama con dos focos idénticos en serie, en paralelo con una rama de un solo foco igual. ¿Cuál foco brilla más?",
        imagen: "img/mixto.png",
        respuesta: "El foco de la rama sola",
        incorrectas: [
            "Cualquiera de los dos focos en serie",
            "Todos brillan igual",
            "Ninguno enciende"
        ],
        explicacion: "El foco solo recibe los 6 V completos. Los dos en serie se reparten el voltaje: 3 V cada uno."
    },

    // NUEVA
    {
        dificultad: "Difícil",
        pregunta: "En ese mismo circuito, si se funde uno de los focos de la rama en serie, ¿qué pasa?",
        imagen: "img/mixtoquemado.png",
        respuesta: "Se apaga el otro foco de esa rama, pero el foco de la rama sola sigue encendido",
        incorrectas: [
            "Se apagan los tres focos",
            "Siguen encendidos los tres focos",
            "Se apaga el foco de la rama sola y los otros dos siguen encendidos"
        ],
        explicacion: "Al abrirse la rama en serie, esa rama deja de conducir. La otra rama es independiente y sigue funcionando."
    },

    // NUEVA
    {
        dificultad: "Difícil",
        pregunta: "Tres focos idénticos están conectados en paralelo a una batería. Comparada con la de un solo foco, ¿cuánta corriente entrega la batería?",
        imagen: "img/focos en paralelo.png",
        respuesta: "Tres veces más",
        incorrectas: ["Lo mismo", "Tres veces menos", "Ninguna"],
        explicacion: "Cada rama toma su propia corriente y la batería entrega la suma de todas: 3 veces la de un solo foco."
    }

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

    const punteoNivel = (puntos / 140) * 10;

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
                nivel: 7,
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
        "🎉 ¡Nivel 7 completado!";

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