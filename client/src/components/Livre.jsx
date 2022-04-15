import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faTrash,
  faPen,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { livres, modifLivre, supprLivre } from "../actions/livres.action";
import { consultation } from "../actions/consultLivre.action";
import { apparitionOpacite } from "../actions/apparition.action";
import { apparitionConsultation } from "../actions/apparitionConsultation.action";
import { prets } from "../actions/prets.action";
import { historiquePret } from "../actions/historique.action";
import { editerAction } from "../actions/edit.action";

const Livre = ({ livre }) => {
  const editer = useSelector((state) => state.editReducer);
  const [titre, setNouveauTitre] = useState(livre.titre);
  const [Auteur, setNouveauAuteur] = useState(livre.Auteur);
  const dispatch = useDispatch();
  const supprimerLivre = async () => {
    const livreSuppr = {
      numLivre: livre.numLivre,
    };
    await dispatch(supprLivre(livreSuppr));
    dispatch(livres());
    dispatch(prets());
    dispatch(historiquePret());
  };

  const editLivre = async (e) => {
    e.preventDefault();
    const livreModif = {
      numLivre: livre.numLivre,
      titre,
      Auteur,
    };
    await dispatch(modifLivre(livreModif));
    dispatch(livres());
    dispatch(prets());
    dispatch(historiquePret());
    dispatch(apparitionOpacite(false));
    dispatch(editerAction(false,0));
  };

  const livreConsulte = () => {
    dispatch(consultation(livre.numLivre));
    dispatch(apparitionOpacite(true));
    dispatch(apparitionConsultation(true));
  };

  console.log(editer);
  return (
    <div className="pret">
      <FontAwesomeIcon icon={faBook} />
      {(editer[0] && editer[1]===livre.numLivre) ? (
        <form
          onSubmit={(e) => {
            editLivre(e);
          }}
        >
          <input
            type="text"
            value={titre}
            required
            autoFocus
            onChange={(titre) => {
              setNouveauTitre(titre.target.value);
            }}
          />
          <h4>{livre.numLivre}</h4>
          <input
            type="text"
            value={Auteur}
            required
            onChange={(auteur) => {
              setNouveauAuteur(auteur.target.value);
            }}
          />
          <input type="submit" value="Enregistrer" />
        </form>
      ) : (
        <>
          <h4>{livre.numLivre}</h4>
          <h3>{livre.titre}</h3>
          <h5>Auteur:{livre.Auteur}</h5>
          <h5>Disponible:{livre.Disponible}</h5>
          <div className="actions">
            <FontAwesomeIcon icon={faInfoCircle} onClick={livreConsulte} />
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                dispatch(editerAction(true, livre.numLivre));
                dispatch(apparitionOpacite(true));
              }}
            />
            <FontAwesomeIcon icon={faTrash} onClick={supprimerLivre} />
          </div>
        </>
      )}
    </div>
  );
};

export default Livre;
