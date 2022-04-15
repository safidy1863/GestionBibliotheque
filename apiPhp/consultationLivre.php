<?php
include("db_connection.php");
$numLivre = $_GET["numero"];
$livreConsult = $connection->query("SELECT l.*,count(p.numLivre) AS nb FROM livre l,pret p WHERE p.numLivre=l.numLivre AND l.numLivre='$numLivre' GROUP BY l.numLivre UNION SELECT *,0 FROM livre WHERE numLivre='$numLivre' and numLivre NOT IN(SELECT numLivre FROM pret)");
$listeLecteur = $connection->query("SELECT nPret,p.numLecteur,lect.nom,datePret,dateRetour FROM livre l,pret p,lecteur lect WHERE p.numLivre=l.numLivre AND  p.numLecteur=lect.numLecteur AND l.numLivre='$numLivre'");
$transformationJson = array();
$lecteurJson = array();

while ($row = $livreConsult->fetch_assoc()) {
    $transformationJson[] = $row;
}
while ($lecteur = $listeLecteur->fetch_assoc()) {
    $lecteurJson[] = $lecteur;
}

echo json_encode(["Livre" => $transformationJson, "Lecteur" => $lecteurJson]);
