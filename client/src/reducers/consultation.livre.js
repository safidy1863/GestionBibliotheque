import { CONSULTATION } from "../actions/consultLivre.action";

const initialState = {};

export default function consultationReducer(state=initialState , action){
    switch (action.type){
       case CONSULTATION:
            return action.payload;
        default:
          return state;
    }
}