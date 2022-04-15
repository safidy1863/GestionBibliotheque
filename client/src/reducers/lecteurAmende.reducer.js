import { LECTEUR_AMENDE } from "../actions/lecteurAmende.action";

const initialState = {};

export default function lecteurAmende(state = initialState, action) {
  switch (action.type) {
    case LECTEUR_AMENDE:
      return action.payload;
    default:
      return state;
  }
}
