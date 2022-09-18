const URLINFO = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;
const URLCOMMENT = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;
let productInfo = {};
let imagesArray = [];

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(URLINFO)
        .then((resp) => resp.json())
        .then((data) => {
            productInfo = data;
            imagesArray = data.images;
            /* document.getElementById("productName").innerHTML = productInfo.name;
             document.getElementById("productInPrice").innerHTML = productInfo.currency+' '+ productInfo.cost;
             document.getElementById("productInDescription").innerHTML = productInfo.description;
             document.getElementById("productInCategory").innerHTML = productInfo.category;
             document.getElementById("productInSoldcount").innerHTML = productInfo.soldCount;*/
            showProductImage();
            showProduct();

            fetch(URLCOMMENT)
                .then((resp) => resp.json())
                .then((dato) => {
                    comments = dato;
                    showComments(comments);
                })
        })

});

function showProduct() {
    let htmlShowInfo = "";
    htmlShowInfo += `
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h1>`+ productInfo.name + `</h1>  
                        <div class="divider d-flex align-items-center my-4"></div>
                        <p class="m-0"><strong>Precio</strong></p>
                        <p> `+ productInfo.currency + ' ' + productInfo.cost + `</p> 
                        <p class="m-0"><strong>Descripción</strong></p>
                        <p> `+ productInfo.description + `</p> 
                        <p class="m-0"><strong>Categoría</strong></p>
                        <p> `+ productInfo.category + `</p> 
                        <p class="m-0"><strong>Cantidad de vendidos</strong></p>
                        <p> `+ productInfo.soldCount + `</p> 
                        </div>
                       
                    </div>

                </div>
            </div>
        `

    document.getElementById("prod-info").innerHTML = htmlShowInfo;

}

function showProductImage() {
    let htmlShow = "";

    htmlShow += `
        <div class="row">
        <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <img
           src="${imagesArray[0]}" 
            class="w-100 shadow-1-strong rounded mb-4"/>
      
          <img
          src="${imagesArray[1]}"
            class="w-100 shadow-1-strong rounded mb-4"/>
        </div>
      
        <div class="col-lg-4 mb-4 mb-lg-0">
          <img
          src="${imagesArray[2]}"
            class="w-100 shadow-1-strong rounded mb-4"
          />
      
          <img
          src="${imagesArray[3]}"
            class="w-100 shadow-1-strong rounded mb-4" />
        </div> `


    document.getElementById("prod-container").innerHTML = htmlShow;



};

function showComments(comments) {
    let html = "";
    var today = new Date();
    var fecha = today.toLocaleString()
    comments.forEach(element => {
        html = `
        <div class="list-group-item list-group-item-action">
          <div class="row">
            <p><strong>${element.user}</strong> - ${element.dateTime} - ${starScore(element.score)}</p>
            <p>${element.description + fecha}</p>
          </div>
        </div>`
        document.getElementById("comment").innerHTML += html;
    });
}

function starScore(stars) {
    let htmlStars = "";

    for (let i = 0; i < stars; i++) {
        htmlStars += `<span class="fa fa-star checked"></span>`
    };
    for (i = stars; i < 5; i++) {
        htmlStars += `<span class="fa fa-star"></span>`
    }
    return htmlStars;
};



//login
if(localStorage.getItem('UserLog') != undefined){
    document.getElementById("User").innerHTML = localStorage.getItem('UserLog');
    }





