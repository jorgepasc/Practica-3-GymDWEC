class Empleado {
	constructor (name, nif, phone) {
		this.nombre = name;
		this.dni = nif;
		this.telefono = phone;
	}

	getDescripcion () {
		return "Empleado " + this.nombre + " con DNI " + this.dni + " y telefono " + this.telefono;
	}
}

class Monitor extends Empleado {
	constructor (name, nif, phone, activities, hoursClass, hoursComun){
		super(name, nif, phone);
		this.actividades = activities;
		this.horasClase = hoursClass;
		this.horasComun = hoursComun;
	}

	getDescripcion(){ //Metodo sobrecargado
		return "Empleado Monitor llamado " + this.nombre + " con DNI " + this.dni + " y telefono " + this.telefono
		+ " imparte las actividades " + this.actividades + " en " + this.horasClase + " horas de clase a la semana mas " 
		+ this.horasComun + " en la sala comun"; 	
	}
}

class Fisioterapeuta extends Empleado {
	constructor (name, nif, phone, hoursConsulta){
		super(name, nif, phone);
		this.horasConsulta = hoursConsulta;
	}

	getDescripcion(){ //Metodo sobrecargado
		return "Empleado Fisioterapeuta llamado " + this.nombre + " con DNI " + this.dni + " y telefono " + this.telefono
		+ " pasa consulta " + this.horasConsulta + " horas a la semana";
	}
}