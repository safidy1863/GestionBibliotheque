import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../pages/Empty";

const ConsultationLivre = () => {
  const consulte = useSelector((state) => state.consultationReducer);
  console.log(consulte);
  return (
    <div className="consultation">
      {/* ************ */}
      {!isEmpty(consulte.Livre) && (
        <div className="livreConsulte">
          <h2>{consulte.Livre[0].numLivre}</h2>
          <h3>{consulte.Livre[0].titre}</h3>
          <h4>Auteur:{consulte.Livre[0].Auteur}</h4>
          <h4>Disponibilité: {consulte.Livre[0].Disponible}</h4>
          <h4>prêté: {consulte.Livre[0].nb} fois</h4>
          <h4>{consulte.Livre[0].date_edition}</h4>
        </div>
      )}
      {isEmpty(consulte.Lecteur) ? (
        <h6>Aucun Lecteur</h6>
      ) : (
        consulte.Lecteur.map((lecteur) => (
          <div key={lecteur.nPret}>
            <h3>{lecteur.nom}</h3>
            <h4>Prêté le: {lecteur.datePret}</h4>
            <h4>Rendre le : {lecteur.dateRetour}</h4>
          </div>
        ))
      )}
    </div>
  );
};

export default ConsultationLivre;
