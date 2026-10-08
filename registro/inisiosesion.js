//+++++++++++++++++++++inisio de sesion 
const correo = document.getElementById("correo");
const contrasena = document.getElementById("password");
const loginForm = document.getElementById('loginForm');



loginForm.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const logincorreo = correo.value.trim(); // el trim se lea bien los datos (quita los espacios al principio y al final, no quita entremedias)
    const logincontrasena = contrasena.value.trim();



    // Validar correo
    if (logincorreo === "") {
        return;
    }


    // Validar contraseña
    if (logincontrasena === "") {
        return;
    }



    // si hay algo buscado en la base de datos
    try {
        const respuesta = await fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                correo: logincorreo,
                contrasena: logincontrasena
            })
        });
        const resultado = await respuesta.json(); // el awit Pausa la función actual hasta que la operación termine



        if (respuesta.ok && resultado.exito) { // .exito es para mirar si es valida
            sessionStorage.setItem("usuarios", JSON.stringify(resultado.usuarios)); //Guarda datos en el sessionStorage del navegador.
            window.location.href = "../index.html";
            return;
} 


    } catch (error) {
         console.error("no fue posible conectar al servidor:",error); // Imprime el error directamente en la consola
    }
});

