var datosDeUsuario = {};
var claveGuardadaPerfil = 'perfilUsuario'+sessionStorage.getItem('usuario');


//Verifico si el usuario se conectó en algún momento
function controlarUsuarioExistente(){
    let usuarioExiste = JSON.parse(localStorage.getItem(claveGuardadaPerfil));
    if(usuarioExiste == null){
        return false;
    }
    if(usuarioExiste.user == sessionStorage.getItem('usuario'))
    {
        return true;
    }else{
        return false;
    }    
}

//Pinto los datos del usuario existente
function pintarDatosUsuarioExistente(){
    let usuarioExiste = JSON.parse(localStorage.getItem(claveGuardadaPerfil));
    let datosProfile = document.getElementsByClassName('datosProfile');

    console.log(datosProfile[0]);

    datosProfile[0].value = usuarioExiste.nombre;
    datosProfile[1].value = usuarioExiste.apellido;
    datosProfile[2].value = usuarioExiste.edad;
    datosProfile[3].value = usuarioExiste.email;
    datosProfile[4].value = usuarioExiste.telefono;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    
    //Controlo si el usuario alguna vez ingresó, para saber si hay que pintar los datos ya ingresados anteriormente
    if(controlarUsuarioExistente()){
        pintarDatosUsuarioExistente();
    }

    //Tomo los datos ingresados por el usuario para impactarlos en el localStorage
    document.getElementById('guardarCambiosProfile').addEventListener('click', function(){
        let datosProfile = document.getElementsByClassName('datosProfile');
        datosDeUsuario.user = sessionStorage.getItem('usuario');
        datosDeUsuario.nombre = datosProfile[0].value;
        datosDeUsuario.apellido = datosProfile[1].value;
        datosDeUsuario.edad = datosProfile[2].value;
        datosDeUsuario.email = datosProfile[3].value;
        datosDeUsuario.telefono = datosProfile[4].value;

        localStorage.setItem(claveGuardadaPerfil, JSON.stringify(datosDeUsuario));

    })
});