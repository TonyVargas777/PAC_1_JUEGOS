const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cargar el respaldo desde backup.json
let juegos = JSON.parse(fs.readFileSync("backup.json", "utf-8"));

app.get("/juegos", (req, res) => {
    res.send(juegos);
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
    res.send(juegos);
});

app.put("/juegos", (req, res) => {
    let { nombre, plataforma, nota, anyo, imagen } = req.body;
    for (let i = 0; i < juegos.length; i++) {
        if (nombre === juegos[i].nombre) {
            juegos[i] = { nombre, plataforma, nota, anyo, imagen };
        }
    }
    res.send(juegos);
});

app.delete("/juegos", (req, res) => {
    juegos = juegos.filter(juego => juego.nombre !== req.body.nombre);
    res.send(juegos);
});

// Resetear la base de datos a su estado original
app.post("/reset", (req, res) => {
    try {
        juegos = JSON.parse(fs.readFileSync("backup.json", "utf-8"));
        res.status(200).send("Base de Datos reiniciada correctamente");
    } catch (error) {
        console.error("Error al reiniciar la Base de Datos", error);
        res.status(500).send("Error al reiniciar la Base de Datos");
    }
});

app.listen(3000);
