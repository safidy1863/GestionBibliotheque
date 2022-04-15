import axios from "axios";

export const LISTE_LECTEURS = "LISTE_LECTEURS";
export const AJOUT_LECTEUR = "AJOUT_LECTEUR";
export const MODIF_LECTEUR = "MODIF_LECTEUR";
export const SUPPR_LECTEUR = "SUPPR_LECTEUR";

export const lecteurs = () => {
  return (dispatch) => {
    return axios
      .get("http://projetphp/Lecteur.php?action=listeLecteur")
      .then((reponse) => {
        dispatch({ type: LISTE_LECTEURS, payload: reponse.data });
      });
  };
};
export const ajoutLecteur = (lecteur) => {
  return (dispatch) => {
    return axios
      .post("http://projetphp/Lecteur.php?action=ajoutLecteur", lecteur)
      .then(() => {
        dispatch({ type: AJOUT_LECTEUR, payload: lecteur });
      });
  };
};
export const modifLecteur = (lecteur) => {
  return (dispatch) => {
    return axios
      .post("http://projetphp/Lecteur.php?action=modifierLecteur", lecteur)
      .then(() => {
        dispatch({ type: MODIF_LECTEUR, payload: lecteur });
      })
      .catch((err) => console.log(err));
  };
};

export const supprLecteur = (numLecteur) => {
  return (dispatch) => {
    return axios
      .post("http://projetphp/Lecteur.php?action=supprimerLecteur", numLecteur)
      .then(() => {
        dispatch({ type: SUPPR_LECTEUR, payload: numLecteur });
      })
      .catch((err) => console.log(err));
  };
};
