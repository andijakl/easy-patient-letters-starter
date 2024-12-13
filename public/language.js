$(document).ready(() => {
    // This method gets executed when the page DOM is ready
    console.log("Document ready");
    // Ensure the error message is hidden when the page is loaded
    $('.errormsg').hide();
    // Initialize the socket.io library
    const socket = io();

    $("#patient_letter_form").submit((e) => {
        // Hide previous error message in case it's still visible
        $('.errormsg').hide();

        // Retrieve text entered into text box
        let enteredText = $("#patient_letter_text").val();
        console.log("Form submitted - entered text: " + enteredText);

        // Clear the previous results
        $('#result_echo').val('');

        // Send the message to the server via socket.io
        socket.emit('patient_letter', enteredText);

        // Do not reload page
        e.preventDefault();
    });

    socket.on('result_echo', (msg) => {
        console.log("Got message: " + msg);
        $('.result_echo').html(msg);
    });

    socket.on('error', (msg) => {
        // Error message was received
        // Update UI with the error message and make sure the div is visible
        console.log("Got error: " + msg);
        $('.errormsg').html(msg);
        $('.errormsg').show();
    });
});