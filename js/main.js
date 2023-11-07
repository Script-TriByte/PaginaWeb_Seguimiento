import { urlAPIAutenticacion, urlAPITransito, urlHomepage } from "../js/configuracion.js";

const botonHome = document.getElementById("enlaceAHomepage");
const logoDelSistema = document.getElementById("logoDelSistema");
const botonCerrarSesion = document.getElementById("botonCerrarSesion");

botonHome.href = urlHomepage;
logoDelSistema.href = urlHomepage;
botonCerrarSesion.href = urlAPIAutenticacion + '/logout';

try {
    fetch(urlAPITransito + '/api/v2/paquetes')
    .then(response => {
        if (!response.ok) {
          throw new Error('Sin conexion al servidor');
        }
        return response.json();
      })
    .then(data => {
      const tablaHTML = document.getElementById('informacionPaquetes');
      const contenidosTabla = document.getElementById('contenidoDeTabla');

      if(data == {"mensaje": "No hay paquetes en envio."}) {
        tablaHTML.style.display = "none";
        const avisoDeSinContenidos = document.createElement('label');
        avisoDeSinContenidos.innerText = data.mensaje;
        avisoDeSinContenidos.id = "labelDeAviso";
      } else {
        data.forEach(item => {
          const columna = document.createElement('tr');
          columna.innerHTML = `
              <td>${item.idPaquete}</td>
              <td>${item.nombre}</td>
              <td>${item.cantArticulo}</td>
              <td>${item.direccion}</td>
              <td><a href="${urlAPITransito}/paquete/${item.idPaquete}"><button>Ver mas info.</button></a></td>
          `;
          contenidosTabla.appendChild(columna);
      });
      }      
    })

} catch (error) {
    const mensajeDeError = document.createElement('label');
    mensajeDeError.innerText = 'No se ha podido conectar al servidor. Intentelo mas tarde.'
    document.body.appendChild(mensajeDeError);
}