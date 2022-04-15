import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faHandHolding} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { retourPret } from "../actions/prets.action";
import { prets } from "../actions/prets.action";
import { livres } from "../actions/livres.action";
import { historiquePret } from "../actions/historique.action";
import { lecteurs } from "../actions/lecteurs.action";

const Pret = ({ pret }) => {
  const dispatch = useDispatch();
  const retour = async () => {
    const numeroPretRetourner = {
      numero: pret.nPret,
      numLivre: pret.numLivre,
    };
    await dispatch(retourPret(numeroPretRetourner));
    dispatch(prets());
    dispatch(livres());
    dispatch(historiquePret());
    dispatch(lecteurs());
  };
  return (
    <div className="pret">
      <FontAwesomeIcon icon={faHandHolding} />
      <h4>Pret N°: {pret.nPret}</h4>
      <h3>Livre {pret.titre}</h3>
      <h3>Lecteur: {pret.nom}</h3>
    
        <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={retour} />
      
    </div>
  );
};

export default Pret;
