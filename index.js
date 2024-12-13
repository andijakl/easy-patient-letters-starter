import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

// For creating the Node JS server in the ES modules syntax
// based on Express, see: 
// https://socket.io/docs/v4/server-initialization/#with-express
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// TODO: do not forget to set the OPENAI_API_KEY environment variable.
// This also applies when deploying to Azure.
// An easy way to see the Node.js logs on Azure is to use the "Log stream" feature.
// You can access an easy admin panel for your Azure Web App by adding scm after the app name in the URL.
// Example: https://easy-patient-letters.azurewebsites.net -> https://easy-patient-letters.scm.azurewebsites.net
// On Azure, set the environment variable in the service settings/configuration -> application settings.


// You do not need to change the following settings
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', async (socket) => {
    socket.on('patient_letter', async (msg) => {
        console.log("Got patient letter: " + msg);
        await analyzePatientLetter(msg, socket.id);
    });
});


async function analyzePatientLetter(patientLetterText, socketId) {
    if (!patientLetterText) {
        io.to(socketId).emit('error', 'Please enter a patient letter.');
        return;
    }


    try {
        // TODO: call the OpenAI API here
        // See: https://beta.openai.com/docs/api-reference/create-completion
        

        io.to(socketId).emit('result_echo', 'Backend received and returned: ' + patientLetterText);
    } catch (error) {
        console.log(error);
        io.to(socketId).emit('error', 'Error understanding your assessment: ' + error);
    }

}


httpServer.listen(PORT, () => console.log(`Easy Patient Letters server listening on port ${PORT}!`));
