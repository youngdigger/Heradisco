document.getElementById('reserva-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Capturar los valores de los campos del formulario
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const fecha = document.getElementById('fecha').value;
  const personas = document.getElementById('personas').value;
  const tipolugar = document.getElementById('tipolugar').value;

  // Validación rápida para asegurarse de que todos los campos estén completos
  if (!nombre || !telefono || !fecha || !personas || !tipolugar) {
    document.querySelector('.mensaje-confirmacion').textContent = 'Por favor, complete todos los campos.';
    return;
  }

  // Mostrar mensaje de "Cargando..." mientras se realiza la reserva
  document.querySelector('.mensaje-confirmacion').textContent = 'Realizando la reserva...';

  try {
    // Enviar la solicitud al backend
    const response = await fetch('/reservar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, telefono, fecha, personas, tipolugar }),
    });

    // Si la reserva se realizó correctamente
    if (response.ok) {
      const data = await response.json();
      document.querySelector('.mensaje-confirmacion').textContent = `Reserva realizada para: ${data.nombre}`;

      // Crear el mensaje de confirmación de reserva
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
      // Si la respuesta no fue exitosa, mostrar un error al usuario
      document.querySelector('.mensaje-confirmacion').textContent = 'Error al realizar la reserva.';
    }

  } catch (error) {
    // En caso de error, mostrar un mensaje al usuario y en la consola
    document.querySelector('.mensaje-confirmacion').textContent = 'Error al realizar la reserva.';
    console.error('Error:', error); // Mostrar el error en la consola para facilitar la depuración
  }
});
