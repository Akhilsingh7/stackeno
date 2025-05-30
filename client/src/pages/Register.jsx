import { useDispatch, useSelector } from "react-redux";
import { postRegisterUser } from "../userReducer/userRegisterSlice";
import { useState } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.userRegister);

  const [formData, setFormData] = useState ({
    username: "",
    email: "",
    password: "",
    position: "Software Engineer L1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      dispatch(postRegisterUser(formData));
      setFormData({
        username: "",
        email: "",
        password: "",
        position: "Software Engineer L1",
      });

  };

  return (
    <>
      <div>
        <form className="flex flex-col items-center justify-center gap-8 w-1/2 mx-auto mt-20">
          {error && <div className="text-red-500">{error.message}</div>}
          <input
            type="text"
            name="username"
            id="username_input"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            id="email_input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            id="password_input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="position"
            id="position_input"
            className="w-full p-2 border rounded text-black"
            value={formData.position}
            onChange={handleChange}
          >
            <option value="Software Engineer L1">Software Engineer L1</option>
            <option value="Software Engineer L2">Software Engineer L2</option>
            <option value="Lead Software Engineer">Lead Software Engineer</option>
            <option value="Project Manager">Project Manager</option>
            <option value="QA">QA</option>
          </select>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
