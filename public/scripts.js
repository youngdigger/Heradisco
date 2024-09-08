document.getElementById('reserva-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
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
        
        if (!response.ok) throw new Error('Error en la reserva');
        
        const data = await response.json();
        document.querySelector('.mensaje-confirmacion').innerText = `Reserva confirmada: ${data.nombre} - ${data.fecha}`;
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.mensaje-confirmacion').innerText = 'Error al realizar la reserva';
    }
});
