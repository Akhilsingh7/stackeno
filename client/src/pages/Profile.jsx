import { useDispatch, useSelector } from "react-redux";
import { userProfileGet } from "../userReducer/userProfileSlice";
import { useEffect } from "react";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.userProfile);

    useEffect(() => {
        dispatch(userProfileGet());
    }, [dispatch]);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4">
            {user ? (
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Profile</h1>
                    <div className="space-y-2">
                        <p><span className="font-semibold">Username:</span> {user.username}</p>
                        <p><span className="font-semibold">Email:</span> {user.email}</p>
                        <p><span className="font-semibold">Position:</span> {user.position}</p>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">No user data available</div>
            )}
        </div>
    );
};

export default Profile;