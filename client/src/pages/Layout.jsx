import React, { useEffect } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import Header from '../components/Header.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { userProfileGet } from '../userReducer/userProfileSlice.js';

const Layout = () => {
    const { isLoggedIn, loading } = useSelector((state) => state.userProfile);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(userProfileGet());
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );  
    }
      
    return (
        <div className="h-screen">
        <Header isLoggedIn={isLoggedIn} />
        <Outlet />
    </div>
    );
};

export default Layout;