import {configureStore} from '@reduxjs/toolkit';
import userRegisterReducer from '../userReducer/userRegisterSlice';
import userLoginReducer from '../userReducer/userLoginSlice';
import userProfileReducer from '../userReducer/userProfileSlice';
export default configureStore({
    reducer: {
        userRegister : userRegisterReducer,
        userLogin : userLoginReducer,
        userProfile : userProfileReducer
    }
});
