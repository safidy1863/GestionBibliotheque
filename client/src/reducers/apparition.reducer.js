import { APPARITION } from "../actions/apparition.action";

const initialState = false;

export default function apparitionReducer(state = initialState, action) {
  switch (action.type) {
    case APPARITION:
      return action.payload;
    default:
      return state;
  }
}
