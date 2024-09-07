document.addEventListener('DOMContentLoaded', () => {
    const reservaForm = document.getElementById('reserva-form');
    const mensajeConfirmacion = document.querySelector('.mensaje-confirmacion');

    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        fetch('/reservar', {
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
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || 'Error en la solicitud');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                mensajeConfirmacion.innerHTML = `
                  <h2 style="color: white;">Reserva Realizada</h2>
                  <p style="color: white;">¡Gracias por tu reserva! Tu solicitud ha sido recibida correctamente.</p>
                `;
                reservaForm.reset(); 
            } else {
                mensajeConfirmacion.innerHTML = `
                  <p style="color: red;">${data.error}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
            mensajeConfirmacion.innerHTML = `
              <p style="color: red;">Ocurrió un error al realizar la reserva. Por favor, intenta nuevamente.</p>
              <p style="color: red;">Detalles del error: ${error.message}</p>
            `;
        });
    });
});
