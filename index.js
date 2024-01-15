const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const juegos = require("./array");

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
  console.log(nuevoJuego);
});



app.put("/juegos", (req, res) => {
  let nombre = req.body.nombre;
  let plataforma = req.body.plataforma;
  let nota = req.body.nota;
  let anyo= req.body.anyo;
  let imagen = req.body.imagen;
  console.log(nombre,plataforma,nota,anyo);
  for (let i = 0; i < juegos.length; i++) {
    if (nombre == juegos[i].nombre) {
      juegos[i].plataforma = plataforma;
      juegos[i].nota = nota;
      juegos[i].anyo = anyo;
      juegos[i].imagen = imagen;
    }
  }
  res.send(juegos);
});

app.delete("/juegos", (req, res) => {
  let nombre = req.body.nombre;
  console.log(nombre);
  for (let i = 0; i < juegos.length; i++) {
    if (nombre === juegos[i].nombre) {
      console.log("he entrado, hay coincidencia, juego eliminado");
      juegos.splice(i, 1);
    }
  }
  res.send(juegos);
});

app.post("/reset", (req, res) => {
  const fs = require("fs");

  try {
    // Lee el contenido de array - copia.js
    const contenidoCopia = fs.readFileSync("array - copia.js", "utf-8");

    // Sobrescribe array.js con el contenido de array - copia.js
    fs.writeFileSync("array.js", contenidoCopia, "utf-8");

    res.status(200).send("Base de Datos reiniciada correctamente");
  } catch (error) {
    console.error("Error al reiniciar la Base de Datos", error);
    res.status(500).send("Error al reiniciar la Base de Datos");
  }
});


app.listen(3000);
