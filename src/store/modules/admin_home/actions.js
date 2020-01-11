import {TOGGLE_MODAL_DISPLAY} from "./actionTypes";

export function toggleAdminModalDisplay(isAdminModalDisplayed) {
    return async dispatch => {
        dispatch({
            type: TOGGLE_MODAL_DISPLAY,
            payload: {
                isAdminModalDisplayed: isAdminModalDisplayed
            }
        });
    };
}
