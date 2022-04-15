import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faBookReader,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { consultationLecteur } from "../actions/consultLecteur.action";
import {
  lecteurs,
  modifLecteur,
  supprLecteur,
} from "../actions/lecteurs.action";
import { apparitionOpacite } from "../actions/apparition.action";
import { apparitionConsultation } from "../actions/apparitionConsultation.action";
import { editerAction } from "../actions/edit.action";
import { prets } from "../actions/prets.action";
import { historiquePret } from "../actions/historique.action";

const Lecteur = ({ lecteur }) => {
  const editer = useSelector((state) => state.editReducer);
  const [nom, setNom] = useState(lecteur.nom);
  const dispatch = useDispatch();
  const suppressionLecteur = async () => {
    const numSupprLecteur = {
      numLecteur: lecteur.numLecteur,
    };
    await dispatch(supprLecteur(numSupprLecteur));
    dispatch(lecteurs());
  };

  const editLecteur = async (e) => {
    e.preventDefault();
    const lecteurModif = {
      numLecteur: lecteur.numLecteur,
      nom,
    };
    await dispatch(modifLecteur(lecteurModif));
    dispatch(lecteurs());
    dispatch(prets());
    dispatch(historiquePret());
    dispatch(editerAction(false, 0));
    dispatch(apparitionOpacite(false));
  };

  const consultationLecteurs = () => {
    dispatch(consultationLecteur(lecteur.numLecteur));
    dispatch(apparitionOpacite(true));
    dispatch(apparitionConsultation(true));
  };

  return (
    <div className="pret">
      <FontAwesomeIcon icon={faBookReader} />
      {editer[0] && editer[1] === lecteur.numLecteur ? (
        <form
          onSubmit={(e) => {
            editLecteur(e);
          }}
        >
          <input
            type="text"
            value={nom}
            required
            autoFocus
            onChange={(titre) => {
              setNom(titre.target.value);
            }}
          />
          <h4>{lecteur.numLecteur}</h4>
          <input type="submit" value="Enregistrer" />
        </form>
      ) : (
        <>
          <h4>{lecteur.numLecteur}</h4>
          <h3>{lecteur.nom}</h3>
          <div className="actions">
            <FontAwesomeIcon
              icon={faInfoCircle}
              onClick={consultationLecteurs}
            />
            <FontAwesomeIcon icon={faTrash} onClick={suppressionLecteur} />
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                dispatch(editerAction(true, lecteur.numLecteur));
                dispatch(apparitionOpacite(true));
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Lecteur;
