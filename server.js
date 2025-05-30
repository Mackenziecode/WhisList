const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


app.use('/api', middlewares, router);


app.use(express.static(path.join(__dirname, 'dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
