<?php
include("db_connection.php");
if ($_GET["action"] === 'listeLecteur') {
    $listeLivre = $connection->query("SELECT lecteur.*,IF((DATEDIFF(NOW(),datePret))>7,'Oui','Non') AS Amende,IF((COUNT(pret.numLecteur))>=3,'Non','Oui') AS DISPONIBLITE,datePret, numLivre FROM lecteur,pret WHERE pret.numLecteur = lecteur.numLecteur AND dateRetour IS NULL GROUP BY pret.numLecteur UNION SELECT lecteur.*,'Non','Oui', 'NULL','NULL' FROM lecteur WHERE lecteur.numLecteur NOT IN(SELECT numLecteur FROM pret) UNION SELECT lecteur.*,'Non','Oui','NULL', 'NULL' FROM lecteur WHERE numLecteur IN(SELECT numLecteur FROM pret WHERE dateRetour IS NOT NULL)");
    $transformationJson = array();
    while ($row = $listeLivre->fetch_assoc()) {
        $transformationJson[] = $row;
    }
    echo json_encode($transformationJson);
} else if ($_GET["action"] === 'ajoutLecteur') {
    $lecteur = json_decode(file_get_contents("php://input"));
    $ajoutLecteur = $connection->prepare("INSERT INTO lecteur VALUES (?,?)");
    $ajoutLecteur->bind_param("ss", $num, $nom);

    $num = $lecteur->numLecteur;
    $nom = $lecteur->nom;

    $ajoutLecteur->execute();
} else if ($_GET["action"] === 'modifierLecteur') {
    $lecteurModifier = json_decode(file_get_contents("php://input"));
    $modification = $connection->prepare("UPDATE lecteur SET nom=? WHERE numLecteur=?");
    $modification->bind_param("ss", $nom, $numLecteur);
    $nom = $lecteurModifier->nom;
    $numLecteur = $lecteurModifier->numLecteur;

    $modification->execute();
} else if ($_GET["action"] === 'supprimerLecteur') {
    $suppr = json_decode(file_get_contents("php://input"));
    $supprLecteur = $connection->prepare("DELETE FROM lecteur WHERE numLecteur=?");
    $supprLecteur->bind_param("s", $num);
    $num = $suppr->numLecteur;

    $supprLecteur->execute();
} else if ($_GET["action"] === 'lecteurIndisponible') {
    $listeLivre = $connection->query("SELECT DISTINCT numLecteur FROM pret WHERE dateRetour IS NULL GROUP BY numLecteur HAVING COUNT(numLecteur) >=3");
    $transformationJson = array();
    while ($row = $listeLivre->fetch_assoc()) {
        $transformationJson[] = $row;
    }
    echo json_encode($transformationJson);
} else if ($_GET["action"] === 'lecteurAmende') {
    $listeLivre = $connection->query("SELECT l.numLecteur,nom, DATEDIFF(now(), datePret) AS nb FROM pret p,lecteur l  WHERE l.numLecteur=p.numLecteur AND  dateRetour IS null GROUP BY p.numLecteur HAVING nb>=7;");
    $transformationJson = array();
    while ($row = $listeLivre->fetch_assoc()) {
        $transformationJson[] = $row;
    }
    echo json_encode($transformationJson);
}
