import { APPARITION_CONSULTATION } from "../actions/apparitionConsultation.action";

const initialState = false;

export default function apparitionConsultationReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case APPARITION_CONSULTATION:
      return action.payload;
    default:
      return state;
  }
}
