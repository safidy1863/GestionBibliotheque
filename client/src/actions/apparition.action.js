export const APPARITION = "APPARITION";

export const apparitionOpacite = (apparition) => {
  return (dispatch) => {
    dispatch({type:APPARITION, payload: apparition });
  };
};
