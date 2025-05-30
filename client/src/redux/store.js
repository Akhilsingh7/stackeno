import {configureStore} from '@reduxjs/toolkit';
import userRegisterReducer from '../userReducer/userRegisterSlice';


export default configureStore({
    reducer: {
        userRegister : userRegisterReducer
    }
});
