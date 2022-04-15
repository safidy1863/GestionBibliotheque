import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../pages/Empty";

const ConsultationIndisponible = () => {
  const listeLecteurs = useSelector((state) => state.lecteursReducer);
  const lecteurIndisponible = isEmpty(listeLecteurs)
    ? null
    : listeLecteurs.filter((indispo) => indispo.DISPONIBLITE === "Non");
  return (
    <div className="consultation">
      <h3>
        Lecteur a effectué plus de 3 livres
      </h3>
      <div className="liste">
        {isEmpty(lecteurIndisponible) ? (
          <h6>Aucun Lecteur indisponible</h6>
        ) : (
          lecteurIndisponible.map((indispo) => (
            <div>
              <h4>{indispo.nom}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsultationIndisponible;
