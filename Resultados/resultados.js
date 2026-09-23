const SUPABASE_URL = "https://nkzqvqcvzgcfvztgqrny.supabase.co";
const SUPABASE_KEY = "sb_publishable_C_0DnQejam5xSb_7XB5k7w_1C0BzvLx";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function cargarResultados() {

    const mensaje = document.getElementById("mensaje");
    const tablaBody = document.getElementById("tablaBody");

    const { data, error } = await supabaseClient
        .from("vista_notas_finales")
        .select("*")
        .order("nota_final", { ascending: false });

    console.log("DATOS:", data);
    console.log("ERROR:", error);

    if (error) {
        mensaje.textContent = "Error: " + error.message;
        return;
    }

    if (!data || data.length === 0) {
        mensaje.textContent = "No hay resultados.";
        return;
    }

    mensaje.textContent = "Participantes: " + data.length;

    tablaBody.innerHTML = "";

    data.forEach((usuario, index) => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.nivel_1}</td>
            <td>${usuario.nivel_2}</td>
            <td>${usuario.nivel_3}</td>
            <td>${usuario.nivel_4}</td>
            <td>${usuario.nivel_5}</td>
            <td>${usuario.nivel_6}</td>
            <td>${usuario.nivel_7}</td>
            <td>${usuario.nivel_8}</td>
            <td>${Number(usuario.nota_final).toFixed(2)}</td>
        `;

        tablaBody.appendChild(fila);
    });
}

cargarResultados();