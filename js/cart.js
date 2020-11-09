const CART_COMPLETE = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
var articulosCarrito = {};
var moneda = '';
var usd = 40;
var subtotalFinal = 0;
var comision = 0;
var tipoEnvioSeleccionado = 0;
var validacionFinalCart = [];

function cartProducts(){
    document.getElementById('tipoMonedaOnOff').style.display = "block";
    let htmlContentToAppend = '';
    subtotalFinal = 0;
    if(articulosCarrito.length > 0){
        
        ////Habilito botones y campos en caso de que el carrito caontenga productos. Envío "false" para desactivar la "deshabilitacion"
        bloquearBotonesSinProductos(false);
        
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
            subtotalFinal += costo*articulosCarrito[i].count;
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
        <span>Total (${moneda})</span>
        <span class="text-muted" id="totalText">-</span>
        </li>
        </ul>`;
        document.getElementById('productCostText').innerHTML = '<strong>' + new Intl.NumberFormat("de-DE").format(subtotalFinal) +' '+ moneda + '</strong>';
        document.getElementById('comissionText').innerHTML = (subtotalFinal * comision).toFixed(2) +' '+ moneda;
        let precioFinal = (subtotalFinal * comision) + subtotalFinal;
        document.getElementById('totalText').innerHTML = (precioFinal).toFixed(2) +' '+ moneda;
    }
    else{
        document.getElementById('productCostText').innerHTML = '00,00' +' '+ moneda;
        document.getElementById('comissionText').innerHTML = '00,00'+' '+ moneda;
        document.getElementById('totalText').innerHTML = '00,00'+ ' '+ moneda;
        
        //Bloqueo botones y campos en caso de que no haya nada en el carrito. Envío "true" para activar la deshabilitación.
        bloquearBotonesSinProductos(true);
        
        //Colocamos mensaje de carrito vacío
        document.getElementById('cartProductos').innerHTML = "<div style='text-align:center'><h1>No hay productos en el carrito</h1><br><h3>Qué estás esperando!? Ve a comprar productos!</h3></div>";
    }
}


function bloquearBotonesSinProductos(condicion){
    
    //Bloqueo uso de ingreso de dirección
    document.getElementById('direccionCart').readOnly = condicion;
    document.getElementById('numeroCart').readOnly = condicion;
    document.getElementById('esquinaCart').readOnly = condicion;
    let envioCartArray = document.getElementsByName('envioCart');
    for (let i = 0; i < envioCartArray.length; i++) {
        envioCartArray[i].disabled = condicion;
    }
    document.getElementById('modalButton').disabled = condicion;
    document.getElementById('finalizarCompraCart').disabled = condicion;
}

//Borro articulo seleccionado
function removerCartProduct(productoAEliminar){
    articulosCarrito.splice(productoAEliminar, 1);
    cartProducts();
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
function porcentajeEnvio(){
    if(document.getElementById('goldradio').checked){
        comision = 0.15;   
    }
    if(document.getElementById('premiumradio').checked){
        comision = 0.07;   
    }
    if(document.getElementById('standardradio').checked){
        comision = 0.05;   
    }
    cartProducts();
}

function controlarCampos(){
    var spanIDs = document.querySelectorAll("span.validacion"); 
    
    for (let i = 0; i < spanIDs.length; i++) {
        let elemento = spanIDs[i];
        
        var inputID = document.getElementById(elemento.id+"Cart");
        var inputIDValue = document.getElementById(elemento.id+"Cart").value;
        var spanValidacion = document.getElementById(elemento.id);
        
        if(inputIDValue==""){
            inputID.classList.remove("is-valid");
            inputID.classList.add("is-invalid");
            spanValidacion.classList.remove("valido");
            spanValidacion.classList.add("invalido");
            spanValidacion.innerHTML = `Debe ingresar un ${elemento.id}`;
        } else{
            inputID.classList.remove("is-invalid");
            inputID.classList.add("is-valid");
            spanValidacion.classList.remove("invalido");
            spanValidacion.classList.add("valido");
            spanValidacion.innerHTML = "Ok";
        }
    }
}

function controlarDatos(){
    let contador = 0;
    var spanIDs = document.querySelectorAll("span.validacion"); 
    for (let i = 0; i < spanIDs.length; i++) {
        let elemento = spanIDs[i];
        if(id(elemento.id + "Cart").value == ''){
            contador++;
            
        }
    }
    if(contador > 0){
        controlarCampos();
        return false;
    }else{
        controlarCampos();
        return true;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_COMPLETE).then(function(resultObj){
        if (resultObj.status === "ok"){
            articulosCarrito = resultObj.data.articles;
            cartProducts();
            //Clickeo el valor de envío más económico para que tenga uno seleccionado
            id('standardradio').click();
        }});
        
        
        
        var finalizarCompraCart = document.getElementById('finalizarCompraCart');
        finalizarCompraCart.addEventListener('click', function(){
            let direccionCart = document.getElementById('direccionCart').value;
            let numeroCart = document.getElementById('numeroCart').value;
            let esquinaCart = document.getElementById('esquinaCart').value;
            
            validacionFinalCart.push(direccionCart, numeroCart, esquinaCart);
        });
        
        //Eleccion de tipo de Moneda        
        var tipoMoneda = document.getElementById('tipoMoneda');
        tipoMoneda.addEventListener('change', function(){
            moneda = tipoMoneda.value;
            cartProducts();
        });

        document.getElementById('tarjetaCredito').addEventListener('click',function(){
            document.getElementById('camposTarjeta').style = 'display:block';
            document.getElementById('tarjetaDe').innerHTML = "Tarjeta de Crédito";
        })
        document.getElementById('tarjetaDebito').addEventListener('click',function(){
            document.getElementById('camposTarjeta').style = 'display:block';
            document.getElementById('tarjetaDe').innerHTML = "Tarjeta de Débito";
        })
        
        document.getElementById('finalizarCompraCart').addEventListener('click', function(){
            if(controlarDatos()){
                Swal.fire(
                    'Bien hecho!',
                    'Haz finalizado la compra',
                    'success'
                    )
                    //setTimeout(function(){location.href = 'products.html';}, 3000);
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Faltan campos!',
                        text: 'Revisa y completa los campos faltantes!!'
                    })
                }
            })
            
            
        });