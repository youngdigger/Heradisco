document.addEventListener('DOMContentLoaded', () => {
    const reservaForm = document.getElementById('reserva-form');
    const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');

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
              <h2 style="color: white;">Reserva Realizada</h2>
        <p style="color: white;">¡Gracias por tu reserva! Tu solicitud ha sido recibida correctamente.</p>
      
            `;
            reservaForm.reset(); 
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('reservaForm').addEventListener('submit', function(event) {
                event.preventDefault();
            
                const nombre = document.getElementById('nombre').value;
                const email = document.getElementById('email').value;
            
                fetch('/reserva', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nombre, email })
                })
                .then(response => response.json())
                .then(data => {
                    mensajeConfirmacion.innerHTML = `
                        <h2>Reserva Realizada</h2>
                        <p>¡Gracias por tu reserva! Tu solicitud ha sido recibida correctamente.</p>
              
                    `;
                    reservaForm.reset();
                })
             
                .catch(error => console.error('Error:', error));
            
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error al enviar el correo:', error); // Agrega este log
                        return res.status(500).json({ error: 'Error al enviar el correo' });
                    }
                    console.log('Correo enviado:', info.response); // Log para el éxito
                    res.status(201).json({ id: this.lastID, message: 'Reserva creada y correo enviado con éxito' });
                });
                
            });
            
        });
    });
});
