// Nos deberiamos conectar a BD o otro origen de datos. Vamos a crear usuarios de ejemplo para simular el login
var usuarioCliente = new UsuarioCliente("jorge", "pass", "123A", 70, 190, 21, "Masculino", [17.88, 19.39]);
var usuarioGestor = new UsuarioGestor("admin", "admin", "123B", "667899766");

/*
window.onload = function() {
	var nuevaPass = localStorage.getItem("pass");
	if (nuevaPass != ""){
		usuarioCliente.pass = nuevaPass;
		usuarioGestor.pass = nuevaPass;	
	}
}
*/

function checkLogin(){
	var inputLogin = document.getElementById("user").value;
	var inputPass = document.getElementById("pass").value;
 
	if (inputLogin === usuarioCliente.login && inputPass === usuarioCliente.pass){
		// Entrar a cliente. Entiendo que cliente y gestor utilizan paginas distintas. 
		// Si pudiesen acceder a las mismas, igual necesitaria identificar al usuario (bool?) para los permisos
		localStorage.setItem("usuarioCliente", JSON.stringify(usuarioCliente)); // No deja pasar objetos enteros, asi que los pasamos a JSON y los parseamos donde se recojan
		window.location.assign("../cliente/clientePage.html");
		//window.location.href = "../cliente/clientePage.html";
	}
	else if (inputLogin === (usuarioGestor.login) && inputPass === (usuarioGestor.pass)){
		// entrar a admin
		localStorage.setItem("usuarioGestor", JSON.stringify(usuarioGestor));
		window.location.href = "../gestor/gestorPage.html";
	}else{
		var p = document.getElementById("error");
		p.innerHTML = "Usuario o contraseña incorrectos";
	}
}

function copiarTexto(boton){
	var texto = boton.previousElementSibling;
	texto.select();	
  	document.execCommand("copy");
  	//var copyText = document.querySelector("#input");
  	//copyText.select();
  	//document.execCommand("copy");
}