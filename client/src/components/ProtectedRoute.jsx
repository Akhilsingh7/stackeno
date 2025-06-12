import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
    // const { isLoggedIn, loading } = useSelector((state) => state.userProfile);   

    // Show loading state while checking authentication
    // if (loading) {
    //     return <div className="flex justify-center items-center min-h-screen">
    //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    //     </div>;
    // }

    // if (!isLoggedIn) {
    //     return <Navigate to="/blogs" replace />;
    // }

    const { isLoggedIn } = useSelector((state) => state.userProfile);

    console.log("isLoggedInppppppp", isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute; 