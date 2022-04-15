import axios from "axios";

export const LISTE_LIVRES = "LISTE_LIVRES";
export const AJOUT_LIVRE = "AJOUT_LIVRE";
export const MODIF_LIVRE = "MODIF_LIVRE";
export const SUPPR_LIVRE = "SUPPR_LIVRE";
export const POST_NUM_CONSULT = "POST_NUM_CONSULT";

export const livres = () => {
  return (dispatch) => {
    return axios
      .get("http://projetphp/Livre.php?action=listeLivre")
      .then((reponse) => {
        dispatch({ type: LISTE_LIVRES, payload: reponse.data });
      })
      .catch((err) => console.log(err));
  };
};

export const ajoutLivre = (livre) => {
  return (dispatch) => {
    return axios
      .post("http://projetphp/Livre.php?action=ajoutLivre", livre)
      .then((ajout) => {
        dispatch({ type: AJOUT_LIVRE, payload: livre });
      })
      .catch((err) => console.log(err));
  };
};

export const modifLivre = (livre) => {
  return (dispatch) => {
    return axios
      .post("http://projetphp/Livre.php?action=modifierLivre", livre)
      .then(() => {
        dispatch({ type: MODIF_LIVRE, payload: livre });
      })
      .catch((err) => console.log(err));
  };
};

export const supprLivre = (numLivre) => {
  return (dispatch) => {
    return axios
      .post("http://projetphp/Livre.php?action=supprimerLivre", numLivre)
      .then(() => {
        dispatch({ type: SUPPR_LIVRE, payload: numLivre });
      })
      .catch((err) => console.log(err));
  };
};
