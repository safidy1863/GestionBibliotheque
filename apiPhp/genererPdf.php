<?php

require("fpdf184/fpdf.php");
include("db_connection.php");
class myPDF extends FPDF
{
    public $nom;

    function header()
    {
        $this->SetFont('Times', 'B', 12);
        $this->Cell(270, 10, 'LISTE DES PRETS EFFECTUEE PAR ' . $this->nom, 0, 0, 'C');
        $this->Ln(20);
    }
    function footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial', '', 8);
        $this->Cell(0, 10, 'Page ' . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
    function headerTable()
    {
        $this->SetFont('Times', 'B', 12);
        $this->Cell(30, 10, 'nPret', 1, 0, 'C');
        $this->Cell(55, 10, 'numLivre', 1, 0, 'C');
        $this->Cell(55, 10, 'numLecteur', 1, 0, 'C');
        $this->Cell(80, 10, 'datePret', 1, 0, 'C');
        $this->Cell(56, 10, 'dateRetour', 1, 0, 'C');
        $this->Ln();
    }
    function viewTable($connection)
    {
        $numero = $_GET['numero'];
        $stmt = $connection->query("SELECT * FROM pret WHERE numLecteur=$numero");
        while ($data = $stmt->fetch_assoc()) {
            $this->SetFont('Times', '', 12);
            $this->Cell(30, 10, $data['nPret'], 1, 0, 'C');
            $this->Cell(55, 10, $data['numLivre'], 1, 0, 'L');
            $this->Cell(55, 10, $data['numLecteur'], 1, 0, 'L');
            $this->Cell(80, 10, $data['datePret'], 1, 0, 'L');
            $this->Cell(56, 10, $data['dateRetour'], 1, 0, 'L');
            $this->Ln();
        }
    }
}
$numero = $_GET['numero'];
$lecteur = $connection->query("SELECT * FROM lecteur WHERE numLecteur=$numero");
$nom = $lecteur->fetch_assoc();
$pdf = new myPDF();
$pdf->nom = $nom["nom"];
$pdf->AliasNbPages();
$pdf->AddPage('L', 'A4', 0);
$pdf->headerTable();
$pdf->viewTable($connection);
$pdf->Output();
 