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