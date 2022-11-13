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
          
  
          form.classList.add('was-validated')
          const name = document.getElementById('name').value;
          const name2 = document.getElementById('name2').value;
          const lastName = document.getElementById('lastName').value;
          const lastName2 = document.getElementById('lastName2').value;
          const number = document.getElementById('number').value;

		  //nos guarda los datos ingresados al submit
            localStorage.setItem("NAME", name);
            localStorage.setItem("NAME2", name2);
            localStorage.setItem("SURNAME", lastName);
            localStorage.setItem("SURNAME2", lastName2);
            localStorage.setItem("NUMBER", number);
		  	
			
  
        }, false)
      })
  
})()


// on reload nos carga los datos guardos en el local
window.addEventListener('load', () => {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('NAME');
    const userName2 = localStorage.getItem('NAME2');
    const userLastName = localStorage.getItem('SURNAME');
    const userLastName2 = localStorage.getItem('SURNAME2');
    const userNumber = localStorage.getItem('NUMBER');
	const profileImage = localStorage.getItem('IMAGE');

    document.getElementById('email').value = userEmail;
    document.getElementById('name').value = userName;
    document.getElementById('name2').value = userName2;
    document.getElementById('lastName').value = userLastName;
    document.getElementById('lastName2').value = userLastName2;
    document.getElementById('number').value = userNumber;
	document.querySelector("#display-image").style.backgroundImage = `url(${profileImage})`;

})



//para mostrar y guardar el imagen de perfil
const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
	localStorage.setItem("IMAGE",uploaded_image );
  });
  reader.readAsDataURL(this.files[0]);
});


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