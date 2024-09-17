document.getElementById('reserva-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const fecha = document.getElementById('fecha').value;
  const personas = document.getElementById('personas').value;
  const tipolugar = document.getElementById('tipolugar').value;

  try {
    const response = await fetch('/reservar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, telefono, fecha, personas, tipolugar }),
    });

    if (response.ok) {
      const data = await response.json();
      document.querySelector('.mensaje-confirmacion').textContent = `Reserva realizada: ${data.nombre}`;

      // Enviar mensaje de WhatsApp de confirmación (la lógica del envío está en el backend)
      const mensaje = `
        ¡Hola ${nombre}!
        Tu reserva ha sido confirmada:
        - Fecha: ${fecha}
        - Número de personas: ${personas}
        - Tipo de lugar: ${tipolugar}
        ¡Te esperamos en Hera!
      `;
      
      // Opcional: Mostrar el mensaje localmente antes de que lo reciba en WhatsApp
      console.log(`Mensaje de confirmación enviado a WhatsApp: ${mensaje}`);

    } else {
      document.querySelector('.mensaje-confirmacion').textContent = 'Error al realizar la reserva.';
    }
  } catch (error) {
    document.querySelector('.mensaje-confirmacion').textContent = 'Error al realizar la reserva.';
  }
});
