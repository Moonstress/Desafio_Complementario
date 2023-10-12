const socket = io();
let user;
let chatBox = document.querySelector('#chatBox');

Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa un nombre de usuario para identificarte.',
    inputValidator: (value) => {
        return !value && 'Necesitás ingresar un nombre de usuario si o sí.';
    },
    allowOutsideClick: false,
}).then((resultado) => {
    user = resultado.value;
    console.log(user);
});

const handleInput = (evt) => {
    if (evt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            // Send the message to the server
            socket.emit('message', { user, message: chatBox.value });
            chatBox.value = '';
        }
    }
};

chatBox.addEventListener('keyup', handleInput);

socket.on('messageLogs', (data) => {
    let logP = document.querySelector('#messageLogs');
    let messagesText = '';
    data.forEach((message) => {
        messagesText += `${message.user} dice: ${message.message}<br>`;
    });
    logP.innerHTML = messagesText;
});

// Error handling for Socket.io events
socket.on('connect_error', (error) => {
    console.error('Socket.io connection error:', error);
    // You can inform the user of the connection error here.
});

socket.on('connect_timeout', () => {
    console.error('Socket.io connection timeout');
    // You can inform the user of the connection timeout here.
});

socket.on('error', (error) => {
    console.error('Socket.io error:', error);
    // You can inform the user of a general Socket.io error here.
});
