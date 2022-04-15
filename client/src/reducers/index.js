import { combineReducers } from "redux";
import apparitionReducer from "./apparition.reducer";
import apparitionConsultationReducer from "./apparitionConsultation.reducer";
import consultationLecteurReducer from "./consultation.lecteur";
import consultationReducer from "./consultation.livre";
import historiqueReducer from "./historique.reducer";
import lecteursReducer from "./lecteurs.reducer";
import livresReducer from "./livres.reducer";
import pretsReducer from "./prets.reducer";
import editReducer from "./edit.reducer";

export default combineReducers({
  livresReducer,
  consultationReducer,
  pretsReducer,
  lecteursReducer,
  consultationLecteurReducer,
  apparitionReducer,
  apparitionConsultationReducer,
  historiqueReducer,
  editReducer,
});
