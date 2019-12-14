//PROBLEMA: QUE HACEMOS SI ENTRA Y SALE DE DATOS PERSONALES, VA A CAMBIAR PASS Y VUELVE A DATOS PERSONALES, EL LOCALSTORAGE NO TENDRA LOS POSIBLES NUEVOS DATOS... 
//CADA VEZ QUE SE MODIFIQUE ALGO HAY QUE CAMBIAR EL LOCALSTORAGE

var usuario;

window.onload = function() {
	crearLabelImc();
	rellenarDatosPersonales();
	calcularFCM();
}

/*
* Recoge el usuario del login y rellena sus datos personales
*/
function rellenarDatosPersonales() {
	usuario = JSON.parse(localStorage.getItem("usuarioCliente"));
	
	var inputName = document.getElementById("inputName");
	inputName.value = usuario.login;

	var inputDNI = document.getElementById("inputDNI");
	inputDNI.value = usuario.dni;

	var inputPeso = document.getElementById("inputPeso");
	inputPeso.value = usuario.peso;

	var inputAltura = document.getElementById("inputAltura");
	inputAltura.value = usuario.altura;

	var inputEdad = document.getElementById("inputEdad");
	inputEdad.value = usuario.edad;

	var optionsSexo = document.getElementById("sexo").options;
	if (usuario.sexo == "Masculino"){
		optionsSexo[1].selected = 'selected';
	}else{
		optionsSexo[0].selected = 'selected';
	}

	// Rellenamos tambien la tabla de imcs con los que ya tenia introducido el usuario
	var tablaIMC = document.getElementById("historialImc");
	for (var i = 0; i < usuario.historialIMC.length; i++){
		var nuevaFila = tablaIMC.insertRow(-1);
		nuevaFila.innerHTML = "<td>" + usuario.historialIMC[i] + "</td><td>" 
    	+ obtenerEstadoIMC(usuario.historialIMC[i]) + "</td>"; // El texto lo deberiamos tener guardado en un objeto IMC o algo, no calcularlo siempre
    }
}

/*
* Generamos un fragmento de html desde JS - El apartado de IMC
*/
function crearLabelImc() {
	var labelImc = document.getElementById("labelIMC");
	var titulo = document.createElement("h3");
	titulo.innerHTML = "Historial IMC";

	//Tabla IMC
	var tabla = document.createElement("table");
	tabla.id = "historialImc";
	var encabezado = tabla.insertRow(-1);
	encabezado.innerHTML = "<td>IMC</td><td>Valoracion</td>";

	//Boton IMC
	var boton = document.createElement("button");
	boton.innerHTML = "CALCULAR IMC";
	boton.onclick = calcularIMC;

	labelIMC.appendChild(tabla);
	labelIMC.appendChild(boton);
}

/*
* Recoge los datos del formulario y actualiza el objeto usuario. Luego lo actualiza en el localStorage
*/
function modificarDatosPersonales() {
	
	var dni = document.getElementById("inputDNI").value;
	var peso = document.getElementById("inputPeso").value;
	var altura = document.getElementById("inputAltura").value;	
	var edad = document.getElementById("inputEdad").value;

	if (dni == "" || peso == "" || altura == "" || edad == ""){ // Se deberia controlar mas con forms o regex
		alert("Introduzca valores validos de DNI, peso, altura y edad");
		return;
	}

	usuario.peso = peso;
	usuario.altura = altura;
	usuario.dni = dni;
	usuario.edad = edad;
	alert("Datos personales actualizados correctamente");
	localStorage.setItem("usuarioCliente", JSON.stringify(usuario));
}

/*
* Se calcula la fcm con los datos personales del cliente
*/
function calcularFCM() {
	var edad = usuario.edad;
	var sexo = usuario.sexo;
	var fcm;

	if (sexo == "hombre"){
		fcm = (209 - (0.7 * edad)).toFixed(0);
	}else{
		fcm = (214 - (0.8 * edad)).toFixed(0);
	}

	var fcmParrafo = document.getElementById("fcm");
	fcmParrafo.innerHTML = " Su frecuencia cardiaca maxima es: <b>" + fcm + "</b> pulsaciones por minuto";
	
	var recuperacion = document.getElementById("recuperacion");
	recuperacion.innerHTML = "Zona de recuperacion (60% - 70%) = " 
	+ (fcm * 0.6).toFixed(0) + " - " + (fcm * 0.7).toFixed(0);

	var aerobica = document.getElementById("aerobica");
	aerobica.innerHTML = "Zona aerobica (70% - 80%) = " 
	+ (fcm * 0.7).toFixed(0) + " - " + (fcm * 0.8).toFixed(0);

	var anaerobica = document.getElementById("anaerobica");
	anaerobica.innerHTML = "Zona anaerobica (80% - 90%) = " 
	+ (fcm * 0.8).toFixed(0) + " - " + (fcm * 0.9).toFixed(0);

	var danger = document.getElementById("danger");
	danger.innerHTML = "Linea Roja (90% - 100%) = " + (fcm * 0.9).toFixed(0) + " - " + fcm;

	usuario.fcm = fcm;
	localStorage.setItem("usuarioCliente", JSON.stringify(usuario));
}

/*
* Calcula el IMC con los datos del cliente
*/
function calcularIMC() {

	var altura = usuario.altura;
	var peso = usuario.peso;

	if(!validarMedidas(altura, peso)){
		alert("Sus medidas no son correctas. Recuerde escribir la altura en centimetros y el peso en kilogramos");
		return false;
	}

    //Formula del IMC
    var imc = (peso / Math.pow((altura) / 100, 2)).toFixed(2);

    //Clasificamos el imc segun se nos da en el enunciado
    var estadoIMC = obtenerEstadoIMC(imc);    

    //Aniadimos a la tabla un nuevo registro de IMC
    var tablaIMC = document.getElementById("historialImc");
    var fila = tablaIMC.insertRow(-1);
    fila.innerHTML = "<td>" + imc + "</td><td>" + estadoIMC + "</td>";

    usuario.historialIMC.push(imc);
    localStorage.setItem("usuarioCliente", JSON.stringify(usuario));
}

/*
* Dado un valor de IMC te devuelve 
*/
function obtenerEstadoIMC(imc) {
	var estadoIMC = "";
	if(imc < 16){
		estadoIMC = "Infrapeso (delgadez severa)";        
	}else if(imc >= 16 && imc < 17){
		estadoIMC = "Infrapeso (delgadez moderada)";
	}else if(imc >=17 && imc < 18.5){
		estadoIMC = "Infrapeso (delgadez aceptable)";        
	}else if(imc >= 18.5 && imc < 25){
		estadoIMC = "Peso normal";
	}else if(imc >= 25 && imc < 30){
		estadoIMC = "Sobrepeso";
	}else if(imc >= 30 && imc < 35){
		estadoIMC = "Obeso (Tipo I)";
	}else if(imc >= 35 && imc < 40){
		estadoIMC = "Obeso (Tipo II)";
	}else if(imc >= 40){
		estadoIMC = "Obeso (Tipo III)";
	}

	return estadoIMC;
}

/*
* Comprobamos que los datos de peso y altura dados por el usuario sean validos
*/
function validarMedidas(altura, peso){
	var regex = /^\d{1,3}$/;
	if(regex.test(altura) && regex.test(peso)){
		return true;
	}else{
		return false;
	}
}

/*
* Aniadimos la maquina introducida por el usuario al listado 
*/
function introducirMaquina() {

	var listado = document.getElementById("listadoMaquinas");
	var maquina = document.getElementById("inputMaquinas").value;

	if (maquina == "") {
		alert("Introduzca el nombre de la maquina que ha utilizado");
		return;
	}

	//Creamos el li con la maquina introducida
	var nuevoLi = document.createElement("li");
	nuevoLi.innerHTML = maquina;

	listado.appendChild(nuevoLi);
}