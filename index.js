const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cargar datos iniciales desde el archivo JSON
const cargarDatosOriginales = () => {
  return JSON.parse(fs.readFileSync("array.json", "utf-8"));
};

// Guardamos los juegos en memoria
let juegos = cargarDatosOriginales();

app.get("/juegos", (req, res) => {
  res.json(juegos);
});

app.post("/juegos", (req, res) => {
  let nuevoJuego = {
    nombre: req.body.nombre,
    plataforma: req.body.plataforma,
    nota: req.body.nota,
    anyo: req.body.anyo,
    imagen: req.body.imagen,
  };
  juegos.push(nuevoJuego);
  res.json(juegos);
});

app.put("/juegos", (req, res) => {
  let nombre = req.body.nombre;
  let plataforma = req.body.plataforma;
  let nota = req.body.nota;
  let anyo = req.body.anyo;
  let imagen = req.body.imagen;

  for (let i = 0; i < juegos.length; i++) {
    if (nombre === juegos[i].nombre) {
      juegos[i].plataforma = plataforma;
      juegos[i].nota = nota;
      juegos[i].anyo = anyo;
      juegos[i].imagen = imagen;
    }
  }
  res.json(juegos);
});

app.delete("/juegos", (req, res) => {
  let nombre = req.body.nombre;
  juegos = juegos.filter((juego) => juego.nombre !== nombre);
  res.json(juegos);
});

// Resetear base de datos cargando de nuevo los datos originales
app.post("/reset", (req, res) => {
  juegos = cargarDatosOriginales();
  res.json({ message: "Base de Datos reiniciada correctamente", juegos });
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
