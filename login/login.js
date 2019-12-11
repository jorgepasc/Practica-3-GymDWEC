// Nos deberiamos conectar a BD o otro origen de datos. Vamos a crear usuarios de ejemplo para simular el login
//var password = "Pass123#"; //les pongo a los dos la misma por defecto para no liar la cosa
var usuarioCliente = new UsuarioCliente("jorge", "Pass123#", "123A", 70, 190, 21, "Masculino");
var usuarioGestor = new UsuarioAdmin("admin", "Admin123%", "123B", "667899766");

window.onload = function() {
	var nuevaPass = localStorage.getItem("pass");
	if (nuevaPass != ""){
		usuarioCliente.pass = nuevaPass;
		usuarioGestor.pass = nuevaPass;	
	}
}

function checkLogin(){
	var inputLogin = document.getElementById("user").value;
	var inputPass = document.getElementById("pass").value;

	if (inputLogin.equals(usuarioCliente.login) && inputPass.equals(usuarioCliente.pass)){
		// Entrar a cliente. Entiendo que cliente y gestor utilizan paginas distintas. 
		// Si pudiesen acceder a las mismas, igual necesitaria identificar al usuario (bool?) para los permisos

	}
	else if (inputLogin.equals(usuarioGestor.login) && inputPass.equals(usuarioGestor.pass)){
		// entrar a admin
	}else{
		var p = document.getElementById("error");
		p.innerHTML = "Usuario o contraseña incorrectos"
	}
}

function modificarPassword() {
	localStorage.setItem("password")
} 