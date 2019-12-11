rellenarTablaActividades();
rellenarTablaFisios();
limpiarControles();

/**
 * Al recargar la página se asegura de que estén desmarcados las selecciones del usuario
 * Se podría hacer todo en un solo bucle buscando solo los inputs by name
 * ya que en esta pagina no se usan en ningun otro lado
 */
function limpiarControles() {
	//Buscas todos los checkbox y los desmarcas
	var inputsCheck = document.querySelectorAll("input[type=checkbox]");
	for (var i = 0; i < inputsCheck.length; i++) {
		inputsCheck[i].checked = false;
	}

	//Buscas todos los radiobutton y los desmarcas
	var inputsRadio = document.querySelectorAll("input[type=radio]")
	for (var i = 0; i < inputsRadio.length; i++) {
		inputsRadio[i].checked = false;
	}

}

/**
 * Recorre la tabla de las actividades y las va añadiendo al azar a cada celda
 * 
 * No se utiliza el mismo codigo para la tabla de actividades y para la de fisios porque se supone 
 * que la de actividades lleva comprobaciones extra
 */
function rellenarTablaActividades() {
	var tabla = document.getElementById("horario");
	var vectorActividades = ["MMA", "Yoga", "Boxeo", "Pilates", "BMX", "Spinning", "Zumba"];

	for (var fila = 1; fila < tabla.rows.length; fila++) {//Empezamos en 1 para saltarnos el header		
		for (var col = 1; col < tabla.rows[0].cells.length; col++) {
			var indiceAleatorio = Math.floor(Math.random() * vectorActividades.length);
			//Le añadimos al html de la fila un nuevo td con una actividad al azar
			tabla.rows[fila].innerHTML += "<td>" + vectorActividades[indiceAleatorio] + "</td>";
		}
	}
}

/**
 * Recorre la tabla de los fisios y los va añadiendo al azar a cada celda
 */
function rellenarTablaFisios() {
	var tabla = document.getElementById("horarioFisios");
	var vectorFisios = ["Jose", "Maria", "Pedro", "Sergio", "Paula", "Ana"];
	var numeroColumnas = tabla.rows[0].cells.length;

	for (var fila = 1; fila < tabla.rows.length; fila++) {//Empezamos en 1 para saltarnos el header		
		for (var col = 1; col < numeroColumnas; col++) {
			var indiceAleatorio = Math.floor(Math.random() * vectorFisios.length);
			//Le añadimos al html de la fila un nuevo td con un fisio al azar
			tabla.rows[fila].innerHTML += "<td>" + vectorFisios[indiceAleatorio] + "</td>";
		}
	}
}

/**
 * Evento que se lanza cuando se marca o desmarca una actividad
 * @param {*} actividadClickada 
 */
function clickarActividad(actividadClickada) {
	var tabla = document.getElementById("horario");

	/*Recorremos la tabla, fila a fila y columna a columna*/
	for (var fila of tabla.rows) {
		for (var cell of fila.cells) {

			//Comprobamos si la celda es de la actividad (des)seleccionada
			if (cell.innerHTML.includes(actividadClickada.value)) {
				if (cell.className == "desmarcado" || cell.className == "")
					cell.className = "marcado";//Le cambiamos la clase para que le cambie el estilo
				else
					cell.className = "desmarcado";
			}
		}
	}
}

/**
* Evento que se lanza al escoger un fisio - Colorea las celdas del fisio escogido
* @param {*} fisioEscogido 
*/
function escogerFisio(fisioEscogido) {
	var tabla = document.getElementById("horarioFisios");

	/*Recorremos la tabla, fila a fila y columna a columna*/
	for (var fila of tabla.rows) {
		for (var cell of fila.cells) {
			
			//Si la celda actual es del fisio escogido le ponemos un fondo
			if (cell.innerHTML.includes(fisioEscogido.value)) {
				if (cell.className == "desmarcado" || cell.className == "")
					cell.className = "marcado";//Le cambiamos la clase para que le cambie el estilo
				else
					cell.className = "desmarcado";
			}else{//Si la celda actual NO es del fisio escogido y tiene color se lo quitamos
				if(cell.className == "marcado"){
					cell.className = "desmarcado";
				}
			}
		}
	}
}
