document.getElementById('reserva-form').addEventListener('submit', async (event) => {
    event.preventDefault();

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
            const result = await response.json();
            document.querySelector('.mensaje-confirmacion').innerText = result.message;
        } else {
            const error = await response.json();
            document.querySelector('.mensaje-confirmacion').innerText = `Error: ${error.error}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.mensaje-confirmacion').innerText = 'Error al enviar la reserva.';
    }
});
