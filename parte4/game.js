/** 
 * Juego creado por: Alumnos de Grado Superior de DAM
 * Licencia: GPL
*/

/**
 * Inicialización de variables
 */
var isPlaying = false;
var isGame = false;
var selectedPlayer;
var players = ['red', 'pink', 'green', 'blue'];

$(document).ready(function() {


    $('#lobby').hide();
    $('#selectPlayer').hide();

    $('.buttonHome').click(function() {
        $('#selectPlayer').show();
    })

    function hideHome() {
        $('body').removeClass('home');
        $('body').addClass('lobby');
        $('#homescreen').hide();
        $('#lobby').show();
        configureGame();
    }

    /** Empieza a sonar la música del juego */
    $('.playmusic').on('click', function() {
        if(isPlaying) {
            isPlaying = false;
            $('#backgroundmusic').get(0).pause();
        } else {
            isPlaying = true;
            $('#backgroundmusic').get(0).play();
        }
    });

    /**
     * PARTE 2:
     * Creamos la escena de vuelo
     */
    // Botón volver de la escena

    $('.buttonBack').on('click', function() {
        $('body').removeClass('lobby');
        $('body').addClass('home');
        $('#homescreen').show();
        $('#lobby').hide();
        isGame = false;
        // Paramos la animación del vuelo
        $('body').stop();
        $('body').attr("style","background-image:'../assets/backgrounds/loading.jpg'");
    });

    /**
     * Configuración principal del juego
     */
    function configureGame() {
        isGame = true;
        animateSpace();
        addCharacters();
    }
    function animateSpace() {
        $("body").animate({backgroundPositionY:"500000px"}, 360000);
    }
   

    /**
     * PARTE 3:
     * Añadir personajes de la tripulación
     */

     function addCharacters() {
         // Borramos si existían anteriores
        $('#characters').empty();
        // Iteramos todos los players y pintamos los jugadores, usando las
        // imagenes de assets que corresponden con el jugador "red.png"
         players.forEach(function(character, index){
            $('#characters').append('<img src="../assets/characters/'+character+'.png" id="'+character+'" width="50" alt="'+character+'">');
         })
         // Una vez puesto los players, animamos a cada player
         animateCharacters();
     }

     function animateCharacters() {
        players.forEach(function(character, index){
            // No necesitamos quitarlo del array, sino controlar que no es el seleccionado
            // por el jugador
            if(selectedPlayer != character)
                animateDivOnce(character);
        });
     }

     function animateDivOnce(div) {
        // 62% maximo y 40% min, para que se ajuste al espacio de
        // la nave
        // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/random
        var nh = Math.floor(Math.random() * (62 - 40)) + 40;
        var nw = Math.floor(Math.random() * (62 - 40)) + 40;
        $('#'+div).animate({ top: ''+nh+'%', left: ''+nw+'%' }, 1000, function(){
            if(isGame) {
                // Significa que vuelvo a llamar a la función y sigo
                // ejecutando la animación, hasta que isGame sea false
                animateDivOnce(div);  
            }
        });
     }

    /**
     * PARTE 4:
     * Mover con teclado
     */
    $('.selectChar').click(function(){
        $('#selectPlayer').hide();
        players = ['red', 'pink', 'green', 'blue'];
        selectedPlayer = $(this).attr('alt');
      /*  players.forEach(function(val, index){
            if(val === selectedPlayer) {
                // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/splice
                alert(selectedPlayer)
                players.splice(index, 1);
            }
        })
        */
        hideHome();
    })

    /**
     * Movimiento del jugador
     */
    $(document).keydown(function(e){
        console.log(e.which);
        function menearPatas(){
            var cont = 1;
            var x = setInterval(function(){
                $('#'+selectedPlayer).attr("src", "../assets/Walk/walkcolor"+ cont+ ".png" ); 
                cont++;
                if(cont == 12){
                    clearInterval(x);
                }
            }, 33);
        }
        function menearPatasVoltereta(){
            var cont = 1;
            var x = setInterval(function(){
                $('#'+selectedPlayer).css({'transform' : 'rotateZ(' + (cont * 30) + 'deg)'});
                $('#'+selectedPlayer).attr("src", "../assets/Walk/walkcolor"+ cont+ ".png" ); 
                cont++;
                if(cont == 13){
                    clearInterval(x);
                }
            }, 33);
        }

        function menearPatas2(a){
            var cont = 1;
            var x = setInterval(function(){
               
                $('#'+selectedPlayer).css({'transform' : 'rotateY(180deg)'});

                
                $('#'+selectedPlayer).attr("src", "../assets/Walk/walkcolor"+ cont+ ".png" ); 
                cont++;
                if(cont == 12){
                    clearInterval(x);
                }
            }, 33);
        }
        function menearPatas3(a){
            var cont = 1;
            var x = setInterval(function(){
               
                $('#'+selectedPlayer).css({'transform' : 'rotateY(0deg)'});

                
                $('#'+selectedPlayer).attr("src", "../assets/Walk/walkcolor"+ cont+ ".png" ); 
                cont++;
                if(cont == 12){
                    clearInterval(x);
                }
            }, 33);
        }


        
        switch (e.which){
        case 37:    //left arrow key
            // Aplicando al css
            $("#"+selectedPlayer).css({
                left: "-=25"
            })
            menearPatas2();

            break;
        case 38:    //up arrow key
            // Aplicando animación
            // https://api.jquery.com/finish/
            // usamos el finish() para eliminar cualquier animación pendiente anterior
            // se evita que desaparezca el player
            $("#"+selectedPlayer).finish().animate({
                top: "-=25"

            });
            menearPatas();
            break;
        case 39:    //right arrow key
            $("#"+selectedPlayer).finish().animate({
                left: "+=25"
            });
            menearPatas3();
            break;
        case 40:    //bottom arrow key
            $("#"+selectedPlayer).finish().animate({
                top: "+=25"
            });
            menearPatas();
            break;
        case 32:
            
            menearPatasVoltereta();
            break;

        }

        e.preventDefault();
    });
}
);