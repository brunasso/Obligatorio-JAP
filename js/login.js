//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    // Recibo parametros del formulario
    let ingresar = document.getElementById('formulary');
    ingresar.addEventListener('submit', function() {
        var usuario = document.getElementById('usuario').value;
        var password = document.getElementById('password').value;
        logIn(usuario, password);
    })

    //Controlo campos y, en caso de que esten correctos creamos punto de inicio de sesión para mantener activa la cuenta
    function logIn(usuario, password){
        
        if(usuario.trim() === '' || password.trim() === '' ){
            alert("Faltó ingresar un dato!")
            location.reload();
        }else{
            sessionStorage.setItem('usuario', usuario)
            index();
        }
    }
    // Redirecciona al Inicio
    function index(){
        window.location.href = 'index.html';
    }

    document.getElementById('googleLogin').addEventListener('click',function(){
        onSignIn();
    })

    
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        var usuario = profile.getName();
        sessionStorage.setItem('usuario', usuario)
        index();
      }

});