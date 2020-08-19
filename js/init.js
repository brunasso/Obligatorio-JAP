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
    let navMenu = ['Inicio', 'Categorías', 'Productos', 'Vender', 'Mi carrito', 'Salir'];

    HtmlContentToAppend = `
      <a class="py-2 d-none d-md-inline-block" href="index.html">` + navMenu[0] + `</a>
      <a class="py-2 d-none d-md-inline-block" href="categories.html">` + navMenu[1] + `</a>
      <a class="py-2 d-none d-md-inline-block" href="products.html">` + navMenu[2] + `</a>
      <a class="py-2 d-none d-md-inline-block" href="sell.html">` + navMenu[3] + `</a>
      <a class="py-2 d-none d-md-inline-block" href="cart.html">` + navMenu[4] + `</a>
      <a class="py-2 d-none d-md-inline-block" href="" id="logout">` + navMenu[5] + `</a>
      <a class="py-2 d-none d-md-inline-block" href="" id="bienvenida"></a>
  `
  document.getElementById('navegador').innerHTML = HtmlContentToAppend;

  }
  
  // Comprueba si ya hay una sesión en el Storage
  comprobarLogin();  
  function comprobarLogin(){
    if(sessionStorage.getItem('usuario') === null){
      location.href = 'login.html?#'
    }else{
      document.getElementById('bienvenida').innerHTML = "Bienvenido " + sessionStorage.getItem('usuario');
    }
  }
  
  document.getElementById('logout').addEventListener('click', function(){
    logOut();
    signOut();
  })
  
  // Cerrar sesión total
  document.getElementById('logout').addEventListener('click', function(){      
    sessionStorage.removeItem('usuario');
    signOut();
    location.reload();
  })
  
  
  // Cerrar sesión en Google
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
  
  
});