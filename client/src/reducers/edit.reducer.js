import { EDITER } from "../actions/edit.action";

const initialState = [false,0];

export default function editReducer(state = initialState, action) {
  switch (action.type) {
    case EDITER:
      return action.payload;
    default:
      return state;
  }
}
