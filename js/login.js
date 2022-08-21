

document.getElementById("ok").addEventListener("click", function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    window.location = "index.html";
  } else {
    window.location = "login.html";
  }

})


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $("#name").text(profile.getName());
  $("#email").text(profile.getEmail());
  $("#image").attr('src', profile.getImageUrl());
  $(".data").css("display", "block")
  $("g-signin2").css("display", "none")
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert("Signed out");
    $("g-signin2").css("display", "block")
    $(".data").css("display", "none")
  });
}