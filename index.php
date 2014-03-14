<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <title>SpeedTouch</title>

    <link rel="stylesheet" type="text/css" href="resources/styles/app.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:light|Damion' rel='stylesheet' type='text/css'>

    <link rel="apple-touch-icon-precomposed" href="resources/icon.png" />
    <link rel="icon" href="resources/icon.png">
</head>

<body>

    <header>
        <span onclick="window.location.href = '../../index.html';">SpeedTouch</span>
    </header>

    <!-- PAGE CONNEXION -->
    <section id="home">
        <h1>Connexion</h1>
        <hr>

        <label>Pseudo</label>
        <input type="text" id="pseudo"><br>

        <label>Email</label>
        <input type="email" id="email"><br>

        <button>Entrer</button>
    </section>
    <!-- FIN PAGE CONNEXION -->


    <!-- PAGE SWITCH -->
    <section id="switch">
        <div class="s">
            <h1>Joueurs</h1>
        </div>
        <div class="list">

        </div><br>
    </section>
    <!-- FIN PAGE SWITCH -->


    <!-- PAGE JOUER -->
    <section id="play">
        <div class="list">

        </div>

        <div id="clickArea"><h1 id="monCompte"></h1></div>
    </section>
    <!-- FIN PAGE JOUER -->


    <!-- PAGE FIN -->
    <section id="end">
        <h1></h1>
        <button onclick="window.location.href = /;">Rejouer</button>
    </section>
    <!-- PAGE FIN -->


    <!-- PAGE ERREUR -->
    <section id="error">
        <p>
            Une erreur est survenue
        </p>
        <button onclick="window.location.href = '/';">Retour</button>
    </section>
    <!-- FIN PAGE ERREUR -->


    <script type="text/javascript" src="app/jquery.js"></script>
    <script type="text/javascript" src="app/socket.io.js"></script>
    <script type="text/javascript" src="app/app.js"></script>
</body>

</html>
