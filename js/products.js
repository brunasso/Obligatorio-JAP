
function showProductsList(productsArray){

    // muestro productos y cargo en HTML
    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let products = productsArray[i];



            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name +`</h4>
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                        <br>
                        <h3 class="mb-1 prize">`+ products.cost + `</h3>
                        <h4 class="mb-1 prize" >`+ products.currency + `</h4> 
                    </div>
                </div>
            </a>
            `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var resultadoJSON = {};
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            resultadoJSON = resultObj;
            showProductsList(resultObj.data);
        }
    });  

});