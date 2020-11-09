const ORDER_ASC_BY_PRICE = "minMax";
const ORDER_DESC_BY_PRICE = "maxMin";
const ORDER_BY_PROD_SOLD = "Sold.";
var productscomplete = [];
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);
            
            if ( aSold > bSold ){ return -1; }
            if ( aSold < bSold ){ return 1; }
            return 0;
        });
    }
    return result;
}

function showProductsList(){


        //Controlo que el Array contenga artículos (Ya que antes se realiza la busqueda y en caso de no hayar ninguno, muestra vacío)
        if(currentProductsArray.length == 0){
            let noEncontrado = `<br><br>
            <div class="row">
            <div class="col">
            <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">Lo sentimos. No hemos encontrado un artículo con ese nombre!</h4>
            </div></div></div>`
            document.getElementById("cat-list-container").innerHTML = noEncontrado;
        }
       
    
    let htmlContentToAppend = "";
    
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];
        
        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){
            
            htmlContentToAppend +=  `
            <div class="col-md-4 col-sm-6 col-xl-3">
            <a href="product-info.html" class="list-group-item list-group-item-action">

                <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                <h4 class="mb-1">`+ products.name +`</h4>
                <small class="text-muted">`+ products.soldCount + ' Vendidos' + ` artículos</small>
                <p class="mb-1">` + products.description + `</p>
                <h5 class="mb-1 prize"><strong>`+ products.cost + ' ' + products.currency +  `</strong></h5>
                </a>
            </div>
            `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        
        
    }
}

function sortAndShowProducts(sortCriteria, categoriesArray){
    
    
    
    currentSortCriteria = sortCriteria;
    
    if(categoriesArray != undefined){
        currentProductsArray = categoriesArray;
    }
    
    currentProductsArray = sortCategories(currentSortCriteria, currentProductsArray);
    
    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
        // Guardo listado completo de productos en variable
        listaProductsCompleta();
    });

    function listaProductsCompleta(){
        productscomplete = currentProductsArray;
    }
    
    function colocarListaProductosInicial(){
        currentProductsArray = productscomplete;
    }
    
    var busqueda = document.getElementById('busqueda');
    busqueda.addEventListener('keyup', function(){     
        //Levanto lista nuevamente
        colocarListaProductosInicial();

        //Detecto teclas pulsadas
        let pulsado = document.getElementById('busqueda').value;
        console.log(pulsado);
        
        /*Consulto si hay algo ingresado en la busqueda y si es true, filtro productos que contengan los caracteres que pulsó el usuario
          En caso contrario, se muestra la lista completa
        */
        if(pulsado !== ''){
            
            let productsbuscados = currentProductsArray.filter(prods => (prods.name.toLowerCase()).includes(pulsado.toLowerCase()));
            console.log(productsbuscados);
            
            // reemplazo la lista entera de productos por la lista filtrada y muestro nuevamente los productos
            currentProductsArray = productsbuscados;

        }


        showProductsList();
    })
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        
        minCount = undefined;
        maxCount = undefined;
        
        showProductsList();
    });
    
    
    
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
        
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }
        
        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
        
        showProductsList();
    });
});