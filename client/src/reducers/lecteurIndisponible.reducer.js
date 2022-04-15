import { LECTEUR_INDISPONIBLE } from "../actions/lecteurIndisponible.action";

const initialState = {};

export default function indisponibleLecteurReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case LECTEUR_INDISPONIBLE:
      return action.payload;
    default:
      return state;
  }
}
