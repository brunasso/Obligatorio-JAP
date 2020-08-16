//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    
    
    function logIn(){
        // Recibo datos de formulario.
        let usuario = document.getElementById('usuario').value;
        let password = document.getElementById('password').value;
        
        if( usuario.trim() === "" || password.trim() === ""){
            alert('Faltó ingresar algún campo!')
        }
        else{
            window.location.href = 'index.html';
        }
        
        
        
    });