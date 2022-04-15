import React, { useState } from "react";
import Navigation from "../components/Navigation";
import Pret from "../components/Pret";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle,faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "./Empty";
import { ajoutPret, prets, supprPret } from "../actions/prets.action";
import { livres } from "../actions/livres.action";
import { lecteurs } from "../actions/lecteurs.action";
import { apparitionOpacite } from "../actions/apparition.action";
import { historiquePret } from "../actions/historique.action";

const Prets = () => {
  //initialisation et affaectation
  const ListePrets = useSelector((prets) => prets.pretsReducer);
  const ListeLivre = useSelector((livres) => livres.livresReducer);
  const ListeLecteur = useSelector((lecteurs) => lecteurs.lecteursReducer);
  const Historique = useSelector((historique) => historique.historiqueReducer);
  const [apparitionAjout, setApparitionAjout] = useState(false);
  const [search,setSearch] = useState("");
  const apparition = useSelector((state) => state.apparitionReducer);
  const [cocherLecteur, setCocherLecteur] = useState("");
  const [cocherLivre, setCocherLivre] = useState("");
  const dispatch = useDispatch();

  const ajoutPrets = async (e) => {
    e.preventDefault();
    const addPret = {
      numLivre: cocherLivre,
      numLecteur: cocherLecteur,
    };

    await dispatch(ajoutPret(addPret));
    dispatch(prets());
    dispatch(livres());
    dispatch(lecteurs());
    setCocherLecteur("");
    setCocherLivre("");
    setApparitionAjout(false);
    dispatch(apparitionOpacite(false));
  };
  const supPret = async (num) => {
      const numeroPretSupprrimer = {
        numPret: num,
      };
      await dispatch(supprPret(numeroPretSupprrimer));
      dispatch(prets());
      dispatch(livres());
      dispatch(historiquePret());
      dispatch(lecteurs());
    };
  return (
    <div className="content">
      <Navigation />
      <div
        className="fondOpacite"
        style={{ display: apparition ? "block" : "none" }}
        onClick={() => {
          dispatch(apparitionOpacite(false));
          setApparitionAjout(false);
        }}
      ></div>
      <div className="ensemble Prets">
        <div className="left-Pret">
          <div className="listePret">
            {!isEmpty(ListePrets) &&
              ListePrets.filter((rech)=> rech.titre.includes(search)).sort((a, b) => a.nPret - b.nPret).map((pret) => (
                <Pret pret={pret} key={pret.nPret} />
              ))}
          </div>
          {apparitionAjout ? (
            <form onSubmit={(e) => ajoutPrets(e)} className="formAjoutPret">
              <div className="ensembleListe">
                <div className="listeLecteur">
                  <p>Lecteur prêteur</p>
                  {!isEmpty(ListeLecteur) &&
                    ListeLecteur.filter(
                      (dispo) =>
                        dispo.Amende === "Non" && dispo.DISPONIBLITE === "Oui"
                    ).map((liste) => (
                      <div key={liste.numLecteur} className="listeNumero">
                        <input
                          type="radio"
                          id={liste.numLecteur}
                          value={liste.numLecteur}
                          checked={liste.numLecteur === cocherLecteur}
                          onChange={(e) => setCocherLecteur(e.target.value)}
                        />
                        <label htmlFor={liste.numLecteur}>{liste.nom}</label>
                      </div>
                    ))}
                </div>

                <div className="listeLecteur">
                  <p>Livre à prêter</p>
                  {!isEmpty(ListeLivre) &&
                    ListeLivre.filter(
                      (dispo) => dispo.Disponible === "Oui"
                    ).map((liste) => (
                      <div key={liste.numLivre} className="listeNumero">
                        <input
                          type="radio"
                          id={liste.numLivre}
                          value={liste.numLivre}
                          checked={liste.numLivre === cocherLivre}
                          onChange={(e) => setCocherLivre(e.target.value)}
                        />
                        <label htmlFor={liste.numLivre}>{liste.titre}</label>
                      </div>
                    ))}
                </div>
              </div>
              <input
                type="submit"
                value="AJOUTER" className="ajouterPret"
                disabled={
                  cocherLivre === "" || cocherLecteur === "" ? true : false
                }
              />
            </form>
          ) : (
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="ajouter"
              onClick={() => {
                dispatch(apparitionOpacite(true));
                setApparitionAjout(true);
              }}
            />
          )}
        </div>

        <div className="right-Pret">
        <input type="text" placeholder="Recherche pret " onChange={e=> setSearch(e.target.value)}  className="searchBook"/>
          <div className="liste">
           
           
            {!isEmpty(Historique) &&
              Historique.filter(rech=> rech.titre.includes(search)).sort((a,b)=> b.datePret - a.datePret).map((historique) => (
                <div className="retour" key={historique.nPret}>
                  <h4>{historique.numLivre}</h4>
                  <h3>{historique.titre}</h3>
                  <h6>Date de prêt: {historique.datePret}</h6>
                  <h6>Date de retour: {historique.dateRetour}</h6>
                  <FontAwesomeIcon icon={faTrash} onClick={()=>supPret(historique.nPret)} className="suppPret" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prets;
