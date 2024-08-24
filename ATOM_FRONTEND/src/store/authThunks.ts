import {verifyUser} from '../utils/API';
import {authActions} from './auth';
import { AppThunk } from './index'; 

const verifyUserThunk: AppThunk = () => async (dispatch) => {
    try {
        const response = await verifyUser();
 
        if (response) {
        dispatch(authActions.login());
        }
        // dispatch(cartActions.setCart(response.cart));

    } catch (error) {
        console.error("Error verifying user:", error);
    }
    }

export default verifyUserThunk;