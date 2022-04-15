import axios  from "axios";
export const LECTEUR_INDISPONIBLE = "LECTEUR_INDISPONIBLE";

export const lecteurIndisponible = () => {
    return (dispatch) => {
      return axios
      .get("http://projetphp/Lecteur.php?action=lecteurIndisponible")
      .then((reponse) => {
        dispatch({ type: LECTEUR_INDISPONIBLE, payload: reponse.data });
      });
  }};