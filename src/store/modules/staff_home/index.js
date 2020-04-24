import { initialState } from "./state";
import { ACTION_HANDLERS } from "./reducers";

function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}

export { initialState, reducer };
