const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const fullFlights = require('./flights/full');
const shortFlights = require('./flights/short');

app.use(cors());

app.get('/flights/full', (req, res) => {
  res.json(fullFlights);
});

app.get('/flights/short', (req, res) => {
  res.json(shortFlights.slice(0, 3)); // limiter à 2-3 pour le résumé
});

app.listen(PORT, () => {
  console.log(`✅ Serveur vols-backend lancé sur http://localhost:${PORT}`);
});
