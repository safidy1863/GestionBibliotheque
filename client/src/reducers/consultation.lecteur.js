import { CONSULTATION_LECTEUR } from "../actions/consultLecteur.action";


const initialState = {};

export default function consultationLecteurReducer(state=initialState , action){
    switch (action.type){
       case CONSULTATION_LECTEUR:
            return action.payload;
        default:
          return state;
    }
}