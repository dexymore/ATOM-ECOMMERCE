import { createSlice} from '@reduxjs/toolkit';


const initalState ={
    loggedIn:false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initalState,
    reducers: {
        login(state) {
            state.loggedIn = true;
            
     
        },
        logout(state) {
            state.loggedIn = false;

        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
