import UsuarioWeb from 'UsuarioWeb.js';
class UsuarioGestor extends UsuarioWeb {
	
	constructor(login, pass, dni, telefono) {
		super(login, pass, dni);
		this.telefono = telefono; // Campo aniadido de gratis al gestor, no se usara
	}

	darAltaEmpleado() {

	}

	crearTablasHorarios() {

	}
}