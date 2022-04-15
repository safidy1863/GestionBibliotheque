import axios from "axios";

export const HISTORIQUE = "HISTORIQUE";

export const historiquePret = ()=>{
    return (dispatch) =>{
        return axios.get("http://projetphp/Pret.php?action=historique")
        .then((reponse) => {
          dispatch({ type: HISTORIQUE, payload: reponse.data });
        });
    }
}