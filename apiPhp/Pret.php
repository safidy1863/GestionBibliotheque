<?php
include("db_connection.php");
if ($_GET["action"] === 'listePret') {
    $listePret = $connection->query("SELECT pret.*,titre,nom FROM pret,livre,lecteur WHERE livre.numLivre = pret.numLivre AND lecteur.numLecteur = pret.numLecteur AND dateRetour IS NULL");
    $transformationJson = array();
    while ($row = $listePret->fetch_assoc()) {
        $transformationJson[] = $row;
    }
    echo json_encode($transformationJson);
} else if ($_GET["action"] === 'ajoutPret') {
    $pret = json_decode(file_get_contents("php://input"));
    if ($pret->numLivre !== "" || $pret->numLecteur !== '') {
        $ajoutPret = $connection->prepare("INSERT INTO pret (numLivre,numLecteur,datePret) VALUES (?,?,now())");
        $disponibliteLivre = $connection->prepare("UPDATE livre SET Disponible='Non' WHERE numLivre=?");
        $ajoutPret->bind_param("ss", $numLivre, $numLecteur);
        $disponibliteLivre->bind_param("s", $numLivre);
        $numLivre = $pret->numLivre;
        $numLecteur = $pret->numLecteur;
        $ajoutPret->execute();
        $disponibliteLivre->execute();
    }
} else if ($_GET["action"] === 'retourPret') {
    $numPret = json_decode(file_get_contents("php://input"));
    $retourPret = $connection->prepare("UPDATE pret SET dateRetour=now() WHERE nPret=?");
    $disponibliteLivre = $connection->prepare("UPDATE livre SET Disponible='Oui' WHERE numLivre=?");
    $retourPret->bind_param("s", $numero);
    $disponibliteLivre->bind_param("s", $numLivre);
    $numero = $numPret->numero;
    $numLivre = $numPret->numLivre;
    $retourPret->execute();
    $disponibliteLivre->execute();
} else if ($_GET["action"] === 'historique') {
    $listePret = $connection->query("SELECT nPret, p.numLivre,numLecteur,datePret,dateRetour,titre FROM pret p,livre l WHERE dateRetour IS NOT NULL AND p.numLivre=l.numLivre");
    $transformationJson = array();
    while ($row = $listePret->fetch_assoc()) {
        $transformationJson[] = $row;
    }
    echo json_encode($transformationJson);
} else if ($_GET["action"] === 'supprimerHistorique') {
    $suppr = json_decode(file_get_contents("php://input"));
    $supprHistorique = $connection->prepare("DELETE FROM pret WHERE nPret=?");
    $supprHistorique->bind_param("s", $num);
    $num = $suppr->numPret;

    $supprHistorique->execute();
}
