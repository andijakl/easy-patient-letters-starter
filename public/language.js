document.addEventListener('DOMContentLoaded', () => {
    // This method gets executed when the page DOM is ready
    console.log("Document ready");

    // Get references to DOM elements
    const errorMsg = document.querySelector('.errormsg');
    const form = document.getElementById('patient_letter_form');
    const textarea = document.getElementById('patient_letter_text');
    const resultEcho = document.querySelector('.result_echo');

    // Ensure the error message is hidden when the page is loaded
    errorMsg.style.display = 'none';

    // Initialize the socket.io library
    const socket = io();

    form.addEventListener('submit', (e) => {
        // Do not reload page
        e.preventDefault();

        // Hide previous error message in case it's still visible
        errorMsg.style.display = 'none';

        // Retrieve text entered into text box
        const enteredText = textarea.value;
        console.log("Form submitted - entered text: " + enteredText);

        // Clear the previous results
        resultEcho.textContent = '';

        // Send the message to the server via socket.io
        socket.emit('patient_letter', enteredText);
    });

    socket.on('result_echo', (msg) => {
        console.log("Got message: " + msg);
        resultEcho.textContent = msg;
    });

    socket.on('error', (msg) => {
        // Error message was received
        // Update UI with the error message and make sure the div is visible
        console.log("Got error: " + msg);
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
    });
});