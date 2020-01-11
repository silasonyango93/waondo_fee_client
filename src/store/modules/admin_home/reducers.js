import {TOGGLE_MODAL_DISPLAY} from "./actionTypes";


export const ACTION_HANDLERS = {
    [TOGGLE_MODAL_DISPLAY]: (state, action) =>
        Object.assign({}, state, {
            isAdminModalDisplayed: action.payload.isAdminModalDisplayed
        })
};
