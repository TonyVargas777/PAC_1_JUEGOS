const express = require("express");
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importar array de juegos
const juegos = require("./array");

// GET - Obtener todos los juegos
app.get("/juegos", (req, res) => {
  res.json(juegos);
});

// POST - Agregar un nuevo juego
app.post("/juegos", (req, res) => {
  let nuevoJuego = {
    nombre: req.body.nombre,
    plataforma: req.body.plataforma,
    nota: req.body.nota,
    anyo: req.body.anyo,
    imagen: req.body.imagen,
  };
  juegos.push(nuevoJuego);
  console.log("Juego agregado:", nuevoJuego);
  res.json(juegos);
});

// PUT - Actualizar un juego existente
app.put("/juegos", (req, res) => {
  let { nombre, plataforma, nota, anyo, imagen } = req.body;
  console.log("Actualizando:", nombre, plataforma, nota, anyo);
  
  for (let i = 0; i < juegos.length; i++) {
    if (nombre === juegos[i].nombre) {
      juegos[i].plataforma = plataforma;
      juegos[i].nota = nota;
      juegos[i].anyo = anyo;
      juegos[i].imagen = imagen;
      break; // Salir del bucle una vez encontrado
    }
  }
  res.json(juegos);
});

// DELETE - Eliminar un juego
app.delete("/juegos", (req, res) => {
  let nombre = req.body.nombre;
  console.log("Intentando eliminar:", nombre);
  
  for (let i = 0; i < juegos.length; i++) {
    if (nombre === juegos[i].nombre) {
      console.log("Juego eliminado:", juegos[i]);
      juegos.splice(i, 1);
      break; // Salir del bucle una vez eliminado
    }
  }
  res.json(juegos);
});

// POST - Reiniciar base de datos
app.post("/reset", (req, res) => {
  const fs = require("fs");

  try {
    // Lee el contenido de array - copia.js
    const contenidoCopia = fs.readFileSync("array - copia.js", "utf-8");

    // Sobrescribe array.js con el contenido de array - copia.js
    fs.writeFileSync("array.js", contenidoCopia, "utf-8");

    console.log("✅ Base de datos reiniciada");
    res.status(200).send("Base de Datos reiniciada correctamente");
  } catch (error) {
    console.error("❌ Error al reiniciar la Base de Datos:", error);
    res.status(500).send("Error al reiniciar la Base de Datos");
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📂 Archivos estáticos servidos desde /public`);
});