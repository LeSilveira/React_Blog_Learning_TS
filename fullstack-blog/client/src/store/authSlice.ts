import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AuthState {
    user: string | null;
    token: string | null;
    userId: number | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    userId: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: string; accessToken: string; userId: number}>
        ) => {
            const { user, accessToken, userId } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.userId = userId;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.userId = null;
        },
    },
    selectors: {
      selectCurrentToken: (state) => state.token, 
      selectCurrentUser: (state) => state.user,
      selectCurrentUserId: (state) => state.userId,
    }
});
export const { selectCurrentToken, selectCurrentUser, selectCurrentUserId }  = authSlice.selectors;

export const { setCredentials, logOut }  = authSlice.actions;

export default authSlice.reducer;