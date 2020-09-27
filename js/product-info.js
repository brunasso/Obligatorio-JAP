var comentarios= [];
var relacionados=[];


function guardar(){
    //Genero contenedor del comentario
    let commit = {};
    
    //Levanto los datos del usuario que va a comentar
    let nombreUsuario = sessionStorage.getItem('usuario');
    let descripcion = document.getElementById("descripcioncoment").value;
    var puntuacion = 0;
    
    for (let i = 1; i <= 5; i++) {
        if (document.getElementById('radio'+i).checked) {
            puntuacion = document.getElementById('radio'+i).value;
            console.log(puntuacion);
            break;
        }
    }

    commit.user = nombreUsuario;
    commit.description = descripcion;
    commit.score = puntuacion;
    
    // Envío el comentario en el array que contiene todos los comentarios
    comentarios.push(commit);
    mostrar(comentarios);
    textarea.value = '';
    
}

//Creamos contenido HTML en donde se va a alojar dichos comentarios.
function mostrar(comentarios){
    var commentlist= `<dl>`;
    
    for(i=0; i<comentarios.length; i++){
        let comentario = comentarios[i];
        
        commentlist+= `<p>  ` + comentario.user + `</p>
        <p> ` + comentario.description + `</p>
        <p> Valoración: ` + comentario.score + `.</p> <hr>`
    }
    
    commentlist += `</dl>`;
    
    document.getElementById("listadecomentarios").innerHTML=commentlist;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentarios = resultObj.data;
            mostrar(comentarios);
        }
    });
    
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            
            
            product = resultObj.data;
            
            let nombreUsuario = document.getElementById("usercoment");
            let productName  = document.getElementById("productName");
            let productDescription = document.getElementById("productDescription");
            let productSoldCount = document.getElementById("productSoldCount");
            let productCategory = document.getElementById("productCategory");
            let productCost = document.getElementById("productCost");
            let productCurrency = document.getElementById("productCurrency");
            let productImagesGallery = document.getElementById("productImagesGallery");
            let productRelated = document.getElementById("productRelated");
            
            
            
            //Imagenes del producto seleccionado
            let htmlContentToAppend = '';
            for (let i = 0; i < product.images.length; i++) {
                if(i==0){
                    htmlContentToAppend += `
                    <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
                    </a>
                    <div class="carousel-item active" class="imgIlustrativas">
                    <img src="${product.images[i]}" class="d-block w-100">
                    </div>
                    <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                    `
                }else{
                    htmlContentToAppend += `
                    <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
                <div class="carousel-item" class="imgIlustrativas">
                <img class="d-block w-100" src="${product.images[i]}">
                </div>
                <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>`
                }
                
            }
            
            
            
            productImagesGallery.innerHTML = htmlContentToAppend;
            
            //Levanto JSON que contiene imagenes y posicion de productos (Para luego mostrarlos en relacionados)
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok"){
                    relacionados = resultObj.data;
                    
                }
                //Datos de productos relacionados
                let mostrarRelacionados = '';
                for (let i = 1; i < 4; i+=2) {
                    
                    mostrarRelacionados += `
                    <div class="imgProductRelated">
                        <img src="${relacionados[i].imgSrc}">
                        <h3>${relacionados[i].name}</h3>
                        <p>${relacionados[i].description}</p>
                        <button><a href="products.html">"Ir a productos"</a></button>                 
                    </div>
                    `
                    productRelated.innerHTML = mostrarRelacionados;
                }
                
            });

            //Mostramos todo lo cargado
            
            nombreUsuario.innerHTML = "<strong>" + sessionStorage.getItem('usuario') + "</strong>";
            productName.innerHTML = product.name;
            productDescription.innerHTML = product.description;
            productSoldCount.innerHTML = product.soldCount;
            productCategory.innerHTML = product.category;
            productCost.innerHTML = '<h2 class="subTitulosProductInfo">'+product.cost+'</h2>';
            productCurrency.innerHTML = '<h4 class="subTitulosProductInfo">'+product.currency+'</h4>';
        }
    });
    
    
    
    
}); 