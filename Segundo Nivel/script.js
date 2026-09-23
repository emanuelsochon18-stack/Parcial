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
            .eq("nivel", 2)
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
        imagen: "img/simbologia/resistor.png" 
    }, 

    { 
        nombre: "Capacitor Electrolítico", 
        imagen: "img/simbologia/capacitor.png" 
    }, 

    { 
        nombre: "Diodo", 
        imagen: "img/simbologia/diodo.png" 
    }, 

    { 
        nombre: "LED", 
        imagen: "img/simbologia/led.png" 
    }, 

    { 
        nombre: "Transistor NPN", 
        imagen: "img/simbologia/npn.png" 
    }, 
    { 
        nombre: "Transistor PNP", 
        imagen: "img/simbologia/pnp.png" 
    }, 

    { 
        nombre: "Pulsador", 
        imagen: "img/simbologia/pulsador.png" 
    }, 

    { 
        nombre: "Motoreductor", 
        imagen: "img/simbologia/motor.png" 
    }, 

    { 
        nombre: "Transformador", 
        imagen: "img/simbologia/trasformador.png" 
    }, 

    { 
        nombre: "Switch", 
        imagen: "img/simbologia/switch.png" 
    }, 

    { 
        nombre: "Potenciómetro", 
        imagen: "img/simbologia/potenciometro.png" 
    }, 

    { 
        nombre: "LDR", 
        imagen: "img/simbologia/ldr.png" 
    }, 

    { 
        nombre: "IC", 
        imagen: "img/simbologia/ic.png" 
    }, 

    { 
        nombre: "Fusible", 
        imagen: "img/simbologia/fusible.png" 
    }, 

    { 
        nombre: "Capacitor Cerámico", 
        imagen: "img/simbologia/Ceramico.png" 
    }, 

    { 
        nombre: "Buzzer", 
        imagen: "img/simbologia/buzzer.png" 
    }, 

    { 
        nombre: "Batería", 
        imagen: "img/simbologia/bateria.png" 
    } 

];

// ==========================================
// VARIABLES DEL JUEGO
// ==========================================

let puntos = 0;

let preguntaActual = 0;

let componenteCorrecto;

// Lista de componentes que todavía no han salido
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

    document.getElementById("siguiente").style.display = "none";

    document.getElementById("mensaje").textContent =
        "Selecciona el nombre correcto";


    // ==========================================
    // COMPROBAR SI TERMINÓ EL NIVEL
    // ==========================================

    if (componentesPendientes.length === 0) {

        nivelCompletado();

        return;

    }


    // ==========================================
    // SACAR UN COMPONENTE
    // ==========================================

    // Sacamos el primero de la lista
    // y lo eliminamos para que no vuelva a salir

    componenteCorrecto =
        componentesPendientes.shift();


    // ==========================================
    // MOSTRAR IMAGEN
    // ==========================================

    document.getElementById("imagenPregunta").src =
        componenteCorrecto.imagen;


    // ==========================================
    // CREAR RESPUESTAS
    // ==========================================

    let respuestas = [componenteCorrecto];


    // Buscar componentes incorrectos
    // que no sean el correcto

    let incorrectas = componentes.filter(

        componente =>
            componente !== componenteCorrecto

    );


    // Mezclarlas

    incorrectas = mezclar(incorrectas);


    // Agregar 3 incorrectas

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


        boton.textContent =
            componente.nombre;


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


    // Desactivar botones

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
            "❌ Incorrecto. La respuesta era " +
            componenteCorrecto.nombre;


        // Marcar respuesta correcta

        botones.forEach(boton => {

            if (
                boton.textContent ===
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


    // Actualizar número

    document.getElementById("numeroPregunta").textContent =
        preguntaActual + 1;


    crearPregunta();

}


// ==========================================
// NIVEL COMPLETADO
// ==========================================

async function nivelCompletado() {

    const punteoNivel = (puntos / 170) * 10;

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
                nivel: 2,
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
        "🎉 ¡Nivel 2 completado!";

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