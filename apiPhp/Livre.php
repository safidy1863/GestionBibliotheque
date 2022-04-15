<?php
include("db_connection.php");
if ($_GET["action"] === 'listeLivre') {
    /******************************* */
    $listeLivre = $connection->query("SELECT l.*,count(p.numLivre) AS nb FROM livre l,pret p WHERE p.numLivre=l.numLivre GROUP BY l.numLivre UNION SELECT *,0 FROM livre WHERE numLivre NOT IN(SELECT numLivre FROM pret)");
    $transformationJson = array();
    while ($row = $listeLivre->fetch_assoc()) {
        $transformationJson[] = $row;
    }
    echo json_encode($transformationJson);
} else if ($_GET["action"] === 'ajoutLivre') {
    $livre = json_decode(file_get_contents("php://input"));
    $ajoutLivre = $connection->prepare("INSERT INTO livre VALUES (?,?,?,?,?)");
    $ajoutLivre->bind_param("sssss", $num, $Titre, $Auteur, $date_Edition, $Disponible);

    $num = $livre->numLivre;
    $Titre = $livre->titre;
    $Auteur = $livre->auteur;
    $date_Edition = $livre->dateEdition;
    $Disponible = $livre->disponible;

    $ajoutLivre->execute();
} else if ($_GET["action"] === 'modifierLivre') {
    $livreModifier = json_decode(file_get_contents("php://input"));
    $modification = $connection->prepare("UPDATE livre SET titre=?, Auteur=? WHERE numLivre=?");
    $modification->bind_param("sss", $titre, $auteur, $numLivre);
    $titre = $livreModifier->titre;
    $auteur = $livreModifier->Auteur;
    $numLivre = $livreModifier->numLivre;

    $modification->execute();
} else if ($_GET["action"] === 'supprimerLivre') {
    $suppr = json_decode(file_get_contents("php://input"));
    $supprLivre = $connection->prepare("DELETE FROM livre WHERE numLivre=?");
    $supprPret = $connection->prepare("DELETE FROM pret WHERE numLivre=?");
    $supprLivre->bind_param("s", $num);
    $supprPret->bind_param("s", $num);
    $num = $suppr->numLivre;

    $supprLivre->execute();
    $supprPret->execute();
}
