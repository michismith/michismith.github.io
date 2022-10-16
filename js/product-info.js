const URLINFO = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;
const URLCOMMENT =
    PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;
const prodID = localStorage.getItem("prodID");
let productInfo = {};
let imagesArray = [];


document.addEventListener("DOMContentLoaded", function (e) {
    fetch(URLINFO)
        .then((resp) => resp.json())
        .then((data) => {
            productInfo = data;
            imagesArray = data.images;
            showProductImage();
            showProduct();
            showRelatedProducts();

            fetch(URLCOMMENT)
                .then((resp) => resp.json())
                .then((dato) => {
                    comments = dato;
                    showComments(comments);
                });
        });
});

function showProduct() {
    let htmlShowInfo = "";
    htmlShowInfo +=`
            <div class="row">
                      
                        <h1>
                        <span class="m-3">` +productInfo.name +`</span>
                        <button type="button" class="btn btn-primary m-4" onclick="setBuyProduct(${productInfo.id})">Comprar</button>
                        </h1>
                        <div class="divider d-flex align-items-center "></div>
                        <br> 
                        <p class="m-0"><strong>Precio</strong></p>
                        <p> ` +productInfo.currency +" " +productInfo.cost +`</p> 
                        <p class="m-0"><strong>Descripción</strong></p>
                        <p> ` +productInfo.description + `</p> 
                        <p class="m-0"><strong>Categoría</strong></p>
                        <p> ` +productInfo.category +`</p> 
                        <p class="m-0"><strong>Cantidad de vendidos</strong></p>
                        <p> ` +productInfo.soldCount +`</p> 
            </div> `;

    document.getElementById("prod-info").innerHTML = htmlShowInfo;
}

function setBuyProduct(id) {
  localStorage.setItem("prodBuyID", id);
  window.location = "cart.html";
}

function showProductImage() {
    let htmlShow = "";

    htmlShow += `
       
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${imagesArray[0]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${imagesArray[1]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${imagesArray[2]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${imagesArray[3]}" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

    document.getElementById("prod-container").innerHTML = htmlShow;
}


function setProduct(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}

//related prod.
function showRelatedProducts() {
    let htmlShowRelate = "";
    htmlShowRelate += `
    <div class="row">
      <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
       <img onclick="setProduct(${productInfo.relatedProducts[0].id})" class="w-60 shadow-1-strong rounded mb-4" style="width: 19rem; cursor:pointer;" src="${productInfo.relatedProducts[0].image}"/>
       <h5 class="ms-1">${productInfo.relatedProducts[0].name}</h5>
       </div>

      <div class="col-lg-4 mb-4 mb-lg-0">
       <img onclick="setProduct(${productInfo.relatedProducts[1].id})" class="w-60 shadow-1-strong rounded mb-4" style="width: 19rem; cursor:pointer;" src="${productInfo.relatedProducts[1].image}"/>
       <h5 class="ms-1">${productInfo.relatedProducts[1].name}</h5>
      </div>
    </div>`;

    document.getElementById("relateProd").innerHTML = htmlShowRelate;
}


function showComments(comments) {
    let html = "";
    var today = new Date();
    var fecha = today.toLocaleString();
    comments.forEach((element) => {
        html = `
        <div class="list-group-item list-group-item-action">
          <div class="row">
            <p><strong>${element.user}</strong> - ${element.dateTime
            } - ${starScore(element.score)}</p>
            <p>${element.description + fecha}</p>
          </div>
        </div>`;
        document.getElementById("comment").innerHTML += html;
    });
}


function starScore(stars) {
    let htmlStars = "";

    for (let i = 0; i < stars; i++) {
        htmlStars += `<span class="fa fa-star checked"></span>`;
    }
    for (i = stars; i < 5; i++) {
        htmlStars += `<span class="fa fa-star"></span>`;
    }
    return htmlStars;
}



//login
if (localStorage.getItem("UserLog") != undefined) {
    document.getElementById("User").innerHTML = localStorage.getItem("UserLog");
} else {
    window.location = "login.html";
}

//cerrar sesion
function cerrarSes() {
    localStorage.removeItem("UserLog");
    window.location = "login.html";
}

