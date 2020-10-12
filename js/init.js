const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
  var result = {};
  showSpinner();
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
    result.status = 'ok';
    result.data = response;
    hideSpinner();
    return result;
  })
  .catch(function(error) {
    result.status = 'error';
    result.data = error;
    hideSpinner();
    return result;
  });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
  // Invocamos levantar menu navegador sin crear en el html directo
  cargarNav();

  function cargarNav(){
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.rel ='stylesheet';
    link.type = 'text/css';
    link.href = 'css/font-awesome.min.css';
    head.appendChild(link);
 

    let navMenu = ['Inicio', 'Categorías', 'Productos', 'Vender', 'Mi carrito', 'Mi Perfil', 'Cerrar Sesión'];

    HtmlContentToAppend = `
      <a class="py-2 d-none d-md-inline-block" href="index.html">` + navMenu[0] + `</a>
      <a class="py-2 d-none d-md-inline-block" href="categories.html">` + navMenu[1] + `</a>
      <a class="py-2 d-none d-md-inline-block" href="products.html">` + navMenu[2] + `</a>
      <a class="py-2 d-none d-md-inline-block" href="sell.html">` + navMenu[3] + `</a>
      <span id="tipoMonedaOnOff"><div >
      <select name="Moneda" id="tipoMoneda">
        <option value="USD">U$S</option>
        <option value="UYU">$</option>
      </select>
    </div>
    </span>
<div class="dropdown">
    <button id="bienvenida" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
  <div id="dropDownBienvenida" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="cart.html">` + navMenu[4] + `<span class="badge badge-success" class="cont"></span></a>
    <a class="dropdown-item" href="my-profile.html">` + navMenu[5] + `</a>
    <a class="dropdown-item" href="" id="logout">` + navMenu[6] + `</a>
  </div>
</div>
  `
  if(window.location == 'http://localhost:5500/cart.html' || window.location == 'https://brunasso.github.io/Obligatorio-JAP/cart.html'){
        
  }
  document.getElementById('navegador').innerHTML = HtmlContentToAppend;
  document.getElementById('tipoMonedaOnOff').style.display = "none";
  }
  
  // Comprueba si ya hay una sesión en el Storage
  comprobarLogin();  
  function comprobarLogin(){
    if(sessionStorage.getItem('usuario') === null){
      location.href = 'login.html?#'
    }else{
      if(sessionStorage.getItem('imagen') == null){
        document.getElementById('bienvenida').innerHTML = '<i class="far fa-user-circle"></i>'+ " " + sessionStorage.getItem('usuario'); 
      }
      else{
        var imageProfile = sessionStorage.getItem('imagen');
        document.getElementById('bienvenida').innerHTML = '<img src="'+ imageProfile +'"></img>' + " " + sessionStorage.getItem('usuario');
      }
    }
  }
  
  
  document.getElementById('logout').addEventListener('click', function(){
    googleLogOut();
    logOut();
  })
  
  // Cerrar sesión total
  document.getElementById('logout').addEventListener('click', function(){      
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('imagen');
    googleLogOut();
    location.reload();
  })
  
  
  // Cerrar sesión en Google
  function googleLogOut() {
    var auth2 = gapi.auth2.getAuthInstance().signOut();
  }
  
});