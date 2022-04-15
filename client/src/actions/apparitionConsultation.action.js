export const APPARITION_CONSULTATION = "APPARITION_CONSULTATION";

export const apparitionConsultation = (consulte) =>{
    return (dispatch) => {
        dispatch({type: APPARITION_CONSULTATION, payload: consulte })
    }
}