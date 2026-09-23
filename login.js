// ==========================================
// FUNCIÓN PARA HASHEAR CONTRASEÑA (SHA-256)
// ==========================================

async function hashearContrasena(texto) {
    const encoder = new TextEncoder();
    const datos = encoder.encode(texto);
    const hashBuffer = await crypto.subtle.digest("SHA-256", datos);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}


// ==========================================
// MOSTRAR / OCULTAR SECCIONES
// ==========================================

document.getElementById("btnMostrarRegistro").addEventListener("click", function() {
    document.getElementById("loginSeccion").style.display = "none";
    document.getElementById("registroSeccion").style.display = "block";
});

document.getElementById("btnMostrarLogin").addEventListener("click", function() {
    document.getElementById("registroSeccion").style.display = "none";
    document.getElementById("loginSeccion").style.display = "block";
});


// ==========================================
// REGISTRO
// ==========================================

document
    .getElementById("formRegistro")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const nombre = document.getElementById("nombreRegistro").value.trim();
        const usuario = document.getElementById("usuarioRegistro").value.trim().toLowerCase();
        const contrasena = document.getElementById("contrasenaRegistro").value;
        const mensaje = document.getElementById("mensajeRegistro");

        if (!nombre || !usuario || !contrasena) {
            mensaje.textContent = "Completa todos los campos.";
            return;
        }

        if (contrasena.length < 6) {
            mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
            return;
        }

        mensaje.textContent = "Verificando usuario...";

        const { data: usuarioExistente, error: errorBusqueda } =
            await supabaseClient
                .from("usuarios")
                .select("id")
                .eq("usuario", usuario)
                .maybeSingle();

        if (errorBusqueda) {
            console.error("ERROR BUSCANDO USUARIO:", errorBusqueda);
            mensaje.textContent = "Error al consultar el usuario.";
            return;
        }

        if (usuarioExistente) {
            mensaje.textContent = "Ese nombre de usuario ya existe.";
            return;
        }

        mensaje.textContent = "Creando cuenta...";

        const contrasenaHash = await hashearContrasena(contrasena);

        const { error: errorUsuario } =
            await supabaseClient
                .from("usuarios")
                .insert({
                    nombre: nombre,
                    usuario: usuario,
                    contrasena_hash: contrasenaHash,
                    rol: "jugador"
                });

        if (errorUsuario) {
            console.error("ERROR GUARDANDO EN usuarios:", errorUsuario);
            mensaje.textContent = "No se pudo crear la cuenta.";
            return;
        }

        mensaje.textContent = "¡Cuenta creada correctamente!";

        document.getElementById("formRegistro").reset();

        setTimeout(function () {
            document.getElementById("registroSeccion").style.display = "none";
            document.getElementById("loginSeccion").style.display = "block";
            document.getElementById("usuarioLogin").value = usuario;
        }, 1000);

    });


// ==========================================
// LOGIN
// ==========================================

document
    .getElementById("formLogin")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const usuario = document.getElementById("usuarioLogin").value.trim().toLowerCase();
        const contrasena = document.getElementById("contrasenaLogin").value;
        const mensaje = document.getElementById("mensajeLogin");

        if (!usuario || !contrasena) {
            mensaje.textContent = "Completa todos los campos.";
            return;
        }

        mensaje.textContent = "Verificando...";

        const contrasenaHash = await hashearContrasena(contrasena);

        const { data: usuarioEncontrado, error } =
            await supabaseClient
                .from("usuarios")
                .select("*")
                .eq("usuario", usuario)
                .eq("contrasena_hash", contrasenaHash)
                .maybeSingle();

        if (error) {
            console.error("ERROR EN LOGIN:", error);
            mensaje.textContent = "Error al iniciar sesión.";
            return;
        }

        if (!usuarioEncontrado) {
            mensaje.textContent = "Usuario o contraseña incorrectos.";
            return;
        }

        localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));

        mensaje.textContent = "¡Bienvenido!";

        setTimeout(function () {
            window.location.href = "index.html";
        }, 800);

    });
