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
                return response.json().then(errorInfo => Promise.reject(errorInfo));
            }
            return response.json();
        })
        .then(data => {
            mensajeConfirmacion.innerHTML = `
              <h2 style="color: white;">Reserva Realizada</h2>
              <p style="color: white;">¡Gracias por tu reserva! Tu solicitud ha sido recibida correctamente.</p>
            `;
            reservaForm.reset(); 
        })
        .catch(error => {
            console.error('Error:', error);
            mensajeConfirmacion.innerHTML = `
              <p style="color: red;">Ocurrió un error al realizar la reserva. Por favor, intenta nuevamente.</p>
            `;
        });
    });
});



