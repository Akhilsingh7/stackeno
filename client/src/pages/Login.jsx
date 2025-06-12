import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLoginUser } from "../userReducer/userLoginSlice";
import { useNavigate } from "react-router-dom";
import { userProfileGet, updateUserProfile } from "../userReducer/userProfileSlice";
import { clearLoginError } from "../userReducer/userLoginSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.userLogin);
    const { isLoggedIn } = useSelector((state) => state.userProfile);
    const [validationError, setValidationError] = useState("");


    useEffect(() => {
        // If login was successful, fetch profile and redirect
        if (data?.success) {
            // dispatch(userProfileGet())
            //     .unwrap()
            //     .then(() => {
            //         // navigate('/', { replace: true });
            //         console.log("data", data);
            //     })
            //     .catch((error) => {
            //         console.error('Failed to fetch profile:', error);
            //     });
            console.log("data", data);
            dispatch(updateUserProfile({user: data.data.user, isLoggedIn: true}));
            navigate('/', { replace: true });

        }
        return () => {
          if(error && error.message){
            dispatch(clearLoginError());
          }
        }
    }, [data , error, dispatch]);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Add client-side validation
        if (!formData.email || !formData.password) {
          setValidationError("Please fill in all fields");
          return;
      }
      
        
        setValidationError(""); // Clear validation error if fields are filled
        dispatch(postLoginUser(formData));
        setFormData({
            email: "",
            password: ""
        });
    }
    
    return (
        <div>
           <form className="flex flex-col items-center justify-center gap-8 w-1/2 mx-auto mt-20">
              {validationError && <div className="text-red-500">{validationError}</div>}
              {error && <div className="text-red-500">{error.message}</div>}
              {data && <div className="text-green-500">{data.message}</div>}
              <input
                type="email"
                name="email"
                id="email_input_login"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                autoComplete="email"
                required
              />
              <input
                type="password"
                name="password"
                id="password_input_login"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                autoComplete="current-password"
                required
              />
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                 {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
        </div>
    )
}

export default Login;
