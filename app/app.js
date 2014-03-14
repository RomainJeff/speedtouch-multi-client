/**
 * SpeedTouch
 * @author Romain Quilliot <romain.addweb@gmail.com>
 * Tous droits réservés 2013
 */

var socket = io.connect('speedtouch-server.herokuapp.com:80');
var user = false;

listDimension();

/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/

/**
 SYSTEM ROUTING
 **/
var page = location.hash;

if (!page) {
    page = '#home';
}

changePage(page);

if (page != '#home' && user == false) {
    changePage('#home');
}


/**
 * LOCAL STORAGE
 */
if (localStorage.getItem('email')) {
    $('#email').val(localStorage.getItem('email'));
}
if (localStorage.getItem('pseudo')) {
    $('#pseudo').val(localStorage.getItem('pseudo'));
}

/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/

/**
 * CLIENT INTERACTIONS
 */

$('#home').on('click', 'button', function(e) {
    e.preventDefault();
    var email = $('#email').val();
    var pseudo = $('#pseudo').val();

    localStorage.setItem('email', email);
    localStorage.setItem('pseudo', pseudo);

    if (email != '' && pseudo != '') {
        socket.emit('login', {email: email, pseudo: pseudo});
    } else {
        alert('Pseudo ou email invalide');
    }
});

$('#switch').on('click', '#start', function(e) {
    e.preventDefault();

    socket.emit('startPartie', user);
});

document.getElementById('clickArea').addEventListener("touchstart", function(e) {
    e.preventDefault();

    socket.emit('click', user);
});

/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/

/**
 * NODEJS EVENTS
 */

// Connexion acceptée
socket.on('loginAccepted', function(pseudo) {
    user = pseudo;
    if ($('#monScore').length > 0) {
        $('#monScore').remove();
    }
    $('#clickArea').prepend('<h1 id="monScore">0</h1>');
    clickAreaDimension();
    changePage('#switch');
});

// Un nouveau owner
socket.on('newOwner', function(owner) {
    if (user == owner) {
        $('#switch').append('<button id="start">Commencer</button>');
    }
});

//Connexion refusée
socket.on('loginRefused', function(message) {
    $('#error p').html(message);
    changePage('#error');
});

// Si le serveur nous envoie les joueurs qui viennent de rejoindre
socket.on('newUser', function(id) {
    if (user != false && user != id.pseudo) {
        addUser('switch', id);
        addUser('play', id);
    }
});

// Si le debut est accepté
socket.on('startAccepted', function(){
    if (user != false) {
        changePage('#play');
    }
});

// On recupere les scores
socket.on('updateScore', function(result) {
    if (result.id != user) {
        $('#play .'+ result.id +' span').html(result.score);
    } else {
        $('#play #monScore').html(result.score);
    }
    $('#clickArea').attr('data-id', user);
});

// Si le buzzer sonne
socket.on('buzzer', function() {
    if (user != false) {
        $('#clickArea').css({
            background: 'red'
        });
    }
});

// Le gagnant
socket.on('winner', function(id){
    if (user != false) {
        $('#clickArea').css({
            background: '#f1c40f'
        });
        socket.emit('getScore');
        $('.'+ id).css({
            background: '#f1c40f'
        });
        setTimeout(function(){
            $('.'+ id).css({
                background: '#ededed'
            });
        }, 250);
    }
});

// La fin
socket.on('end', function(id){
    if (user != false) {
        $('#end h1').html(id + ' gagne la partie !');
        changePage('#end');
    }
});

//Erreur pendant le jeu
socket.on('errorConnected', function(message) {
    if (user != false) {
        $('#error p').html(message);
        changePage('#error');
    }
});

// Si l'utilisateur est deco on supprime son avatar
socket.on('disconnect', function(id){
    if (user != false) {
        $('.'+ id).remove();
    }
});

/***************************************************************************************/
/***************************************************************************************/
/***************************************************************************************/

/**
 * FONCTIONS
 */

function changePage(p)
{
    $(page).fadeOut(400, 'swing', function() {
        page = p;
        location.hash = page;
        $(page).fadeIn();
    });
}

function addUser(id, user)
{
    $('#'+ id +' .list').append(
        '<div class="'+ user.pseudo +'">'+
            '<img src="http://gravatar.com/avatar/'+ user.avatar +'?s=59">'+
            '<b>'+ user.pseudo +'</b>'+
            '<span>'+ user.score +'</span>'+
            '<div class="clearfix"></div>'+
        '</div>'
    );
}

function clickAreaDimension()
{
    var height = $(window).height() / 2;
    var headerHeight = $('header').height();
    var clickHeight = $('#clickArea').height();

    var height = height - headerHeight - clickHeight;

    // On dimensionne les zones de clicks
    $('#clickArea').css({
        paddingTop: height/4,
        paddingBottom: height/4
    });
}

function listDimension()
{
    var height = $(window).height() / 2;

    // On dimensionne les zones de clicks
    $('#play .list').css({
        height: height
    });
}
