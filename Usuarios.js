/*
* Necesito meter las 3 clases en el mismo fichero porque sino no encuentra la referencia a la clase padre. Con modulos??
*/

class UsuarioWeb {
	constructor(login, pass, dni) {
		this.login = login;
		this.pass = pass;
		this.dni = dni;
	}	
}

class UsuarioCliente extends UsuarioWeb {
	constructor(login, pass, dni, peso, altura, edad, sexo) {
		super(login, pass, dni);
		this.peso = peso;
		this.altura = altura;
		this.edad = edad;
		this.sexo = sexo;
		this.historialIMC = [0, 0, 0]; // Se calculara mas tarde
		this.fcm = 0; // Se calculara mas tarde
		this.historialMaquinas = null; // Sin implementacion
	}
}

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