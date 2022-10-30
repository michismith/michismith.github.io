const URL = CART_INFO_URL + "25801" + EXT_TYPE
let producto = {}
let precioUnit = 0
let subTotal = 0
let total = 0
let costoEnvio = 0



document.addEventListener("DOMContentLoaded", () => {
  fetch(URL)
    .then(resp_1 => resp_1.json())
    .then(data_1 => {
      producto = data_1;
      console.log(producto);
      showArticulo(producto);
      subtotal();
    })
});



/*function para mostrar producto precargado*/
function showArticulo() {

  precioUnit = producto.articles[0].unitCost

  listaDesplegable = `
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
function subtotal() {
  /*subtotal*/
  subTotal = precioUnit * document.getElementById("cantArticulo").value
  document.getElementById("subtotal").innerHTML = subTotal
  document.getElementById("subtotalText").innerHTML = subTotal

  /*costo de envio*/
  if (document.getElementById("premiumRadio").checked) {
    costoEnvio = subTotal * 0.15

  } else if (document.getElementById("expressRadio").checked) {
    costoEnvio = subTotal * 0.07

  } else if (document.getElementById("standardRadio").checked) {
    costoEnvio = subTotal * 0.05

  } document.getElementById("shippingText").innerHTML = costoEnvio

  /*total*/
  document.getElementById("totalCostText").innerHTML = subTotal + costoEnvio
}






/* validate form info*/
let paymentCredit = document.getElementById('creditCardPaymentRadio');
let paymentBanking = document.getElementById('bankingRadio');

let creditCardNumber = document.getElementById('creditCardNumber');
let creditCardSecurityCode = document.getElementById('creditCardSecurityCode');
let dueDate = document.getElementById('dueDate');

let bankAccountNumber = document.getElementById('bankAccountNumber');

let botonBanking = document.getElementById('boton-banking');
let terminosTexto = document.getElementById('terminos-texto');
let formulario = document.getElementById('formulario');



(function () {
  'use strict'

  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll('.needs-validation')

  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        if (!paymentCredit.checkValidity()) {

          botonBanking.style.color = 'rgb(220, 53, 69)';
          terminosTexto.style.display = 'block';

        }

        if (!paymentBanking.checkValidity()) {

          botonBanking.style.color = 'rgb(220, 53, 69)';
          terminosTexto.style.display = 'block';

        }

        form.classList.add('was-validated')

      }, false)
    })

})()

paymentCredit.onclick = () => {

  creditCardNumber.disabled = false;
  creditCardSecurityCode.disabled = false;
  dueDate.disabled = false;
  bankAccountNumber.disabled = true;
  bankAccountNumber.value = "";

}




paymentBanking.onclick = () => {
  document.getElementById("creditCardNumber").disabled = true;
  document.getElementById("creditCardSecurityCode").disabled = true;
  document.getElementById("dueDate").disabled = true;
  document.getElementById("bankAccountNumber").disabled = false;

  creditCardNumber.value = "";
  creditCardSecurityCode.value = "";
  dueDate.value = "";
}

document.getElementById("close").onclick = () => {
  if (paymentCredit.checked && creditCardNumber.checkValidity() && creditCardSecurityCode.checkValidity() && dueDate.checkValidity()) {
    document.getElementById("paymentType").innerHTML = ` Tarjeta de credito`
    botonBanking.style.color = 'rgb(25, 135, 84)';
    terminosTexto.style.display = 'none';

  } else if (paymentBanking.checked && bankAccountNumber.checkValidity()) {
    document.getElementById("paymentType").innerHTML = ` Transferencia bancaria`

    botonBanking.style.color = 'rgb(25, 135, 84)';
    terminosTexto.style.display = 'none';

  } else {
    botonBanking.style.color = 'rgb(220, 53, 69)';
    terminosTexto.style.display = 'block';

  }

}


document.getElementById('btnSubmit').onsubmit = () => {
  
    document.getElementById("alert").innerHTML=
   `  <div class="alert alert-success alert-dismissible" role="alert" id="alert-success">
    <p>FELICITACIONES!!!!! La compra se realizó con éxito</p>
    <p>Por favor... Cierre esta ventana para CONTINUAR EL PROCESO DE COMPRA</P>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick = "form_comprar.submit()"></button>
  </div>`

}

//login
if (localStorage.getItem('UserLog') != undefined) {
  document.getElementById("User").innerHTML = localStorage.getItem('UserLog');
} else {
  window.location = "login.html"
}

//cerrar sesion
function cerrarSes() {
  localStorage.removeItem('UserLog');
  window.location = "login.html"

};