import axios  from "axios";
export const LECTEUR_AMENDE = "LECTEUR_AMENDE";

export const lecteurPayeAmende = () => {
    return (dispatch) => {
      return axios
      .get("http://projetphp/Lecteur.php?action=lecteurAmende")
      .then((reponse) => {
        dispatch({ type: LECTEUR_AMENDE, payload: reponse.data });
      });
  }};