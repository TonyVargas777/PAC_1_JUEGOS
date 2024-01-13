function mostrar() {
  fetch("/juegos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let mostrarJuego = "";
      for (let i = 0; i < datos.length; i++) {
        mostrarJuego += `
            <div id="card">            
            <h3>${datos[i].nombre}</h3>
            <h4>Plataforma: ${datos[i].plataforma}</h4>
            <h4>Nota: ${datos[i].nota}</h4>
            <h4>Año: ${datos[i].anyo}</h4>       
            <img src="${datos[i].imagen}" alt="imagen">
            <input type="hidden" class="${nombre}" name="cardBorrar" value="${datos[i].nombre}">
            <button onclick="borrarCard(event)">Borrar ❌</button>
            </div>`;
      }
      document.getElementById("print").innerHTML = mostrarJuego;
    });
}

function limpiar() {
  document.getElementById("print").innerHTML = "";
}

function insertar() {
  let nombre = document.getElementById("nombre").value;
  nombre = nombre.toUpperCase();
  let plataforma = document.getElementById("plataforma").value;
  plataforma=plataforma.toUpperCase();
  let nota = document.getElementById("nota").value;  
  let anyo = document.getElementById("anyo").value;  
  let imagen = document.getElementById("imagen").value;  
  let nuevo = { nombre, plataforma, nota, anyo, imagen };
  console.log(nuevo);

  fetch("/juegos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevo),
  });
  mostrar();
}

function editar() {
  let nombre = document.getElementById("nombreEditar").value;
  nombre = nombre.toUpperCase();
  let plataforma = document.getElementById("plataformaEditar").value;
  plataforma=plataforma.toUpperCase();
  let nota = document.getElementById("notaEditar").value;
  let anyo = document.getElementById("anyoEditar").value;
  let imagen = document.getElementById("imagenEditar").value;
  let nuevo = { nombre, plataforma, nota, anyo, imagen };
  console.log(nuevo);

  fetch("/juegos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevo),
  });
  mostrar();
}

function borrar() {
  let nombre = document.getElementById("nombreBorrar").value;
  nombre = nombre.toUpperCase();  

  let nuevo = {
    nombre: nombre,
  };

  fetch("/juegos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevo),
  });
  mostrar();
}

function borrarCard(event) {
  let button = event.target; 
  let card = button.parentNode; 
  let nombre = card.querySelector("input[name='cardBorrar']").value; 

  let nuevo = {
    nombre: nombre,
  };

  fetch("/juegos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevo),
  });

  mostrar();
}


function buscarNombre() {
  let itemNombre = document.getElementById("itemNombre").value;
  itemNombre = itemNombre.toUpperCase();  
console.log(itemNombre)
  fetch("/juegos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let mostrarJuegos = "";

      for (let i = 0; i < datos.length; i++) {
        if (datos[i].nombre === itemNombre) {
          mostrarJuegos += `
          <div id="card">
          <h3>${datos[i].nombre}</h3>
          <h4>Plataforma: ${datos[i].plataforma}</h4>
          <h4>Nota: ${datos[i].nota}</h4>  
          <h4>Año: ${datos[i].anyo}</h4>         
          <img src="${datos[i].imagen}" alt="imagen">
          <button onclick="borrarCard(event)">Borrar ❌</button>
          </div>`;
        }
      }

      if (mostrarJuegos == "") {
        mostrarJuegos += `<p>No hay coincidencias</p>`;
      }

      document.getElementById("print").innerHTML = mostrarJuegos;
    });
}

function buscarPlataforma() {
  let itemPlataforma = document.getElementById("itemPlataforma").value;  
  itemPlataforma = itemPlataforma.toUpperCase();
console.log(itemPlataforma);
  // FETCH E IMPRESIÓN DE RESULTADOS
  fetch("/juegos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let mostrarJuegos = "";

      for (let i = 0; i < datos.length; i++) {
        if (datos[i].plataforma == itemPlataforma) {
          mostrarJuegos += `
          <div id="card">
          <h3>${datos[i].nombre}</h3>
          <h4>Plataforma: ${datos[i].plataforma}</h4>
          <h4>Nota: ${datos[i].nota}</h4>
          <h4>Año: ${datos[i].anyo}</h4>
          <img src="${datos[i].imagen}" alt="imagen">
          <button onclick="borrarCard(event)">Borrar ❌</button>
          </div>`;
        }
      }

      if (mostrarJuegos == "") {
        mostrarJuegos += `<p>No hay coincidencias</p>`;
      }

      document.getElementById("print").innerHTML = mostrarJuegos;
    });
}

function buscarNota() {
  let itemNota = document.getElementById("itemNota").value;
  console.log(itemNota);
  // FETCH E IMPRESIÓN DE RESULTADOS
  fetch("/juegos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let mostrarJuegos = "";

      for (let i = 0; i < datos.length; i++) {
        if (datos[i].nota == itemNota) {
          mostrarJuegos += `
          <div id="card">
          <h3>${datos[i].nombre}</h3>
          <h4>Plataforma: ${datos[i].plataforma}</h4>
          <h4>Nota: ${datos[i].nota}</h4>
          <h4>Año: ${datos[i].anyo}</h4>
          <img src="${datos[i].imagen}" alt="imagen">
          <button onclick="borrarCard(event)">Borrar ❌</button>
          </div>`;
        }
      }

      if (mostrarJuegos == "") {
        mostrarJuegos += `<p>No hay coincidencias</p>`;
      }

      document.getElementById("print").innerHTML = mostrarJuegos;
    });
}

function buscarAnyo() {
  let itemAnyo = document.getElementById("itemAnyo").value;
  console.log(itemAnyo);
  
  // FETCH E IMPRESIÓN DE RESULTADOS
  fetch("/juegos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      let mostrarJuegos = "";

      for (let i = 0; i < datos.length; i++) {
        if (datos[i].anyo == itemAnyo) {
          mostrarJuegos += `
          <div id="card">
          <h3>${datos[i].nombre}</h3>
          <h4>Plataforma: ${datos[i].plataforma}</h4>
          <h4>Nota: ${datos[i].nota}</h4>
          <h4>Año: ${datos[i].anyo}</h4>
          <img src="${datos[i].imagen}" alt="imagen">
          <button onclick="borrarCard(event)">Borrar ❌</button>
          </div>`;
        }
      }

      if (mostrarJuegos == "") {
        mostrarJuegos += `<p>No hay coincidencias</p>`;
      }

      document.getElementById("print").innerHTML = mostrarJuegos;
    });
}