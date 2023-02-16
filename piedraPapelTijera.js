// Este array no se puede modificar.
var posibilidades = ["piedra", "papel", "tijera"];
/*Declaramos las variables en su valor inicial para poder utilizándolas a lo largo de las funciones
de tal manera que sea accesible para todas las funciones.*/
// Creo un Array para almacenar todas las imagenes.
var imagenes = document.getElementsByTagName("img");
// Este contador será la variable identificada para el elemento span con id="actual".
var contador = 0; 
// Variable que se modificará según la elección de imagen del Jugador, siendo 0 = no elección.
var eleccion = 0;
// Número de partidas que se inicializa en 0 ya que aún no se ha elegido.
var numeroPartidas = 0;
// Nombre del jugador.
var nombreJugador = "";
// Se iniciarán las casillas del elemento input desbloqueado para poder escribir
document.getElementsByTagName('input')[0].disabled = false;
document.getElementsByTagName('input')[1].disabled = false;
// Se recorre por las 3 primeras posiciones del array que corresponden a las imagenes del jugador
for (let i = 0; i < 3; i++) {
    imagenes[i].className='noSeleccionado';
}


// Al clickar sobre el botón ¡JUGAR!, se activará el método addEventListener con esta función.
function jugarpartida(){
    // se cargan variables con los datos introducidos en los inputs.
    nombreJugador = document.getElementsByTagName('input')[0].value;
    numeroPartidas = document.getElementsByTagName('input')[1].value;
    // Se devolverá un "true" si el nombre del jugador guarda la expresión regular indicada.
    function compruebaNombre(){
        let texto = nombreJugador;
        const expRegular = /^\D[A-Za-z0-9]{3,}$/;
        if (expRegular.test(texto)) {
            return true;
        }else{
            return false;
        }
    }
    // Devolverá un true si el número de partidas es superior a 0.
    function compruebaPartidas(){
        if(numeroPartidas > 0){
            return true;
        }else{
            return false;
        }
    }   
        /*Se crean una serie de condicionales, según en cada caso para activar las comprobaciones para
        que las dos funciones anteriores se cumplan y sean los dos true.
        En el caso que devuelva un "false", se pintarán con la clase .fondoRojo*/
        if(compruebaNombre() === false && compruebaPartidas() === false){
            document.getElementsByTagName('input')[0].classList.add("fondoRojo");
            document.getElementsByTagName('input')[1].classList.add("fondoRojo");
        }else if(compruebaNombre() === true && compruebaPartidas() === false){
            document.getElementsByTagName('input')[0].classList.remove("fondoRojo");
            document.getElementsByTagName('input')[1].classList.add("fondoRojo");
        }else if(compruebaNombre() === false && compruebaPartidas() === true){
            document.getElementsByTagName('input')[0].classList.add("fondoRojo");
            document.getElementsByTagName('input')[1].classList.remove("fondoRojo");
        }
        // Se iniciará el resto del código de esta función cuando se cumpla este condicional.
        else if (compruebaNombre() === true && compruebaPartidas() === true) {
                // Si se ha accedido aquí, es porque las comprobaciones se cumplen, por lo tanto, se elimina la clase.
                document.getElementsByTagName('input')[0].classList.remove("fondoRojo");
                document.getElementsByTagName('input')[1].classList.remove("fondoRojo");
                // Se bloquean los inputs para que no se pueda escribir ni modificar
                document.getElementsByTagName('input')[0].disabled = true;
                document.getElementsByTagName('input')[1].disabled = true;
                // Al iniciar el juego, se cambiarán las imagenes del array, del pingüino a piedra, papel y tijera.
                imagenes[0].src="img/piedraJugador.png";
                imagenes[1].src="img/papelJugador.png";
                imagenes[2].src="img/tijeraJugador.png";
                //Cargaremos el dato del numero de partidas introducido anteriormente para que se pinte en el html.
                document.getElementById('total').innerHTML = "<span>" + numeroPartidas + "</span>";
            // Punto de seguridad, sólo se accederá en el caso que el número de partidas sea superior a 0.
            if(numeroPartidas > 0){
                //activamos el método onclick para poder seleccionar la imagen activando así la clase seleccionado.
                imagenes[0].onclick = function(){
                                            for (let i = 0; i < 3; i++) {
                                                imagenes[i].className='noSeleccionado';
                                            }
                                            imagenes[0].className='seleccionado';
                                            eleccion=1; 
                                    }
                imagenes[1].onclick = function(){
                                            for (let i = 0; i < 3; i++) {
                                                imagenes[i].className='noSeleccionado';
                                            }
                                            imagenes[1].className='seleccionado';
                                            eleccion=2;
                                    }
                imagenes[2].onclick = function(){
                                            for (let i = 0; i < 3; i++) {
                                                imagenes[i].className='noSeleccionado';
                                            }
                                            imagenes[2].className='seleccionado';
                                            eleccion=3;
                                    }
            }
        } 
} // se cierra la función que se activaba pinchando sobre el botón ¡JUGAR!.

// Al clickar sobre el botón ¡YA!, se activará el método addEventListener con esta función.
function inicioJuego(){
    // Punto de seguridad, sólo se accederá en el caso que el número de que la elección sea diferente a 0.
    if(!eleccion==0){
            // Punto de control. Solo se accederá mientras que el número de partidas restantes sea inferior a las introducidas.
            if (contador < numeroPartidas) {
                    //creamos la función para seleccionar una imagen por parte del ordenador con un Math.Random.
                    function aleatorioOrdenador(datos) {
                        var numeroAleatorio = Math.floor(Math.random() * datos.length);
                        console.log(numeroAleatorio);
                        return datos[numeroAleatorio];
                    }
                    // Activamos la función anterior y la pasamos por el array posibilidades para guardarlo en la variable eleccionOrdenador.
                    var eleccionOrdenador = aleatorioOrdenador(posibilidades)
                    console.log(eleccionOrdenador);
                            if (eleccionOrdenador=== "piedra") {
                                imagenes[3].src = "img/piedraOrdenador.png";
                            } else if (eleccionOrdenador === "papel") {
                                imagenes[3].src = "img/papelOrdenador.png";
                            } else {
                                imagenes[3].src = "img/tijeraOrdenador.png";
                            }
                // Ahora marcaremos las opciones de la partida para ver quien gana o pierde.
                if(eleccion == 1){ //Elección 1 = el usuario elige piedra 
                    if(eleccionOrdenador == posibilidades[1]){//Si el ordenador elige papel 
                        document.getElementById('historial').innerHTML += "<li> Has perdido </li>";
                    }else{
                        if(eleccionOrdenador == posibilidades[2]){ //Si el ordenador elige tijera
                            document.getElementById('historial').innerHTML += "<li> Has ganado " + nombreJugador + "</li>";
                        }else{
                            if(eleccionOrdenador == posibilidades[0]){ //Si el ordenador elige piedra
                                document.getElementById('historial').innerHTML += "<li> Has empatado</li>";
                }   }   }   }
    
                if(eleccion == 2){//Elección 2 = el usuario elige papel 
                    if(eleccionOrdenador == posibilidades[2]){//Si el ordenador elige tijera
                        document.getElementById('historial').innerHTML += "<li> Has perdido </li>";
                    }else{
                        if(eleccionOrdenador == posibilidades[0]){//Si el ordenador elige piedra
                            document.getElementById('historial').innerHTML += "<li> Has ganado " + nombreJugador + "</li>";
                            
                        }else{
                            if(eleccionOrdenador == posibilidades[1]){//papel 
                                document.getElementById('historial').innerHTML += "<li> Has empatado</li>";
                }   }   }   }
    
                if(eleccion == 3) {//Elección 3 = el usuario elige tijera 
                    if(eleccionOrdenador == posibilidades[1]){//Si el ordenador elige papel 
                        document.getElementById('historial').innerHTML += "<li> Has ganado " + nombreJugador + "</li>";
                    
                    }else{
                        if(eleccionOrdenador == posibilidades[0]){//Si el ordenador elige piedra
                            document.getElementById('historial').innerHTML += "<li> Has perdido </li>"; 
                        }else{
                            if(eleccionOrdenador == posibilidades[2]) {//Si el ordenador elige tijera
                                document.getElementById('historial').innerHTML += "<li> Has empatado</li>";
                }   }   }   } 
                    contador++;
                    document.getElementById('actual').innerHTML = contador;
            }
    }
} // se cierra la función que se activaba pinchando sobre el botón ¡YA!.

// Al clickar sobre el botón RESET, se activará el método addEventListener con esta función.
function resetear(){
    //Mantendremos el historial de resultados hasta el momento.
    document.getElementById('historial').innerHTML += "<li> Nueva Partida </li>";
    //Ponemos la imagen por defecto en la opción de la máquina.
    for (let i = 0; i < (imagenes.length); i++) {
        imagenes[i].src="img/defecto.png";
    }
    for (let i = 0; i < 3; i++) {
        imagenes[i].className='noSeleccionado';
    }
    contador = 0;
    eleccion = 0;
    //Dejamos a “0” las partidas introducidas y manteniendo el nombre del jugador.
    numeroPartidas = 0;
    document.getElementsByTagName('input')[1].value = 0;
    // Se pone a 0 los contadores de partidas “actual” y “total”.
    document.getElementById('actual').innerHTML=0;
    document.getElementById('total').innerHTML=0;
    //Activar los campos de texto
    document.getElementsByTagName('input')[0].disabled = false;
    document.getElementsByTagName('input')[1].disabled = false;
}

// Indicamos los eventos que se lanzarán al pulsar cada botón disponible para el usuario desde el HTML.
// Para el Botón ¡JUGAR!.
document.getElementsByTagName("button")[0].addEventListener("click", jugarpartida);
// Para el Botón ¡YA!.
document.getElementsByTagName("button")[1].addEventListener("click", inicioJuego);
// Para el Botón RESET.
document.getElementsByTagName("button")[2].addEventListener("click", resetear);
