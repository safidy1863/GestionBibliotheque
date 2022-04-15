export const EDITER = "EDITER";

export const editerAction = (edit,numero) => {
  return (dispatch) => {
    dispatch({ type: EDITER, payload: [edit,numero] });
  };
};
