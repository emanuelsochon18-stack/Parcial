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
            .eq("nivel", 6)
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
// NIVEL 8 — CONVERSIÓN Ω ↔ kΩ ↔ MΩ
// ==========================================


// ==========================================
// VARIABLES
// ==========================================

let puntos = 0;
let preguntaActual = 0;
let preguntasGeneradas = [];


// ==========================================
// MEZCLAR
// ==========================================

function mezclar(array) {

    return array.sort(() => Math.random() - 0.5);

}


// ==========================================
// NÚMERO ALEATORIO
// ==========================================

function numeroAleatorio(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


// ==========================================
// FORMATEAR NÚMERO
// ==========================================

function formatearNumero(numero) {

    return Number(numero).toLocaleString("en-US");

}


// ==========================================
// GENERAR UNA PREGUNTA
// ==========================================

function generarPregunta() {

    let tipos = [

        "ohm-kohm",
        "kohm-ohm",
        "kohm-megaohm",
        "megaohm-kohm",
        "ohm-megaohm",
        "megaohm-ohm"

    ];


    let tipo =
        tipos[numeroAleatorio(0, tipos.length - 1)];


    let valor;
    let correcta;
    let texto;


    // ==========================================
    // Ω → kΩ
    // ==========================================

    if (tipo === "ohm-kohm") {

        valor = numeroAleatorio(1, 999) * 100;

        correcta = valor / 1000;

        texto =
            `¿Cuántos kΩ son ${formatearNumero(valor)} Ω?`;

    }


    // ==========================================
    // kΩ → Ω
    // ==========================================

    else if (tipo === "kohm-ohm") {

        valor = numeroAleatorio(1, 999);

        correcta = valor * 1000;

        texto =
            `¿Cuántos Ω son ${formatearNumero(valor)} kΩ?`;

    }


    // ==========================================
    // kΩ → MΩ
    // ==========================================

    else if (tipo === "kohm-megaohm") {

        valor = numeroAleatorio(1, 999) * 100;

        correcta = valor / 1000;

        texto =
            `¿Cuántos MΩ son ${formatearNumero(valor)} kΩ?`;

    }


    // ==========================================
    // MΩ → kΩ
    // ==========================================

    else if (tipo === "megaohm-kohm") {

        valor = numeroAleatorio(1, 999);

        correcta = valor * 1000;

        texto =
            `¿Cuántos kΩ son ${valor} MΩ?`;

    }


    // ==========================================
    // Ω → MΩ
    // ==========================================

    else if (tipo === "ohm-megaohm") {

        valor = numeroAleatorio(1, 999) * 1000;

        correcta = valor / 1000000;

        texto =
            `¿Cuántos MΩ son ${formatearNumero(valor)} Ω?`;

    }


    // ==========================================
    // MΩ → Ω
    // ==========================================

    else if (tipo === "megaohm-ohm") {

        valor = numeroAleatorio(1, 999);

        correcta = valor * 1000000;

        texto =
            `¿Cuántos Ω son ${valor} MΩ?`;

    }


    // ==========================================
    // CREAR RESPUESTAS
    // ==========================================

    let respuestas = [
        correcta
    ];


    while (respuestas.length < 4) {

        let error;

        let diferencia =
            numeroAleatorio(1, 20);


        if (Math.random() < 0.5) {

            error =
                correcta + diferencia;

        }

        else {

            error =
                correcta - diferencia;

        }


        // Evitar valores negativos

        if (error <= 0) {

            error =
                correcta + diferencia;

        }


        // Evitar respuestas repetidas

        if (!respuestas.includes(error)) {

            respuestas.push(error);

        }

    }


    // ==========================================
    // FORMATEAR RESPUESTAS
    // ==========================================

    respuestas = respuestas.map(respuesta => {

        if (tipo === "ohm-kohm") {

            return respuesta + " kΩ";

        }


        if (tipo === "kohm-megaohm") {

            return respuesta + " MΩ";

        }


        if (tipo === "ohm-megaohm") {

            return respuesta + " MΩ";

        }


        if (tipo === "kohm-ohm") {

            return formatearNumero(respuesta) + " Ω";

        }


        if (tipo === "megaohm-kohm") {

            return formatearNumero(respuesta) + " kΩ";

        }


        if (tipo === "megaohm-ohm") {

            return formatearNumero(respuesta) + " Ω";

        }

    });


    // ==========================================
    // RESPUESTA CORRECTA FORMATEADA
    // ==========================================

    let respuestaCorrecta;


    if (tipo === "ohm-kohm") {

        respuestaCorrecta =
            correcta + " kΩ";

    }

    else if (tipo === "kohm-ohm") {

        respuestaCorrecta =
            formatearNumero(correcta) + " Ω";

    }

    else if (tipo === "kohm-megaohm") {

        respuestaCorrecta =
            correcta + " MΩ";

    }

    else if (tipo === "megaohm-kohm") {

        respuestaCorrecta =
            formatearNumero(correcta) + " kΩ";

    }

    else if (tipo === "ohm-megaohm") {

        respuestaCorrecta =
            correcta + " MΩ";

    }

    else if (tipo === "megaohm-ohm") {

        respuestaCorrecta =
            formatearNumero(correcta) + " Ω";

    }


    // ==========================================
    // MEZCLAR RESPUESTAS
    // ==========================================

    respuestas = mezclar(respuestas);


    // ==========================================
    // DEVOLVER PREGUNTA
    // ==========================================

    return {

        pregunta: texto,

        // IMAGEN DEL NIVEL 8
        imagen: "../primer nivel/img/preguntas/resistor.png",

        respuestas: respuestas,

        correcta: respuestaCorrecta

    };

}


// ==========================================
// GENERAR TODAS LAS PREGUNTAS
// ==========================================

function generarPreguntas() {

    preguntasGeneradas = [];


    // Generar 10 preguntas diferentes

    while (preguntasGeneradas.length < 10) {

        let nuevaPregunta =
            generarPregunta();


        // ==========================================
        // EVITAR PREGUNTAS REPETIDAS
        // ==========================================

        let repetida =
            preguntasGeneradas.some(
                pregunta =>
                    pregunta.pregunta ===
                    nuevaPregunta.pregunta
            );


        if (!repetida) {

            preguntasGeneradas.push(
                nuevaPregunta
            );

        }

    }

}


// ==========================================
// INICIAR NIVEL
// ==========================================
// ==========================================
// INICIAR
// ==========================================

verificarNivelCompletado().then(puedeJugar => {
    if (puedeJugar) {
        iniciarNivel();
    }
});

function iniciarNivel() {

    puntos = 0;
    preguntaActual = 0;

    generarPreguntas();  // ✅ genera las 10 preguntas de conversión

    document.getElementById("puntos").textContent = puntos;
    document.getElementById("numeroPregunta").textContent = 1;

    crearPregunta();
}




// ==========================================
// CREAR PREGUNTA
// ==========================================

function crearPregunta() {

    document.getElementById("siguiente").style.display =
        "none";


    document.getElementById("mensaje").textContent =
        "Selecciona la respuesta correcta";


    // ==========================================
    // ¿TERMINÓ EL NIVEL?
    // ==========================================

    if (
        preguntaActual >=
        preguntasGeneradas.length
    ) {

        nivelCompletado();

        return;

    }


    // ==========================================
    // OBTENER PREGUNTA
    // ==========================================

    const pregunta =
        preguntasGeneradas[preguntaActual];


    // ==========================================
    // MOSTRAR PREGUNTA
    // ==========================================

    document.querySelector("h2").textContent =
        pregunta.pregunta;


    // ==========================================
    // MOSTRAR IMAGEN
    // ==========================================

    const componente =
        document.querySelector(".componente");


    const imagen =
        document.getElementById("imagenPregunta");


    if (pregunta.imagen !== "") {

        componente.style.display =
            "flex";


        imagen.src =
            pregunta.imagen;

    }

    else {

        componente.style.display =
            "none";

    }


    // ==========================================
    // MOSTRAR RESPUESTAS
    // ==========================================

    const contenedor =
        document.getElementById("respuestas");


    contenedor.innerHTML =
        "";


    pregunta.respuestas.forEach(
        respuesta => {

            const boton =
                document.createElement("button");


            boton.classList.add(
                "respuesta"
            );


            boton.textContent =
                respuesta;


            boton.addEventListener(
                "click",
                function () {

                    comprobarRespuesta(
                        boton,
                        respuesta,
                        pregunta.correcta
                    );

                }
            );


            contenedor.appendChild(
                boton
            );

        }
    );

}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarRespuesta(
    boton,
    respuesta,
    respuestaCorrecta
) {

    const botones =
        document.querySelectorAll(
            ".respuesta"
        );


    // ==========================================
    // DESACTIVAR RESPUESTAS
    // ==========================================

    botones.forEach(boton => {

        boton.disabled =
            true;

        boton.style.pointerEvents =
            "none";

    });


    // ==========================================
    // RESPUESTA CORRECTA
    // ==========================================

    if (
        respuesta ===
        respuestaCorrecta
    ) {

        boton.classList.add(
            "correcta"
        );


        puntos += 10;


        document.getElementById(
            "puntos"
        ).textContent =
            puntos;


        document.getElementById(
            "mensaje"
        ).textContent =
            "✅ ¡Correcto!";

    }


    // ==========================================
    // RESPUESTA INCORRECTA
    // ==========================================

    else {

        boton.classList.add(
            "incorrecta"
        );


        document.getElementById(
            "mensaje"
        ).textContent =
            "❌ Incorrecto";


        // Mostrar respuesta correcta

        botones.forEach(boton => {

            if (
                boton.textContent ===
                respuestaCorrecta
            ) {

                boton.classList.add(
                    "correcta"
                );

            }

        });

    }


    // ==========================================
    // MOSTRAR BOTÓN SIGUIENTE
    // ==========================================

    document.getElementById(
        "siguiente"
    ).style.display =
        "inline-block";

}


// ==========================================
// SIGUIENTE PREGUNTA
// ==========================================

function siguientePregunta() {

    preguntaActual++;


    document.getElementById(
        "numeroPregunta"
    ).textContent =
        preguntaActual + 1;


    crearPregunta();

}


// ==========================================
// NIVEL COMPLETADO
// ==========================================

async function nivelCompletado() {

    const punteoNivel = (puntos / 100) * 10;

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
                nivel: 6,
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
        "🎉 ¡Nivel 6 completado!";

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