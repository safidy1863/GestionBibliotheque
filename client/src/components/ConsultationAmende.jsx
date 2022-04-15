import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../pages/Empty";

const ConsultationAmende = () => {
  const listeLecteurs = useSelector((state) => state.lecteursReducer);
  const lecteurpaieAmende = isEmpty(listeLecteurs)
    ? null
    : listeLecteurs.filter((amende) => amende.Amende === "Oui");
  return (
    <div className="consultation">
      <h3>
        Lecteur a effectué un prêt qui depasse une semaine de la date
        d'Aujourd'hui
      </h3>
      Amende: 5000 Ar
      <div className="liste">
        {isEmpty(lecteurpaieAmende) ? (
          <h6>Aucun Lecteur Paie une amende</h6>
        ) : (
          lecteurpaieAmende.map((amende) => (
            <div>
              <h4>{amende.nom}</h4>
              <p>A effectué le pret de l'{amende.numLivre} le {amende.datePret}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsultationAmende;
