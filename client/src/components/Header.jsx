import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogoutGet } from "../userReducer/userLogoutSlice.js";
import { memo } from "react";
const Header = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  // const handleLogout = () => {
  //   console.log("handleLogout");
  //   dispatch(userLogoutGet());
  // };
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-300">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div className="flex gap-4">
        {isLoggedIn ? (
          <div>
            <Link to="/blogs">Blogs</Link>
          </div>
        ) : (
          <div>
            <Link to="/login">About</Link>
          </div>
        )}
        {isLoggedIn ? (
          <div>
            <Link to="/login">Ouestions</Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
        {isLoggedIn ? (
          <div>
            <Link to="/login">Ask</Link>
          </div>
        ) : (
          <div>
            <Link to="/signup">Signup</Link>
          </div>
        )}
        {isLoggedIn && (
          <div>
            <Link to="/profile">Profile</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default memo(Header);
