import { urlAPIAutenticacion, urlAPITransito, urlHomepage } from "../js/configuracion.js";
import { ruta } from "./variables.js";

const botonHome = document.getElementById("enlaceAHomepage");
const logoDelSistema = document.getElementById("logoDelSistema");
const botonCerrarSesion = document.getElementById("cerrarSesion");
const tablaHTML = document.getElementById('informacionPaquetes');

botonHome.href = urlHomepage;
logoDelSistema.href = urlHomepage;
botonCerrarSesion.href = urlAPIAutenticacion + '/logout';

function aplicarIngles() {
  document.cookie = "lang=en"
  location.reload()
}

function aplicarEspanol(){
  document.cookie = "lang=es"
  location.reload()
}

$('#idiomaDelSistema').click(function(){
    if(document.cookie.indexOf("lang=en") !== -1){
        aplicarEspanol()
    } else {
        aplicarIngles()
    }
});

$(document).ready(function () {
  if(document.cookie.indexOf("lang=en") !== -1){
      $('#idiomaDelSistema').css('background-image', 'url(/img/banderaUK.png)')
  } else {
      $('#idiomaDelSistema').css('background-image', 'url(/img/banderaUruguay.png)')
  }
  Promise.all([fetch(ruta), fetch('./json/elementos.json')])
  .then((responses) => Promise.all(responses.map((response) => response.json())))
  .then((data) => {
      const idioma = data[0];
      const arrayDeIdioma = idioma[0]
      const arrayDeTextos = data[1];
      const arrayDeTextos2 = arrayDeTextos[0]

      for (let posicion = 0; posicion < Object.keys(arrayDeTextos2).length; posicion++){
          let texto = document.getElementById(arrayDeTextos2[posicion])
          texto.textContent = arrayDeIdioma[posicion]
      }
  })
});

  fetch(urlAPITransito + '/api/v3/paquetes')
  .then(response => {
    if (!response.ok) {
      throw new Error('Sin conexion al servidor');
    }
    return response.json();
  })
  .then(data => {
    const contenidosTabla = document.getElementById('contenidoDeTabla');

    if(data.mensaje != null) {
      tablaHTML.style.display = "none";
      const avisoDeSinContenidos = document.createElement('label');
      avisoDeSinContenidos.innerText = data.mensaje;
      avisoDeSinContenidos.id = "labelDeAviso";
      document.body.appendChild(avisoDeSinContenidos);
    } else {
      data.forEach(item => {
        const columna = document.createElement('tr');
        columna.innerHTML = `
            <td>${item.idPaquete}</td>
            <td>${item.nombre}</td>
            <td>${item.cantArticulo}</td>
            <td>${item.direccion}</td>
            <td><a id="botonMasInformacion" href="${urlAPITransito}/paquete/${item.idPaquete}"><button>Ver mas info.</button></a></td>
        `;
        contenidosTabla.appendChild(columna);
    });
    }
  })
  .catch(error => {
    tablaHTML.style.display = "none";
    contenedorMensajeDeError.style.display = "Block"
  })
