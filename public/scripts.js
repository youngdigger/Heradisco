document.querySelector('#reservar-button').addEventListener('click', () => {
    const reservaData = {
        nombre: document.querySelector('#nombre').value,
        correo: document.querySelector('#correo').value,
        fecha: document.querySelector('#fecha').value,
        cantidad: document.querySelector('#cantidad').value
    };

    fetch('/reservar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Reserva exitosa:', data);
        alert('Reserva realizada con éxito');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al realizar la reserva');
    });
});
