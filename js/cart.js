const CART_COMPLETE = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
var articulosCarrito = {};
var moneda = '';
var usd = 40;
var precioFinal = 0;
var comision = 0;
var inicioCarrito = 0;

function cartProducts(){
    document.getElementById('tipoMonedaOnOff').style.display = "block";
    let htmlContentToAppend = '';
    precioFinal = 0;
    if(articulosCarrito.length > 0){
    for (let i = 0; i < articulosCarrito.length; i++) {
            let costo = 0;
            //Convierto moneda de los articulos
            if(moneda == 'UYU'){
                if(articulosCarrito[i].currency == 'USD'){
                    costo = articulosCarrito[i].unitCost * 40;
                    moneda = 'UYU';
                }else{
                    costo = articulosCarrito[i].unitCost;
                    moneda = 'UYU';
                }
            }else{
                if(articulosCarrito[i].currency == 'UYU'){
                    costo = articulosCarrito[i].unitCost / 40;
                    moneda = 'USD';
                }else{
                    costo = articulosCarrito[i].unitCost;
                    moneda = 'USD';
                }
            }
            precioFinal += costo*articulosCarrito[i].count;
        htmlContentToAppend+=`
            <div>
            <img class="imgIlustrativasCart" src="${articulosCarrito[i].src}">
            <h4 class="mb-1">`+ articulosCarrito[i].name +`</h4>
            <h4 class="text-muted"><button type="button" class="btn btn-light" onclick="minusCartProducts(${i})" id="cartMinusProductos`+ i +`">-</button>
            <strong><span>${articulosCarrito[i].count}</span></strong> 
            <button class="btn btn-light" onclick="plusCartProducts(${i})" id="cartPlusProductos">+</button> artículo/s <br>
            <small class="text-muted">Precio unitario ${new Intl.NumberFormat("de-DE").format(costo)} ${moneda}</small>
            <br><i class="far fa-trash-alt" onclick="removerCartProduct(${i})"></i> Remover Item</h4>
            <hr><h4 class="mb-1 prize">`+ new Intl.NumberFormat("de-DE").format(costo*articulosCarrito[i].count) + ' ' + moneda + `</h4>
            </div>
            <br><br>
            `

            //Cargo los costos finales en la ultima vuelta del for, antes que finalice la carga de los productos en el carrito

           /* if(i >= articulosCarrito.length-1){
                htmlContentToAppend +=`
                <h5 class="mb-3">Tipo de publicación</h5>
                <div class="d-block my-3">
                  <div class="custom-control custom-radio">
                    <input id="goldradio" name="envioCart" type="radio" class="custom-control-input" onclick="porcentajeEnvio(15)" required="" >
                    <label class="custom-control-label" for="goldradio">Premium (15%)</label>
                  </div>
                  <div class="custom-control custom-radio">
                    <input id="premiumradio" name="envioCart" type="radio" class="custom-control-input" onclick="porcentajeEnvio(7)" required="">
                    <label class="custom-control-label" for="premiumradio">Express (7%)</label>
                  </div>
                  <div class="custom-control custom-radio">
                    <input id="standardradio" name="envioCart" type="radio" class="custom-control-input" onclick="porcentajeEnvio(5)" required="">
                    <label class="custom-control-label" for="standardradio">Estándar (5%)</label>
                  </div>
                  <div class="row">
                    <button type="button" class="m-1 btn btn-link" data-toggle="modal" data-target="#contidionsModal">Formas de Pago</button>
                  </div>
                </div>
                
    </div>
    <div id="cartPrecioTotal">
    </div>
    `
            }*/

              document.getElementById('cartProductos').innerHTML  = htmlContentToAppend;

    }
    

    // Dibujo Costos finales
    document.getElementById('cartPrecioTotal').innerHTML = `
    <hr class="mb-4">
    <h4 class="mb-3">Costos</h4>
        <ul class="list-group mb-3 costos">
             <li class="list-group-item d-flex justify-content-between lh-condensed">
               <div>
                 <h6 class="my-0">Subtotal</h6>
                 <small class="text-muted">Subtotal de los productos</small>
               </div>
               <span id="productCostText"></span>
             </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Porcentaje</h6>
                    <small class="text-muted">Según el tipo de publicación</small>
                  </div>
                  <span class="text-muted" id="comissionText">-</span>
               </li>
             <li class="list-group-item d-flex justify-content-between">
                   <span>Total ($)</span>
                   <span class="text-muted" id="totalText">-</span>
             </li>
       </ul>`;
       document.getElementById('productCostText').innerHTML = '<strong>' + new Intl.NumberFormat("de-DE").format(precioFinal) + moneda + '</strong>';
       document.getElementById('comissionText').innerHTML = comision.toFixed(2) + moneda;
       document.getElementById('totalText').innerHTML = (comision + precioFinal).toFixed(2);
}
else{
    document.getElementById('cartProductos').innerHTML = "<h1>No hay productos en el carrito</h1>";
}
}




//Borro articulo seleccionado
function removerCartProduct(productoCarrito){
    for (let i = 0; i < articulosCarrito.length; i++) {
        if(i == productoCarrito){
            console.log(articulosCarrito);
            articulosCarrito.splice(i, 1);
            cartProducts();
        }
    }
}

//Resto cantidad del producto seleccionado
function minusCartProducts(productoCarrito){
    for (let i = 0; i < articulosCarrito.length; i++) {
        if(i == productoCarrito){
            if(articulosCarrito[i].count == 1){
                alert("No se puede tener menos de 1 artículo!")
            }else{
                articulosCarrito[i].count -= 1;
                cartProducts();
            }
        }
    }
}

//Sumo cantidad del producto seleccionado
function plusCartProducts(productoCarrito){
    for (let i = 0; i < articulosCarrito.length; i++) {
        if(i == productoCarrito){
            articulosCarrito[i].count += 1;
            cartProducts();
        }
    }
}

//Calculo porcentaje de envío sobre subtotal del valor de compra
function porcentajeEnvio(valor){
    comision = precioFinal * (valor/100);
    cartProducts();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_COMPLETE).then(function(resultObj){
        if (resultObj.status === "ok"){
            articulosCarrito = resultObj.data.articles;
            cartProducts();
        }});
        

        
        


        //Eleccion de tipo de Moneda
       var tipoMoneda = document.getElementById('tipoMoneda');
       tipoMoneda.addEventListener('change', function(){
         moneda = tipoMoneda.value;
         cartProducts();
       });

       
});