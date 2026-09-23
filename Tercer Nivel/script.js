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
            .eq("nivel", 3)
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
// COMPONENTES
// ==========================================

const componentes = [

    {
        nombre: "Resistor",
        real: "../Primer Nivel/img/preguntas/resistor.png",
        simbolo: "../Segundo Nivel/img/simbologia/resistor.png"
    },

    {
        nombre: "Capacitor Electrolítico",
        real: "../Primer Nivel/img/preguntas/capacitor.png",
        simbolo: "../Segundo Nivel/img/simbologia/capacitor.png"
    },

    {
        nombre: "Diodo",
        real: "../Primer Nivel/img/preguntas/diodo.png",
        simbolo: "../Segundo Nivel/img/simbologia/diodo.png"
    },

    {
        nombre: "LED",
        real: "../Primer Nivel/img/preguntas/led.png",
        simbolo: "../Segundo Nivel/img/simbologia/led.png"
    },

    {
        nombre: "Pulsador",
        real: "../Primer Nivel/img/preguntas/pulsador.png",
        simbolo: "../Segundo Nivel/img/simbologia/pulsador.png"
    },

    {
        nombre: "Motoreductor",
        real: "../Primer Nivel/img/preguntas/motor.png",
        simbolo: "../Segundo Nivel/img/simbologia/motor.png"
    },

    {
        nombre: "Transformador",
        real: "../Primer Nivel/img/preguntas/transformador.png",
        simbolo: "../Segundo Nivel/img/simbologia/trasformador.png"
    },

    {
        nombre: "Switch",
        real: "../Primer Nivel/img/preguntas/swicht.png",
        simbolo: "../Segundo Nivel/img/simbologia/switch.png"
    },

    {
        nombre: "Potenciómetro",
        real: "../Primer Nivel/img/preguntas/potenciometro.png",
        simbolo: "../Segundo Nivel/img/simbologia/potenciometro.png"
    },

    {
        nombre: "LDR",
        real: "../Primer Nivel/img/preguntas/ldr.png",
        simbolo: "../Segundo Nivel/img/simbologia/ldr.png"
    },

    {
        nombre: "IC",
        real: "../Primer Nivel/img/preguntas/ic.png",
        simbolo: "../Segundo Nivel/img/simbologia/ic.png"
    },

    {
        nombre: "Fusible",
        real: "../Primer Nivel/img/preguntas/fusible.png",
        simbolo: "../Segundo Nivel/img/simbologia/fusible.png"
    },

    {
        nombre: "Capacitor Cerámico",
        real: "../Primer Nivel/img/preguntas/ceramico.png",
        simbolo: "../Segundo Nivel/img/simbologia/Ceramico.png"
    },

    {
        nombre: "Buzzer",
        real: "../Primer Nivel/img/preguntas/buzzer.png",
        simbolo: "../Segundo Nivel/img/simbologia/buzzer.png"
    },

    {
        nombre: "Batería",
        real: "../Primer Nivel/img/preguntas/bateria.png",
        simbolo: "../Segundo Nivel/img/simbologia/bateria.png"
    },

];


// ==========================================
// VARIABLES DEL JUEGO
// ==========================================

let puntos = 0;

let preguntaActual = 0;

let componenteCorrecto = null;

let componentesPendientes = [];
function iniciarNivel() {

    puntos = 0;
    preguntaActual = 0;

    componentesPendientes = [...componentes];
    componentesPendientes = mezclar(componentesPendientes);

    document.getElementById("puntos").textContent = puntos;
    document.getElementById("numeroPregunta").textContent = 1;

    crearPregunta();
}



// ==========================================
// MEZCLAR
// ==========================================

function mezclar(array) {

    return array.sort(() => Math.random() - 0.5);

}


// ==========================================
// INICIAR NIVEL
// ==========================================
verificarNivelCompletado().then(puedeJugar => {

    if (puedeJugar) {
        iniciarNivel();
    }

});
// ==========================================
// CREAR PREGUNTA
// ==========================================

function crearPregunta() {

    document.getElementById("siguiente").style.display =
        "none";

    document.getElementById("mensaje").textContent =
        "Selecciona el símbolo correcto";


    // ==========================================
    // COMPROBAR SI TERMINÓ
    // ==========================================

    if (componentesPendientes.length === 0) {

        nivelCompletado();

        return;

    }


    // ==========================================
    // SACAR COMPONENTE
    // ==========================================

    componenteCorrecto =
        componentesPendientes.shift();


    // ==========================================
    // MOSTRAR IMAGEN REAL
    // ==========================================

    document.getElementById("imagenPregunta").src =
        componenteCorrecto.real;


    // ==========================================
    // CREAR RESPUESTAS
    // ==========================================

    let respuestas = [componenteCorrecto];


    let incorrectas = componentes.filter(

        componente =>
            componente !== componenteCorrecto

    );


    incorrectas = mezclar(incorrectas);


    // Agregar 3 respuestas incorrectas

    respuestas.push(
        ...incorrectas.slice(0, 3)
    );


    // Mezclar las respuestas

    respuestas = mezclar(respuestas);


    // ==========================================
    // MOSTRAR RESPUESTAS
    // ==========================================

    const contenedor =
        document.getElementById("respuestas");

    contenedor.innerHTML = "";


    respuestas.forEach(componente => {

        const boton =
            document.createElement("button");


        boton.classList.add("respuesta");


        // Crear imagen

        const imagen =
            document.createElement("img");


        imagen.src =
            componente.simbolo;

        imagen.alt =
            componente.nombre;


        // Agregar imagen al botón

        boton.appendChild(imagen);


        // Evento click

        boton.addEventListener(
            "click",
            function () {

                comprobarRespuesta(
                    boton,
                    componente
                );

            }
        );


        contenedor.appendChild(boton);

    });

}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarRespuesta(
    boton,
    componente
) {

    const botones =
        document.querySelectorAll(".respuesta");


    // Desactivar todas las respuestas

    botones.forEach(boton => {

        boton.disabled = true;

        boton.style.pointerEvents = "none";

    });


    // ==========================================
    // CORRECTA
    // ==========================================

    if (
        componente.nombre ===
        componenteCorrecto.nombre
    ) {

        boton.classList.add("correcta");

        puntos += 10;

        document.getElementById("puntos").textContent =
            puntos;

        document.getElementById("mensaje").textContent =
            "✅ ¡Correcto!";

    }


    // ==========================================
    // INCORRECTA
    // ==========================================

    else {

        boton.classList.add("incorrecta");

        document.getElementById("mensaje").textContent =
            "❌ Incorrecto";


        // Buscar y marcar la correcta

        botones.forEach(boton => {

            const imagen =
                boton.querySelector("img");


            if (
                imagen &&
                imagen.alt ===
                componenteCorrecto.nombre
            ) {

                boton.classList.add("correcta");

            }

        });

    }


    // Mostrar botón siguiente

    document.getElementById("siguiente").style.display =
        "inline-block";

}


// ==========================================
// SIGUIENTE PREGUNTA
// ==========================================

function siguientePregunta() {

    preguntaActual++;

    document.getElementById("numeroPregunta").textContent =
        preguntaActual + 1;

    crearPregunta();

}


// ==========================================
// NIVEL COMPLETADO
// ==========================================

async function nivelCompletado() {

    const punteoNivel = (puntos / 150) * 10;

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
                nivel: 3,
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
        "🎉 ¡Nivel 3 completado!";

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
