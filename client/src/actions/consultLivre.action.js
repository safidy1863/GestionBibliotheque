import axios from "axios";
export const CONSULTATION = "CONSULTATION";


export const consultation = (num) => {
  return (dispatch) => {
    return axios
      .get(`http://projetphp/consultationLivre.php?numero=${num}`)
      .then((reponse) => {
        dispatch({ type: CONSULTATION, payload: reponse.data });
      })
      .catch((err) => console.log(err));
  };
};
