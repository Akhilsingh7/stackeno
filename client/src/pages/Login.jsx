import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLoginUser } from "../userReducer/userLoginSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.userLogin);


    useEffect(() => {
        if (data?.success) {
            navigate('/', { replace: true });//replace the current history entry from login page to home page so that user can't go back to login page by clicking on the back button
            navigate("/profile");
        }
    }, [data]);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postLoginUser(formData));
        setFormData({
            email: "",
            password: ""
        });
    }
    

    return (
        <div>
           <form className="flex flex-col items-center justify-center gap-8 w-1/2 mx-auto mt-20">
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
          />
          <input
            type="password"
            name="password"
            id="password_input_login"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
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
