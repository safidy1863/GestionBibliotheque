import { faPlusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apparitionOpacite } from "../actions/apparition.action";
import { apparitionConsultation } from "../actions/apparitionConsultation.action";
import { editerAction } from "../actions/edit.action";
import { ajoutLecteur, lecteurs } from "../actions/lecteurs.action";
import ConsultationLecteur from "../components/ConsultationLecteur";
import Lecteur from "../components/Lecteur";
import Navigation from "../components/Navigation";
import { isEmpty } from "./Empty";

const Lecteurs = () => {
  const listeLecteur = useSelector((state) => state.lecteursReducer);
  const apparition = useSelector((state) => state.apparitionReducer);
  const [apparitionAjout, setApparitionAjout] = useState(false);
  const apparitionConsultations = useSelector(
    (state) => state.apparitionConsultationReducer
  );
  const [search, setSearch] = useState("");
  const [nom, setNom] = useState("");
  const dispatch = useDispatch();
  let testNombre = new RegExp("[0-9]");
  let trouveNom = testNombre.test(nom);

  const ajoutLecteurs = async (e) => {
    e.preventDefault();
    const nouveauLecteur = {
      numLecteur: "Lecteur_" + (listeLecteur.length + 1 )+"/"+((Math.round(Math.random() * 10) + listeLecteur.length)),
      nom,
    };
    await dispatch(ajoutLecteur(nouveauLecteur));
    dispatch(lecteurs());
    dispatch(apparitionOpacite(false));
  };
  console.log(apparitionConsultation(false));
  return (
    <div className="content">
      <Navigation />
      <div
        className="fondOpacite"
        style={{ display: apparition ? "block" : "none" }}
        onClick={() => {
          dispatch(apparitionOpacite(false));
          setApparitionAjout(false);
          dispatch(apparitionConsultation(false));
          dispatch(editerAction(false,0));
        }}
      ></div>
      <div className="ensemble Livres">
        <div className="leftLivre">
          <input
            type="text"
            placeholder="Search Lecteur"
            className="searchBook"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="listeLivre">
            {listeLecteur.length === 0 ? (
              <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            ) : (
              !isEmpty(listeLecteur) &&
              listeLecteur
                .filter((liste) => liste.nom.includes(search))
                .sort((a, b) => a.numLecteur - b.numLecteur)
                .map((lecteur) => (
                  <Lecteur lecteur={lecteur} key={lecteur.numLecteur} />
                ))
            )}
            {apparitionAjout ? (
              <form
                className="ajoutLivre"
                onSubmit={(e) => {
                  ajoutLecteurs(e);
                  setApparitionAjout(false);
                }}
              >
                <input
                  type="text"
                  required
                  placeholder="Nom"
                  onChange={(nom) => setNom(nom.target.value)}
                />
                {trouveNom ? (<span>Le nom ne doit contenir que de nombre</span>) : null}
                <input type="submit" value="Envoyer" disabled={trouveNom ? true : false}/>
              </form>
            ) : (
              <FontAwesomeIcon className="ajouter"
                icon={faPlusCircle}
                onClick={() => {
                  setApparitionAjout(true);
                  dispatch(apparitionOpacite(true));
                }}
              />
            )}
          </div>
        </div>

        {apparitionConsultations ? <ConsultationLecteur /> : null}
      </div>
    </div>
  );
};

export default Lecteurs;
