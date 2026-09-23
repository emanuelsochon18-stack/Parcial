const SUPABASE_URL = "https://nkzqvqcvzgcfvztgqrny.supabase.co";
const SUPABASE_KEY = "sb_publishable_C_0DnQejam5xSb_7XB5k7w_1C0BzvLx";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// VERIFICAR SESIÓN
// ==========================================

async function verificarSesion() {

    const { data, error } =
        await supabaseClient.auth.getSession();


    console.log("========== ELECTROGAME ==========");
    console.log("ERROR:", error);
    console.log("SESSION:", data.session);


    if (error) {

        console.error("ERROR AL COMPROBAR SESIÓN:", error);

        return false;
    }


    if (data.session) {

        console.log("HAY UNA SESIÓN ACTIVA");
        console.log(
            "ID DEL USUARIO:",
            data.session.user.id
        );

        console.log(
            "CORREO:",
            data.session.user.email
        );

        return true;

    } else {

        console.log("NO HAY SESIÓN");

        return false;
    }
}