<?php
include("db_connection.php");
$numLecteur = $_GET["numero"];
$lecteurConsult = $connection->query("SELECT lecteur.*,IF((DATEDIFF(NOW(),datePret))>7,'Oui','Non') AS Amende,IF((COUNT(pret.numLecteur))>=3,'Non','Oui') AS DISPONIBLITE,datePret, numLivre FROM lecteur,pret WHERE pret.numLecteur = lecteur.numLecteur AND dateRetour IS NULL AND lecteur.numLecteur='$numLecteur' GROUP BY pret.numLecteur UNION SELECT lecteur.*,'Non','Oui', 'NULL','NULL' FROM lecteur WHERE lecteur.numLecteur NOT IN(SELECT numLecteur FROM pret) AND lecteur.numLecteur='$numLecteur' UNION SELECT lecteur.*,'Non','Oui','NULL', 'NULL' FROM lecteur WHERE numLecteur IN(SELECT numLecteur FROM pret WHERE dateRetour IS NOT NULL)");
$listePretConsult = $connection->query("SELECT nPret,p.numLivre,numLecteur, datePret,dateRetour,l.titre FROM pret p,livre l WHERE l.numLivre=p.numLivre and numLecteur='$numLecteur'");
$transformationJson = array();
$pretJson = array();

while ($row = $lecteurConsult->fetch_assoc()) {
    $transformationJson[] = $row;
}
while ($pret = $listePretConsult->fetch_assoc()) {
    $pretJson[] = $pret;
}

echo json_encode(["Lecteur" => $transformationJson, "PretEffectue" => $pretJson]);
