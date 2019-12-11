var password = ""; 
window.onload = function () {
	password = localStorage.getItem("pass");
}


function validarPassword(){
	//Establecemos la regex, testeada en la pagina https://regex101.com/
	//var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_@#$&-])[0-9a-zA-Z_@#$&-]{8,16}$/;
	var passwordEscrita = document.getElementById("pass").value;

	var regexMinusculas = /[a-z]+/;
	var regexMayusculas = /[A-Z]+/;
	var regexNumeros = /\d+/;
	var regexCaracteresEspeciales = /[-_@#$%&]+/;
	var error = "";

	if (pass.length() < 8) 
	{
		error = "La contraseña es demasiado corta";
	}
	else if (pass.length > 16) 
	{
		error = "La contraseña es demasiado larga";
	}
	else if (!pass.match(regexMinusculas))
	{
		error = "La contraseña debe contener al menos una letra minuscula";
	}
	else if (!pass.match(regexMayusculas))
	{
		error = "La contraseña debe contener al menos una letra mayuscula";	
	}
	else if (!pass.match(regexNumeros))
	{
		error = "La contraseña debe contener al menos un numero";	
	}
	else if (!pass.match(regexCaracteresEspeciales))
	{
		error = "La contraseña debe contener al menos un caracter especial de los siguientes: -_@#$%&";	
	}

	var parrafoError = document.getElementById("error");
	if (error != "") 
	{
		parrafoError.innerHTML = error + ". Vuelva a intentarlo por favor";
	}else {
		parrafoError.innerHTML = "Contraseña modificada correctamente";
		parrafoError.style.color = "green";
		password = passwordEscrita;
		localStorage.setItem("pass", password);
	}
}

function volverAlLogin() {
	window.location.href = "login.html";
}