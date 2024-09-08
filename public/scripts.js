document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reserva-form');
    const mensajeConfirmacion = document.querySelector('.mensaje-confirmacion');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            fecha: formData.get('fecha'),
            personas: formData.get('personas')
        };

        try {
            const response = await fetch('/reservar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error en la reserva');
            }

            const result = await response.json();
            mensajeConfirmacion.textContent = `Reserva confirmada: ID ${result.id}`;
        } catch (error) {
            mensajeConfirmacion.textContent = `Error al realizar la reserva: ${error.message}`;
        }
    });
});
