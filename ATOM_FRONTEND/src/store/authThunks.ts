import {verifyUser} from '../utils/API';
import {authActions} from './auth';



const verifyUserThunk = () => async (dispatch: any) => {
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