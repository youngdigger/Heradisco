// scripts.js

document.getElementById('reserva-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const fecha = document.getElementById('fecha').value;
    const personas = document.getElementById('personas').value;

    try {
        const response = await fetch('/reservar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, fecha, personas })
        });

        if (response.ok) {
            document.querySelector('.mensaje-confirmacion').innerText = 'Reserva realizada con éxito';
            document.getElementById('reserva-form').reset(); // Limpiar el formulario
        } else {
            const error = await response.json();
            document.querySelector('.mensaje-confirmacion').innerText = `Error: ${error.error}`;
        }
    } catch (error) {
        console.error('Error al enviar la reserva:', error);
        document.querySelector('.mensaje-confirmacion').innerText = 'Error en la reserva';
    }
});
