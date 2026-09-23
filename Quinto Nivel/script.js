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
            .eq("nivel", 5)
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

    // ======================================
    // RESISTOR
    // ======================================

    {
        nombre: "Resistor",
        imagen: "../Primer Nivel/img/preguntas/resistor.png",
        polaridad: false,
        pines: []
    },


    // ======================================
    // CAPACITOR ELECTROLÍTICO
    // ======================================

    {
        nombre: "Capacitor Electrolítico",
        imagen: "img/capacitor.png",
        polaridad: true,
        pines: [
            {
                nombre: "Pin 1",
                correcto: "positivo"
            },
            {
                nombre: "Pin 2",
                correcto: "negativo"
            }
        ]
    },


    // ======================================
    // DIODO
    // ======================================

    {
        nombre: "Diodo",
        imagen: "img/Diodo.png",
        polaridad: true,
        pines: [
            {
                nombre: "Pin 1",
                correcto: "positivo"
            },
            {
                nombre: "Pin 2",
                correcto: "negativo"
            }
        ]
    },


    // ======================================
    // LED
    // ======================================

    {
        nombre: "LED",
        imagen: "img/led.png",
        polaridad: true,
        pines: [
            {
                nombre: "Pin 1",
                correcto: "negativo"
            },
            {
                nombre: "Pin 2",
                correcto: "positivo"
            }
        ]
    },


    // ======================================
    // PULSADOR
    // ======================================

    {
        nombre: "Pulsador",
        imagen: "../Primer Nivel/img/preguntas/pulsador.png",
        polaridad: false,
        pines: []
    },


    // ======================================
    // MOTOREductor
    // ======================================

    {
        nombre: "Motoreductor",
        imagen: "../Primer Nivel/img/preguntas/motor.png",
        polaridad: true,
        pines: [
            {
                nombre: "Pin 1",
                correcto: "positivo"
            },
            {
                nombre: "Pin 2",
                correcto: "negativo"
            }
        ]
    },


    // ======================================
    // SWITCH
    // ======================================

    {
        nombre: "Switch",
        imagen: "../Primer Nivel/img/preguntas/swicht.png",
        polaridad: false,
        pines: []
    },


    // ======================================
    // POTENCIÓMETRO
    // ======================================

    {
        nombre: "Potenciómetro",
        imagen: "../Primer Nivel/img/preguntas/potenciometro.png",
        polaridad: false,
        pines: []
    },


    // ======================================
    // LDR
    // ======================================

    {
        nombre: "LDR",
        imagen: "../Primer Nivel/img/preguntas/ldr.png",
        polaridad: false,
        pines: []
    },


    // ======================================
    // FUSIBLE
    // ======================================

    {
        nombre: "Fusible",
        imagen: "../Primer Nivel/img/preguntas/fusible.png",
        polaridad: false,
        pines: []
    },


    // ======================================
    // CAPACITOR CERÁMICO
    // ======================================

    {
        nombre: "Capacitor Cerámico",
        imagen: "img/ceramico.png",
        polaridad: false,
        pines: []
    },


    // ======================================
    // BUZZER
    // ======================================

    {
        nombre: "Buzzer",
        imagen: "img/Buzzer.png",
        polaridad: true,
        pines: [
            {
                nombre: "Pin 1",
                correcto: "negativo"
            },
            {
                nombre: "Pin 2",
                correcto: "positivo"
            }
        ]
    },


    // ======================================
    // BATERÍA
    // ======================================

    {
        nombre: "Batería",
        imagen: "img/bateria.png",
        polaridad: true,
        pines: [
            {
                nombre: "Pin 1",
                correcto: "negativo"
            },
            {
                nombre: "Pin 2",
                correcto: "positivo"
            }
        ]
    }

];


// ==========================================
// VARIABLES DEL JUEGO
// ==========================================

let puntos = 0;

let preguntaActual = 0;

let componenteCorrecto;

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

    return array.sort(
        () => Math.random() - 0.5
    );

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

    document.querySelector(
        "h2"
    ).textContent =
        "¿Este componente posee polaridad?";


    document.getElementById(
        "mensaje"
    ).textContent =
        "Selecciona Sí o No";


    // Mostrar imagen

    document.querySelector(
        ".componente"
    ).style.display =
        "flex";


    // Mostrar respuestas

    const contenedor =
        document.getElementById(
            "respuestas"
        );

    contenedor.innerHTML = "";

    contenedor.style.display =
        "grid";


    // Ocultar siguiente

    document.getElementById(
        "siguiente"
    ).style.display =
        "none";


    // ==========================================
    // COMPROBAR FINAL
    // ==========================================

    if (
        componentesPendientes.length === 0
    ) {

        nivelCompletado();

        return;

    }


    // ==========================================
    // SELECCIONAR COMPONENTE
    // ==========================================

    componenteCorrecto =
        componentesPendientes.shift();


    // ==========================================
    // MOSTRAR IMAGEN
    // ==========================================

    document.getElementById(
        "imagenPregunta"
    ).src =
        componenteCorrecto.imagen;


    // ==========================================
    // CREAR SÍ / NO
    // ==========================================

    let respuestas = [
        "Sí",
        "No"
    ];

    mezclar(respuestas);


    respuestas.forEach(
        respuesta => {

            const boton =
                document.createElement(
                    "button"
                );


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
                        respuesta
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
// COMPROBAR SÍ / NO
// ==========================================

function comprobarRespuesta(
    boton,
    respuesta
) {

    const botones =
        document.querySelectorAll(
            ".respuesta"
        );


    // Desactivar botones

    botones.forEach(
        boton => {

            boton.disabled = true;

            boton.style.pointerEvents =
                "none";

        }
    );


    const respuestaCorrecta =
        componenteCorrecto.polaridad
            ? "Sí"
            : "No";


    // ==========================================
    // CORRECTA
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


        // ======================================
        // TIENE POLARIDAD
        // ======================================

        if (
            componenteCorrecto.polaridad
        ) {

            document.getElementById(
                "mensaje"
            ).textContent =
                "✅ ¡Correcto! Identifica las conexiones de cada pin.";

            setTimeout(
                () => {

                    mostrarPolaridad();

                },
                400
            );

        }


        // ======================================
        // NO TIENE POLARIDAD
        // ======================================

        else {

            document.getElementById(
                "mensaje"
            ).textContent =
                "✅ ¡Correcto! Este componente no posee polaridad.";

            document.getElementById(
                "siguiente"
            ).style.display =
                "inline-block";

        }

    }


    // ==========================================
    // INCORRECTA
    // ==========================================

    else {

        boton.classList.add(
            "incorrecta"
        );


        document.getElementById(
            "mensaje"
        ).textContent =
            "❌ Incorrecto. La respuesta correcta era " +
            respuestaCorrecta + ".";


        botones.forEach(
            boton => {

                if (
                    boton.textContent ===
                    respuestaCorrecta
                ) {

                    boton.classList.add(
                        "correcta"
                    );

                }

            }
        );


        document.getElementById(
            "siguiente"
        ).style.display =
            "inline-block";

    }

}


// ==========================================
// MOSTRAR POLARIDAD
// ==========================================

function mostrarPolaridad() {

    document.querySelector(
        "h2"
    ).textContent =
        "Identifica las conexiones";


    document.getElementById(
        "mensaje"
    ).textContent =
        "Selecciona una opción para cada pin";


    // Ocultar imagen principal

    document.querySelector(
        ".componente"
    ).style.display =
        "none";


    const contenedor =
        document.getElementById(
            "respuestas"
        );


    contenedor.innerHTML = "";

    contenedor.style.display =
        "block";


    // ==========================================
    // ZONA POLARIDAD
    // ==========================================

    const zona =
        document.createElement(
            "div"
        );


    zona.classList.add(
        "zona-polaridad"
    );


    // ==========================================
    // NOMBRE
    // ==========================================

    const nombre =
        document.createElement(
            "div"
        );


    nombre.classList.add(
        "nombre-componente-polaridad"
    );


    nombre.textContent =
        componenteCorrecto.nombre;


    zona.appendChild(
        nombre
    );


    // ==========================================
    // IMAGEN
    // ==========================================

    const imagen =
        document.createElement(
            "img"
        );


    imagen.src =
        componenteCorrecto.imagen;


    imagen.alt =
        componenteCorrecto.nombre;


    imagen.classList.add(
        "imagen-polaridad"
    );


    zona.appendChild(
        imagen
    );


    // ==========================================
    // CONTENEDOR DE PINES
    // ==========================================

    const contenedorPines =
        document.createElement(
            "div"
        );


    contenedorPines.classList.add(
        "contenedor-pines"
    );


    // ==========================================
    // CREAR PINES
    // ==========================================

    componenteCorrecto.pines.forEach(
        (pin, indice) => {

            const contenedorPin =
                document.createElement(
                    "div"
                );


            contenedorPin.classList.add(
                "pin-conexion"
            );


            // ======================================
            // NOMBRE DEL PIN
            // ======================================

            const etiqueta =
                document.createElement(
                    "label"
                );


            etiqueta.textContent =
                pin.nombre;


            // ======================================
            // CONTENEDOR DE BOTONES
            // ======================================

            const opciones =
                document.createElement(
                    "div"
                );


            opciones.classList.add(
                "opciones-polaridad"
            );


            // ======================================
            // BOTÓN POSITIVO
            // ======================================

            const botonPositivo =
                document.createElement(
                    "button"
                );


            botonPositivo.type =
                "button";

            botonPositivo.classList.add(
                "boton-polaridad",
                "boton-positivo"
            );

            botonPositivo.dataset.valor =
                "positivo";

            botonPositivo.dataset.pin =
                indice;

            botonPositivo.innerHTML =
                "+";


            // ======================================
            // BOTÓN NEGATIVO
            // ======================================

            const botonNegativo =
                document.createElement(
                    "button"
                );


            botonNegativo.type =
                "button";

            botonNegativo.classList.add(
                "boton-polaridad",
                "boton-negativo"
            );

            botonNegativo.dataset.valor =
                "negativo";

            botonNegativo.dataset.pin =
                indice;

            botonNegativo.innerHTML =
                "−";


            // ======================================
            // SELECCIONAR POSITIVO
            // ======================================

            botonPositivo.addEventListener(
                "click",
                function () {

                    seleccionarPolaridad(
                        indice,
                        "positivo",
                        opciones
                    );

                }
            );


            // ======================================
            // SELECCIONAR NEGATIVO
            // ======================================

            botonNegativo.addEventListener(
                "click",
                function () {

                    seleccionarPolaridad(
                        indice,
                        "negativo",
                        opciones
                    );

                }
            );


            opciones.appendChild(
                botonPositivo
            );

            opciones.appendChild(
                botonNegativo
            );


            contenedorPin.appendChild(
                etiqueta
            );

            contenedorPin.appendChild(
                opciones
            );


            contenedorPines.appendChild(
                contenedorPin
            );

        }
    );


    zona.appendChild(
        contenedorPines
    );


    contenedor.appendChild(
        zona
    );

}


// ==========================================
// SELECCIONAR POLARIDAD
// ==========================================

function seleccionarPolaridad(
    indice,
    valor,
    contenedor
) {

    // Buscar todos los botones
    // correspondientes a este pin

    const botones =
        contenedor.querySelectorAll(
            ".boton-polaridad"
        );


    botones.forEach(
        boton => {

            boton.classList.remove(
                "seleccionado"
            );

        }
    );


    // Buscar el botón seleccionado

    const botonSeleccionado =
        contenedor.querySelector(
            `[data-valor="${valor}"]`
        );


    if (
        botonSeleccionado
    ) {

        botonSeleccionado.classList.add(
            "seleccionado"
        );

    }


    // Guardar respuesta en el contenedor

    contenedor.dataset.valor =
        valor;


    // ==========================================
    // GUARDAR RESPUESTA DEL PIN
    // ==========================================

    const pin =
        document.querySelectorAll(
            ".pin-conexion"
        )[indice];


    pin.dataset.respuesta =
        valor;


    comprobarAutomaticamente();

}


// ==========================================
// COMPROBAR AUTOMÁTICAMENTE
// ==========================================

function comprobarAutomaticamente() {

    const pines =
        document.querySelectorAll(
            ".pin-conexion"
        );


    // ==========================================
    // COMPROBAR SI TODOS ESTÁN RESPONDIDOS
    // ==========================================

    let todosRespondidos =
        true;


    pines.forEach(
        pin => {

            if (
                !pin.dataset.respuesta
            ) {

                todosRespondidos =
                    false;

            }

        }
    );


    // Si falta uno, no hacer nada

    if (
        !todosRespondidos
    ) {

        return;

    }


    // ==========================================
    // CASO ESPECIAL: MOTORREDUCTOR
    // (solo importa que los pines sean distintos)
    // ==========================================

    if (
        componenteCorrecto.nombre ===
        "Motoreductor"
    ) {

        const pin1 =
            pines[0].dataset.respuesta;


        const pin2 =
            pines[1].dataset.respuesta;


        const esCorrecto =
            pin1 !== pin2;


        // ======================================
        // MARCAR BOTONES
        // ======================================

        pines.forEach(
            pin => {

                const respuesta =
                    pin.dataset.respuesta;


                const botonSeleccionado =
                    pin.querySelector(
                        `[data-valor="${respuesta}"]`
                    );


                if (
                    botonSeleccionado
                ) {

                    botonSeleccionado.classList.remove(
                        "selector-correcto",
                        "selector-incorrecto"
                    );


                    botonSeleccionado.classList.add(
                        esCorrecto
                            ? "selector-correcto"
                            : "selector-incorrecto"
                    );

                }

            }
        );


        // Bloquear botones

        pines.forEach(
            pin => {

                const botones =
                    pin.querySelectorAll(
                        ".boton-polaridad"
                    );


                botones.forEach(
                    boton => {

                        boton.disabled =
                            true;

                        boton.style.pointerEvents =
                            "none";

                    }
                );

            }
        );


        if (
            esCorrecto
        ) {

            puntos += 10;


            document.getElementById(
                "puntos"
            ).textContent =
                puntos;


            document.getElementById(
                "mensaje"
            ).innerHTML =
                "✅ ¡Correcto! Todas las conexiones son correctas.<br>" +
                "<strong>+10 puntos</strong>";

        }


        else {

            document.getElementById(
                "mensaje"
            ).textContent =
                "❌ Incorrecto. Los dos pines del motor no pueden tener la misma conexión.";

        }


        // Mostrar siguiente

        document.getElementById(
            "siguiente"
        ).style.display =
            "inline-block";


        return;

    }


    // ==========================================
    // COMPROBAR RESPUESTAS
    // ==========================================

    let todoCorrecto =
        true;


    pines.forEach(
        (pin, indice) => {

            const respuesta =
                pin.dataset.respuesta;


            const respuestaCorrecta =
                componenteCorrecto
                    .pines[indice]
                    .correcto;


            // ======================================
            // BOTÓN SELECCIONADO
            // ======================================

            const botonSeleccionado =
                pin.querySelector(
                    `[data-valor="${respuesta}"]`
                );


            // ======================================
            // CORRECTO
            // ======================================

            if (
                respuesta ===
                respuestaCorrecta
            ) {

                botonSeleccionado.classList.add(
                    "selector-correcto"
                );


                botonSeleccionado.classList.remove(
                    "selector-incorrecto"
                );

            }


            // ======================================
            // INCORRECTO
            // ======================================

            else {

                todoCorrecto =
                    false;


                botonSeleccionado.classList.add(
                    "selector-incorrecto"
                );


                botonSeleccionado.classList.remove(
                    "selector-correcto"
                );

            }

        }
    );


    // ==========================================
    // BLOQUEAR BOTONES
    // ==========================================

    pines.forEach(
        pin => {

            const botones =
                pin.querySelectorAll(
                    ".boton-polaridad"
                );


            botones.forEach(
                boton => {

                    boton.disabled =
                        true;

                    boton.style.pointerEvents =
                        "none";

                }
            );

        }
    );


    // ==========================================
    // TODO CORRECTO
    // ==========================================

    if (
        todoCorrecto
    ) {

        puntos += 10;


        document.getElementById(
            "puntos"
        ).textContent =
            puntos;


        document.getElementById(
            "mensaje"
        ).innerHTML =
            "✅ ¡Correcto! Todas las conexiones son correctas.<br>" +
            "<strong>+10 puntos</strong>";

    }


    // ==========================================
    // INCORRECTO
    // ==========================================

    else {

        document.getElementById(
            "mensaje"
        ).textContent =
            "❌ Una o más conexiones son incorrectas. Revisa las opciones en rojo.";

    }


    // Mostrar siguiente

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

    const PUNTOS_MAXIMOS = componentes.length * 10 +
        componentes.filter(c => c.polaridad).length * 10; // 190

    const punteoNivel = Number(((puntos / PUNTOS_MAXIMOS) * 10).toFixed(2));

    // Mostrar SIEMPRE la pantalla final
    document.querySelector("h2").textContent = "🎉 ¡Nivel 5 completado!";
    document.querySelector(".componente").style.display = "none";
    document.getElementById("respuestas").style.display = "none";
    document.getElementById("siguiente").style.display = "none";

    document.getElementById("mensaje").innerHTML =
        "Has identificado todos los componentes.<br><br>" +
        "⭐ Puntuación del nivel: <strong>" + punteoNivel.toFixed(2) +
        " / 10</strong><br><br>💾 Guardando resultado...";

    const usuarioGuardado = localStorage.getItem("usuarioActual");

    if (!usuarioGuardado) {
        document.getElementById("mensaje").innerHTML +=
            "<br>⚠️ No hay una sesión activa.";
        return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    const { error } = await supabaseClient
        .from("resultados")
        .upsert({
            usuario_id: usuario.id,
            nivel: 5,
            punteo: punteoNivel,
            completado: true
        }, {
            onConflict: "usuario_id,nivel"
        });

    if (error) {
        console.error("Error al guardar resultado:", error);
        document.getElementById("mensaje").innerHTML =
            "🎉 ¡Nivel completado!<br><br>" +
            "⭐ Puntuación: <strong>" + punteoNivel.toFixed(2) + " / 10</strong><br><br>" +
            "❌ No se pudo guardar: " + error.message;
        return;
    }

    document.getElementById("mensaje").innerHTML =
        "Has identificado todos los componentes.<br><br>" +
        "⭐ Puntuación del nivel: <strong>" + punteoNivel.toFixed(2) +
        " / 10</strong><br><br>💾 Resultado guardado correctamente";
}
