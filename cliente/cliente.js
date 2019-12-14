//PROBLEMA: QUE HACEMOS SI ENTRA Y SALE DE DATOS PERSONALES, VA A CAMBIAR PASS Y VUELVE A DATOS PERSONALES, EL LOCALSTORAGE NO TENDRA LOS POSIBLES NUEVOS DATOS... 
//CADA VEZ QUE SE MODIFIQUE ALGO HAY QUE CAMBIAR EL LOCALSTORAGE
window.onload = rellenarDatosPersonales();

function rellenarDatosPersonales() {
	var usuario = JSON.parse(localStorage.getItem("usuarioCliente"));	

	var inputName = document.getElementById("inputName");
	inputName.value = usuario.login;

	var inputPeso = document.getElementById("inputPeso");
	inputPeso.value = usuario.peso;

	var inputAltura = document.getElementById("inputAltura");
}