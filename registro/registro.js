//++++++++++++++++++++++++++++ esto es del camcio de paginas 

const tabButtons = document.querySelectorAll('.tab-btn');
const loginForm = document.getElementById('loginForm'); //esto lo tengo que revisar si lo quito 
const registerForm = document.getElementById('registerForm');

if (tabButtons.length) {
    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const link = button.dataset.link;
            if (link) {
                window.location.href = link;
            }
        });
    });
}



// ++++++++++++++ esto es del registro 



// Ejemplo de Feedback UX con JavaScript
const formulario = document.getElementById('registerForm');
const boton = document.getElementById('btn-guardar');




formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault(); // Evita que la página recargue de inmediato

    // // UX: Desactivar el botón para evitar doble-clic
    // boton.disabled = true;
    // boton.innerText = "Guardando...";

    // Aquí es donde enviaremos los datos al Mesero (Backend)...

    // 1. Tomamos varables
    const regisnombre = document.getElementById('nombre').value;
    const regisapellido = document.getElementById('apellido').value;
    const regisemail = document.getElementById('correo').value;
    const registelefono = document.getElementById('telefono').value;
    const regiscontrasena = document.getElementById('password').value;

    // 2. Llamamos al Mesero (Backend) en el puerto 3000
    try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST', // Queremos "enviar" información
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: regisnombre, apellido: regisapellido, correo: regisemail, telefono: registelefono, contrasena: regiscontrasena })
        });

        if (respuesta.ok) {
            alert('¡usuario registrado correctamente!');
            formulario.reset(); // Limpiamos el formulario
        }
    } catch (error) {
        alert('El server no responde. Revisa si el servidor está encendido.');
    }
});












