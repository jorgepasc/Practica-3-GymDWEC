var usuarioGestor;
var vectorActividades = [];
var vectorEmpleados = []; // Sera un vector de empleados (padre) para guardar en el tanto fisios como monitores
var vectorSalas = [];

window.onload = function () {
	usuarioGestor = JSON.parse(localStorage.getItem("usuarioGestor"));	
	
	inicializarActividades();
	inicializarSalas();

	//Una vez estan creadas las salas rellenamos el desplegable de las actividades para elegir sala
	var opciones = document.getElementById("selectorSala").options;
	var opcion1 = document.createElement("option");
	opcion1.text = sala1.id;
	opciones.add(opcion1, sala1.id);

	var opcion2 = document.createElement("option");
	opcion2.text = sala2.id;
	opciones.add(opcion2, sala2.id);
}	

/*
* Crea los vectores de actividades y las aniade a la tabla
*/
function inicializarActividades() {
	//Creamos actividades por defecto
	actividad1 = new Actividad("Yoga", 60, 1);
	actividad2 = new Actividad("Cross-Fit", 45, 2);
	actividad3 = new Actividad("Zumba", 30, 1);

	vectorActividades.push(actividad1);
	vectorActividades.push(actividad2);
	vectorActividades.push(actividad3);

	//Aniadimos las actividades a una tabla
	var tablaActividades = document.getElementById("actividades");
	
	for (var i = 0; i < vectorActividades.length; i++){
		var nuevaActividad = tablaActividades.insertRow(-1);
		nuevaActividad.innerHTML = "<td>" + vectorActividades[i].nombre + "</td><td>" 
		+ vectorActividades[i].duracion + "</td>"
		+ "<td>" + vectorActividades[i].sala + "</td>";
	}
	
}

/*
* Crea las salas por defecto y las aniade a la tabla
*/
function inicializarSalas() {	
	//Creamos salas por defecto -- No vamos a dar opcion de crear mas
	sala1 = new Sala(1, 25, vectorActividades); // Las 3 actividades por defecto se pueden hacer en las dos salas
	sala2 = new Sala(2, 20, vectorActividades);

	vectorSalas.push(sala1);
	vectorSalas.push(sala2);

	//Aniadimos las salas a una tabla
	var tablaSalas = document.getElementById("salas");
	
	var nuevaSala1 = tablaSalas.insertRow(-1);
	nuevaSala1.innerHTML = "<td>" + sala1.id + "</td><td>" + sala1.capacidad + "</td>";

	var nuevaSala2 = tablaSalas.insertRow(-1);
	nuevaSala2.innerHTML = "<td>" + sala2.id + "</td><td>" + sala2.capacidad + "</td>";

	var textoActividades;
	for (var i = 0; i < vectorActividades.length; i++){
		textoActividades += vectorActividades[i].nombre + " - ";
	}

	nuevaSala1.innerHTML += "<td>" + textoActividades + "</td>";
	nuevaSala2.innerHTML += "<td>" + textoActividades + "</td>";
}

/*
* Misma funcion que en la practica pasada. Crea la tabla del horario 
*/
function crearHorario() {

	var tabla = document.getElementById("horario");	
	//limpiarHorario(tabla);

	for (var fila = 1; fila < tabla.rows.length; fila++) {//Empezamos en 1 para saltarnos el header		
		for (var col = 1; col < tabla.rows[0].cells.length; col++) {
			var indiceAleatorio = Math.floor(Math.random() * vectorActividades.length);			
			
			//Si todavia no habia celdas creadas las creamos nuevas, sino las sobreescribimos
			if (tabla.rows[fila].cells[col] == null) {
				var newCell = tabla.rows[fila].insertCell(col);
				newCell.innerHTML = "<td>" + vectorActividades[indiceAleatorio].nombre + "</td>";
			}else{
				tabla.rows[fila].cells[col].innerHTML = "<td>" + vectorActividades[indiceAleatorio].nombre + "</td>";	
			}			
		}
	}
}

/*
* Recibe los datos del input y crea una nueva actividad
*/
function crearActividad() {
	var name = document.getElementById("nombreActividad").value;
	var duracion = document.getElementById("duracion").value;
	var selectorSala = document.getElementById("selectorSala");
	var sala = selectorSala.options[selectorSala.selectedIndex].value;

	if (name == "" || duracion == "" || sala == ""){ // Si falta algun dato no creamos la actividad
		alert("Rellene todos los campos de la actividad");
		return false;
	}
		

	var actividad = new Actividad(name, duracion, sala);
	vectorActividades.push(actividad);
	alert("Actividad creada correctamente");

	// reseteamos los controles	
	var inputNombre = document.getElementById("nombreActividad");
	inputNombre.value = "";

	var inputDuracion = document.getElementById("duracion");
	inputDuracion.value = "";

	var tablaActividades = document.getElementById("actividades");

	var nuevaActividad = tablaActividades.insertRow(-1);
		nuevaActividad.innerHTML = "<td>" + actividad.nombre + "</td><td>" 
		+ actividad.duracion + "</td>"
		+ "<td>" + actividad.sala + "</td>";

	return true;
}

/*
* Al igual que en la actividad, recoge los datos del form y crea el objeto empleado. 
* Se podria hacer con la validacion de los formularios mas rapido que con DOM e ids...
*/
function crearEmpleado() {
	var name = document.getElementById("inputNombreEmpleado").value;
	var dni = document.getElementById("inputDniEmpleado").value;
	var telefono = document.getElementById("inputTelefono").value;
	var horasConsulta = document.getElementById("inputHorasConsulta").value;
	var actividades = document.getElementById("inputActividades").value;
	var horasClase = document.getElementById("inputHorasClase").value;
	var horasComun = document.getElementById("inputHorasComun").value;
	var empleado;

	//Validamos que haya rellenado todos los datos, con form y input required mejor..
	if (name == "" || dni == "" || telefono == ""){
		alert("El nombre, Dni, y telefono del empleado son campos obligatorios. Asegurese de rellenarlos");
		return false;
	}

	if (horasConsulta == "" && (actividades == "" || horasClase == "" || horasComun == "")) {
		alert("Introduzca las horas de consulta para crear un fisio o las actividades y horas de clase y de sala comun para crear un monitor");
		return false;
	}

	if (horasConsulta != ""){
		empleado = new Fisioterapeuta(name, dni, telefono, horasConsulta);
	}else{
		empleado = new Monitor(name, dni, telefono, actividades, horasClase, horasComun);
	}

	vectorEmpleados.push(empleado);
	aniadirEmpleadoTabla(empleado);

}

/*
* Aniade el empleado dado por parametro a la tabla de empleados
*/
function aniadirEmpleadoTabla(empleado) {
	var tablaEmpleados = document.getElementById("tablaEmpleados");	
	var celda;
	var contadorCeldas = 0;
	var fila = tablaEmpleados.insertRow(-1);

	//Vamos creando las celdas con el contenido del objeto
	var newCell = fila.insertCell(contadorCeldas);
	newCell.innerHTML = empleado.nombre;
	contadorCeldas++;
	
	var newCell = fila.insertCell(contadorCeldas);
	newCell.innerHTML = empleado.dni;
	contadorCeldas++;

	var newCell = fila.insertCell(contadorCeldas);
	newCell.innerHTML = empleado.telefono;
	contadorCeldas++;

	if (empleado instanceof Fisioterapeuta){
		var newCell = fila.insertCell(contadorCeldas);
		newCell.innerHTML = empleado.horasConsulta;
		contadorCeldas++;
		
		//Respetamos los huecos vacios con atributos del monitor
		var newCell = fila.insertCell(contadorCeldas);
		newCell.innerHTML = "-";
		contadorCeldas++;

		var newCell = fila.insertCell(contadorCeldas);
		newCell.innerHTML = "-";
		contadorCeldas++;

		var newCell = fila.insertCell(contadorCeldas);
		newCell.innerHTML = "-";
		contadorCeldas++;

	}else{
		var newCell = fila.insertCell(contadorCeldas);
		newCell.innerHTML = "-";
		contadorCeldas++;
		
		var newCell = fila.insertCell(contadorCeldas);
		newCell.innerHTML = empleado.actividades;
		contadorCeldas++;
		
		var newCell = fila.insertCell(contadorCeldas);
		newCell.innerHTML = empleado.horasClase;
		contadorCeldas++;
		
		var newCell = fila.insertCell(contadorCeldas);
		newCell.innerHTML = empleado.horasComun;
		contadorCeldas++;
	}
	
	var newCell = fila.insertCell(contadorCeldas);
	newCell.innerHTML = "<button onclick=\"mostrarDescripcion(this)\">DESCRIPCION</button>";		

}

/*
* Muestra los datos del empleado
*/
function mostrarDescripcion(boton) {
	var indiceFila = boton.parentNode.parentNode.rowIndex; // El padre es el td cuyo padre es el tr
	var empleado = vectorEmpleados[indiceFila - 1]; // El row index no empieza en cero
	alert(empleado.getDescripcion());
}