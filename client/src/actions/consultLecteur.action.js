import axios from "axios";
export const CONSULTATION_LECTEUR = "CONSULTATION_LECTEUR";


export const consultationLecteur = (num) => {
  return (dispatch) => {
    return axios
      .get(`http://projetphp/consultationLecteur.php?numero=${num}`)
      .then((reponse) => {
        dispatch({ type: CONSULTATION_LECTEUR, payload: reponse.data });
      })
      .catch((err) => console.log(err));
  };
};