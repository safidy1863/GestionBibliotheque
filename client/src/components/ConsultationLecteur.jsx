import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../pages/Empty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const ConsultationLecteur = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [appartionDate, setApparitionDate] = useState(false);
  const consultLecteur = useSelector(
    (state) => state.consultationLecteurReducer
  );
  const impression = () => {
    window.location.href = `http://projetphp/genererPdf.php?numero="${consultLecteur.Lecteur[0].numLecteur}"`;
  };
  return (
    <div className="consultation">
      {!isEmpty(consultLecteur.Lecteur) && (
        <div className="lecteurConsulte">
          <h3>Nom: {consultLecteur.Lecteur[0].nom}</h3>
          <h6>Numéro: {consultLecteur.Lecteur[0].numLecteur}</h6>
          <h6>Amende: {consultLecteur.Lecteur[0].Amende}</h6>
          <h6>Disponiblite: {consultLecteur.Lecteur[0].DISPONIBLITE}</h6>
        </div>
      )}
      <div className="pretEffectue">
        {!isEmpty(consultLecteur.PretEffectue) ? (
          <div>
            {!appartionDate ? (
              <button onClick={() => setApparitionDate(true)}>
                Recherche entre 2 dates
              </button>
            ) : (
              <div>
                <input
                  type="date"
                  onChange={(e) => {
                    setDate1(e.target.value);
                  }}
                />
                <input
                  type="date"
                  onChange={(e) => {
                    setDate2(e.target.value);
                  }}
                />
                <button onClick={() => setApparitionDate(false)}>
                  Annuler
                </button>
              </div>
            )}
            {date1 !== "" && date2 !== "" && date1 > date2 ? (
              <p>Date 2 doit être supérieur que la date 1 </p>
            ) : null}
            {appartionDate ? (
              <div>
                {date1 !== "" || date2 !== "" ? (
                  <div>
                    {consultLecteur.PretEffectue.filter(
                      (pret) => pret.datePret >= date1 && pret.datePret <= date2
                    ).length === 0 ? (
                      <h6>Aucun pret entre ces deux dates</h6>
                    ) : (
                      <div>
                        {consultLecteur.PretEffectue.filter(
                          (pret) =>
                            pret.datePret >= date1 && pret.datePret <= date2
                        ).map((pretEffectue) => (
                          <div key={pretEffectue.nPret}>
                            <h3>{pretEffectue.titre}</h3>
                            <h4>{pretEffectue.nPret}</h4>
                            <h4>Prêté le : {pretEffectue.datePret}</h4>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <h6>Veuillez entrer les deux dates svp!</h6>
                )}
              </div>
            ) : (
              <div>
                {consultLecteur.PretEffectue.map((pretEffectue) => (
                  <div key={pretEffectue.nPret}>
                    <h3>{pretEffectue.titre}</h3>
                    <h4>{pretEffectue.nPret}</h4>
                    <h4>Prêté le : {pretEffectue.datePret}</h4>
                  </div>
                ))}
                <button onClick={impression} className="pdf">
                  Version PDF de tout son pret:{" "}
                  <FontAwesomeIcon icon={faPrint} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <h6>Aucun pret effectue sur ce lecteur</h6>
        )}
      </div>
    </div>
  );
};

export default ConsultationLecteur;
