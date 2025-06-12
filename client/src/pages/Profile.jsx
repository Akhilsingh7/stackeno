import { useDispatch, useSelector } from "react-redux";
import { logout, userProfileGet } from "../userReducer/userProfileSlice";
import { useEffect } from "react";
// import { userLogoutGet } from "../userReducer/userLogoutSlice";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../userReducer/userProfileSlice";
import { userLogoutGet } from "../userReducer/userLogoutSlice";
import { resetLoginState } from "../userReducer/userLoginSlice";
const Profile = () => {
    console.log("Profile component rendering");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: userProfile, loading: profileLoading, error: profileError, isLoggedIn } = useSelector((state) => state.userProfile);
    const { loading: logoutLoading, error: logoutError, isLoggedOut } = useSelector((state) => state.userLogout);

    console.log("Current states:", {
        profileLoading,
        logoutLoading,
        isLoggedIn,
        isLoggedOut
    });

    if (profileLoading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (profileError) {
        return <div className="text-red-500 text-center mt-8">Error: {profileError}</div>;
    }
    const handleLogout = async () => {
        try {
          await dispatch(userLogoutGet()).unwrap();
          dispatch(updateUserProfile({ user: null, isLoggedIn: false }));
          dispatch(resetLoginState());
        } catch (error) {
          console.log("Logout failed:", error);
        }
      };

    useEffect(() => {
      if(!isLoggedIn){
        navigate("/");
      }
    }, [isLoggedIn]);

    return (<>
        <div className="max-w-2xl mx-auto mt-8 p-4">
            {userProfile ? (
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Profile</h1>
                    <div className="space-y-2">
                        <p><span className="font-semibold">Username:</span> {userProfile.username}</p>
                        <p><span className="font-semibold">Email:</span> {userProfile.email}</p>
                        <p><span className="font-semibold">Position:</span> {userProfile.position}</p>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">No user data available</div>
            )}
        </div>
        <div 
            className="text-center text-gray-500 bg-amber-400 w-[100px] mx-auto" 
            onClick={handleLogout}
        >
            {logoutLoading ? "Logging out..." : "Logout"}
        </div>
    </>);
};

export default Profile;