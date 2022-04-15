import axios from "axios";

export const LISTE_PRETS = "LISTE_PRETS";
export const AJOUT_PRET = "AJOUT_PRET";
export const RETOUR_PRET = "RETOUR_PRET";

export const prets = () => {
  return (dispatch) => {
    return axios
      .get("http://projetphp/Pret.php?action=listePret")
      .then((reponse) => {
        dispatch({ type: LISTE_PRETS, payload: reponse.data });
      });
  };
};
export const ajoutPret = (pret) => {
  return (dispatch) => {
    return axios
      .post("http://projetphp/Pret.php?action=ajoutPret", pret)
      .then(() => {
        dispatch({ type: AJOUT_PRET, payload: pret });
      });
  };
};

export const retourPret = (numeroPret) => {
  return (dispatch) => {
    return axios
      .post("http://projetphp/Pret.php?action=retourPret", numeroPret)
      .then(() => {
        dispatch({ type: RETOUR_PRET, payload: numeroPret });
      });
  };
};
export const supprPret = (numeroPret) => {
  return (dispatch) => {
    return axios
      .post("http://projetphp/Pret.php?action=supprimerHistorique", numeroPret)
      .then(() => {
        dispatch({ type: RETOUR_PRET, payload: numeroPret });
      });
  };
};
