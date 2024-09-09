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
          body: JSON.stringify({ nombre, fecha, personas, tipolugar,telefono }),
      });

      if (response.ok) {
          const data = await response.json();
          document.querySelector('.mensaje-confirmacion').textContent = `Reserva realizada: ${data.nombre}`;
      } else {
          document.querySelector('.mensaje-confirmacion').textContent = 'Error al realizar la reserva.';
      }
  } catch (error) {
      document.querySelector('.mensaje-confirmacion').textContent = 'Error al realizar la reserva.';
  }
});
