const URL = CART_INFO_URL + "25801"+ EXT_TYPE
let producto = {}
let precioUnit = 0 

document.addEventListener("DOMContentLoaded", ()=>{
    fetch(URL)
    .then(resp_1 => resp_1.json())
    .then(data_1 => {
        producto = data_1;
        console.log(producto);
        showArticulo(producto);
    })
});



/*function para mostrar producto precargado*/
function showArticulo(){

 precioUnit = producto.articles[0].unitCost

 listaDesplegable =`
 <tr>
 <td><img src="${producto.articles[0].image}" alt="" width="50px"></td>
 <td>${producto.articles[0].name}p</td>
 <td>${producto.articles[0].currency} ${precioUnit}</td>
 <td><input class="form-control" style="width:60px;" onchange="subtotal()" type="number" id="cantArticulo" value=1  min=1></td>
 <td>${producto.articles[0].currency} <span id="subtotal" style="font-weight:bold;">${precioUnit}</span></td>
 <td><button type="button" class="btn btn-outline-danger" onclick="deleteItem()"><i class="fas fa-trash-alt"></i></button></td>
</tr>
    `
document.getElementById("articlesWrapper").innerHTML = listaDesplegable;

}

/*para calcular el subtotal*/
function subtotal(){
    document.getElementById("subtotal").innerHTML = precioUnit * document.getElementById("cantArticulo").value;
}

//login
if(localStorage.getItem('UserLog') != undefined){
    document.getElementById("User").innerHTML = localStorage.getItem('UserLog');
    } else{
        window.location = "login.html"
    }

//cerrar sesion
function cerrarSes(){
    localStorage.removeItem('UserLog');
    window.location = "login.html"

};