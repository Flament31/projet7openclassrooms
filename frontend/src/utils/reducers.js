const initialState = { token: null, userId: null, isAdmin: false };
export const CONNECT = "CONNECT";
export const DISCONNECT = "DISCONNECT";

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case CONNECT:
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            return action.payload;
        case DISCONNECT:
            state = initialState;
            return state;
        default:
            return state;
    }
}