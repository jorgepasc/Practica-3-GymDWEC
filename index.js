function calcularIMC(){
    limpiarEstilos();
    //Obtenemos los datos introducidos por el usuario
    var inputAltura = document.getElementById("altura");
    var inputPeso = document.getElementById("peso");

    var altura = inputAltura.value; //Se podria poner directamente value arriba
    var peso = inputPeso.value;
    
    if(!validarMedidas(altura, peso)){
        alert("Las medidas no son correctas. Escriba la altura en centimetros y el peso en kilogramos")
        return false;
    }

    //Formula del IMC
    var imc = peso / Math.pow((altura) / 100, 2);

    //Clasificamos el imc segun se nos da en el enunciado
    if(imc < 16){
        var elegido = document.getElementById("delgadezSevera");
        elegido.style.fontWeight = "bold";        
    }else if(imc >= 16 && imc < 17){
        var elegido = document.getElementById("delgadezModerada");
        elegido.style.fontWeight = "bold";
    }else if(imc >=17 && imc < 18.5){
        var elegido = document.getElementById("delgadez");
        elegido.style.fontWeight = "bold";
    }else if(imc >= 18.5 && imc < 25){
        var elegido = document.getElementById("normal");
        elegido.style.fontWeight = "bold";
    }else if(imc >= 25 && imc < 30){
        var elegido = document.getElementById("sobrepeso");
        elegido.style.fontWeight = "bold";
    }else if(imc >= 30 && imc < 35){
        var elegido = document.getElementById("obeso1");
        elegido.style.fontWeight = "bold";
    }else if(imc >= 35 && imc < 40){
        var elegido = document.getElementById("obeso2");
        elegido.style.fontWeight = "bold";
    }else if(imc >= 40){
        var elegido = document.getElementById("obeso3");
        elegido.style.fontWeight = "bold";
    }

}

/**
* Comprobamos que los datos dados por el usuario sean validos
*/
function validarMedidas(altura, peso){
    var regex = /^\d{1,3}$/;
    if(!altura.match(regex) || !peso.match(regex)){
        return false;
    }else{
        return true;
    }

}

/**
* Busca los elementos li y les quita el estilo (al recargar la pagina)
*/
function limpiarEstilos(){
    var listaIMC = document.getElementById("listadoIMC")
    var listado = listaIMC.getElementsByTagName("li");

    for (var li of listado){
        li.style.fontWeight = "normal";
    }   
}