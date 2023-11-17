import { ruta } from "./variables.js";

//https://formspree.io/f/xeqbwgjd

const form = document.getElementById('formularioContacto')

async function handleSendEmail(event){
    event.preventDefault()

    const fd = new FormData(this)

    const response = await fetch ('https://formspree.io/f/xeqbwgjd', {
        method: 'POST',
        body: fd,
        headers: {
            Accept: 'application/json'
        }
    })

    if (response.ok){
        this.reset()
        alert('Mensaje enviado')
    }else{
        alert('Error al enviar el mensaje')
    }
}

form.addEventListener('submit', handleSendEmail);


function aplicarIngles() {
    document.cookie = "lang=en;path=/"
    location.reload()
}

function aplicarEspanol(){
    document.cookie = "lang=es;path=/"
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
    Promise.all([fetch('/' + ruta), fetch('/json/elementos.json')])
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then((data) => {
        const idioma = data[0];
        const arrayDeIdioma = idioma[6]
        const arrayDeTextos = data[1];
        const arrayDeTextos2 = arrayDeTextos[6]

        for (let posicion = 0; posicion < Object.keys(arrayDeTextos2).length; posicion++){
            let texto = document.getElementById(arrayDeTextos2[posicion])
            console.log(texto)
                texto.textContent = arrayDeIdioma[posicion]
            
        }
    })

});




