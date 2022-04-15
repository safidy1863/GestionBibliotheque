import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Livre from "../components/Livre";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ConsultationLivre from "../components/ConsultationLivre";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Empty";
import { ajoutLivre, livres } from "../actions/livres.action";
import { apparitionOpacite } from "../actions/apparition.action";
import { apparitionConsultation } from "../actions/apparitionConsultation.action";
import { editerAction } from "../actions/edit.action";

const Livres = () => {
  const listeLivre = useSelector((state) => state.livresReducer);
  const apparitionConsultations = useSelector(
    (state) => state.apparitionConsultationReducer
  );
  const apparition = useSelector((state) => state.apparitionReducer);
  const [apparitionAjout, setApparitionAjout] = useState(false);
  const [search, setSearch] = useState("");
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [dateEdition, setDateEdition] = useState("");
  const dispatch = useDispatch();
  let testNombre = new RegExp("[0-9]");
  let trouveTitre = testNombre.test(titre);
  let trouveAuteur = testNombre.test(auteur);

  const ajoutLivres = async (e) => {
    e.preventDefault();
    const nouveauLivre = {
      numLivre:
        "Ouvrage_" +
        (listeLivre.length +
          1) +"/"+(
         ( Math.round(Math.random() * 10) + listeLivre.length)),
      titre,
      auteur,
      dateEdition,
      disponible: "Oui",
    };
    await dispatch(ajoutLivre(nouveauLivre));
    dispatch(livres());
    dispatch(editerAction(false,0));
    dispatch(apparitionOpacite(false));
  };
  console.log(listeLivre);
  return (
    <div className="content">
      <Navigation />
      <div
        className="fondOpacite"
        style={{ display: apparition ? "block" : "none" }}
        onClick={() => {
          dispatch(apparitionOpacite(false));
          dispatch(apparitionConsultation(false));
          dispatch(editerAction(false,0));
          setApparitionAjout(false);
        }}
      ></div>
      <div className="ensemble Livres">
        <div className="leftLivre">
          <input
            type="text"
            placeholder="Search Book"
            className="searchBook"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="listeLivre">
            {listeLivre.length === 0 ? (
              <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            ) : (
              !isEmpty(listeLivre) &&
              listeLivre
                .filter(
                  (liste) =>
                    liste.titre.includes(search) ||
                    liste.Auteur.includes(search)
                )
                .sort((a, b) => a.numLivre - b.numLivre)
                .map((livre) => <Livre livre={livre} key={livre.numLivre} />)
            )}
            {apparitionAjout ? (
              <form
                className="ajoutLivre"
                onSubmit={(e) => {
                  ajoutLivres(e);
                  setApparitionAjout(false);
                }}
              >
                <input
                  type="text"
                  placeholder="Titre"
                  required
                  onChange={(titre) => setTitre(titre.target.value)}
                />
                <input
                  type="text"
                  placeholder="Auteur"
                  required
                  onChange={(auteur) => setAuteur(auteur.target.value)}
                />
                <label>Date d'édition:</label>
                <input
                  type="date"
                  required
                  onChange={(date) => setDateEdition(date.target.value)}
                />
                {trouveAuteur || trouveTitre ? (
                  <span>Le titre et le nom ne contient que de lettre</span>
                ) : null}
                ;
                <input
                  type="submit"
                  value="Envoyer"
                  disabled={trouveAuteur || trouveTitre ? true : false}
                />
              </form>
            ) : (
              <FontAwesomeIcon
                className="ajouter"
                icon={faPlusCircle}
                onClick={() => {
                  dispatch(apparitionOpacite(true));
                  setApparitionAjout(true);
                }}
              />
            )}
          </div>
        </div>
        {apparitionConsultations ? <ConsultationLivre /> : null}
      </div>
    </div>
  );
};

export default Livres;
