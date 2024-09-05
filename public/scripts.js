document.addEventListener('DOMContentLoaded', () => {
    const reservaForm = document.getElementById('reserva-form');
    const mensajeConfirmacion = document.querySelector('.mensaje-confirmacion');

    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        fetch('/api/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                fecha: document.getElementById('fecha').value,
                personas: document.getElementById('personas').value
            })
        })
        .then(response => response.json())
        .then(data => {
            mensajeConfirmacion.innerHTML = `
                <h2>Reserva Realizada</h2>
                <p>¡Gracias por tu reserva! Tu solicitud ha sido recibida correctamente.</p>
            `;
            reservaForm.reset(); 
        })
        .catch(error => {
            console.error('Error:', error);
            mensajeConfirmacion.innerHTML = `
                <h2>Error</h2>
                <p>Hubo un problema al realizar la reserva. Inténtalo de nuevo más tarde.</p>
            `;
        });
    });
});
