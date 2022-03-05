// Librairie qui me permet d'utiliser les fichiers .env
// C'est dans ce fichier que je définie mes variables d'environement
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routers');
const app = express();

// Je définie les CORS afin que seul mon app front puissent acceder à l'api
app.use(cors({
    origin: 'https://kanbanlike.netlify.app/'
}));

// middleware qui sert à interpréter le body d'une requêtes
app.use(express.json());


app.use(router)

app.listen(process.env.PORT || 3000, () => {
    console.log('CORS-enabled server running on :', process.env.PORT);
});
