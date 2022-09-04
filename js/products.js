const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_ASC_BY_PRICE = "$->$$";
const ORDER_DESC_BY_PRICE = "$$->$";
const ORDER_BY_SOLD_COUNT ="Cant.";


let sortCriteria = undefined;
let min = 0;
let max = 0;
let categoriesArray=[];
let FiltroArray = [];

function compare(a,b){
    return a.name.localeCompare(b.name)
}

function showOrder(criterio, array){
    if (criterio === ORDER_ASC_BY_NAME){
        FiltroArray = array.sort(compare)
    }
    if (criterio === ORDER_DESC_BY_NAME){
        FiltroArray = array.reverse(compare)
    }
    if (criterio === ORDER_ASC_BY_PRICE){
        FiltroArray = array.sort((a,b) => {return a.cost - b.cost})
    }
    if (criterio === ORDER_DESC_BY_PRICE){
        FiltroArray = array.reverse((a,b) => {return a.cost - b.cost})
    }
    if (criterio === ORDER_BY_SOLD_COUNT){
        FiltroArray = array.sort((a,b) => {return a.soldCount - b.soldCount})
    }

    document.getElementById("cat-list-container").innerHTML = ""
    showCategoriesList(FiltroArray)
}




let showCategoriesArray = [];

function showCategoriesList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++){
        let category = array[i];

        if (((min == 0) || (parseInt(category.cost) >= min)) &&
        ((max == 0) || (parseInt(category.cost) <= max))){ 

        htmlContentToAppend += `
        <div class= "list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src=` + category.image + ` alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name + ` - ` + category.currency + ` ` + category.cost + `</h4> 
                        <p> `+ category.description + `</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` vendidos </small> 
                    </div>

                </div>
            </div>
        </div>
        `
         }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}


document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE)
        .then(res => res.json())
        .then(data => {
            const ArrayDatos = data;
            FiltroArray = data.products;
            document.getElementById('cat-name').innerHTML = ArrayDatos.catName
            showCategoriesList(FiltroArray);

        });

        document.getElementById("sortAsc").addEventListener("click", function(){
            showOrder(ORDER_ASC_BY_NAME,FiltroArray);
        });
        document.getElementById("sortDesc").addEventListener("click", function(){
            showOrder(ORDER_DESC_BY_NAME,FiltroArray);
        });
        document.getElementById("sortAscPrice").addEventListener("click", function(){
            showOrder(ORDER_ASC_BY_PRICE,FiltroArray);
        });
        document.getElementById("sortDescPrice").addEventListener("click", function(){
            showOrder(ORDER_DESC_BY_PRICE,FiltroArray);
        });
        document.getElementById("sortByCount").addEventListener("click", function(){
            showOrder(ORDER_BY_SOLD_COUNT,FiltroArray);
        });
       
        document.getElementById("rangePriceFilterCount").addEventListener("click", function(){
            min = document.getElementById("rangePriceFilterCountMin").value;
            max= document.getElementById("rangePriceFilterCountMax").value;
            document.getElementById('cat-list-container').innerHTML = ""
            showCategoriesList(FiltroArray)
        })

        document.getElementById("clearRangePriceFilter").addEventListener("click", function(){
            document.getElementById("rangePriceFilterCountMin").value = "";
            document.getElementById("rangePriceFilterCountMax").value = ""
        });

});

//login
if(localStorage.getItem('UserLog') != undefined){
    document.getElementById("User").innerHTML = localStorage.getItem('UserLog');
    }