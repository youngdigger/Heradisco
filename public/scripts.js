document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('reserva-form').addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Obtener los valores del formulario
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const fecha = document.getElementById('fecha').value;
      const personas = document.getElementById('personas').value;
      const tipolugarElement = document.getElementById('tipolugar');
      
      if (!tipolugarElement) {
          console.error('El elemento con ID "tipolugar" no se encuentra en el DOM.');
          return;
      }
      
      const tipolugar = tipolugarElement.value;
  
      try {
          const response = await fetch('/reservar', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nombre, email, fecha, personas, tipolugar }),
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
});
