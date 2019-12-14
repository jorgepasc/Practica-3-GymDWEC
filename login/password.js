var usuario; 
window.onload = function () {
	usuario = JSON.parse(localStorage.getItem("usuarioCliente"));
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

	if (passwordEscrita.length < 8) 
	{
		error = "La contraseña es demasiado corta";
	}
	else if (passwordEscrita.length > 16) 
	{
		error = "La contraseña es demasiado larga";
	}
	else if (!passwordEscrita.match(regexMinusculas))
	{
		error = "La contraseña debe contener al menos una letra minuscula";
	}
	else if (!passwordEscrita.match(regexMayusculas))
	{
		error = "La contraseña debe contener al menos una letra mayuscula";	
	}
	else if (!passwordEscrita.match(regexNumeros))
	{
		error = "La contraseña debe contener al menos un numero";	
	}
	else if (!passwordEscrita.match(regexCaracteresEspeciales))
	{
		error = "La contraseña debe contener al menos un caracter especial de los siguientes: -_@#$%&";	
	}

	var parrafoError = document.getElementById("error");
	if (error != "") 
	{
		parrafoError.innerHTML = error + ". Vuelva a intentarlo por favor";
	}else {
		alert("Password modificada con exito");
		localStorage.setItem("usuarioCliente", JSON.stringify(usuario));
		window.location.href = "../cliente/clientePage.html";
	}
}

function volverAlLogin() {
	window.location.href = "login.html";
}