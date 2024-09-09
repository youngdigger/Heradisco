document.getElementById('reserva-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const fecha = document.getElementById('fecha').value;
  const personas = document.getElementById('personas').value;
  const tipoLugar = document.getElementById('tipo-lugar').value; // Nueva variable

  try {
    const response = await fetch('/reservar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email, fecha, personas, tipoLugar }), // Enviar la nueva variable
    });

    if (response.ok) {
      const data = await response.json();
      document.querySelector('.mensaje-confirmacion').textContent = `Reserva realizada: ${data.nombre}, Tipo de lugar: ${data.tipoLugar}`; // Mostrar la nueva variable
    } else {
      document.querySelector('.mensaje-confirmacion').textContent = 'Error al realizar la reserva.';
    }
  } catch (error) {
    document.querySelector('.mensaje-confirmacion').textContent = 'Error al realizar la reserva.';
  }
});
