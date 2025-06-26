import {configureStore} from '@reduxjs/toolkit';
import userRegisterReducer from '../userReducer/userRegisterSlice';
import userLoginReducer from '../userReducer/userLoginSlice';
import userProfileReducer from '../userReducer/userProfileSlice';
import userLogoutReducer from '../userReducer/userLogoutSlice';
import userBlogsReducer from '../userReducer/userBlogsSlice';
export default configureStore({
    reducer: {
        userRegister : userRegisterReducer,
        userLogin : userLoginReducer,
        userProfile : userProfileReducer,
        userLogout : userLogoutReducer,
        userBlogs : userBlogsReducer,
    }
});
